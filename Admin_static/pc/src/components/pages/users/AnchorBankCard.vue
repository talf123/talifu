<template>
  <div class="content">
    <silderBar></silderBar>
    <div class="body_main">
        <navBar></navBar>
        <div class="main" :style="widthMain">
            <div class="tips" id="">
                <div class="clearD" title="清除所有" @click="clearAll">x</div>
                <Tag v-for="(item,index) in tagData" :key="index" :name="item.name" type="dot" closable checkable :color="item.name==colorName?'primary':'default'" @on-close="tagClose(item)" @on-change="tagChange(item)">{{item.index[2].name}}</Tag>
                <!-- <Tag v-for="(item,index) in tagData" :key="index" :name="item.name" type="dot"  checkable :color="item.name==colorName?'primary':'default'" @on-close="tagClose(item)" @on-change="tagChange(item)" v-else>
                    {{item.index[2].name}}</Tag> -->
            </div>
            <!-- 查询 -->
            <div class="top">
                <label>主播IDX：</label>
                    <Input v-model="query" size="small" placeholder="IDX" style="width: 200px" />
                <Button type="primary" size="small" @click="lookup">查询</Button>
                <Button type="primary" size="small" @click="add">添加</Button>
            </div>
            <!-- 主页面内容 -->
            <div class="center" >
                <Table border :columns="columns" :data="tabledata" class="table"  ref="table">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="text" size="small" @click="update(row)">修改</Button>
                        <Button type="text" size="small" @click="remove(row)">删除</Button>
                    </template>
                </Table>
            </div>
            <!-- 遮罩层 -->
               <div class="marsk" v-if="showNone"></div>
            <!-- 新增页面 -->
            <div class="pop" v-if="showNonecreate">
                <h2 style="margin-bottom:15px;">添加主播支付宝资料</h2>
                <Form :label-width="100">
                    <FormItem label="主播IDX">
                        <Input v-model="Useridx" placeholder="请输入..." ></Input>
                    </FormItem>
                    <FormItem label="支付宝账号：">
                        <Input v-model="Zhifubaoid" placeholder="请输入..."></Input>
                        <p style="color:red">*支付宝账号一般为手机号或者邮箱号，请勿填错，影响工资发放*</p>
                    </FormItem>
                    <FormItem label="支付宝名称：">
                        <Input v-model="Zhifubaoname" placeholder="请输入..." ></Input>
                    </FormItem>
                    <FormItem label="手机号码：">
                        <Input v-model="Iphone" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="真实姓名：">
                        <Input v-model="Realname" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="身份证号码：">
                        <Input v-model="Idcard" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="newadd">保存</Button>
                        <Button style="margin-left: 8px" type="dashed" @click="reset">重置</Button>
                        <Button style="margin-left: 8px" @click="close">取消</Button>
                    </FormItem>
                </Form>      
            </div>
            <!-- 修改编辑页面 -->
            <div class="pop" v-if="showNoneUpdate">
                <h2 style="margin-bottom:15px;">修改主播支付宝资料</h2>
                <Form :label-width="100">
                    <FormItem label="主播IDX">
                        <Input v-model="Useridx" disabled placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="支付宝账号：">
                        <Input v-model="Zhifubaoid" placeholder="请输入..."></Input>
                        <p style="color:red">*支付宝账号一般为手机号或者邮箱号，请勿填错，影响工资发放*</p>
                    </FormItem>
                    <FormItem label="支付宝名称：">
                        <Input v-model="Zhifubaoname" placeholder="请输入..." ></Input>
                    </FormItem>
                    <FormItem label="手机号码：">
                        <Input v-model="Iphone" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="真实姓名">
                        <Input v-model="Realname" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="身份证号码：">
                        <Input v-model="Idcard" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="updateadd">保存</Button>
                        <Button style="margin-left: 8px" type="dashed" @click="reset">重置</Button>
                        <Button style="margin-left: 8px" @click="close">取消</Button>
                    </FormItem>
                </Form>  
            </div>
            <!-- 删除层 -->
            <div class="pop1" v-if="showNoneremove">
                <p style="font-size:25px; margin-bottom:35px;">确定删除?</p>
                <Button type="primary" @click="removeadd()">确定</Button>
                <Button type="primary" style="margin-left: 35px;" @click="close()">取消</Button>
            </div>
            <!-- 分页页面 -->
            <div class="bottom">
                <Page :total = totitem show-total show-elevator @on-change='fenye'/>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {square,determine} from '../../../assets/js/download'

export default {
  name: 'Index',
  data () {
    return {
        widthMain:{width:''},//table组件自适应
        tagData:null,//tag数据
        colorName:'',//对比的tag名字
        tagDataLength:true,//可取消的状态

        query: '', // 查询功能 绑定的数据
        showNone: false, // 控制页面遮罩层开关
        showNoneUpdate: false, // 修改页面弹出控制
        showNonecreate: false, // 新增页面弹出控制
        showNoneremove: false, // 删除层控制
        cityList: [ // 查询条件
            {
                value: 'Android',
                label: 'Android'
            },
            {
                value: 'iPhone',
                label: 'iPhone'
            },
            {
                value: 'AppStore',
                label: 'AppStore'
            },
            {
                value: 'taiwangooglestore',
                label: '台湾googlestore'
            },
            {
                value: 'taiwanAppStore',
                label: '台湾AppStore'
            }
        ],
        // 表格列名称
        columns: [
            {title: '编号',key: 'useridx'},
            {title: '主播昵称',key: 'realname'}, 
            {title: '支付宝账号',key: 'zhifubaoid'},
            {title: '支付宝名称',key: 'zhifubaoname'},
            {title: '手机号码',key: 'iphone'},
            {title: '身份证号码',key: 'idcard'},
            {title: '操作',slot: 'action',align: 'center'}
        ],
        
        tabledata: [],// 数据表数据

        Useridx: null,  //用户idx
        Zhifubaoid: null,	// string	支付宝id	
        Iphone: null,	//string	手机	
        Zhifubaoname: null,	// string	支付宝名称	
        Idcard: null,	// string	身份证	
        Realname: null, // string 真实姓名

        resets: { // 暂存页面内容数据
            Useridx: null,  //用户idx
            Zhifubaoid: null,	// string	支付宝id	
            Iphone: null,	//string	手机	
            Zhifubaoname: null,	// string	支付宝名称	
            Idcard: null,	// string	身份证	
            Realname: null, // string 真实姓名
        },

        totitem: null, // 数据总条数
        pages: 1 //当前页数
        

    }
  },
  created() {
    window.addEventListener('resize', this.getWidth);
    this.getWidth();
    this.getTag();
    this.totlist();
  },
  destroyed () {
    window.removeEventListener('resize', this.getWidth)
  },
  mounted () {
      
  },
  computed: {
      
  },
  methods: {
      //table组件处理函数
        getWidth:function(){
            var wid =document.body.clientWidth;        //网页可见区域宽(body)
            this.widthMain.width=wid-200+'px';
            
        },
        getTag:function(){
            this.tagData=JSON.parse(localStorage.getItem("g_tagMArry"));
            this.colorName=this.$route.meta.name;
        },
        tagClose:function(item){
            if(this.tagData.length>1){
                let arr3 = this.tagData;
                let arr4 = arr3.filter(item3=>{
                    return item3.name != item.name;     
                })
                this.tagData=arr4;
                localStorage.setItem('g_tagMArry',JSON.stringify(arr4))
                if(item.name==this.$route.meta.name){
                        this.$router.push({path: arr4[0].index[2].path});
                        this.colorName=arr4[0].name;
                }else{
                }
            }else{
                localStorage.removeItem('g_tagMArry');
                this.$router.push({path:'/'});
            }
        },
        tagChange:function(item){
            this.colorName=item.name;
            this.$router.push({path: item.index[2].path});
        },
        clearAll:function(){
            let arry =[];
            arry.push(this.$route.meta);
            this.tagData=arry;
            localStorage.setItem('g_tagMArry',JSON.stringify(arry))
        },
        totlist:function (){   // 页面初始列表显示
            let token =localStorage.getItem('h_g_access_token');
            this.$axios({  
                url: '/api/BPMService/User/ArtistsInfoListAsync',
                method: 'get',
                //params 参数必写 , 如果没有参数传{}也可以
                headers:{
                        Authorization:'Bearer '+token
                },
                params:{
                    page: this.pages,
                    pagesize: 10,
                    idx: 0
                },
                // data: {
                // }
            })
            .then((res)=>{
                console.log(res.data)
                if(res.data.code == 1){ 
                    this.tabledata = res.data.data.pager.live_Artists; // 获取列表信息
                    this.totitem = res.data.data.pager.count // 获取数据总条数
                } else if (res.data.code == 0){
                    this.$Message.warning('无数据');
                    this.tabledata = res.data.data.pager.live_Artists; // 获取列表信息
                    this.totitem = res.data.data.pager.count // 获取数据总条数
                } else if (res.data.code == -1){
                    this.$Message.error('异常');
                    this.$router.push({path: '/'});

                }
            })
            .catch((err)=>{
                // console.log(err)
                if(err.response.status==401){
                    this.$Message.error('登录过期，请重新登录');
                    this.$router.push({path: '/login'});
                }
            })
        },
        update: function(row) { // 修改页面
            this.resets.Useridx = row.useridx,
            this.resets.Zhifubaoid = row.zhifubaoid,
            this.resets.Iphone = row.iphone,
            this.resets.Zhifubaoname = row.zhifubaoname,
            this.resets.Idcard = row.idcard,
            this.resets.Realname = row.realname,

            this.showNone = true,
            this.showNoneUpdate = true,

            this.Useridx = row.useridx,
            this.Zhifubaoid = row.zhifubaoid,
            this.Iphone = row.iphone,
            this.Zhifubaoname = row.zhifubaoname,
            this.Idcard = row.idcard,
            this.Realname = row.realname
            // console.log(row)
        },
        reset: function(row) { // 修改页面重置功能
            this.Useridx = this.resets.Useridx,
            this.Zhifubaoid = this.resets.Zhifubaoid,
            this.Iphone = this.resets.Iphone,
            this.Zhifubaoname = this.resets.Zhifubaoname,
            this.Idcard = this.resets.Idcard,
            this.Realname = this.resets.Realname
        },
        updateadd: function() { // 修改页面保存
            let token =localStorage.getItem('h_g_access_token');
            this.$axios({  
                url: '/api/BPMService/User/EditArtistInfoAsync',
                method: 'post',
                //params 参数必写 , 如果没有参数传{}也可以
                headers:{
                        Authorization:'Bearer '+token
                },
                data: {
                    Useridx: Number(this.Useridx),
                    Zhifubaoid: this.Zhifubaoid,
                    Iphone: this.Iphone,
                    Zhifubaoname: this.Zhifubaoname,
                    Idcard: this.Idcard,
                    Realname: this.Realname
                }
            })
            .then((res)=>{
                console.log(res.data)
                if(res.data.code == 1){ 
                    this.$Message.success('修改成功!');
                    this.totlist();
                    this.showNone = false;
                    this.showNoneUpdate = false;
                } else {
                    this.$Message.error('修改失败!');
                }
            })
            .catch((err)=>{
                // console.log(err)
                if(err.response.status==401){
                    this.$Message.error('登录过期，请重新登录');
                    this.$router.push({path: '/login'});
                }
            })

        },
        close: function () { // 新建页面和修改页面取消修改
            this.showNone = false, // 遮罩层关闭
            this.showNoneUpdate = false, // 修改页面关闭
            this.showNonecreate = false, // 新建页面关闭
            this.showNoneremove = false, // 新建页面关闭

            this.resets.Useridx = null,  // 页面重置功能 使用的缓存数据清空
            this.resets.Zhifubaoid = null,
            this.resets.Iphone = null,
            this.resets.Zhifubaoname = null,
            this.resets.Idcard = null,
            this.resets.Realname = null

        },
        remove: function(row) { // 删除
            this.showNone = true,
            this.showNoneremove = true,
            this.Useridx = row.useridx

        },
        removeadd: function(row) { // 删除
            let token =localStorage.getItem('h_g_access_token');
            this.$axios({  
                url: '/api/BPMService/User/DelArtistInfoAsync',
                method: 'post',
                //params 参数必写 , 如果没有参数传{}也可以
                headers:{
                    Authorization:'Bearer '+token
                },
                data: {
                    Useridx: Number(this.Useridx)
                }
            })
            .then((res)=>{
                // console.log(res.data)
                if(res.data.code == 1){ 
                    this.$Message.success('成功!');
                    this.totlist();
                } else {
                    this.$Message.error('失败!');
                }
            })
            .catch((err)=>{
                // console.log(err)
                if(err.response.status==401){
                    this.$Message.error('登录过期，请重新登录');
                    this.$router.push({path: '/login'});
                }
            })
            this.showNone = false,
            this.showNoneremove = false,
            this.Useridx = null
        },
        add: function () { // 新建数据页面
            this.showNone = true,
            this.showNonecreate = true,
            this.Useridx = null, //  用户idx 清空数据，防止之前点击过修改造成数据缓存
            this.Zhifubaoid = null, //支付宝id
            this.Iphone = null, // 手机
            this.Zhifubaoname = null, // 支付宝名称
            this.Idcard = null, // 身份证
            this.Realname = null //真实姓名      
        },

        newadd: function () { // 新建页面保存
            let i = determine(this.Useridx); // 返回的值必须经过函数的运算后返回值才会生效
            // console.log(i)
            this.showNone = i;
            this.showNonecreate = i;
            if(i)
            {
                this.$message.warning('请重新输入');
            }else{
                let token =localStorage.getItem('h_g_access_token');
                this.$axios({
                    url: '/api/BPMService/User/AddArtistInfoAsync',
                    method: 'post',
                    //params参数必写 , 如果没有参数传{}也可以
                    headers: {
                        Authorization:'Bearer '+token
                    },
                    params: {

                    },
                    data: {
                        Useridx: Number(this.Useridx),
                        Zhifubaoid: this.Zhifubaoid,
                        Iphone: this.Iphone,
                        Zhifubaoname: this.Zhifubaoname,
                        Idcard: this.Idcard,
                        Realname: this.Realname
                    }
                })
                .then((res)=>{
                    console.log(res)
                    if(res.data.code == 1){ 
                        this.$Message.success('添加成功！');
                        this.totlist();
                    }else{
                        this.$message.warning('请重新输入');
                    }
                })
                .catch((err)=>{
                    if (err.response.status==401){
                        this.$Message.error('登录过期，请重新登录');
                        this.$router.push({path: '/login'});
                    }             
                })
            }
        },

        lookup: function () { // 查找
            // console.log(this.query)
            let token =localStorage.getItem('h_g_access_token');
            this.$axios({  
                url: '/api/BPMService/User/ArtistsInfoListAsync',
                method: 'get',
                headers:{
                    Authorization:'Bearer '+token
                },
                params: {
                    page: 1,
                    pagesize: 10,
                    idx: this.query
                },
                //params参数必写 , 如果没有参数传{}也可以
                data:{ 
                }
            })
            .then((res)=>{
                if (res.data.code == 1) {
                    this.tabledata = res.data.data.pager.live_Artists;
                    this.totitem = res.data.data.pager.count // 获取数据总条数
                } else if (res.data.code == 0) {
                    this.tabledata = res.data.data.pager.live_Artists;
                    this.totitem = res.data.data.pager.count // 获取数据总条数
                } else if (res.data.code == -1) {
                    this.tabledata = res.data.data.pager.live_Artists;
                    this.totitem = res.data.data.pager.count // 获取数据总条数
                    this.$message('数据异常') 
                }
            })
            .catch((err)=>{
                if(err.response.status==401){
                    this.$Message.error('登录过期，请重新登录');
                    this.$router.push({path: '/login'});
                }
            })
        },
        fenye: function (page) { // 页面的分页功能
            // console.log(page)
            this.pages = page
            // console.log(this.pages)
            this.totlist();
        },
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main{  // 主页面样式
    overflow-x: scroll;
    overflow: hidden;
    position: relative;
    .tips{ // 主页面
        text-align: left;
        background: #cecece;
        display: flex;
        
        overflow-x: scroll;
        .ivu-tag{
            display:block;
            // float: left;
            flex-shrink: 0;
            // min-width:190px;
            // max-height: 100px;
        }
        .ivu-icon{

        }

    }
    .top{margin-top:10px; margin-left: 20px; text-align: left; padding: 5px;  // 表头部分 查找添加 样式
          button{
              margin-left: 15px;
          }
          label{
              margin-left: 10px;
              margin-right: 10px;
              font-size: 15px;
          }
    }
    .center{width:100%; margin-top:20px;
        button {
            margin-right: 5px
        }
    }  // 页面中部 表格部分样式
    .bottom{width:100%; margin-top:15px;} // 页面底部 分页部分样式

    .pop1{  // 弹出层
        padding:3% 4%;
        position: fixed;
        top: 20%;
        left: 32%; 
        width: 35%;
        height: 30%;
        background: #fff;
        z-index: 3001;
    }

}
</style>
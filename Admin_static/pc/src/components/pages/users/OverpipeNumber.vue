<template>
  <div class="content">
    <silderBar></silderBar>
    <div class="body_main">
        <navBar></navBar>
        <div class="main" :style="widthMain">
            <div class="tips" id="{this.$route.name}">
                <Breadcrumb separator="<b class='demo-breadcrumb-separator'>=></b>">
                    <BreadcrumbItem :to="item.path" v-for="(item,index) in this.$route.meta.index" :key="index">{{item.name}}</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <!-- 查询 新增 -->
            <div class="top">
                <label>用户ID：</label>
                <Input v-model="query" size="small" placeholder="ID" style="width: 200px" />
                <Button type="primary" size="small" @click="lookup">查询</Button>
                <Button @click="add" size="small">添加超管</Button>
            </div>
            <!-- 主页面内容 -->
            <div class="center" >
                <Table border :columns="columns" :data="tabledata" class="table"  ref="table">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="text" size="small" @click="remove(row)">下管</Button>
                    </template>
                </Table>
            </div>
            <!-- 遮罩层 -->
            <div class="marsk" v-if="showNone"></div>
            <!-- 新增页面 -->
            <div class="pop" v-if="showNonecreate">
                <Form :label-width="90">
                    <p style="font-size: 20px; margin-bottom: 10px;">设置超管</p>
                    <FormItem label="用户IDX：">
                        <Input v-model="idx" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem>
                        <Button style="margin-left: -100px" type="primary" @click="newadd">保存</Button>
                        <Button style="margin-left: 8px" type="dashed" @click="reset">重置</Button>
                        <Button style="margin-left: 8px" @click="close">取消</Button>
                    </FormItem>
                </Form>         
            </div>
            <!-- 分页页面 -->
            <div class="bottom">
                <Page :total="count" :current='page' show-total show-elevator @on-change='fenye'/>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {square} from '../../../assets/js/download'
export default {
  name: 'Index',
  data () {
    return {
        widthMain:{width:''},//table组件自适应
        tagData:null,//tag数据
        colorName:'',//对比的tag名字
        tagDataLength:true,//可取消的状态

        showNone: false, // 控制页面遮罩层开关
        showNoneUpdate: false, // 修改页面弹出控制
        showNonecreate: false, // 新增页面弹出控制

        query: null, // 用户idx
        page: 1, // 当前页码
        pagesize: 10, // 每页条数
        idx: null, // 用户idx
        count: 0, // 列表总数


        columns: [ // 表格列名称
            {title: '用户ID',key: 'useridx'}, 
            {title: '用户名',key: 'userid'},
            {title: '昵称',key: 'myname'},
            {title: '操作',slot: 'action',align: 'center'}
        ],
        tabledata: [ // 数据表数据
            {
                roomid: 'Android', // 支付类型
                familyname: 'com.sunday.80', // 商品ID
                money: 1, // 金额
                Signing: 7000, //  币值
                zfb_name: 0, // 礼物赠送币
                Sub_operation: 'New York No. 1 Lake Park' // 说明
            }
        ],
        resets: { // 暂存页面内容数据 用于重置输入框时候使用
                idx: null, // 房间ID
        }
    }
  },
  created() {
    window.addEventListener('resize', this.getWidth);
    this.getWidth();
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

        totlist: function(){
            let token =localStorage.getItem('h_g_access_token');
            this.$axios({
                url: '/api/BPMService/User/GetSuperTubeListAsync',
                method: 'get',
                //params 参数必写 , 如果没有参数传{}也可以
                headers:{
                    Authorization:'Bearer '+token
                },
                params:{
                    page: this.page,
                    pagesize: this.pagesize,
                    idx: 0
                }
            })
            .then((res)=>{
                console.log(res)
                if(res.data.code == 1){
                    this.$Message.success(res.data.msg);
                    this.tabledata = res.data.data.pager.live_UserInfos;
                    this.count = res.data.data.pager.count
                }else if(res.data.code == 0){
                    this.$Message.warning(res.data.msg);
                    this.tabledata = res.data.data.pager.live_UserInfos;
                    this.count = res.data.data.pager.count
                }else if(res.data.code == -1){
                    this.$Message.error(res.data.msg);
                    this.$router.push({path: '/login'});
                    this.tabledata = res.data.data.pager.live_UserInfos;
                    this.count = res.data.data.pager.count
                }
                
            })
            .catch((err)=>{
                console.log(err)
                if(err.response.status==401){
                    this.$Message.error('登录过期，请重新登录');
                    this.$router.push({path: '/login'});
            }
            })
        },
        reset: function() { // 修改页面重置功能
            this.idx = null
        },

        close: function () { // 新建页面和修改页面取消修改
            this.showNone = false, // 遮罩层关闭
            this.showNoneUpdate = false, // 修改页面关闭
            this.showNonecreate = false // 新建页面关闭

        },
        remove: function(row) { // 删除
            // console.log(row.useridx)
            let token = localStorage.getItem('h_g_access_token');
            this.$axios({
                url: '/api/BPMService/User/DelLuckyIdxAsync',
                method: 'post',
                //params 参数必写 , 如果没有参数传{}也可以
                headers:{
                    Authorization:'Bearer '+token
                },
                data:{
                    idx: Number(row.useridx)
                }
            })
            .then((res)=>{
                console.log(res)
                if(res.data.code == 1){
                    this.$Message.success('删除成功')
                    this.totlist();
                }else{
                    this.$Message.error('删除失败')
                }
            })
            .catch((err)=>{
                console.log(err)
                if(err.response.status==401){
                        this.$Message.error('登录过期，请重新登录');
                        this.$router.push({path: '/login'});
                }
            })
        },
        add: function () { // 新建数据页面
            this.showNone = true,
            this.showNonecreate = true,
            this.idx = null // 清空数据，防止之前点击过修改造成数据缓存
        },
        newadd: function () { // 新建页面保存
            let token = localStorage.getItem('h_g_access_token');
            this.$axios({
                url: '/api/BPMService/User/AddSuperTubeAsync',
                method: 'post',
                //params 参数必写 , 如果没有参数传{}也可以
                headers:{
                    Authorization:'Bearer '+token
                },
                data:{
                    idx: Number(this.idx)
                }
            })
            .then((res)=>{
                // console.log(res)
                this.showNone = true,
                this.showNonecreate = true,
                this.totlist()
            })
            .catch((err)=>{
                console.log(err)
                if(err.response.status==401){
                    this.$Message.error('登录过期，请重新登录');
                    this.$router.push({path: '/login'});
                }
            })
        },
        lookup: function () { // 查找
            let token =localStorage.getItem('h_g_access_token');
            this.$axios({
                url: '/api/BPMService/User/GetSuperTubeListAsync',
                method: 'get',
                //params 参数必写 , 如果没有参数传{}也可以
                headers:{
                    Authorization:'Bearer '+token
                },
                params:{
                    page: this.page,
                    pagesize: this.pagesize,
                    idx: Number(this.idx)
                }
            })
            .then((res)=>{
                // console.log(res)
                if(res.data.code == 1){
                    // this.$Message.success(res.data.msg);
                    this.tabledata = res.data.data.pager.live_UserInfos;
                    this.count = res.data.data.pager.count;
                }else if(res.data.code == 0){
                    this.$Message.warning(res.data.msg);
                    this.tabledata = res.data.data.pager.live_UserInfos;
                    this.count = res.data.data.pager.count;
                }else if(res.data.code == -1){
                    this.$Message.error(res.data.msg);
                    this.$router.push({path: '/login'});
                    this.tabledata = res.data.data.pager.live_UserInfos;
                    this.count = res.data.data.pager.count;
                }
            })
            .catch((err)=>{
                console.log(err)
                if(err.response.status==401){
                        this.$Message.error('登录过期，请重新登录');
                        this.$router.push({path: '/login'});
                }
            })

        },
        fenye: function (page) { // 页面的分页功能
            console.log(page)
        }
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
    }
    .top{margin-top:10px; margin-left: 20px; display: flex; padding: 5px;  // 表头部分 查找添加 样式
          button{
              margin-left: 15px;
          }
          label{
              margin-left: 15px;
            //   margin-right: 15px;
              font-size: 15px;
          }
    }
    .center{width:100%; margin-top:20px;
        button {
            margin-right: 5px
        }
    }  // 页面中部 表格部分样式
    .bottom{width:100%; margin-top:15px;} // 页面底部 分页部分样式
    .marsk{ // 遮罩层
        position: fixed;
        top: 0;
        left: 0; 
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.5;
        z-index: 2999;
    }
    .pop{  // 弹出层
        padding:5% 4%;
        position: fixed;
        top: 12%;
        left: 25%; 
        width: 60%;
        height: 50%;
        background: #fff;
        z-index: 3001;
    }
}
</style>
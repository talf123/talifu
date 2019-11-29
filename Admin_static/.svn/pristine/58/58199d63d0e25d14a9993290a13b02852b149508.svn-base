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
                <label>用户idx：</label>
                    <Input v-model="useridx" size="small" placeholder="请输入..." style="width:150px"></Input>
                <label>类型：</label>
                    <Select v-model="type" size="small" style="width:150px">
                        <Option v-for="item in stype" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Select v-model="ndays" size="small" style="width:150px; margin-left: 10px;">
                        <Option v-for="item in sel_days" size="small" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                <label>原因：</label>
                    <Input v-model="content" size="small" placeholder="请输入..." style="width:200px"></Input>

                <Button type="primary" size="small" @click="black()">添加</Button>
                <Button type="primary" size="small" @click="showbatchblack()">批量添加</Button>
            </div>

            <div class="top">
                <label>用户idx：</label>
                    <Input v-model="cx_useridx" size="small" placeholder="请输入..." style="width:150px"></Input>
                <label>类型：</label>
                    <Select v-model="cx_type" size="small" style="width:150px">
                        <Option v-for="item in stype" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                <Button type="primary" size="small" @click="lookup()">查询</Button>
            </div>
            <!-- 主页面内容 -->
            <div class="center" >
                <Table border :columns="columns" :data="tabledata" class="table"  ref="table">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="text" size="small" @click="remove(row)">删除</Button>
                    </template>
                </Table>
            </div>
            <!-- 遮罩层 -->
            <div class="marsk" v-if="showNone"></div>
            <!-- 批量拉黑页面 -->
            <div class="pop" v-if="showNoneblack">
                <Form :label-width="90">
                    <FormItem label="请输入IDX：">
                        <Input v-model="batch_useridx" type="textarea" :autosize="{minRows: 7,maxRows: 7}" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="类型：">
                        <Select v-model="batch_type">
                            <Option v-for='item in batch_stype' :value='item.value' :key='item.value'>{{item.label}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="天数：">
                        <Select v-model="batch_ndays">
                            <Option v-for='item in sel_days' :value='item.value' :key='item.value'>{{item.label}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="原因：">
                        <Input v-model="batch_content" placeholder="请输入..."></Input>
                    </FormItem>
                    <p>批量添加请用英文的‘,’将idx隔开，例：22222,33333,44444</p>
                    <FormItem>
                        <Button type="primary" @click="batchblack">保存</Button>
                        <Button style="margin-left: 8px" @click="close()">取消</Button>
                    </FormItem>
                </Form>      
            </div>
            <!-- 分页页面 -->
            <div class="bottom">
                <Page :total="count" show-total show-elevator @on-change='fenye'/>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import {square} from '../../../assets/js/download'
import qs from	'qs'
export default {
  name: 'Index',
  data () {
    return {
        widthMain:{width:''},//table组件自适应
        tagData:null,//tag数据
        colorName:'',//对比的tag名字
        tagDataLength:true,//可取消的状态
        
        showNone: false, // 控制页面遮罩层开关
        showNoneblack: false, // 批量拉黑页面弹出控制
        stype: [ // 查询条件类型
            {
                value: 1,
                label: '热门'
            },
            {
                value: 2,
                label: '艺人'
            },
            {
                value: 3,
                label: '平台'
            },
            {
                value: 4,
                label: 'Show'
            }
        ],
        sel_days: [ // 拉黑时间
            {
                value: 7,
                label: '7天'
            },
            {
                value: 30,
                label: '一个月'
            },
            {
                value: 9999,
                label: '永久'
            }
        ],
        // 表格列名称
        columns: [
            {title: '用户编号',key: 'useridx'},
            {title: '昵称',key: 'myname'}, 
            {title: '类型',key: 'type'},
            {title: '是否红人',key: 'nlable'},
            {title: '是否签约',key: 'ntype'},
            {title: '拉黑天数',key: 'ndays'},
            {title: '原因',key: 'content'},
            {title: '时间',key: 'addtime'},
            {title: '操作人',key: 'operAdmin'},
            {title: '操作',slot: 'action',align: 'center'}
        ],
        tabledata: [ // 数据表数据
            {
                pay: 'Android', // 支付类型
                id: 'com.sunday.80', // 商品ID
                money: 1, // 金额
                volue: 7000, //  币值
                gift: 0, // 礼物赠送币
                address: 'New York No. 1 Lake Park' // 说明
            },
            {
                pay: 'taiwanAppStore',
                id: 'com.sunday.30',
                money: 1.99,
                volue: 15000,
                gift: 0,
                address: 'London No. 1 Lake Park'
            },
            {
                pay: 'iPhone',
                id: 'com.bunny.5',
                money: 3.99,
                volue: 30000,
                gift: 0,
                address: 'Sydney No. 1 Lake Park'
            },
            {
                pay: 'AppStore',
                id: 'com.bunny.6',
                money: 1,
                volue: 7000,
                gift: 0,
                address: 'Ottawa No. 2 Lake Park'
            }
        ],
        
        page: 1, // 当前页码
        pagesize: 10, // 每页条数

        useridx: null, // 用户idx
        type: null, // 绑定的类型
        ndays: 7, // 绑定的拉黑天数
        content: '', // 原因

        cx_useridx: null, // 查询功能的用户idx
        cx_type: null, // 查询功能的绑定类型
         
        count: 0, // 数据总数

        batch_useridx: null, // 批量 用户idx
        batch_type: null, // 批量 绑定的类型
        batch_ndays: 7, // 批量 绑定的拉黑天数
        batch_content: '', // 批量 原因
        batch_stype: [ // 批量 条件类型
            {
                value: 1,
                label: '热门'
            },
            {
                value: 2,
                label: '艺人'
            },
            {
                value: 3,
                label: '平台'
            }
        ],



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

        totlist: function() { // 总列表数据
            let token = localStorage.getItem('h_g_access_token');
            this.$axios({
                url: '/api/BPMService/User/GetHotBlackListAsync',
                method: 'get',
                //params 参数必写 , 如果没有参数传{}也可以
                headers:{
                    Authorization:'Bearer '+token,
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    // 'Content-Type': 'multipart/form-data'
                },
                params: {
                    page: this.page,
                    pagesize: this.pagesize,
                    idx: null,
                    stype: null
                }
            })
            .then((res)=>{
                // console.log(res)
                if(res.data.code == 1){
                    // this.$Message.success(res.data.msg);
                    this.tabledata = res.data.data.pager.live_HotRank_Blacks;
                    this.count = res.data.data.pager.count;
                }else if(res.data.code == 0){
                    this.$Message.warning(res.data.msg);
                    this.tabledata = res.data.data.pager.live_HotRank_Blacks;
                    this.count = res.data.data.pager.count;
                }else if(res.data.code == -1){
                    this.$Message.error(res.data.msg);
                    this.$router.push({path: '/login'});
                }
            })
            .catch((err)=>{
                console.log(err);
                if(err.response.status==401){
                    this.$Message.error('登录过期，请重新登录');
                    this.$router.push({path: '/login'});
                }
            })
        },
        remove: function(row) { // 删除
            let token = localStorage.getItem('h_g_access_token');
            this.$axios({
                url: '/api/BPMService/User/DelHotBlackAsync',
                method: 'post',
                //params 参数必写 , 如果没有参数传{}也可以
                headers:{
                    Authorization:'Bearer '+token,
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    // 'Content-Type': 'multipart/form-data'
                },
                data: {
                    useridx: Number(row.useridx)
                }
            })
            .then((res)=>{
                console.log(res)
                if(res.data.code == 1){
                    this.$Message.success(res.data.msg);
                    this.totlist();
                    // location.reload();
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
        black: function () { // 拉黑
            let token = localStorage.getItem('h_g_access_token');
            this.$axios({
                url: '/api/BPMService/User/AddHotBlackAsync',
                method: 'post',
                //params 参数必写 , 如果没有参数传{}也可以
                headers:{
                        Authorization:'Bearer '+token,
                },
                data: {
                    useridx: Number(this.useridx),
                    stype: Number(this.type),
                    ndays: this.ndays,
                    content: this.content
                }
            })
            .then((res)=>{
                console.log(res)
                if(res.data.code == 1){
                    this.$Message.success(res.data.msg);
                    this.totlist();
                }
            })
            .catch((err)=>{
                console.log(err)
                if(err.response.status==401){
                    this.$Message.error('登录过期，请重新登录');
                    this.$router.push({path: '/login'});
                }
            })
            this.useridx = null,
            this.stype = null
        },
        showbatchblack: function() { // 批量拉黑显示界面
            this.showNone = true,
            this.showNoneblack = true
        },
        batchblack: function() { // 批量拉黑
            let token = localStorage.getItem('h_g_access_token');
            let postData = qs.stringify({
                    idxs: this.batch_useridx,
                    stype:this.batch_type,
                    ndays:this.batch_ndays,
                    content:this.batch_content
            })

            this.$axios({
                url: '/api/BPMService/User/BatchAddHotBlackAsync',
                method: 'post',
                //params 参数必写 , 如果没有参数传{}也可以
                headers:{
                    Authorization:'Bearer '+token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    // 'Content-Type': 'multipart/form-data'
                },
                data: postData
            })
            .then((res)=>{
                // console.log(res)
                if(res.data.code == 1){
                    this.$Message.success(res.data.msg);
                    this.totlist();
                }
            })
            .catch((res)=>{
                console.log(err)
                if(err.response.status==401){
                    this.$Message.error('登录过期，请重新登录');
                    this.$router.push({path: '/login'});
                }
            })
            this.showNone = false;
            this.showNoneblack = false
        },

        lookup: function () { // 查找
            let token = localStorage.getItem('h_g_access_token');
            this.$axios({
                url: '/api/BPMService/User/GetHotBlackListAsync',
                method: 'get',
                //params 参数必写 , 如果没有参数传{}也可以
                headers:{
                    Authorization:'Bearer '+token,
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    // 'Content-Type': 'multipart/form-data'
                },
                params: {
                    page: this.page,
                    pagesize: this.pagesize,
                    idx: Number(this.cx_useridx),
                    stype: Number(this.cx_type)
                }
            })
            .then((res)=>{
                // console.log(res)
                if(res.data.code == 1){
                    // this.$Message.success(res.data.msg);
                    this.tabledata = res.data.data.pager.live_HotRank_Blacks;
                    this.count = res.data.data.pager.count;
                }else if(res.data.code == 0){
                    this.$Message.warning(res.data.msg);
                    this.tabledata = res.data.data.pager.live_HotRank_Blacks;
                    this.count = res.data.data.pager.count;
                }else if(res.data.code == -1){
                    this.$Message.error(res.data.msg);
                    this.$router.push({path: '/login'});
                    this.tabledata = res.data.data.pager.live_HotRank_Blacks;
                    this.count = res.data.data.pager.count;
                }
            })
            .catch((err)=>{
                console.log(err);
                if(err.response.status==401){
                    this.$Message.error('登录过期，请重新登录');
                    this.$router.push({path: '/login'});
                }
            })
        },
        close: function () { // 新建页面和修改页面取消修改
            this.showNone = false, // 遮罩层关闭
            this.showNoneblack = false // 批量拉黑页面关闭
        },
        fenye: function (page) { // 页面的分页功能
            // console.log(page)
            this.page = page;
            this.totlist();
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
}
</style>
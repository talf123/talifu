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
                <Input v-model="query" size="small" placeholder="IDX" style="width: 150px" />
                <Select v-model="type" clearable size="small" style="width: 150px; margin-left: 5px;">
                    <Option v-for="item in FamilyLevel" size="small" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Button type="primary" size="small" @click="lookup">查询</Button>
            </div>
          <!-- 主页面内容 -->
            <div class="center" >
                <Table border :columns="biao" :data="tabledata" class="table"  ref="table">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="text" size="small" @click="unseal(row)">解封</Button>
                    </template>
                </Table>
            </div>
          <!-- 遮罩层 -->
            <div class="marsk" v-if="showNone"></div>
          <!-- 解封页面 -->
            <div class="pop" v-if="showNoneUpdate">
                <p style="font-size:30px; margin-bottom: 30px;">是否解封?</p>
                <Button type="primary" @click="unseal_confirm()">确定</Button>
                <Button type="error" style="margin-left: 60px;" @click="close()">取消</Button>
            </div>
          <!-- 分页页面 -->
            <div class="bottom" v-if="mike">
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


        idx: null,
        Idx: null,
        query: null, // 查询功能 idx
        type: 0, // 查询功能 解封的类型 
        type1: 0, // 解封的时候传递的数据 解封和查询type值不同
        page: 1,
        pagesize: 10,
        count: 0,

        showNone: false, // 控制页面遮罩层开关
        showNoneUpdate: false, // 解封页面弹出控制
        mike: true, // 控制分页显示

        FamilyLevel: [
            {
                label: '解封设备',
                value: 1
            },
            {
                label: '解麦',
                value: 2
            },
            {
                label: '解封号码',
                value: 3
            }
        ],

        columns1: [ // 解封设备
            {title: '用户ID',key: 'useridx'}, 
            {title: '添加时间',key: 'addTime'},
            {title: '设备ID',key: 'deviceID'},
            {title: '设备类型',key: 'deviceName'},
            {title: '操作',slot: 'action',align: 'center'}
        ],
        columns2: [ // 解号
            {title: '编号',key: 'id'}, 
            {title: '用户idx',key: 'useridx'},
            {title: '昵称',key: 'nickName'},
            {title: '性别	',key: 'gender'},
            {title: '最后时间',key: 'addTime'},
            {title: '操作人',key: 'adminUser'},
            {title: '备注',key: 'content'},
            {title: '操作',slot: 'action',align: 'center'}
        ],
        columns3: [ // 解麦
            {title: '用户ID',key: 'userIdx'}, 
            {title: '到期时间',key: 'limitTime'},
            {title: '添加时间',key: 'createTime'},
            {title: '操作人',key: 'adminUser'},
            {title: '备注',key: 'content'},
            {title: '操作',slot: 'action',align: 'center'}
            
        ],
        biao: [], // 用于在lookup()中动态接收表头 columns的信息。
        tabledata: [ // 数据表数据
            {
                userIdx: 1231221991099, // 支付类型
                useridx: 123123111, // 商品ID
                money: 1, // 金额
                adminUser: 7000, //  币值
                content: 0, // 礼物赠送币
                deviceID: 'New York No. 1 Lake Park' // 说明
            }
        ],
        resets: { // 暂存页面内容数据 用于重置输入框时候使用
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

        totlist:function() {
            let token = localStorage.getItem('h_g_access_token');
            this.$axios({
                url: '/api/BPMService/User/GetUserBalckListAsync',
                method: 'get',
                //params 参数必写 , 如果没有参数传{}也可以
                headers:{
                    Authorization:'Bearer '+token
                },
                params:{
                    page: this.page,
                    pagesize: this.pagesize,
                    idx: 0,
                    type: 0
                }
            })
            .then((res)=>{
                console.log(res)
                if(res.data.code == 1){
                    // this.$Message.success('成功');
                    this.count = res.data.data.pager.count;
                }else if(res.data.code == 0){
                    this.$Message.warning('无数据');
                    this.count = res.data.data.pager.count;
                }else if(res.data.code == -1){
                    this.$Message.error('异常');
                    this.count = res.data.data.pager.count;
                    this.$router.push({path: '/'});
                }else{
                    console.log(res.data.code);
                }

                if(this.type == 1){
                    this.tabledata = res.data.data.pager.black_Users;
                }else if(this.type == 2){
                    this.tabledata = res.data.data.pager.room_Kickings;
                }else if(this.type == 3){
                    this.tabledata = res.data.data.pager.userBlacklists;
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
        unseal: function(row) { // 解封页面
            this.idx = null,
            this.Idx = null,
            this.showNone = true,
            this.showNoneUpdate = true,
            this.idx = row.useridx,
            this.Idx = row.userIdx 
        },
        unseal_confirm: function() { // 解封确认
            let IDX = null
            if(this.idx != null){
                IDX = this.idx
            }else{
                IDX = this.Idx
            }

            if(this.type == 1){ // 查询 设备：1 => 解封 设备：2
                this.type1 = 2;
            }else if(this.type == 2){ // 查询 麦：2 => 解封 麦：3
                this.type1 = 3;
            }else if (this.type == 3){ // 查询 账号：3 => 解封 账号：1
                this.type1 = 1;
            }

            let token = localStorage.getItem('h_g_access_token');
            this.$axios({
                url: '/api/BPMService/User/UNBlockUserAsync',
                method: 'post',
                //params 参数必写 , 如果没有参数传{}也可以
                headers:{
                    Authorization:'Bearer '+token
                },
                data:{
                    idx: Number(IDX),
                    type: this.type1
                }
            })
            .then((res)=>{
                console.log(res)
                if(res.data.code == 1){

                    this.totlist();
                }
                
            })
            .catch((err)=>{
                console.log(err)
                if(err.response.status==401){
                    this.$Message.error('登录过期，请重新登录');
                    this.$router.push({path: '/login'})
                }
            })
            this.showNone = false;
            this.showNoneUpdate = false;
            this.idx = null,
            this.Idx = null
        },
        close: function () { // 新建页面和修改页面取消修改
            this.showNone = false, // 遮罩层关闭
            this.showNoneUpdate = false, // 修改页面关闭

            this.resets.pay = null, // 页面重置功能 使用的缓存数据清空
            this.resets.id = null
        },
        lookup: function () { // 查找
            this.page = 1;
            if (this.type == 1)
            {
                this.biao = this.columns1
            }
            else if (this.type == 2)
            {
                this.biao = this.columns2
            }
            else if (this.type == 3)
            {
                this.biao = this.columns3
            }
            else 
            {
                console.log(this.type)
            }

            if(this.type == 2){
                this.mike = false;
            }else{
                this.mike = true;
            }

            let token = localStorage.getItem('h_g_access_token');
            this.$axios({
                url: '/api/BPMService/User/GetUserBalckListAsync',
                method: 'get',
                //params 参数必写 , 如果没有参数传{}也可以
                headers:{
                    Authorization:'Bearer '+token
                },
                params:{
                    page: Number(this.page),
                    pagesize: Number(this.pagesize),
                    idx: Number(this.query),
                    type: this.type
                }
            })
            .then((res)=>{
                console.log(res)
                if(res.data.code == -1){
                    this.$Message.error('异常')
                }else if(res.data.code == 0){
                    this.$Message.warning('无数据')
                }else if(res.data.code == 1){
                    this.$Message.success('成功')
                }else{
                    console.log(res.data.code)
                }

                if(this.type == 1){
                    this.tabledata = res.data.data.pager.black_Users;
                }else if(this.type == 2){
                    this.tabledata = res.data.data.pager.room_Kickings;
                }else if(this.type == 3){
                    this.tabledata = res.data.data.pager.userBlacklists;
                }else{
                    console.log(this.type)
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
            this.page = page;
            this.totlist();
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
        padding:2% 4%;
        position: fixed;
        top: 25%;
        left: 32%; 
        width: 35%;
        height: 30%;
        background: #fff;
        z-index: 3001;
    }
}
</style>
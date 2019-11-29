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
            <!-- 查询 -->
            <div class="top">
                <Select v-model="ntype" size="small" style="width: 150px;" placeholder="请选择">
                    <Option v-for="item in SeachType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Input v-model="idx" size="small" placeholder="请输入..." style="width: 180px; margin-left: 15px;" />
                <Button type="primary" size="small" @click="lookup()">查询</Button>
            </div>
            <!-- 主页面内容 -->
            <div class="center" >
                <Table border :columns="columns" :data="tabledata" class="table"  ref="table">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="text" size="small" @click="remove(row)">解除禁言</Button>
                    </template>
                </Table>
            </div>
            <!-- 遮罩层 -->
            <div class="marsk" v-if="showNone"></div>
            <!-- 接触禁言层 -->
            <div class="pop" v-if="showNoneremove">
                <p style="font-size:25px; margin-bottom:35px;">确定解除禁言?</p>
                <Button type="primary" @click="confirm()">确定</Button>
                <Button type="primary" style="margin-left: 35px;" @click="close()">取消</Button>
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
        showNoneremove: false, // 修改页面弹出控制
        showNonecreate: false, // 新增页面弹出控制
        SeachType: [ // 查询条件
            {
                value: '1',
                label: '用户IDX'
            },
            {
                value: '2',
                label: '房间ID'
            }
        ],
        // 表格列名称
        columns: [
            {title: '房间ID',key: 'roomid'},
            {title: '用户IDX',key: 'useridx'}, 
            {title: '昵称',key: 'myname'},
            {title: '禁言开始时间',key: 'btime'},
            {title: '禁言结束时间',key: 'etime'},
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
        ntype: null, 
        
        page: 1, // 当前页码
        pagesize: 10, // 每页条数

        useridx: 0, //  用户idx
        roomid: 0, // 房间ID 0全部
        idx: null,
        count: 0, // 总数
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
            let token = localStorage.getItem('h_g_access_token');
            this.$axios({
                url: '/api/BPMService/User/GetBlockChatListAsync',
                method: 'get',
                //params 参数必写 , 如果没有参数传{}也可以
                headers:{
                    Authorization:'Bearer '+token
                },
                params: {
                    page: 1,
                    pagesize: 10,
                    roomid: 0
                }
            })
            .then((res)=>{
                console.log(res)
                if(res.data.code==1){
                    this.$Message.success('成功');
                    this.tabledata = res.data.data.pager.blocK_CHAT_LOGs;
                    this.count = res.data.data.pager.count;
                }else if(res.data.code==0){
                    this.$Message.warning('无数据');
                    this.tabledata = res.data.data.pager.blocK_CHAT_LOGs;
                    this.count = res.data.data.pager.count;
                }else if(res.data.code==-1){
                    this.$Message.error('异常');
                    this.$router.push({path: '/login'});
                }else{
                    console.log(res.data.code)
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

        remove: function(row) { // 删除
            this.showNone = true;
            this.showNoneremove = true;
            this.useridx = row.useridx;
            this.roomid = row.roomid
        },

        close: function () { // 新建页面和修改页面取消修改
          this.showNone = false, // 遮罩层关闭
          this.showNoneremove = false, // 删除页面关闭
          this.showNonecreate = false // 新建页面关闭
          this.useridx = 0,
          this.roomid = 0
        },
        confirm: function () { // 删除页面的确认按钮
            this.showNone = false, // 遮罩层关闭
            this.showNoneremove = false // 删除页面关闭

            let token = localStorage.getItem('h_g_access_token');
            let postData = qs.stringify({
                    idx: Number(this.useridx),
                    // page: this.page,
                    roomid: this.roomid
            })

            this.$axios({
                url: '/api/BPMService/User/UnlockBlockChatAsync',
                method: 'post',
                //params 参数必写 , 如果没有参数传{}也可以
                headers:{
                    Authorization:'Bearer '+token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: postData
            })
            .then((res)=>{
                console.log(this.useridx)
                if(res.data.code==1){
                    this.$Message.success('成功');
                }
            })
            .catch((err)=>{
                console.log(err)
                if(err.response.status==401){
                    this.$Message.error('登录过期，请重新登录');
                    this.$router.push({path: '/login'});
                }
            })
            this.useridx = 0,
            this.roomid = 0
        },

        lookup: function () { // 查找
            let token = localStorage.getItem('h_g_access_token');
                this.$axios({
                    url: '/api/BPMService/User/GetBlockChatListAsync',
                    method: 'get',
                    //params 参数必写 , 如果没有参数传{}也可以
                    headers:{
                        Authorization:'Bearer '+token
                    },
                    params: {
                        page: this.page,
                        pagesize: this.pagesize,
                        roomid: this.roomid
                    }
                })
                .then((res)=>{
                    console.log(res)
                    if(res.data.code==1){
                        this.$Message.success('成功');
                        this.tabledata = res.data.data.pager.blocK_CHAT_LOGs;
                        this.count = res.data.data.pager.count;
                    }else if(res.data.code==0){
                        this.$Message.warning('无数据');
                        this.tabledata = res.data.data.pager.blocK_CHAT_LOGs;
                        this.count = res.data.data.pager.count;
                    }else if(res.data.code==-1){
                        this.$Message.error('异常');
                        this.$router.push({path: '/login'});
                    }else{
                        console.log(res.data.code)
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
              margin-right: 15px;
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
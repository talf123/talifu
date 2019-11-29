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
                <Button type="primary" size="small" @click="lookup()">开始审核</Button>
                <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-top:2px; margin-left: 10px;">
                <Checkbox
                    :indeterminate="indeterminate"
                    :value="checkAll"
                    @click.prevent.native="handleCheckAll">全选</Checkbox>
                </div>
                <Button type="primary" size="small" @click="batchpass()">批量通过</Button>
                <Button type="primary" size="small" @click="batchblack()">批量拉黑</Button>
                <Button type="primary" size="small" @click="batchdriveout()">批量踢出</Button>
            </div>
            <!-- 主页面内容 -->
            <div class="center">
                <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
                    <Row style="background:#eee;padding:20px">
                        <Col span="5" style="margin-right:40px; margin-top: 20px;" v-for="item in examine" :key="item.useridx" :label="item.useridx">
                            <Card :bordered="false">
                                <span style="display:block;"><img :src="item.photo"></img></span>
                                <p>{{item.nickname}}</p>
                                <Checkbox :label="item.useridx"></Checkbox>
                                <p><span style="background-color:#00CC95; margin-right: 10px; border-radius:10px; padding-top: 3px; padding-bottom: 2px; padding-left: 3px; padding-right: 5px;"><img src="../../../assets/img/zuanshi.png" style="width:20px;height:18px; margin-right: 5px;"></img>{{item.grade}}</span>({{item.useridx}})</p>
                                <p>{{item.stardate}}</p>
                                <Button type="primary" size="small" @click="passing(item.useridx)">通过</Button>
                                <Button type="primary" size="small" @click="blacklist(item.useridx)">拉黑</Button>
                                <Button type="primary" size="small" @click="driveout(item.useridx)">踢出</Button>
                                <!-- <Button type="primary" size="small" @click="locking(item.useridx)">锁头像</Button> -->
                            </Card>
                        </Col>
                    </Row>
                </CheckboxGroup>
            </div>
            <!-- 遮罩层 -->
            <div class="marsk" v-if="showNone"></div>
            <!-- 通过层 -->
            <div class="pop2" v-if="showpassing">
                <h1>是否确认视频审核通过？</h1>
                <span style="display:block; margin-top: 30px;">
                    <Button type="primary" @click="passingadd()">确认</Button>
                    <Button style="margin-left: 35px;" @click="close()">取消</Button>
                </span>
            </div>
            <!-- 踢出房间 -->
            <div class="pop1" v-if="showdriveout">
                <h1>直播审核</h1>
                <div v-if="showid" style="font-size:15px; margin-top:25px;"><label>用户ID：</label><span style="word-wrap:break-word;">{{allgroup}}</span></div>
                <div v-else style="font-size:15px; margin-top:25px;"><label>用户ID：</label><span style="word-wrap:break-word;">{{useridx}}</span></div>
                <span style="display:block;font-size:15px; margin-top:25px;">
                    <label>时间：</label>
                    <Select v-model="time" clearable style="width:150px" size="small">
                        <Option v-for="item in times1" :value="item.value" :key="item.value" :label="item.label"></Option>
                    </Select>
                </span>
                <span style="display:block;font-size:15px; margin-top:25px;">
                    <label>备注：</label>
                    <Select v-model="rem" clearable style="width:150px" size="small">
                        <Option v-for="item in remarks" :value="item.value" :key="item.value" :label="item.label"></Option>
                    </Select>
                </span>
                <span style="display:block; margin-top: 30px;">
                    <Button type="primary" @click="batchdriveoutadd()">踢出房间</Button>
                    <Button style="margin-left: 25px;" @click="close()">关闭</Button>
                </span>
            </div>
            <!-- 拉入黑名单层 -->
            <div class="pop1" v-if="showblacklist">
                <h1>直播审核</h1>
                <div v-if="showid" style="font-size:15px; margin-top:25px;"><label>用户ID：</label><span style="word-wrap:break-word;">{{allgroup}}</span></div>
                <div v-else style="font-size:15px; margin-top:25px;"><label>用户ID：</label><span style="word-wrap:break-word;">{{useridx}}</span></div>
                <!-- <div style="font-size:15px; margin-top:25px;">
                    <label>时间：</label>
                    <Select v-model="time" clearable style="width:150px" size="small">
                        <Option v-for="item in times" :value="item.value" :key="item.value" :label="item.label"></Option>
                    </Select>
                </div> -->
                <div style="font-size:15px; margin-top:25px;">
                    <label>备注：</label>
                    <Select v-model="rem" clearable style="width:150px" size="small">
                        <Option v-for="item in remarks" :value="item.value" :key="item.value" :label="item.label"></Option>
                    </Select>
                </div>
                <div style="margin-top: 30px;">
                    <Button type="primary" @click="batchblackadd()">加入黑名单</Button>
                    <Button style="margin-left: 25px;" @click="close()">关闭</Button>
                </div>
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

        showid: false, // 控制 显示批量还是单个ID的显示
        showNone: false, // 控制页面遮罩层开关
        showblacklist: false, // 黑名单
        showdriveout: false, // 踢出视频墙
        showlocking: false, // 锁头像
        showpassing: false, // 警告页面
        
        indeterminate: false, // 全选按钮状态 -- 未全选
        checkAll: false, // 全选按钮状态 --全选
        checkAllGroup: [], // 多选功能数组

        examine: [], // 数据表数据
        

        useridx: null, // 用户IDX
        roomid: null, // 房间ID
        count: 0, // 总条数
        page: 1, // 当前页码
        pagesize: 10, // 每页条数
        msg: 'msg',
        allgroup: '', // 批量 通过 拉黑 踢出 使用的字符串
        time: '', // 时间
        rem: '', // 备注
        times: [ // 拉入黑名单 时间查询条件
                {
                    value: '1',
                    label: '1小时'
                },
                {
                    value: '2',
                    label: '2小时'
                },
                {
                    value: '12',
                    label: '12小时'
                },
                {
                    value: '24',
                    label: '1天'
                },
                {
                    value: '48',
                    label: '2天'
                },
                {
                    value: '720',
                    label: '1月'
                },
                {
                    value: '1440',
                    label: '2月'
                },
                {
                    value: '8760',
                    label: '1年'
                },
                {
                    value: '876000',
                    label: '永久'
                },
        ],
        times1: [ // 时间查询条件
                {
                    value: '90',
                    label: '1.5小时'
                },
                {
                    value: '120',
                    label: '2小时'
                },
                {
                    value: '150',
                    label: '2.5小时'
                },
                {
                    value: '180',
                    label: '3小时'
                }
        ],
        remarks: [ // 拉黑页面 备注
                {
                    value: '0',
                    label: '其他'
                },
                {
                    value: '1',
                    label: '广告'
                },
                {
                    value: '2',
                    label: '违规'
                },
                {
                    value: '3',
                    label: '露点'
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


    lookup: function () { // 查找
        this.totlist();
    },

    totlist: function() { // 总列表
        let token = localStorage.getItem('h_g_access_token');
        this.$axios({
            url: '/api/BPMService/User/GetVideoWallListAsync',
            method: 'get',
            //params 参数必写 , 如果没有参数传{}也可以
            headers:{
                Authorization:'Bearer '+token
            },
            params:{
                page: this.page,
                pagesize: this.pagesize
            }
        })
        .then((res)=>{
            console.log(res)
            if(res.data.code == 1){
                this.$Message.success('成功!');
                // this.count = res.data.data.pager.count;
                
                // var a = res.data.data.pager.roomOnLineUsers;
                let that = this;
                for(let i = 0; i<= this.examine.length; i++)
                {
                    that.examine[i].stardate = that.examine[i].stardate.replace(/T/g,' ').replace(/Z/g,'')
                }       
                this.count = res.data.data.pager.count;
                this.examine = res.data.data.pager.roomOnLineUsers;
            }else if(res.data.code == 0){
                this.$Message.warning('无数据');
                this.count = res.data.data.pager.count;
                this.examine = res.data.data.pager.roomOnLineUsers;
            }else if(res.data.code == -1){
                this.$Message.error('异常');
                this.$router.push({path: '/login'});
                this.count = res.data.data.pager.count;
                this.examine = res.data.data.pager.roomOnLineUsers;
            }else{
                console.log(res.data.code);
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

    // 通过功能
    passing: function(useridx) { // 通过
            this.showNone = true,
            this.showpassing = true,
            this.useridx = useridx
    },
    passingadd: function() { // 通过
        let token = localStorage.getItem('h_g_access_token');
        // let postData = qs.stringify({
        //     idx: this.useridx,
        //     msg: this.msg
        // })
        this.showNone = false,
        this.showpassing = false,

        this.$axios({
            url: '/api/BPMService/User/VideoPassAsync',
            method: 'post',
            //params 参数必写 , 如果没有参数传{}也可以
            headers: {
                    Authorization:'Bearer '+token,
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    // 'Content-Type': 'multipart/form-data'
            },
            data: {
                idx: Number(this.useridx)
            }
        })
        .then((res)=>{
            console.log(res)
            if(res.data.code == 1){
                this.$Message.success('成功!');
                this.totlist();
            }else{
                this.$Message.error('异常');
            }
        })
        .catch((err)=>{
            console.log(err)
            if(err.response.status==401){
                    this.$Message.error('登录过期，请重新登录');
                    this.$router.push({path: '/login'});
            }
        })
        this.useridx = null
    },
    batchpass: function () { // 批量通过
        let token = localStorage.getItem('h_g_access_token');
        this.allgroup = this.checkAllGroup.join(",")
        let postData = qs.stringify({
            idxs: this.allgroup,
        })
        this.$axios({
            url: '/api/BPMService/User/BatchVideoPassAsync',
            method: 'post',
            //params 参数必写 , 如果没有参数传{}也可以
            headers: {
                    Authorization:'Bearer '+token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    // 'Content-Type': 'multipart/form-data'
            },
            data: postData
        })
        .then((res)=>{
            // console.log(res)
            if(res.data.code == 1){
                this.$Message.success('成功!');
                this.totlist();
            }else{
                this.$Message.error('异常');
            }
        })
        .catch((err)=>{
            console.log(err)
            if(err.response.status==401){
                    this.$Message.error('登录过期，请重新登录');
                    this.$router.push({path: '/login'});
            }
        })
        this.checkAllGroup = [],
        this.allgroup = ''
    },

    // 踢出功能
    driveout: function(useridx) { // 踢出
        this.showNone = true,
        this.showdriveout = true
        this.useridx = useridx,
        this.showid = false
    },
    driveoutadd: function() { // 踢出
        let token = localStorage.getItem('h_g_access_token');
        // let postData = qs.stringify({
        //     idx: Number(this.useridx),
        //         content: this.rem,
        //         time: this.time
        // })
        this.$axios({
            url: '/api/BPMService/User/UserOnLineSginOutAsync',
            method: 'post',
            //params 参数必写 , 如果没有参数传{}也可以
            headers: {
                    Authorization:'Bearer '+token,
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    // 'Content-Type': 'multipart/form-data'
            },
            data: {
                idx: Number(this.useridx),
                content: this.rem,
                time: this.time
            }
        })
        .then((res)=>{
            console.log(res)
            if(res.data.code == 1){
                this.$Message.success('成功!');
                this.totlist();
            }else{
                this.$Message.error('异常');
            }
        })
        .catch((err)=>{
            console.log(err)
            if(err.response.status==401){
                    this.$Message.error('登录过期，请重新登录');
                    this.$router.push({path: '/login'});
            }
        })
        this.useridx = null
    },
    batchdriveout: function() { // 批量踢出界面
        this.showid = true,
        this.showNone = true,
        this.showdriveout = true
    },
    batchdriveoutadd: function() { // 批量踢出确认
        let token = localStorage.getItem('h_g_access_token');
        this.allgroup = this.checkAllGroup.join(",")
        let postData = qs.stringify({
            idxs: this.allgroup,
            time: Number(this.time),
            content: this.rem
        })
        this.$axios({
            url: '/api/BPMService/User/BatchUserOnLineSginOutAsync',
            method: 'post',
            //params 参数必写 , 如果没有参数传{}也可以
            headers: {
                    Authorization:'Bearer '+token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    // 'Content-Type': 'multipart/form-data'
            },
            data: postData
        })
        .then((res)=>{
            // console.log(res)
            if(res.data.code == 1){
                this.$Message.success('成功!');
                this.totlist();
                this.showid = false,
                this.showNone = false,
                this.showdriveout = false
            }else{
                this.$Message.error('异常');
            }
        })
        .catch((err)=>{
            console.log(err)
            if(err.response.status==401){
                    this.$Message.error('登录过期，请重新登录');
                    this.$router.push({path: '/login'});
            }
        })
        // this.useridx = null
        this.checkAllGroup = [],
        this.allgroup = ''
    },


    // 黑名单
    blacklist: function(useridx) { // 黑名单
        this.showNone = true,
        this.showblacklist = true,
        this.useridx = useridx,
        this.showid = false
    },
    blacklistadd: function() { // 加入黑名单
        let token = localStorage.getItem('h_g_access_token');

        // let postData = qs.stringify({
        //     idx: Number(this.useridx),
        //         content: this.rem
        // })

        this.$axios({
            url: '/api/BPMService/User/UserOnLineAddBlackAsync',
            method: 'post',
            //params 参数必写 , 如果没有参数传{}也可以
            headers: {
                    Authorization:'Bearer '+token,
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    // 'Content-Type': 'multipart/form-data'
            },
            data: {
                idx: Number(this.useridx),
                content: this.rem
            }
        })
        .then((res)=>{
            console.log(res);
            if(res.data.code == 1){
                this.$Message.success('成功!');
                this.totlist();
            }else{
                this.$Message.error('异常');
            }
        })
        .catch((err)=>{
            console.log(err)
            if(err.response.status==401){
                    this.$Message.error('登录过期，请重新登录');
                    this.$router.push({path: '/login'});
            }
        })

        this.useridx = null
    },
    batchblack: function() { // 批量拉黑界面
        this.showid = true,
        this.showNone = true,
        this.showblacklist = true
    },
    batchblackadd: function() { // 批量拉黑确认
        let token = localStorage.getItem('h_g_access_token');
        this.allgroup = this.checkAllGroup.join(",")
        let postData = qs.stringify({
            idxs: this.allgroup,
            content: this.rem
        })
        this.$axios({
            url: '/api/BPMService/User/BatchUserOnLineBlackAsync',
            method: 'post',
            //params 参数必写 , 如果没有参数传{}也可以
            headers: {
                    Authorization:'Bearer '+token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    // 'Content-Type': 'multipart/form-data'
            },
            data: postData
        })
        .then((res)=>{
            // console.log(res)
            if(res.data.code == 1){
                this.$Message.success('成功!');
                this.totlist();
                this.showid = false,
                this.showNone = false,
                this.showblacklist = false
            }else{
                this.$Message.error('异常');
            }
        })
        .catch((err)=>{
            console.log(err)
            if(err.response.status==401){
                    this.$Message.error('登录过期，请重新登录');
                    this.$router.push({path: '/login'});
            }
        })
        this.checkAllGroup = [],
        this.allgroup = ''
    },

    close: function () { // 新建页面和修改页面取消修改
            this.showNone = false, // 遮罩层关闭
            this.showblacklist = false,
            this.showdriveout = false,
            this.showlocking = false,
            this.showpassing = false,
            this.time = '',
            this.rem = ''
            this.useridx = null
    },

    handleCheckAll () { // 全选功能
            if (this.indeterminate) {
                this.checkAll = false;
            } else {
                this.checkAll = !this.checkAll;
            }
            this.indeterminate = false;

            if (this.checkAll) {
                // this.checkAllGroup = ['1', '2', '3','4','5'];
                let that = this;
                this.examine.forEach(function(v){that.checkAllGroup.push(v.useridx);});  // 利用forEach 循环出数组对象中的部分内容，组成新的数组
            } else {
                this.checkAllGroup = [];
            }
    },

    checkAllGroupChange (data) { // 选择功能
            if (data.length === this.examine.length) {
                this.indeterminate = false;
                this.checkAll = true;
            } else if (data.length > 0) {
                this.indeterminate = true;
                this.checkAll = false;
            } else {
                this.indeterminate = false;
                this.checkAll = false;
            }
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
    .top{margin-top:10px; margin-left: 20px; display: flex; padding: 5px; height: 35px;  // 表头部分 查找添加 样式
          button{
              margin-left: 15px;
          }
          label{
              margin-left: 10px;
            // margin-right: 10px;
              font-size: 15px;
          }
    }
    .center{width:100%; margin-top:20px;
        button {
            margin-right: 5px
        }
    }  // 页面中部 表格部分样式
    .bottom{width:100%; margin-top:15px;} // 页面底部 分页部分样式

    .pop1{
        padding:3% 4%;
        position: fixed;
        top: 12%;
        left: 30%; 
        width: 40%;
        height: 55%;
        background: #fff;
        z-index: 3001;
        overflow-y: scroll; // 让弹出的页面可以有滚动条
    }

    .pop2{
        padding:3% 4%;
        position: fixed;
        top: 18%;
        left: 35%; 
        width: 30%;
        height: 28%;
        background: #fff;
        z-index: 3001;
        overflow-y: scroll; // 让弹出的页面可以有滚动条
    }
        // 去除页面滚动条
    /*webkit内核*/
    .silderBar::-webkit-scrollbar {
        width:0px;
        height:0px;
    }
    .pop1::-webkit-scrollbar {
        width:0px;
        height:0px;
    }
    .pop2::-webkit-scrollbar {
        width:0px;
        height:0px;
    }
    /*o内核*/
    .silderBar .-o-scrollbar{
        -moz-appearance: none !important;   
        background: rgba(0,255,0,0) !important; 
    }
    .pop1 .pop2 .-o-scrollbar{
        -moz-appearance: none !important;   
        background: rgba(0,255,0,0) !important; 
    }
    /*IE10,IE11,IE12*/
    .silderBar,.pop1{
        -ms-scroll-chaining: chained;
        -ms-overflow-style: none;
        -ms-content-zooming: zoom;
        -ms-scroll-rails: none;
        -ms-content-zoom-limit-min: 100%;
        -ms-content-zoom-limit-max: 500%;
        -ms-scroll-snap-type: proximity;
        -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
        -ms-overflow-style: none;
        overflow: auto;
    }
    .silderBar,.pop2{
        -ms-scroll-chaining: chained;
        -ms-overflow-style: none;
        -ms-content-zooming: zoom;
        -ms-scroll-rails: none;
        -ms-content-zoom-limit-min: 100%;
        -ms-content-zoom-limit-max: 500%;
        -ms-scroll-snap-type: proximity;
        -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
        -ms-overflow-style: none;
        overflow: auto;
    }
}
</style>
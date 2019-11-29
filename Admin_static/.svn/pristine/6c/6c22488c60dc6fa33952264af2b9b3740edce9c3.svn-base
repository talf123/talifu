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
                <label>日期选择：</label>
                <DatePicker type="daterange" size="small" v-model='sedate' split-panels placeholder="时间范围" style="width: 180px"></DatePicker>
                <Select v-model="tycoon" size="small" clearable style="width:150px; margin-left: 5px;">
                    <Option v-for="item in level" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <label>用户IDX：</label>
                    <Input v-model="query" size="small" placeholder="IDX" style="width: 150px" />
                    <Select v-model="usecash" size="small" clearable style="width:150px; margin-left: 5px;">
                        <Option v-for="item in consumption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                <Button size="small" type="primary" @click="lookup">查询</Button>
            </div>
            <!-- 主页面内容 -->
            <div class="center" >
                <div style="display:flex; margin-left: 30px; margin-bottom: 15px; font-size: 15px;">
                    <label>蓝冠：</label><span style="color:red; margin-right:15px;">{{category.arg_Result1}}</span>
                    <label>紫冠：</label><span style="color:red; margin-right:15px;">{{category.arg_Result2}}</span>
                    <label>超冠：</label><span style="color:red; margin-right:15px;">{{category.arg_Result3}}</span>
                    <label>钻石：</label><span style="color:red; margin-right:15px;">{{category.arg_Result4}}</span>
                    <label>王者：</label><span style="color:red; margin-right:15px;">{{category.arg_Result5}}</span>
                    <label>至尊：</label><span style="color:red; margin-right:15px;">{{category.arg_Result6}}</span>
                    <!-- <span v-for="item in category" :value="item.value" :key="item.value"><label>{{item.label}} : </label><span style="color:red; margin-right: 10px;">{{item.num}}</span></span> -->
                </div>
                <span style="display:flex">
                    <Button @click="handleSelectAll(true)">全选</Button>
                    <Button @click="handleSelectAll(false)">全不选</Button>
                    <Button>批量升级至</Button>
                    <Select v-model="sj_tycoon" style="width:150px">
                        <Option v-for="item in level" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </span>
                <Table border :columns="columns" :data="tabledata" class="table"  ref="table" @on-select="all(row)">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="text" size="small" @click="update(row)">修改</Button>
                        <Button type="text" size="small" @click="remove(row)">降级</Button>
                    </template>
                </Table>
            </div>
            <!-- 遮罩层 -->
            <div class="marsk" v-if="showNone"></div>
            <!-- 新增页面 -->
            <div class="pop" v-if="showNonecreate">
                <Form :label-width="80">
                    <FormItem label="支付类型：">
                        <Select v-model="pay" style="width:150px">
                             <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="商品ID：">
                        <Input v-model="id" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="金额：">
                        <Input v-model="money" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="币值：">
                        <Input v-model="volue" placeholder="请输入..." ></Input>
                    </FormItem>
                    <FormItem label="赠送币：">
                        <Input v-model="gift" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="说明：">
                        <Input v-model="address" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="请输入..."></Input>
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
                <Form :label-width="80">
                    <FormItem label="用户IDX：">
                        <Input v-model="idx" disabled placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="缘由：">
                        <Input v-model="content" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="updateadd">保存</Button>
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

        query: null, // 会员等级条件
        idx: null, // 查询功能 idx
        sedate: [], // 查询功能时间
        usecash: 0, // 消费
        tycoon: 0, // 皇冠类型
        sj_tycoon: 0, // 批量升级皇冠类型
        page: 1, // 当前页码
        pagesize: 10, // 每页条数
        count: 0, // 总数

        content: '', // 编辑皇冠信息 缘由

        showNone: false, // 控制页面遮罩层开关
        showNoneUpdate: false, // 修改页面弹出控制
        showNonecreate: false, // 新增页面弹出控制

        aaa: null,

        level: [ // 查询中的会员等级条件
            {
                value: 1,
                label: '蓝冠'
            },
            {
                value: 2,
                label: '紫冠'
            },
            {
                value: 3,
                label: '超冠'
            },
            {
                value: 4,
                label: '钻石皇冠'
            },
            {
                value: 5,
                label: '王者皇冠'
            },
            {
                value: 6,
                label: '至尊皇冠'
            }
        ],
        consumption: [ // 查询中的消费等级
            {
                value: 1,
                label: '消费5000'
            },
            {
                value: 2,
                label: '消费50000'
            }
        ], 
        
        // 表格列名称
        columns: [
            {type: 'selection',width: 60,align: 'center'},
            {title: 'idx',key: 'useridx'},
            {title: '用户名字',key: 'userid'}, 
            {title: '昵称',key: 'myname'},
            {title: '类型',key: 'level'},
            {title: '升级日期',key: 'ndate'},
            {title: '缘由',key: 'content'},
            {title: '累计总金额	',key: 'summoney2'},
            {title: '操作',slot: 'action',align: 'center',width: 180}
        ],
        tabledata: [], // 数据表数据
        tabledata1: null, // 数据表数据
        category:{
            arg_Result1: null,
            arg_Result2: null,
            arg_Result3: null,
            arg_Result4: null,
            arg_Result5: null,
            arg_Result6: null,
        },

        resets: { // 暂存页面内容数据
            content: ''
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
    all: function(row) {
      // console.log(row) 
    },
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
        // let time1 = new Date();
        // let time2 = new Date();
        // time2.setDate(time1.getDate() - 10);
        // this.sedate[0] = time2.getFullYear() + '-' + (time2.getMonth() + 1) + '-' + time2.getDate();
        // this.sedate[1] = time1.getFullYear() + '-' + (time1.getMonth() + 1) + '-' + time1.getDate();
        // console.log(this.sedate[0])
        // console.log(this.sedate[1])
        // console.log(this.sedate)

        let token =localStorage.getItem('h_g_access_token');
        this.$axios({  //?page='+this.page+'&pagesize='+this.pagesize+'&sdate='+''+'&edate='+''+'&idx='+this.idx+'&usecash='+this.usecash+'&tycoon='+this.tycoon
            url: '/api/BPMService/User/GetVipTycoonListAsync',
            method: 'get',
            //params 参数必写 , 如果没有参数传{}也可以
            headers:{
                    Authorization:'Bearer '+token
            },
            params:{
                page: this.page,
                pagesize: this.pagesize,
                // sdate: '',
                idx: 0,
                // edate: '',
                usecash: this.usecash,
                tycoon: this.tycoon
            },
        })
        .then((res)=>{
            console.log(res)
            if(res.data.code == 1){ 
                this.$Message.success('成功')
                this.tabledata = res.data.data.pager.userVipTycoons;
                this.count = res.data.data.pager.count;
                
                this.category.arg_Result1 = res.data.data.pager.arg_Result1;
                this.category.arg_Result2 = res.data.data.pager.arg_Result2;
                this.category.arg_Result3 = res.data.data.pager.arg_Result3;
                this.category.arg_Result4 = res.data.data.pager.arg_Result4;
                this.category.arg_Result5 = res.data.data.pager.arg_Result5;
                this.category.arg_Result6 = res.data.data.pager.arg_Result6;
            } else if (res.data.code == 0){
                this.$Message.warning('无数据');
                this.tabledata = res.data.data.pager.userVipTycoons;
                this.count = res.data.data.pager.count;
                this.category.arg_Result1 = res.data.data.pager.arg_Result1;
                this.category.arg_Result2 = res.data.data.pager.arg_Result2;
                this.category.arg_Result3 = res.data.data.pager.arg_Result3;
                this.category.arg_Result4 = res.data.data.pager.arg_Result4;
                this.category.arg_Result5 = res.data.data.pager.arg_Result5;
                this.category.arg_Result6 = res.data.data.pager.arg_Result6;
            } else if (res.data.code == -1){
                this.$Message.error('异常')
                this.$router.push({path: '/'});
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
    update: function(row) { // 修改页面
        this.showNone = true,
        this.showNoneUpdate = true,

        this.idx = row.useridx,
        this.content = row.content,
        this.resets.content = row.content
        // console.log(row)
    },
    reset: function(row) { // 修改页面重置功能
        this.content = this.resets.content
      },
    updateadd: function() { // 修改页面保存
        let token =localStorage.getItem('h_g_access_token');
        this.$axios({  
            url: '/api/BPMService/User/EditVipTycoonAsync',
            method: 'post',
            //params 参数必写 , 如果没有参数传{}也可以
            headers:{
                    Authorization:'Bearer '+token
            },
            data:{
                Useridx: this.idx,
                Content: this.content
            },
        })
        .then((res)=>{
            console.log(res)
            if(res.data.code == 1){ 
                this.$Message.success('修改成功');
                this.totlist();
            } else if (res.data.code == 0){
                this.$Message.warning('修改失败');
            } else if (res.data.code == -1){
                this.$Message.error('异常')
                this.$router.push({path: '/'});
            }
        })
        .catch((err)=>{
            console.log(err)
            if(err.response.status==401){
                this.$Message.error('登录过期，请重新登录');
                this.$router.push({path: '/login'});
            }
        })

        this.showNone = false,
        this.showNoneUpdate = false
        // console.log(this.id)
      },
    close: function () { // 新建页面和修改页面取消修改
          this.showNone = false, // 遮罩层关闭
          this.showNoneUpdate = false, // 修改页面关闭
          this.showNonecreate = false, // 新建页面关闭

          this.resets.pay = null, // 页面重置功能 使用的缓存数据清空
          this.resets.id = null,
          this.resets.money = null,
          this.resets.volue = null,
          this.resets.gift = null,
          this.resets.address = null

      },
    remove: function(index,row) { // 删除
          this.data.splice(index, 1);
        //   console.log(row.id)
      },
    add: function () { // 新建数据页面
          this.showNone = true,
          this.showNonecreate = true,
          this.pay = null, // 清空数据，防止之前点击过修改造成数据缓存
          this.id = null,
          this.money = null,
          this.volue = null,
          this.gift = null,
          this.address = null
      },
    newadd: function () { // 新建页面保存
          this.showNone = false,
          this.showNonecreate = false
        //   console.log(this.id)
      },
    lookup: function () { // 查找
        // console.log(this.sedate)
        let time1 = '';
        let time2 = '0';
        if(this.sedate[0] != ''){
            time1 = this.sedate[0].getFullYear() + '-' + (this.sedate[0].getMonth() + 1) + '-' + this.sedate[0].getDate();
            time2 = this.sedate[1].getFullYear() + '-' + (this.sedate[1].getMonth() + 1) + '-' + this.sedate[1].getDate();
        } else {
            console.log(this.sedate[1])
            time1 = '';
            time2 = '0';
        }
        
        let token =localStorage.getItem('h_g_access_token');
        this.$axios({
        url:'/api/BPMService/User/GetVipTycoonListAsync',
        method: 'get',
        headers:{
            Authorization:'Bearer '+token
        },
        params:{
            
            idx: Number(this.query),
            page: this.page,
            pagesize: this.pagesize,
            sdate: time1,
            edate: time2,
            usecash: this.usecash,
            tycoon: this.tycoon
        },
        })
        .then((res)=>{
            // this.tabledata = Array(res.data.data.live_UserInfo);
            // console.log(res)
            // console.log(this.tabledata)
            if(res.data.code == 1){
                this.$Message.success(res.data.msg);
                this.tabledata = res.data.data.pager.userVipTycoons
                this.count = res.data.data.pager.count;
            }else if(res.data.code == 0){
                this.$Message.warning(res.data.msg);
                this.tabledata = res.data.data.pager.userVipTycoons
                this.count = res.data.data.pager.count;
            }else if(res.data.code == -1){
                this.$Message.error(res.data.msg);
                this.tabledata = res.data.data.pager.userVipTycoons
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
    fenye: function (pager) { // 页面的分页功能
        this.page = pager;
        console.log(this.page);
        this.totlist();
    },
    handleSelectAll (status) { // table表格全选功能
        this.$refs.table.selectAll(status);
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

}
</style>
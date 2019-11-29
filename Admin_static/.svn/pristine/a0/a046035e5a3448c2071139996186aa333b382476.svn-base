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
                <label>IDX：</label>
                    <Input size="small" v-model="useridx" placeholder="请输入IDX..." style="width: 200px;"></Input>
                    <Button type="primary" size="small" @click="lookup">查询</Button>
            </div>
            <!-- 主页面内容 -->
            <div class="center" >
                <Table border :columns="columns" :data="tabledata" class="table"  ref="table">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="text" size="small" style="margin-right: 5px" @click="update(row)"></Button>
                        <Button type="text" size="small" @click="remove(row)"></Button>
                    </template>
                </Table>
            </div>
            <!-- 遮罩层 -->
            <div class="marsk" v-if="showNone"></div>

            <!-- 修改编辑页面 -->
            <!-- <div class="pop" v-if="showNoneUpdate">
                <Form :label-width="80">
                    <FormItem label="支付类型：">
                        <Select v-model="pay">
                            <Option value="Android">Android</Option>
                            <Option value="iPhone">iPhone</Option>
                            <Option value="AppStore">AppStore</Option>
                            <Option value="taiwangooglestore">台湾googlestore</Option>
                            <Option value="taiwanAppStore">台湾AppStore</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="商品ID：">
                        <Input v-model="id" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="金额：">
                        <Input v-model="money" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="币值：">
                        <Input v-model="volue" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="赠送币：">
                        <Input v-model="gift" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="说明：">
                        <Input v-model="address" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="updateadd">保存</Button>
                        <Button style="margin-left: 8px" type="dashed" @click="reset">重置</Button>
                        <Button style="margin-left: 8px" @click="close">取消</Button>
                    </FormItem>
                </Form>      
            </div> -->
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
export default {
  name: 'Index',
  data () {
    return {
        widthMain:{width:''},//table组件自适应
        //面包屑数组
        query: '', // 查询功能 绑定的数据
        showNone: false, // 控制页面遮罩层开关
        showNoneUpdate: false, // 修改页面弹出控制
        // 表格列名称
        columns: [
            {title: 'IDX',key: 'useridx'},
            {title: '用户昵称',key: 'myname'}, 
            {title: '设备号',key: 'szDeviceID'},
            {title: '设备类型',key: 'szDeviceType'},
            {title: '设备号关联数',key: 'num'},
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
        page: 1,
        pagesize: 10,
        useridx: null, // 用户IDX
        productype : null, // 产品类型
        szDeviceID: '', // 设备号
        szDeviceType: '', // 设备类型
        myname: '', // 用户昵称
        num: null, // 设备号关联数
        
        type: null, // 	类型 1.idx 2.device	
        deviceID: null, //设备号

        count: 0,

        resets: { // 暂存页面内容数据
            page: 1,
            pagesize: 10,
            idx: null,
            type: null,
            deviceID: null,
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

        totlist: function() {
            let token = localStorage.getItem('h_g_access_token');
            this.$axios({
                url: '/api/BPMService/User/GetLoginUserLogListAsync',
                method: 'get',
                //params 参数必写 , 如果没有参数传{}也可以
                headers:{
                    Authorization:'Bearer '+token,
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    // 'Content-Type': 'multipart/form-data'
                },
                params: {
                    page: 1,
                    pagesize: 10,
                    idx: null,
                    type: null,
                    deviceID: null
                }
            })
            .then((res)=>{
                console.log(res);
                if(res.data.code == 1){
                    this.$Message.success(res.data.msg);
                    this.tabledata = res.data.data.pager.login_User_PhoneInfo_LOGs;
                    this.count = res.data.data.pager.count;
                }else if(res.data.code = 0){
                    this.$Message.warning(res.data.msg);
                    this.tabledata = res.data.data.pager.login_User_PhoneInfo_LOGs;
                    this.count = res.data.data.pager.count;
                }else if(res.data.code = -1){
                    this.$Message.error(res.data.msg);
                    // this.$router.push({path: '/login'});
                    this.tabledata = res.data.data.pager.login_User_PhoneInfo_LOGs;
                    this.count = res.data.data.pager.count;
                }else{
                    // console.log(res.data.code)
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
        update: function(row) { // 修改页面
            this.resets.pay = row.pay
            this.resets.id = row.id
            this.resets.money = row.money
            this.resets.volue = row.volue
            this.resets.gift = row.gift
            this.resets.address = row.address,

            this.showNone = true,
            this.showNoneUpdate = true,
            this.pay = row.pay,
            this.id = row.id,
            this.money = row.money,
            this.volue = row.volue,
            this.gift = row.gift,
            this.address = row.address,
            console.log(row)
        },
        reset: function(row) { // 修改页面重置功能
            this.pay = this.resets.pay,
            this.id = this.resets.id,
            this.money = this.resets.money,
            this.volue = this.resets.volue,
            this.gift = this.resets.gift,
            this.address = this.resets.address
        },
        updateadd: function() { // 修改页面保存
            this.showNone = false,
            this.showNoneUpdate = false,
            console.log(this.id)
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
            console.log(row.id)
        },
        create: function () { // 新建数据页面
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
            this.showNonecreate = false,
            console.log(this.id)
        },
        lookup: function () { // 查找
            let token = localStorage.getItem('h_g_access_token');
            this.$axios({
                url: '/api/BPMService/User/GetLoginUserLogListAsync',
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
                    idx: this.useridx,
                    type: null,
                    deviceID: null
                }
            })
            .then((res)=>{
                console.log(res);
                if(res.data.code == 1){
                    this.$Message.success(res.data.msg);
                    this.tabledata = res.data.data.pager.login_User_PhoneInfo_LOGs;
                    this.count = res.data.data.pager.count;
                }else if(res.data.code = 0){
                    this.$Message.warning(res.data.msg);
                    this.tabledata = res.data.data.pager.login_User_PhoneInfo_LOGs;
                    this.count = res.data.data.pager.count;
                }else if(res.data.code = -1){
                    this.$Message.error(res.data.msg);
                    this.$router.push({path: '/login'});
                    this.tabledata = res.data.data.pager.login_User_PhoneInfo_LOGs;
                    this.count = res.data.data.pager.count;
                }else{
                    // console.log(res.data.code)
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
        fenye: function (page) { // 页面的分页功能
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
        padding:2% 4%;
        position: fixed;
        top: 9%;
        left: 18%; 
        width: 60%;
        height: 80%;
        background: #fff;
        z-index: 3001;
    }
}
</style>
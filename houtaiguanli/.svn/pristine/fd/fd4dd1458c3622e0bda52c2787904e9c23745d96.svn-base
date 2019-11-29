<template> 
    <div class="main">
        <div class="block" style="padding:30px 0px 30px 50px">
            <span class="demonstration">日期范围：</span>
            <el-date-picker
                v-model="value1"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
             <span class="demonstration">业务员</span>
            <el-select v-model="adress" placeholder="请选择" >
                <el-option
                v-for="(item,index) in allAdressList"
                :key="index"
                :label="item.salerName"
                :value="item.id">
                </el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" @click="goSearchId">查询</el-button>
            
        </div>
        <div class="block2" style="padding:30px 0px 30px 50px">
            <el-button type="primary" icon="" @click="exportExcel">导出Excel</el-button>
            <el-button type="primary" icon="" @click="goAdd">业务员添加数据</el-button>
            <!-- 共有数据  {{allCount}}  条 -->
        </div>
    <!-- 主页面显示内容 -->
        <div ref="exportExcel" id="out-table" class="app-container">
             <el-table 
              border
              show-summary
              :summary-method="getSummaries"
              :data="privilegeList"
              style="width: 100%">
              <!-- 单选框 -->
              <el-table-column
                type="selection">
              </el-table-column>
              <!-- 日期 -->
              <el-table-column
                label="日期"
                min-width="80"
                sortable
                prop="create_time">
              </el-table-column>
              <!-- 产品名称 -->
              <el-table-column
                label="产品名称"
                min-width="100"
                sortable
                prop="productName">
              </el-table-column>
              <!-- 现金 -->
              <el-table-column
                label="现金"
                min-width="80"
                sortable
                prop="cash">
              </el-table-column>
              <!-- 微信 -->
              <el-table-column
                label="微信"
                min-width="80"
                sortable
                prop="wx_money">
              </el-table-column>
              <!-- 支付宝 -->
              <el-table-column
                label="支付宝"
                min-width="90"
                sortable
                prop="zfb_money">
              </el-table-column>
              <!-- 刷卡 -->
              <el-table-column
                label="刷卡"
                min-width="80"
                sortable
                prop="cred_card">
              </el-table-column>
              <!-- 销售数量 -->
              <el-table-column
                label="销售数量"
                min-width="100"
                sortable
                prop="saleNum">
              </el-table-column>
              <!-- 销售额（元） -->
              <el-table-column
                label="销售额（元）"
                min-width="120"
                sortable
                prop="sale_money">
              </el-table-column>
              <!-- 库存数量 -->
              <el-table-column
                label="库存数量"
                min-width="100"
                sortable
                prop="cur_num">
              </el-table-column>
              <!-- 支出项 -->
              <el-table-column
                label="支出项"
                min-width="90"
                sortable
                prop="begin_num">
              </el-table-column>
              <!-- 支出总计 -->
              <el-table-column
                label="支出总计"
                min-width="100"
                sortable
                prop="cost_money">
              </el-table-column>
              <!-- 活动 -->
              <el-table-column
                label="活动"
                min-width="80"
                sortable
                prop="activityName">
              </el-table-column>
              <!-- 备注 -->
              <el-table-column
                label="备注"
                min-width="100"
                sortable
                prop="remark">
              </el-table-column>
              <!-- 业务员 -->
              <el-table-column
                label="业务员"
                min-width="90"
                sortable
                prop="salerName">
              </el-table-column>
              <!-- 操作 -->
              <!-- identityJudgment -->
            <el-table-column v-if="identityJudgment"
                fixed="right"
                label="操作"
                min-width="100">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="goEdit(scope.row)">编辑</el-button>
                  <el-button type="text" size="small" @click="goDelete(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          
        </div>
    <!-- z遮罩层 -->
        <div class="marsk" v-if="showNone"></div>
    <!-- 弹出框--编辑-- -->
        <div class="pop" v-if="showNoneUpdate">
            <el-form   ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <!--  -->
                <el-form-item label="产品名称" prop="id" style="text-align:left">
                  <el-select v-model="productId" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in editNewList"
                      :key="index"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="收款方式" prop="id" style="text-align:left">
                    <el-select
                      v-model="vvalue1"
                      placeholder="请选择">
                      <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label"> 
                        <!-- 解决传值 -->
                      </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="金额" prop="id">
                  <el-input v-model="money1" placeholder="请输入金额" ></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="id">
                  <el-input v-model="saleNum" placeholder="请输入数量" ></el-input>
                </el-form-item>
                <el-form-item label="活动" prop="id" style="text-align:left">
                  <el-select v-model="activeId" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in activityList"
                      :key="index"
                      :label="item.activity_name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="金额" prop="id">
                  <el-input v-model="cost_money" placeholder="请输入金额" ></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="id">
                  <el-input v-model="remark" placeholder="" ></el-input>
                </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="goKeepUpdate">编辑</el-button>
                <el-button @click="reset">取消</el-button>
              </el-form-item>
            </el-form>

        </div>
    <!-- 弹出框--编辑-- -->
    <!-- 弹出框----新增 -->
        <div class="pop" v-if="showNoneAdd">
            <el-form   ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <!--  -->
                <el-form-item label="产品名称" prop="id" style="text-align:left">
                  <el-select v-model="productId" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in editNewList"
                      :key="index"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="收款方式" prop="id" style="text-align:left">
                    <el-select
                      v-model="vvalue1"
                      default-first-option
                      placeholder="请选择">
                      <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="金额" prop="id">
                  <el-input v-model="money1" placeholder="请输入金额" ></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="id">
                  <el-input v-model="saleNum" placeholder="请输入数量" ></el-input>
                </el-form-item>
                <el-form-item label="活动" prop="id" style="text-align:left">
                  <el-select v-model="activeId" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in activityList"
                      :key="index"
                      :label="item.activity_name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="金额" prop="id">
                  <el-input v-model="cost_money" placeholder="请输入金额" ></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="id">
                  <el-input v-model="remark" placeholder="" ></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="goKeepAdd">添加</el-button>
                  <el-button @click="reset">取消</el-button>
                </el-form-item>

            </el-form>

        </div>
    <!-- 弹出框----新增 -->
    </div>
  
</template>
<script>
  import FileSaver from 'file-saver'; //在客户端保存文件的解决方案
  import XLSX from 'xlsx';
  export default {
    name: "productList",
    data() {
      return {
        identityJudgment:true,//是否为操作员身份判断
        fangshi:'',//收款方式key
        options1: [{
          value: '1',
          label: '现金'
        }, {
          value: '2',
          label: '微信'
        }, {
          value: '3',
          label: '支付宝'
        },{
          value: '4',
          label: '银行卡'
        }],
        vvalue1: null, //页面的付款方式
        money1: null, //页面的付款金额
  
      //上面是自定义固定的新建页面选项中的内容


        allProductList:null,//搜索-所有产品列表
        product:null,//搜索选中产品deid

        value1: '',//搜索日期
        allAdressList:null,//搜索-所有地址列表 搜索业务员
        adress:null,//搜索选中地址id
        editList:null,//编辑新增查询数组 产品列表
        editNewList:null,                   //活动列表 现在产品列表
        privilegeList:null,//权限列表信息
        row:null,//被点击行的数据
        activityList:null,                 //页面活动列表
        showNone:false,//遮罩层的隐藏
        showNoneUpdate:false,//弹出层编辑的隐藏
        showNoneAdd:false,//弹出层新增的隐藏
        

        allCount:0,//权限列表信息zong条数
        input: '',//搜索双向绑定
        showNoneGai:false,//弹出层改密的隐藏
        
        currentPage4:1,//当前条数
        
        editListqq:[],//----选中的数组name
        
        editNewListStr:'',//最终处理string
        newPassword1:null,//修改密码值
        newPassword2:null,//确认修改密码值
        select_value:null,//下拉框选中的值
        RoleId:null,//选中xia拉框的值  角色名称
      // -----
      textarea:null,//多选框的内容
      aaa:[],

      id:null,
      productId:null, //产品ID
      activityName:null, //活动名称
      productName:null, //产品名称
      cash:null, //现金
      wx_money:null, //微信支付
      zfb_money:null, //支付宝支付
      cred_card:null, //刷卡支付
      saleNum:null, //销售数量
      sale_money:null, //销售额
      cur_num:null, //库存数量
      begin_num:null, //支出项
      cost_money:null, //支出总计
      activeId:null, //活动
      remark:null, //备注
      salerId:null, //业务ID
      salerName:null, //业务员名称
      create_time:null,
      data_state:null,
      }
    },
    created() {  //启动后自动启动运行的函数
      this.getRoleList(); //获取总列表
      this.getOptionAdressMsg(); // 获取业务员列表
    },
    watch: {
      
    },
    filters: {
      
    },
    methods: {
      //导出Excel函数
      exportExcel:function() {
        //  let wb =XLSX.utils.table_to_book(this.$refs.exportExcel);
         let wb = XLSX.utils.table_to_book(document.querySelector('#out-table'));
         let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
         try {
             FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'exportExcel.xlsx')
         } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
         return wbout
      },
      //表格处理
       getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }else if (index ===12){
            sums[index] = '---';
            return;
          }else if (index ===14){
            sums[index] = '---';
            return;
          }else if (index ===10){
            sums[index] = '---';
            return;
          }else if (index ===13){
            sums[index] = '---';
            return;
          }else if (index ===1){
            sums[index] = '---';
            return;
          }else if (index ===2){
            sums[index] = '---';
            return;
          }
         
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            if(index === 7){
              return;
            } else if (index===9){
              return;
            } 


            sums[index] += ' 元';
          } else{
            // sums[index] = '---';
          }
        });
        return sums;
      },

      gor:function(){  //验证支付方式
  
          // console.log(this.vvalue1)
      },
      //获取业务员
      getOptionAdressMsg:function(){
         let token =localStorage.getItem('g_token'); //获取token用于连接后台
         this.$axios({  
          url: '/api/SaleManager/SaleMemAllList',
          method: 'get',
          //params参数必写 , 如果没有参数传{}也可以
          headers:{
                Authorization:'Bearer '+token
          },
          data:{  
          }
        })
        .then((res)=>{
          // console.log(res)
          if(res.data.code==1){
            this.allAdressList=res.data.data; //zong搜索发货地列表信息
          }else if(res.data.code==-4){
              this.$message('登录信息过期，请重新登录');
                localStorage.removeItem('g_userName');
                localStorage.removeItem('g_token');
                this.$router.push({path: '/login'});
          }else if(res.data.code==-1){
            //  this.$message(res.data.msg);
          }else{
            this.$message(res.msg);
          }
        })
        .catch((err)=>{
           console.log(err)
        })
      },
      //获取总列表--ok
      getRoleList:function(){
        let token =localStorage.getItem('g_token');
        let id =localStorage.getItem('g_id'); //定义一个用于接收ID的变量
        this.$axios({  
          url: '/api/SaleManager/SaleSellerRList?id='+id,// 页面总列表 id是获取的页面ID用于判断是否是操作员
          method: 'get',
          //params参数必写 , 如果没有参数传{}也可以
          headers:{
                Authorization:'Bearer '+token
          },
          data:{  
          }
        })
        .then((res)=>{
          // console.log(res)
          if(res.data.code==1){
             if(res.data.count[0].rolename=='操作员'){ //判断是否显示修改和删除按钮 判断传参中的rolename的身份是否是操作员
                this.identityJudgment=false;
            }else{
            }
            this.privilegeList=res.data.data; //zong列表信息
          }else if(res.data.code==-4){
              this.$message('登录信息过期，请重新登录');
                localStorage.removeItem('g_userName');
                localStorage.removeItem('g_token');
                localStorage.removeItem('g_id'); //清除获取到的ID
                this.$router.push({path: '/login'});
          }else if(res.data.code==-1){
             this.$message(res.data.msg);
          }else{
            this.$message(res.msg);
          }
        })
        .catch((err)=>{
           console.log(err)
        })
      },
      //搜索id---ok
      goSearchId:function(){
        let token =localStorage.getItem('g_token');
        if(this.value1==false){
            this.$message("日期不能为空");
        }else{
            this.$axios({
                url: '/api/SaleManager/SaleSellerRList?startTime='+this.value1[0]+'&endTime='+this.value1[1]+'&salerId='+Number(this.adress),
                method: 'get',
                //params参数必写 , 如果没有参数传{}也可以
                headers:{
                    Authorization:'Bearer '+token
                },
                data:{  
                }
                })
                .then((res)=>{

                if(res.data.code==1){
                    this.$message(res.data.msg);
                    this.privilegeList=res.data.data //查询成功重新赋值列表信息
                    // this.allCount=res.data.count[0].allcount //查询成功重新赋值zong条数
                }else if(res.data.code==-1){
                    this.$message(res.data.msg);
                    this.privilegeList=res.data.data //查询成功重新赋值列表信息
                    // this.allCount=res.data.count[0].allcount //查询成功重新赋值zong条数
                }else if(res.data.code==-4){
                    this.$message('登录信息过期，请重新登录');
                    localStorage.removeItem('g_userName');
                    localStorage.removeItem('g_token');
                    this.$router.push({path: '/login'});
                }else{
                    this.$message(res.data.success[0].msg);
                }
                })
                .catch((err)=>{
                    console.log(err)
                })
        }
      },
      //删除一条--ok
      goDelete:function(row){
        let token =localStorage.getItem('g_token');
        this.$axios({  
          url: '/api/SaleManager/ChangeSaleSellerRState',
          method: 'post',
        //params参数必写 , 如果没有参数传{}也可以
          headers:{
                    Authorization:'Bearer '+token
          }, 
          data:{ 
            type:3,
            id:row.id
          }
        })
        .then((res)=>{
          if(res.data.code==1){
            this.$message(res.data.msg);
            location.reload()
          }else if(res.data.code==-4){
              this.$message('登录信息过期，请重新登录');
                localStorage.removeItem('g_userName');
                localStorage.removeItem('g_token');
                this.$router.push({path: '/login'});
          }else{
            this.$message(res.data.msg);
          }
        })
        .catch((err)=>{
            console.log(err)
        })
      },
      //新增
      goAdd:function(){
          let token =localStorage.getItem('g_token');
          this.showNone=true;
          this.showNoneAdd=true;
          
           this.productId=null;//产品id
           this.cash=null; //现金
           this.wx_money=null; //微信支付
           this.zfb_money=null; //支付宝支付
           this.cred_card=null; //刷卡支付
           this.saleNum=null; //销售数量
           this.sale_money=null; //销售金额
           this.cur_num=null; //当前库存数量
           this.begin_num=null; //初始库存
           this.cost_money=null; //支出，开销总计
           this.activeId=null; //活动ID
           this.remark=null; //备注
           this.salerId=null; //业务员

           this.vvalue1=null; //页面的付款方式
           this.money1=null; //页面的付款金额
            //产品列表
            this.$axios({  
              url: '/api/ProductManager/ProductAllList',
              
              method: 'get',
              //params参数必写 , 如果没有参数传{}也可以 
              headers:{
                    Authorization:'Bearer '+token
              },
              data:{   
              }
            })
            .then((res)=>{
              // console.log(res)
              if(res.data.code==1){
                this.editNewList=res.data.data;//查询成功 赋值产品列表信息
              }else if(res.data.code==-4){
              this.$message('登录信息过期，请重新登录');
                localStorage.removeItem('g_userName');
                localStorage.removeItem('g_token');
                this.$router.push({path: '/login'});
              }else{
                this.$message(res.data.success[0].msg);
              }
            })
            .catch((err)=>{
                   console.log(err)
            })
        //获取活动列表信息
            this.$axios({  
              url: '/api/ProductManager/ActivityAllList',
              method: 'get',
              //params参数必写 , 如果没有参数传{}也可以 
              headers:{
                    Authorization:'Bearer '+token
              },
              data:{   
              }
            })
            .then((res)=>{
              // console.log(res)
              if(res.data.code==1){
                this.activityList=res.data.data;//查询成功 活动列表信息
              }else if(res.data.code==-4){
              this.$message('登录信息过期，请重新登录');
                localStorage.removeItem('g_userName');
                localStorage.removeItem('g_token');
                this.$router.push({path: '/login'});
              }else{
                this.$message(res.data.success[0].msg);
              }
            })
            .catch((err)=>{
                   console.log(err)
            })
      },
      //编辑
      goEdit:function(row){
        let token = localStorage.getItem('g_token');
        this.showNone=true;
        this.showNoneUpdate=true;
        this.row=row;
        // console.log(this.row)


          this.id=row.id;
          this.productId=row.productId; //产品ID
          this.productName=row.productName; //产品名称

          this.cash=row.cash; //现金
          this.wx_money=row.wx_money; //微信支付
          this.zfb_money=row.zfb_money; //支付宝支付
          this.cred_card=row.cred_card; //刷卡支付

          this.saleNum=row.saleNum; //销售数量
          this.sale_money=row.sale_money; //销售额
          this.cur_num=row.cur_num; //库存数量
          this.begin_num=row.begin_num; //支出项
          this.cost_money=row.cost_money; //支出总计
          this.activeId=row.activeId; //活动
          this.remark=row.remark; //备注
          this.salerId=row.salerId; //业务员
          this.create_time=row.create_time;
          this.data_state=row.data_state;

        if(row.cash > 0) {
          this.vvalue1 = '现金';
          this.money1 = row.cash;
        }else if(row.wx_money > 0) {
          this.vvalue1 = '微信';
          this.money1 = row.wx_money;
        }else if(row.zfb_money > 0) {
          this.vvalue1 = '支付宝';
          this.money1 = row.zfb_money;
        }else if(row.cred_card > 0) {
          this.vvalue1 = '刷卡';
          this.money1 = row.cred_card;
        } else {
        }
        
             //产品列表
            this.$axios({  
              url: '/api/ProductManager/ProductAllList',
              
              method: 'get',
              //params参数必写 , 如果没有参数传{}也可以 
              headers:{
                    Authorization:'Bearer '+token
              },
              data:{   
              }
            })
            .then((res)=>{
              // console.log(res)
              if(res.data.code==1){
                this.editNewList=res.data.data;//查询成功 赋值产品列表信息
              }else if(res.data.code==-4){
              this.$message('登录信息过期，请重新登录');
                localStorage.removeItem('g_userName');
                localStorage.removeItem('g_token');
                this.$router.push({path: '/login'});
              }else{
                this.$message(res.data.success[0].msg);
              }
            })
            .catch((err)=>{
                   console.log(err)
            })
        //获取活动列表信息
            this.$axios({  
              url: '/api/ProductManager/ActivityAllList',
              method: 'get',
              //params参数必写 , 如果没有参数传{}也可以 
              headers:{
                    Authorization:'Bearer '+token
              },
              data:{   
              }
            })
            .then((res)=>{
              // console.log(res)
              if(res.data.code==1){
                this.activityList=res.data.data;//查询成功 活动列表信息
              }else if(res.data.code==-4){
              this.$message('登录信息过期，请重新登录');
                localStorage.removeItem('g_userName');
                localStorage.removeItem('g_token');
                this.$router.push({path: '/login'});
              }else{
                this.$message(res.data.success[0].msg);
              }
            })
            .catch((err)=>{
                   console.log(err)
            })
      },
      //保存--新增
      goKeepAdd:function(){
          let token =localStorage.getItem('g_token');
          let g_id =localStorage.getItem('g_id');
               if(this.vvalue1==1){
                    this.fangshi='cash';
                }else if(this.vvalue1==2){
                    this.fangshi='wx_money';
                }
                else if(this.vvalue1==3){
                    this.fangshi='zfb_money';
                }
                else if(this.vvalue1==4){
                    this.fangshi='cred_card';
                }
          this.$axios({  
              url: '/api/SaleManager/ChangeSaleSellerR',
              

              method: 'post',
              //params参数必写 , 如果没有参数传{}也可以 
              headers:{
                    Authorization:'Bearer '+token
              },
              data:{
                   saleNum:Number(this.saleNum), //销售数量
                   cost_money:Number(this.cost_money), //支出总计
                   activeId:Number(this.activeId), //活动
                   remark:this.remark, //备注
                   productId:this.productId,//产品ID
                   [this.fangshi]:Number(this.money1),//支付方式和金额
                   salerId:g_id, //销售员ID

              }
            })
            .then((res)=>{
              // console.log(res)
              if(res.data.code==1){
                this.$message(res.data.msg);
                location.reload();
              }else if(res.data.code==-4){
              this.$message('登录信息过期，请重新登录');
                localStorage.removeItem('g_userName');
                localStorage.removeItem('g_token');
                this.$router.push({path: '/login'});
              }else{
                this.$message(res.data.success[0].msg);
              }
            })
            .catch((err)=>{
                   console.log(err)
            })
      },
      //保存--编辑
      goKeepUpdate:function(){
          let token =localStorage.getItem('g_token');

          if(this.vvalue1=='现金'){
              this.fangshi='cash';
          }else if(this.vvalue1=='微信'){
              this.fangshi='wx_money';
          }
          else if(this.vvalue1=='支付宝'){
              this.fangshi='zfb_money';
          }
          else if(this.vvalue1=='刷卡'){
              this.fangshi='cred_card';
          }

          this.$axios({  
              url: '/api/SaleManager/ChangeSaleSellerR',
              method: 'post',
              //params参数必写 , 如果没有参数传{}也可以 
              headers:{
                    Authorization:'Bearer '+token
              },
              data:{  
                  
                  id:Number(this.id), //产品识别ID
                  saleNum:Number(this.saleNum), //销售数量
                  cost_money:this.cost_money, //支出总计
                  activeId:Number(this.activeId), //活动
                  remark:this.remark, //备注
                  productId:this.productId,//产品名
                  [this.fangshi]:Number(this.money1),//支付方式和金额
              }
            })
            .then((res)=>{
              // console.log(res)
              if(res.data.code==1){
                this.editList=res.data.data; //查询成功 赋值编辑列表信息
                // this.privilegeList=res.data.data //查询成功重新赋值列表信息
                // this.allCount=res.data.count[0].allcount //查询成功重新赋值zong条数
                this.$message(res.data.msg);
                location.reload(); //保存过后自动刷新页面
              }else if(res.data.code==-4){
              this.$message('登录信息过期，请重新登录');
                localStorage.removeItem('g_userName');
                localStorage.removeItem('g_token');
                this.$router.push({path: '/login'});
              }else{
                // console.log(res)
                this.$message(res.data.success[0].msg);
              }
            })
            .catch((err)=>{
                   console.log(err)
            })
      },
      //关闭编辑弹框
      reset:function(){
        this.showNone=false;
        this.showNoneUpdate=false;
        this.showNoneAdd=false;
      },
    }
  }
</script>
<style scoped>

/* .block2{
  text-align:right;
} */
.block_fenye{
  padding-left: 30px;
  padding-right: 30px;
}
.block_fenye .el-pagination__sizes{
  margin-right:450px;
}
.main{
    /* flex: 1; */
    position: relative;
}
.app-container{
  width:100%;
  overflow: hidden;
}
.marsk{
  position: fixed;
  top: 0;
  left: 0; 
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.5;
  z-index: 2999;
}
.pop{
  padding:2% 4%;
  position: fixed;
  top: 9%;
  left: 18%; 
  width: 60%;
  height: 80%;
  background: #fff;
  z-index: 3001;
}
</style>



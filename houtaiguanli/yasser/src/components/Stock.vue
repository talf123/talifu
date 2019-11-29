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
            <span class="demonstration">产品</span>
            <el-select v-model="product" placeholder="请选择">
                <el-option
                v-for="(item,index) in allProductList"
                :key="index"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
             <span class="demonstration">发货地</span>
            <el-select v-model="adress" placeholder="请选择" >
                <el-option
                v-for="(item,index) in allAdressList"
                :key="index"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" @click="goSearchId">查询</el-button>
            
        </div>
        <div class="block2" style="padding:30px 0px 30px 50px">
            <el-button type="primary" icon="" @click="exportExcel">导出Excel</el-button>
            <el-button type="primary" icon="" @click="goAdd">添加数据</el-button>
            <!-- 共有数据  {{allCount}}  条 -->
        </div>

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
                width=""
                sortable
                prop="create_time">
              </el-table-column>
              <!-- 产品名称 -->
              <el-table-column
                label="产品名称"
                width=""
                sortable
                prop="product_name">
              </el-table-column>
              <!-- 每箱数量 -->
              <el-table-column
                label="每箱数量"
                width=""
                sortable
                prop="case_num">
              </el-table-column>
              <!-- 箱数 -->
              <el-table-column
                label="箱数"
                width=""
                sortable
                prop="format">
              </el-table-column>
              <!-- 进价 -->
              <el-table-column
                label="进价"
                width=""
                sortable
                prop="base_price">
              </el-table-column>
              <!-- 总计 -->
              <el-table-column
                label="总计"
                width=""
                sortable
                prop="total_money">
              </el-table-column>
              <!-- 发货地 -->
              <el-table-column
                label="发货地"
                width=""
                sortable
                prop="from_where">
              </el-table-column>
              <!-- 已还款 -->
              <el-table-column
                label="已还款"
                width=""
                sortable
                prop="pay_money">
              </el-table-column>
              <!-- 未还款 -->
              <el-table-column
                label="未还款"
                width=""
                sortable
                prop="nopay_money">
              </el-table-column>
              <!-- 操作 -->
              <el-table-column
                label="操作"
                width="">
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
                  <el-select v-model="product_id" placeholder="">
                    <el-option
                      v-for="(item,index) in editList"
                      :key="index"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="每箱数量" prop="id">
                  <el-input v-model="case_num" placeholder="请输入每箱数量" ></el-input>
                </el-form-item>
                <el-form-item label="箱数" prop="id">
                  <el-input v-model="format" placeholder="请输入箱数"></el-input>
                </el-form-item>
                <el-form-item label="进价" prop="id">
                  <el-input v-model="base_price" placeholder="请输入进价" ></el-input>
                </el-form-item>
                <el-form-item label="发货地" prop="id">
                  <el-input v-model="from_where" placeholder="请输入发货地" ></el-input>
                </el-form-item>
                <el-form-item label="已还款" prop="id" style="text-align:left">
                  <el-select v-model="flag_pay" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in flag_data"
                      :key="index"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="未还款" prop="id">
                  <el-input v-model="nopay_money" placeholder="请输入未还款金恩" ></el-input>
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
                  <el-select v-model="product_id" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in editList"
                      :key="index"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="每箱数量" prop="id">
                  <el-input v-model="case_num" placeholder="请输入每箱数量" ></el-input>
                </el-form-item>
                <el-form-item label="箱数" prop="id">
                  <el-input v-model="format" placeholder="请输入箱数"></el-input>
                </el-form-item>
                <el-form-item label="进价" prop="id">
                  <el-input v-model="base_price" placeholder="请输入进价" ></el-input>
                </el-form-item>
                <el-form-item label="发货地" prop="id">
                  <el-input v-model="from_where" placeholder="请输入发货地" ></el-input>
                </el-form-item>
                <el-form-item label="已还款" prop="id" style="text-align:left">
                  <el-select v-model="flag_pay" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in flag_data"
                      :key="index"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="未还款" prop="id">
                  <el-input v-model="nopay_money" placeholder="请输入未还款金恩" ></el-input>
                </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="goKeepAdd">添加</el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
                <el-button @click="reset">取消</el-button>
              </el-form-item>
            </el-form>

        </div>
    <!-- 弹出框----新增 -->
    </div>
  
</template>
<script>
  import FileSaver from 'file-saver';
  import XLSX from 'xlsx';
  export default {
    name: "productList",
    data() {
      return {
        flag_data:[{name:'未还款',id:0},{name:'部分还款',id:1},{name:'已结清',id:2}],
        allProductList:null,//搜索-所有产品列表
        product:null,//搜索选中产品deid
        value1: '',//搜索日期
        allAdressList:null,//搜索-所有地址列表
        adress:null,//搜索选中地址id
        editList:null,//编辑新增查询数组 产品列表
        privilegeList:null,//权限列表信息
        row:null,//被点击行的数据
        showNone:false,//遮罩层的隐藏
        showNoneUpdate:false,//弹出层编辑的隐藏
        showNoneAdd:false,//弹出层新增的隐藏

        allCount:0,//权限列表信息zong条数
        input: '',//搜索双向绑定
        
        
        showNoneGai:false,//弹出层改密的隐藏
        
        currentPage4:1,//当前条数
        
        editListqq:[],//----选中的数组name
        editNewList:[],//选中的数组id
        editNewListStr:'',//最终处理string
        newPassword1:null,//修改密码值
        newPassword2:null,//确认修改密码值
        select_value:null,//下拉框选中的值
        RoleId:null,//选中xia拉框的值  角色名称
      // -----
      textarea:null,//多选框的内容
      aaa:[],

      id:null,//编号
      product_id:null,//产品id
      product_name:null,//产品名称
      case_num:null,//每箱数量
      format:null,//箱数
      base_price:null,//进价
      total_money:null,//总计
      from_where:null,//发货地
      flag_pay:null,//已还款 0已还款 1部分还款 2未还款 
      pay_money:null,//已还款
      nopay_money:null,//未还款
      create_time:null,//创建时间
      update_time:null,//更新时间
      data_state:null,//状态
      }
    },
    created() {
      this.getRoleList();
      this.getOptionAdressMsg();
      this.getOptionProductMsg();
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
          }else if(index === 3){
            sums[index] = '---';
            return;
          }
          else if(index === 4){
            sums[index] = '---';
            return;
          }
          else if(index === 5){
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
            sums[index] += ' 元';
          } else {
            sums[index] = '---';
          }
        });

        return sums;
      },
      // gor:function(){
      //     console.log(this.product)
      // },
      //获取所有产品
      getOptionProductMsg:function(){
         let token =localStorage.getItem('g_token'); 
         this.$axios({  
          url: '/api/ProductManager/ProductAllList',//所有产品列表
          method: 'get',
          //params参数必写 , 如果没有参数传{}也可以
          headers:{
                Authorization:'Bearer '+token
          },
          data:{  
          }
        })
        .then((res)=>{
          // console.log(res.data.data)
          if(res.data.code==1){
            this.allProductList=res.data.data; //搜索总产品列表信息
          }else if(res.data.code==-4){
              this.$message('登录信息过期，请重新登录');
                localStorage.removeItem('g_userName');
                localStorage.removeItem('g_token');
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
      //获取所有发货地
      getOptionAdressMsg:function(){
         let token =localStorage.getItem('g_token'); 
         this.$axios({  
          url: '/api/ProductManager/BuyGoodsAddressAllList',//?selectPageNum=1&everyPageNum=10
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
      //获取权限列表信息--ok
      getRoleList:function(){
        let token =localStorage.getItem('g_token');
        this.$axios({  
          url: '/api/ProductManager/BuyGoodsDList',//?selectPageNum=1&everyPageNum=10
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
            this.privilegeList=res.data.data; //zong列表信息
          }else if(res.data.code==-4){
              this.$message('登录信息过期，请重新登录');
                localStorage.removeItem('g_userName');
                localStorage.removeItem('g_token');
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
            this.$axios({  ////api/ProductManager/BuyGoodsDList?productId=0&address=''&name=&startTime=2019-05-15&endTime=2019-05-16
                url: '/api/ProductManager/BuyGoodsDList?startTime='+this.value1[0]+'&endTime='+this.value1[1]+'&productId='+Number(this.product),
                method: 'get',
                //params参数必写 , 如果没有参数传{}也可以
                headers:{
                    Authorization:'Bearer '+token
                },
                data:{  
                  address:this.adress
                }
                })
                .then((res)=>{
                // console.log(res.data)
                // console.log(res.data.count[0].allcount)
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
        // console.log(row);
        // console.log(this.row)
        // console.log(222)
        this.$axios({  
          url: '/api/ProductManager/ChangeBuyGoodsDState',
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
          // console.log(res.data)
          // console.log(res.data.count[0].allcount)
          if(res.data.code==1){
            // this.privilegeList=res.data.data //查询成功重新赋值列表信息
            // this.allCount=res.data.count[0].allcount //查询成功重新赋值zong条数
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

          this.id=null;//编号
          this.product_id=null;//产品id
          this.product_name=null;//产品名称
          this.case_num=null;//每箱数量
          this.format=null;//箱数
          this.base_price=null;//进价
          this.total_money=null;//总计
          this.from_where=null;//发货地
          this.flag_pay=null;//已还款 0 1 2
          this.pay_money=null;//已还款
          this.nopay_money=null;//未还款
          this.create_time=null;//创建时间
          this.update_time=null;//更新时间
          this.data_state=null;//状态
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
              if(res.data.code==1){
                this.editList=res.data.data;//查询成功 赋值编辑列表信息
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
        let token =localStorage.getItem('g_token');
        this.showNone=true;
        this.showNoneUpdate=true;
        this.row=row;
        // console.log(this.row)

        this.id=row.id;//编号
        this.product_id=row.product_id;//产品id
        this.product_name=row.product_name;//产品名称
        this.case_num=row.case_num;//每箱数量
        this.format=row.format;//箱数
        this.base_price=row.base_price;//进价
        this.total_money=row.total_money;//总计
        this.from_where=row.from_where;//发货地
        this.flag_pay=row.flag_pay;//已还款 0已还款 1部分 2结清
        this.pay_money=row.pay_money;//已还款
        this.nopay_money=row.nopay_money;//未还款
        this.data_state=row.data_state;//状态 

        this.$axios({  
              url: '/api/ProductManager/ProductAllList',
              method: 'get',
              //params参数必写 , 如果没有参数传{}也可以 
              headers:{
                    Authorization:'Bearer '+token
              },
              data:{   
                // id:row.id,             // id
              }
            })
            .then((res)=>{
              if(res.data.code==1){
                this.editList=res.data.data;//查询成功 赋值编辑列表信息
                // this.privilegeList=res.data.data //查询成功重新赋值列表信息
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
      },
      //保存--新增
      goKeepAdd:function(){
          let token =localStorage.getItem('g_token');
          this.$axios({  
              url: '/api/ProductManager/ChangeBuyGoodsD',
              method: 'post',
              //params参数必写 , 如果没有参数传{}也可以 
              headers:{
                    Authorization:'Bearer '+token
              },
              data:{   
                product_id:Number(this.product_id),             // 产品名称
                case_num:Number(this.case_num),             // 每箱数量
                format:Number(this.format),             // 箱数
                base_price:Number(this.base_price),             // 进价
                from_where:this.from_where,             // 发货地
                flag_pay:Number(this.flag_pay),             // 已还款
                nopay_money:Number(this.nopay_money),             // 未还款
                data_state: Number(this.data_state)  ,    //  状态
              }
            })
            .then((res)=>{
              // console.log(res)
              // console.log(res.data.count[0].allcount)
              if(res.data.code==1){
                // this.privilegeList=res.data.data //查询成功重新赋值列表信息
                // this.allCount=res.data.count[0].allcount //查询成功重新赋值zong条数
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
          console.log(this.product)
          // console.log(this.editList)
          let token =localStorage.getItem('g_token');
          this.$axios({  
              url: '/api/ProductManager/ChangeBuyGoodsD',
              method: 'post',
              //params参数必写 , 如果没有参数传{}也可以 
              headers:{
                    Authorization:'Bearer '+token
              },
              data:{   
                id:this.id,             // 员工编号
                product_id:Number(this.product_id),             // 产品名称
                case_num:Number(this.case_num),             // 每箱数量
                format:Number(this.format),             // 箱数
                base_price:Number(this.base_price),             // 进价
                from_where:this.from_where,             // 发货地
                flag_pay:Number(this.flag_pay),             // 已还款 状态
                nopay_money:Number(this.nopay_money),             // 未还款
                data_state: Number(this.data_state)  ,    //  状态
              }
            })
            .then((res)=>{
              if(res.data.code==1){
                // this.privilegeList=res.data.data //查询成功重新赋值列表信息
                // this.allCount=res.data.count[0].allcount //查询成功重新赋值zong条数
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
      //关闭编辑弹框
      reset:function(){
        this.showNone=false;
        this.showNoneUpdate=false;
        this.showNoneAdd=false;
        this.showNoneGai=false;
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



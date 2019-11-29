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
        </div>
        <div class="block2" style="padding:30px 0px 30px 50px">
            <el-button type="primary" icon="el-icon-search" @click="exportExcel">导出Excel</el-button>
            <el-button type="primary" icon="el-icon-search" @click="goAdd">添加数据</el-button>
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
                prop="format">
              </el-table-column>
              <!-- 入库箱数 -->
              <el-table-column
                label="入库箱数"
                width=""
                sortable
                prop="in_store">
              </el-table-column>
              <!-- 出库箱数 -->
              <el-table-column
                label="出库箱数"
                width=""
                sortable
                prop="out_store">
              </el-table-column>
              <!-- 剩余箱数 -->
              <el-table-column
                label="剩余箱数"
                width=""
                sortable
                prop="store_format_count">
              </el-table-column>
              <!-- 剩余总量 -->
              <el-table-column
                label="剩余总量"
                width=""
                sortable
                prop="store_count">
              </el-table-column>
              <!-- 仓库 -->
              <el-table-column
                label="仓库"
                width=""
                sortable
                prop="store_name">
              </el-table-column>
              <!-- 操作 -->
              <el-table-column
                label="操作"
                width="">
                <template slot-scope="scope">
                  <!-- <el-button type="text" size="small" >查看详情</el-button> -->
                  <el-button type="text" size="small" @click="goEdit(scope.row)">查看详情</el-button>
                  <!-- <el-button type="text" size="small" @click="goDelete(scope.row)">删除</el-button> -->
                </template>
              </el-table-column>
            </el-table>
          
        </div>
        <!-- z遮罩层 -->
        <div class="marsk" v-if="showNone"></div>
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
                <el-form-item label="操作类型" prop="id" style="text-align:left">
                  <el-select v-model="opt_type" placeholder="请选操作类型 1入库 2出库">
                    <el-option
                      v-for="(item,index) in option_data"
                      :key="index"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="每箱数量" prop="id">
                  <el-input v-model="format" placeholder="请输入每箱数量" ></el-input>
                </el-form-item>
                <el-form-item label="箱数" prop="id">
                  <el-input v-model="case_num" placeholder="请输入箱数"></el-input>
                </el-form-item>
                <!-- ${item.id}|${item.store_name} -->
                <el-form-item label="仓库" prop="id" style="text-align:left">
                  <el-select v-model="store_id" placeholder="请选择" @change="gor">
                    <el-option
                      v-for="(item,index) in allAdressList"
                      :key="index"
                      :label="item.store_name"
                      :value="item.id">
                    </el-option>
                  </el-select>
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
  import FileSaver from 'file-saver';
  import XLSX from 'xlsx';
  export default {
    name: "productList",
    data() {
      return {
        privilegeList:null,//权限列表信息
        value1: '',//搜索日期

        option_data:[
          {
            name:"入库",
            id:1
          },
          {
            name:"出库",
            id:2
          }
        ],
        editList:null,//编辑新增查询数组 产品列表
        allAdressList:null,//搜索-所有地址列表

        showNone:false,//遮罩层的隐藏
        showNoneUpdate:false,//弹出层编辑的隐藏
        showNoneAdd:false,//弹出层新增的隐藏

        id:null,//编号
        product_id:null,//产品id
        product_name:null,//产品名字
        format:null,//每箱数量
        opt_type:null,//操作类型  1 入库  2 出库
        opt_type_name:null,//操作类型
        case_num:null,//箱数
        store_id:null,//仓库id
        store_name:null,//仓库名字
        operator:null,//操作人  为登录用户

        create_time:null,//创建时间
        data_state:null,//状态
      }
    },
    created() {
      this.getRoleList();
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
       //获取opt_type类型函数
      gor:function(){
           let selectedName = {};
          selectedName = this.allAdressList.find((item)=>{//这里的allAdressList就是上面遍历的数据源
              return item.store_name;
              //筛选出匹配数据，是对应数据的整个对象
          });
          this.store_name=selectedName.store_name;
      },
      //获取仓库流水列表信息--ok
      getRoleList:function(){
        let token =localStorage.getItem('g_token');
        this.$axios({  
          url: '/api/ProductManager/StoreDList',
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
            this.$message(res.data.msg);
          }
        })
        .catch((err)=>{
           console.log(err)
        })
      },
      //详情
      goEdit:function(row){
        let token =localStorage.getItem('g_token');
        // this.showNone=true;
        // this.showNoneUpdate=true;
        // this.row=row;
        // console.log(this.row);
        let product_id = row.product_id;//产品id
        let store_id = row.store_id;//仓库id 
        let format = row.format;//每箱数量
        if(this.value1==false){
            this.$message("日期不能为空");
        }else{
              this.$axios({
                url: '/api/ProductManager/StoreDDetailList?startTime='+this.value1[0]+'&endTime='+this.value1[1]+'&productId='+Number(product_id)+'&storeId='+Number(store_id)+'&format='+Number(format),
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
                      localStorage.setItem("g_messageInfo", JSON.stringify(res.data.data));
                      this.$router.push({path: '/warehouseinfo'});
                  }else if(res.data.code==-1){
                      this.$message(res.data.msg);
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
      //新增
      goAdd:function(){
          let token =localStorage.getItem('g_token');
          let name =localStorage.getItem('g_userName');
          this.operator =name;
          this.showNone=true;
          this.showNoneAdd=true;

          

          this.id=null;//编号
          this.product_id=null;//产品id
          this.product_name=null;//产品名称
          this.format=null;//每箱数量
          this.opt_type=null;//操作类型  1 入库  2 出库
          this.opt_type_name=null;//操作类型
          this.case_num=null;//箱数
          this.store_name=null;//仓库名字
          this.store_id=null;//仓库id

          this.create_time=null;//创建时间
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
                this.editList=res.data.data;//查询成功 赋值新增编辑产品列表信息
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

             this.$axios({  
              url: '/api/ProductManager/StoreAllList',
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
                this.allAdressList=res.data.data;//查询成功 赋值编辑列表信息
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
              url: '/api/ProductManager/ChangeStoreD',
              method: 'post',
              //params参数必写 , 如果没有参数传{}也可以 
              headers:{
                    Authorization:'Bearer '+token
              },
              data:{
                product_id:Number(this.product_id),             // 产品名称
                format:Number(this.format),             // 每箱数量
                case_num:Number(this.case_num),             // 箱数
                store_id:this.store_id,             // 仓库名字id
                operator:this.operator,    //操作人 为用户名字
                opt_type:this.opt_type,   //操作类型  1 为入库 2 为出库
                store_name:this.store_name,//仓库名字
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



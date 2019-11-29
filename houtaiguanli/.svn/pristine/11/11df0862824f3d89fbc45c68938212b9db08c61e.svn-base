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
             <span class="demonstration">活动</span>
            <el-select v-model="adress" placeholder="请选择" >
                <el-option
                v-for="(item,index) in allAdressList"
                :key="index"
                :label="item.activity_name"
                :value="item.id">
                </el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" @click="goSearchId">查询</el-button>
            <el-button type="primary" icon="" @click="exportExcel">导出Excel</el-button>
            
        </div>
        <div class="block2" style="padding:30px 0px 30px 50px">
            
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
                width="200"
                sortable
                prop="create_time">
              </el-table-column>
              <!-- 活动 -->
              <el-table-column
                label="活动"
                width="100"
                sortable
                prop="activity_name">
              </el-table-column>
              <!-- 销售额 -->
              <el-table-column
                label="销售额（元）"
                width="140"
                sortable
                prop="sale_money">
              </el-table-column>
              <!-- 单价 -->
              <el-table-column
                label="单价"
                width="100"
                sortable
                prop="price">
              </el-table-column>
               <!-- 销售数量 -->
              <el-table-column
                label="销售数量"
                width="140"
                sortable
                prop="saleNum">
              </el-table-column>
              <!-- 库存数量 -->
              <el-table-column
                label="库存数量"
                width="100"
                sortable
                prop="cur_num">
              </el-table-column>
              <!-- 员工支出金额1 -->
              <el-table-column
                label="员工支出金额1"
                width="150"
                sortable
                prop="cost_money">
              </el-table-column>
              <!-- 成本支出金额2 -->
              <el-table-column
                label="成本支出金额2"
                width="150"
                sortable
                prop="base_totalmoney">
              </el-table-column>
              <!-- 其他支出3 -->
              <el-table-column
                label="其他支出3"
                width="150"
                sortable
                prop="other_cost_money">
              </el-table-column>
              <!-- 支出合计 -->
              <el-table-column
                label="支出合计"
                width="100"
                sortable
                prop="all_cost_money">
              </el-table-column>
              <!-- 余额 -->
              <el-table-column
                label="余额（元）"
                width="140"
                sortable
                prop="remaining_sum">
              </el-table-column>
            </el-table>
          
        </div>
    <!-- z遮罩层 -->
        <div class="marsk" v-if="showNone"></div>
    </div>
  
</template>
<script>
  import FileSaver from 'file-saver';
  import XLSX from 'xlsx';
  export default {
    name: "productList",
    data() {
      return {
        value1: '',//搜索日期
        allAdressList:null,//搜索-所有地址列表
        adress:null,//搜索选中地址id
        editList:null,//编辑新增查询数组 产品列表
        editNewList:null,//活动列表
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
        
        editNewListStr:'',//最终处理string
        newPassword1:null,//修改密码值
        newPassword2:null,//确认修改密码值
        select_value:null,//下拉框选中的值
        RoleId:null,//选中xia拉框的值  角色名称
      // -----
      textarea:null,//多选框的内容
      aaa:[],

      id:null,//编号
      cost_name:null,//费用名目
      cost_money:null,//金额
      activity_id:null,//活动id
      activityName:null,//活动活动名称
      create_time:null,//创建时间
      data_state:null,//状态
      }
    },
    created() {
      this.getRoleList();
      this.getOptionAdressMsg();
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
      //获取所有活动地
      getOptionAdressMsg:function(){
         let token =localStorage.getItem('g_token'); 
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
          url: '/api/ProductManager/RetailDetailList',
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
            this.$axios({
                url: '/api/ProductManager/RetailDetailList?startTime='+this.value1[0]+'&endTime='+this.value1[1]+'&activityId='+Number(this.adress),
                method: 'get',
                //params参数必写 , 如果没有参数传{}也可以
                headers:{
                    Authorization:'Bearer '+token
                },
                data:{  
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



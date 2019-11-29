<template> 
    <div class="main">
        <!-- <div class="block" style="padding:30px 0px 30px 50px">
          <span class="demonstration">日期范围：</span>
          <el-date-picker
            v-model="value1"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <el-input v-model="input"
            placeholder="输入角色编号、名称"
            size="medium"
            style="width:330px"
          ></el-input>
          <el-button type="primary" icon="el-icon-search" @click="goSearchId">搜索</el-button>
        </div> -->
        <div class="block2" style="padding:30px 0px 30px 50px">
            <!-- <el-button type="primary" icon="el-icon-search">批量删除</el-button>
            <el-button type="primary" icon="el-icon-search">操作员列表</el-button> -->
            <el-button type="primary" icon="el-icon-search" @click="goAdd">添加活动</el-button>
            共有数据  {{allCount}}  条
        </div>

        <div class="app-container">
             <el-table
              border
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
              <!-- 活动名称 -->
              <el-table-column
                label="活动名称"
                width=""
                sortable
                prop="activity_name">
              </el-table-column>
              <!-- 产品名称 -->
              <el-table-column
                label="产品名称"
                width=""
                sortable
                prop="productName">
              </el-table-column>
              <!-- 每箱数量 -->
              <el-table-column
                label="每箱数量"
                width=""
                sortable
                prop="format">
              </el-table-column>
              <!-- 箱数 -->
              <el-table-column
                label="箱数"
                width=""
                sortable
                prop="case_num">
              </el-table-column>
              <!-- 库存数量 -->
              <el-table-column
                label="库存数量"
                width=""
                sortable
                prop="total_num">
              </el-table-column>

              <!-- 操作 -->
              <el-table-column
                fixed="right"
                label="操作"
                width="">
                <template slot-scope="scope">
                  <!-- <el-button prop="isDel" @click="goStop(scope.row)" type="text" size="small">停/启用</el-button> -->
                  <!-- <el-button type="text" size="small" @click="goGai(scope.row)">改密</el-button> -->
                  <el-button type="text" size="small" @click="goEdit(scope.row)">修改</el-button>
                  <el-button type="text" size="small" @click="goDelete(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          
          
        </div>
        <!-- 分页 -->
        <div class="block_fenye">
          <!-- <span class="demonstration">完整功能</span> -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="allCount">
          </el-pagination>
        </div>
    <!-- z遮罩层 -->
        <div class="marsk" v-if="showNone"></div>
    <!-- 弹出框--编辑-- -->
        <div class="pop" v-if="showNoneUpdate">
            <el-form   ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <!--  -->
                <el-form-item label="活动名称" prop="id">
                  <el-input v-model="Activity_name" placeholder="请输入活动名称"></el-input>
                </el-form-item>
                <el-form-item label="产品名称" prop="id" style="text-align:left">
                  <el-select v-model="Product_id" placeholder="">
                    <el-option
                      v-for="(item,index) in editList"
                      :key="index"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="箱数" prop="id">
                  <el-input v-model="Case_num" placeholder="请输入箱数（数字）" ></el-input>
                </el-form-item>
                <el-form-item label="每箱数量" prop="id">
                  <el-input v-model="Format" placeholder="请输入每箱数量（数字）" ></el-input>
                </el-form-item>
                <el-form-item label="库存数量" prop="id">
                  <el-input v-model="Total_num" placeholder="请输入库存数量（数字）" ></el-input>
                </el-form-item>

                


              <el-form-item>
                <el-button type="primary" @click="goKeepUpdate">修改</el-button>
                <el-button @click="reset">取消</el-button>
              </el-form-item>
            </el-form>

        </div>
    <!-- 弹出框--编辑-- -->
    <!-- 弹出框----新增 -->
        <div class="pop" v-if="showNoneAdd">
            <el-form   ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <!--  -->
               <el-form-item label="活动名称" prop="id">
                  <el-input v-model="Activity_name" placeholder="请输入活动名称"></el-input>
                </el-form-item>
                <el-form-item label="产品名称" prop="id" style="text-align:left">
                  <el-select v-model="Product_id" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in editList"
                      :key="index"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="箱数" prop="id">
                  <el-input v-model="Case_num" placeholder="请输入箱数（数字）" ></el-input>
                </el-form-item>
                <el-form-item label="每箱数量" prop="id">
                  <el-input v-model="Format" placeholder="请输入每箱数量（数字）" ></el-input>
                </el-form-item>
                <el-form-item label="库存数量" prop="id">
                  <el-input v-model="Total_num" placeholder="请输入库存数量（数字）" ></el-input>
                </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="goKeepAdd">添加</el-button>
                <el-button @click="reset">取消</el-button>
              </el-form-item>
            </el-form>

        </div>
    <!-- 弹出框----新增 -->
    <!-- 弹出框----改密 -->
        <div class="pop" v-if="showNoneGai">
            <el-form   ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <!--  -->
                <el-form-item label="员工编号" prop="id">
                  <el-input v-model="id" placeholder="创建自动生成员工编号" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="员工姓名" prop="id">
                  <el-input v-model="account" placeholder="创建自动生成员工编号" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="角色名称" prop="id">
                  <el-input v-model="role_name" placeholder="创建自动生成员工编号" :disabled="true"></el-input>
                </el-form-item>
                
                <el-form-item label="密码" prop="pass">
                  <el-input type="password" v-model="newPassword1" autocomplete="off" :show-password="true"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                  <el-input type="password" v-model="newPassword2" autocomplete="off" :show-password="true"></el-input>
                </el-form-item>
                
            <el-form-item>
                <el-button type="primary" @click="goKeepGai">保存</el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
                <el-button @click="reset">关闭弹框</el-button>
              </el-form-item>
            </el-form>

        </div>
    <!-- 弹出框----改密 -->
    </div>
  
</template>
<script>
  import md5 from 'js-md5';
  export default {
    name: "productList",
    data() {
      return {
        privilegeList:null,//产品列表信息
        allCount:0,//权限列表信息zong条数
        editList:null,//编辑新增查询数组
        currentPage4:1,//当前条数
        row:null,//被点击行的数据
        showNone:false,//遮罩层的隐藏
        showNoneUpdate:false,//弹出层编辑的隐藏
        showNoneAdd:false,//弹出层新增的隐藏

        editNewList:[],//选中的数组id
        input: '',//搜索双向绑定
        showNoneGai:false,//弹出层改密的隐藏
        value1: '',//搜索日期
        editListqq:[],//----选中的数组name
        editNewListStr:'',//最终处理string
        newPassword1:null,//修改密码值
        newPassword2:null,//确认修改密码值
        select_value:null,//下拉框选中的值
        RoleId:null,//选中xia拉框的值  角色名称
        // -----
        textarea:null,//多选框的内容
        aaa:[],
        // Id，Activity_name，Product_id，Format，Case_num，Total_num，Create_time，Remarks，Data_state
        id: null ,             // 活动编号
        Activity_name: null,   //   活动名字
        Product_id: null , //     产品名称
        Format: null  ,    //  每箱数量
        Case_num: null , // 箱数
        Total_num: null , // 库存数量
        create_time: null , // 创建时间select_value
        Remarks: null , // 产品
        Data_state: null , // 产品
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
      //获取活动列表信息--ok
      getRoleList:function(){
        let token =localStorage.getItem('g_token');
        this.$axios({  
          url: '/api/ProductManager/ActivityList?selectPageNum=1&everyPageNum=10',
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
            this.allCount=res.data.count[0].allcount; //zong条数
          }else if(res.data.code==-4){
              this.$message('登录信息过期，请重新登录');
                localStorage.removeItem('g_userName');
                localStorage.removeItem('g_token');
                this.$router.push({path: '/login'});
          }else if(res.data.code==-1||-3){
             this.$message(res.data.msg);
          }else{
            this.$message(res.msg);
          }
        })
        .catch((err)=>{
           console.log(err)
        })
      },
      //删除一条--ok
      goDelete:function(row){
        let token =localStorage.getItem('g_token');
        // console.log(row);
        // console.log(this.row)
        // console.log(222)
        this.$axios({  
          url: '/api/ProductManager/ChangeActivityState',
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

          this.Activity_name=null;
          this.Product_id=null;
          this.Format=null;
          this.Case_num=null;
          this.id= null;           // 活动编号
          this.Total_num= null; // 库存数量
          this.create_time= null; // 创建时间select_value
          this.Remarks=null; // 产品
          this.Data_state=null; // 产品

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
                this.editList=res.data.data;//查询成功 赋值新增列表信息
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
      //编辑
      goEdit:function(row){
        let token =localStorage.getItem('g_token');
        this.showNone=true;
        this.showNoneUpdate=true;
        this.row=row;
        // console.log(this.row)

        this.Activity_name=row.activity_name;
        this.Product_id=row.product_id;
        this.Format=row.format;
        this.Case_num=row.case_num;
        this.id= row.id;           // 活动编号
        this.Total_num= row.total_num; // 库存数量
        this.create_time= row.create_time; // 创建时间select_value
        this.Remarks=row.remarks; // 产品
        this.Data_state=row.data_state; // 产品

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
              url: '/api/ProductManager/ChangeActivity',
              method: 'post',
              //params参数必写 , 如果没有参数传{}也可以 
              headers:{
                    Authorization:'Bearer '+token
              },
              data:{   
                  Activity_name: this.Activity_name,   //   活动名字
                  Product_id: this.Product_id, //     产品名称
                  Format: Number(this.Format),    //  每箱数量
                  Case_num: Number(this.Case_num), // 箱数
                  Total_num: Number(this.Total_num), // 库存数量
                  Remarks: this.Remarks, // 产品
                  Data_state: this.Data_state, // 产品
              }
            })
            .then((res)=>{
              // console.log(res.data)
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
          let token =localStorage.getItem('g_token');
          this.$axios({  
              url: '/api/ProductManager/ChangeActivity',
              method: 'post',
              //params参数必写 , 如果没有参数传{}也可以 
              headers:{
                    Authorization:'Bearer '+token
              },
              data:{   
                  Id: this.id,   //   id
                  Activity_name: this.Activity_name,   //   活动名字
                  Product_id: this.Product_id, //     产品名称
                  Format: Number(this.Format),    //  每箱数量
                  Case_num: Number(this.Case_num), // 箱数
                  Total_num: Number(this.Total_num), // 库存数量
                  Remarks: this.Remarks, // 产品
                  Data_state: this.Data_state, // 产品
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
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(val);
        let token =localStorage.getItem('g_token');
        this.$axios({  
          url: '/api/ProductManager/ActivityList?selectPageNum='+val+'&everyPageNum=10',
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
            this.allCount=res.data.count[0].allcount; //zong条数
          }else if(res.data.code==-4){
              this.$message('登录信息过期，请重新登录');
                localStorage.removeItem('g_userName');
                localStorage.removeItem('g_token');
                this.$router.push({path: '/login'});
          }else{
            this.$message(res.msg);
          }
        })
        .catch((err)=>{
           console.log(err)
        })
      },


      
        
      
    }
  }
</script>
<style>


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
  position: absolute;
  top: 0;
  left: 0; 
  width: 100%;
  height: 140%;
  background: #000;
  opacity: 0.5;
  z-index: 2999;
}
.pop{
  padding:2% 4%;
  position: absolute;
  top: 9%;
  left: 18%; 
  width: 60%;
  height: 80%;
  background: #fff;
  z-index: 3001;
}
</style>



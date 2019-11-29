<template> 
    <div class="main">
        <div class="block2" style="padding:30px 0px 30px 50px">
            <el-button type="primary" icon="el-icon-search" @click="goAdd">添加产品</el-button>
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
              <!-- 产品名称 -->
              <el-table-column
                label="产品名称"
                width=""
                sortable
                prop="name">
              </el-table-column>
              <!-- 操作 -->
              <el-table-column
                fixed="right"
                label="操作"
                width="">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="goEdit(scope.row)">编辑</el-button>
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
                <el-form-item label="产品名称" prop="id">
                  <el-input v-model="productName" placeholder="请输入产品名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="goKeepUpdate">修改</el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
                <el-button @click="reset">取消</el-button>
              </el-form-item>
            </el-form>

        </div>
    <!-- 弹出框--编辑-- -->
    <!-- 弹出框----新增 -->
        <div class="pop" v-if="showNoneAdd">
            <el-form   ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <!--  -->
              <el-form-item label="产品名称" prop="id">
                  <el-input v-model="productName" placeholder="请输入产品名称"></el-input>
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
  export default {
    name: "productList",
    data() {
      return {
        privilegeList:null,//权限列表信息
        productName:null,//产品名称
        showNone:false,//遮罩层的隐藏
        showNoneUpdate:false,//弹出层编辑的隐藏
        showNoneAdd:false,//弹出层新增的隐藏
        allCount:null,//权限列表信息zong条数
        row:null,//被点击行的数据
        currentPage4:1,//当前条数

        input: '',//搜索双向绑定  //--------暂未使用
        showNoneGai:false,//弹出层改密的隐藏
        value1: '',//搜索日期
        editList:null,//编辑新增查询数组
        editListqq:[],//----选中的数组name
        editNewList:[],//选中的数组id
        editNewListStr:'',//最终处理string
        newPassword1:null,//修改密码值
        newPassword2:null,//确认修改密码值
        select_value:null,//下拉框选中的值
        RoleId:null,//选中xia拉框的值  角色名称
        // -----
        textarea:null,//多选框的内容
        aaa:[],//--------暂未使用

        id: null ,             // 产品编号
        name: null , //     产品名称
        data_state: null  ,    //  产品状态 
        create_time: null , // 创建时间
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
      //获取产品列表信息--ok
      getRoleList:function(){
        let token =localStorage.getItem('g_token');
        this.$axios({  
          url: '/api/ProductManager/ProductList?selectPageNum=1&everyPageNum=10',
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
            this.allCount=res.data.count[0].allcount; //zong条数
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
      //删除一条--ok
      goDelete:function(row){
        let token =localStorage.getItem('g_token');
        // console.log(row);
        // console.log(this.row)
        // console.log(222)
        this.$axios({  
          url: '/api/ProductManager/ChangeProductState',
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
          // console.log(res)
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
          this.productName=null;
      },
      //编辑
      goEdit:function(row){
        let token =localStorage.getItem('g_token');
        this.showNone=true;
        this.showNoneUpdate=true;
        this.row=row;
        // console.log(this.row)

        this.productName=row.name;
        this.id=row.id;
        this.data_state=row.data_state; 
      },
      //保存--新增
      goKeepAdd:function(){
          let token =localStorage.getItem('g_token');
          this.$axios({  
              url: '/api/ProductManager/ChangeProduct',
              method: 'post',
              //params参数必写 , 如果没有参数传{}也可以 
              headers:{
                    Authorization:'Bearer '+token
              },
              data:{   
                // type:1,
                Name:this.productName,             // 产品名称
                Data_state:null,//
              }
            })
            .then((res)=>{
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
              url: '/api/ProductManager/ChangeProduct',
              method: 'post',
              //params参数必写 , 如果没有参数传{}也可以 
              headers:{
                    Authorization:'Bearer '+token
              },
              data:{   
                id:this.id,             // 产品编号
                name:this.productName,             // 产品名称
                data_state:this.data_state,    //  
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
          url: '/api/ProductManager/ProductList?selectPageNum='+val+'&everyPageNum=10',
          method: 'get',
          //params参数必写 , 如果没有参数传{}也可以
          headers:{
                Authorization:'Bearer '+token
          },
          data:{  
          }
        })
        .then((res)=>{
          console.log(res)
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



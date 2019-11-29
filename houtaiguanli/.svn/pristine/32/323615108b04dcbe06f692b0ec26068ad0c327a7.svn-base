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
          <el-input v-model="input"
            placeholder="输入角色编号、名称"
            size="medium"
            style="width:330px"
          ></el-input>
          <el-button type="primary" icon="el-icon-search" @click="goSearchId">搜索</el-button>
        </div>
        <div class="block2" style="padding:30px 0px 30px 50px">
            <el-button type="primary" icon="el-icon-search">批量删除</el-button>
            <el-button type="primary" icon="el-icon-search">操作员列表</el-button>
            <el-button type="primary" icon="el-icon-search" @click="goAdd">新增操作员</el-button>
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

              <!-- 员工编号 -->
              <el-table-column
                label="员工编号"
                width=""
                sortable
                prop="id">
              </el-table-column>
              <!-- 员工姓名 -->
              <el-table-column
                label="员工姓名"
                width=""
                sortable
                prop="account">
              </el-table-column>
              <!-- 角色名称 -->
              <el-table-column
                label="角色名称"
                width=""
                sortable
                prop="role_name">
              </el-table-column>
              <!-- 状态 -->
              <el-table-column
                label="状态"
                width=""
                sortable
                prop="isDel">
              </el-table-column>
              <!-- 操作时间 -->
              <el-table-column
                label="操作时间"
                width=""
                sortable
                prop="create_time">
              </el-table-column>
              <!-- 操作 -->
              <el-table-column
                fixed="right"
                label="操作"
                width="">
                <template slot-scope="scope">
                  <el-button prop="isDel" @click="goStop(scope.row)" type="text" size="small">停/启用</el-button>
                  <el-button type="text" size="small" @click="goGai(scope.row)">改密</el-button>
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
                <el-form-item label="员工编号" prop="id">
                  <el-input v-model="id" placeholder="请输入角色编号" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="员工姓名" prop="id">
                  <el-input v-model="account" placeholder="请输入角色编号" ></el-input>
                </el-form-item>
                <el-form-item label="角色名称" prop="id" style="text-align:left">
                  <el-select v-model="select_value" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in editList"
                      :key="index"
                      :label="item.role_name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="id">
                  <el-input v-model="isDel" placeholder="1停用 0启用" ></el-input>
                </el-form-item>

                


              <el-form-item>
                <el-button type="primary" @click="goKeepUpdate">保存</el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
                <el-button @click="reset">关闭弹框</el-button>
              </el-form-item>
            </el-form>

        </div>
    <!-- 弹出框--编辑-- -->
    <!-- 弹出框----新增 -->
        <div class="pop" v-if="showNoneAdd">
            <el-form   ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <!--  -->
               <el-form-item label="员工编号" prop="id">
                  <el-input v-model="id" placeholder="请输入角色编号" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="员工姓名" prop="id">
                  <el-input v-model="account" placeholder="请输入角色编号" ></el-input>
                </el-form-item>
                <el-form-item label="角色名称" prop="id" style="text-align:left">
                  <el-select v-model="select_value" placeholder="请选择" >
                    <el-option
                      v-for="(item,index) in editList"
                      :key="index"
                      :label="item.role_name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="id">
                  <el-input v-model="isDel" placeholder="1停用 0启用" ></el-input>
                </el-form-item>



            <el-form-item>
                <el-button type="primary" @click="goKeepAdd">保存</el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
                <el-button @click="reset">关闭弹框</el-button>
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
        privilegeList:null,//权限列表信息
        allCount:null,//权限列表信息zong条数
        input: '',//搜索双向绑定
        row:null,//被点击行的数据
        showNone:false,//遮罩层的隐藏
        showNoneUpdate:false,//弹出层编辑的隐藏
        showNoneAdd:false,//弹出层新增的隐藏
        showNoneGai:false,//弹出层改密的隐藏
        value1: '',//搜索日期
        currentPage4:1,//当前条数
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
      aaa:[],
      id: null ,             // 员工编号
      account: null,   //   员工姓名
      role_name: null , //     角色名称
      isDel: null  ,    //  状态 1停用 0正常 
      create_time: null , // 创建时间select_value
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
      // gor:function(){
      //     console.log(this.select_value)
      // },
      //获取权限列表信息--ok
      getRoleList:function(){
        let token =localStorage.getItem('g_token');
        this.$axios({  
          url: '/api/AdminManager/AdminList?selectPageNum=1&everyPageNum=10',
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
        // console.log(this.value1)
        if(this.value1==false){
            this.$message("日期不能为空");
        }else{
            this.$axios({  ///api/AdminManager/RoleList?selectPageNum=1&everyPageNum=10&name=&startTime=2019-05-15&endTime=2019-05-16
                url: '/api/AdminManager/AdminList?startTime='+this.value1[0]+'&endTime='+this.value1[1]+'&name='+this.input,
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
                    this.allCount=res.data.count[0].allcount //查询成功重新赋值zong条数
                }else if(res.data.code==-1){
                    this.$message(res.data.msg);
                    this.privilegeList=res.data.data //查询成功重新赋值列表信息
                    this.allCount=res.data.count[0].allcount //查询成功重新赋值zong条数
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
          url: '/api/AdminManager/ChangeAdminState',
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
      //  停用？启用   1.启用 2.停用
      goStop:function(row){
        let token =localStorage.getItem('g_token');
        if(row.isDel=="启用"){
            this.$axios({  
              url: '/api/AdminManager/ChangeAdminState',
              method: 'post',
            //params参数必写 , 如果没有参数传{}也可以 
              headers:{
                    Authorization:'Bearer '+token
              },
              data:{ 
                type:2,
                id:row.id
              }
            })
            .then((res)=>{
              if(res.data.code==1){
                // this.privilegeList=res.data.data //查询成功重新赋值列表信息
                // this.allCount=res.data.count[0].allcount //查询成功重新赋值zong条数
                location.reload();
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
        }else if(row.isDel=="停用"){
            this.$axios({  
              url: '/api/AdminManager/ChangeAdminState',
              method: 'post',
            //params参数必写 , 如果没有参数传{}也可以
              headers:{
                    Authorization:'Bearer '+token
              }, 
              data:{ 
                type:1,
                id:row.id
              }
            })
            .then((res)=>{
              if(res.data.code==1){
                // this.privilegeList=res.data.data //查询成功重新赋值列表信息
                // this.allCount=res.data.count[0].allcount //查询成功重新赋值zong条数
                location.reload();
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
          this.showNone=true;
          this.showNoneAdd=true;

          this.role_name=null;
          this.select_value=null;
          this.id=null;
          this.account=null;
          this.isDel=null;
          this.update_time=null; 
          this.$axios({  
              url: '/api/AdminManager/GetAdminRole',
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
      //编辑
      goEdit:function(row){
        let token =localStorage.getItem('g_token');
        this.showNone=true;
        this.showNoneUpdate=true;
        this.row=row;
        console.log(this.row)

        this.id=row.id;
        this.account=row.account;
        this.isDel=row.isDel;
        this.update_time=row.update_time; 
        this.$axios({  
              url: '/api/AdminManager/GetAdminRole',
              method: 'get',
              //params参数必写 , 如果没有参数传{}也可以 
              headers:{
                    Authorization:'Bearer '+token
              },
              data:{   
                id:row.id,             // id
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
      //改密  
      goGai:function(row){
        let token =localStorage.getItem('g_token');
        this.showNone=true;
        this.showNoneGai=true;
        this.row=row;
        // console.log(this.row)

        this.id=row.id;
        this.account=row.account;//员工姓名
        this.role_name=row.role_name;
        if(row.isDel=="启用"){
            this.isDel=0;
        }else if(row.isDel=="停用"){
            this.isDel=1;
        }
      },
      //编辑--新增  多选选中获取id
      getId:function(id){
        console.log(this.editListqq)
        // console.log(id)
        if(this.editNewList.indexOf(id)==-1){
            this.editNewList.push(id)
        }else{
            this.editNewList.splice(this.editNewList.indexOf(id), 1); 
        }
        // console.log(this.editNewList);
        // console.log(this.editNewList.toString());
        this.editNewListStr=this.editNewList.toString();//最终处理的字符串
      },
      //保存--改密
      goKeepGai:function(){
        // console.log(md5("123456"))
        // console.log(md5(this.newPassword1))
          let token =localStorage.getItem('g_token');
          if(this.newPassword1==this.newPassword2){
               this.$axios({  
                  url: '/api/AdminManager/ChangeAdmin',
                  method: 'post',
                  //params参数必写 , 如果没有参数传{}也可以 
                  headers:{
                        Authorization:'Bearer '+token
                  },
                  data:{  
                    type:3, 
                    id:this.id,             // 员工编号
                    account:this.account,             // 员工姓名
                    passwd:md5(this.newPassword1),   //   密码
                    isDel: Number(this.isDel)  ,    //  状态 1停用 0正常 
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
          }else{
              this.$message("两次输入密码不一致");
          }

          
         
      },
      //保存--新增
      goKeepAdd:function(){
          // console.log(e.target)
          // console.log(this.editList)
          let token =localStorage.getItem('g_token');
          console.log(this.is_del)
          this.$axios({  
              url: '/api/AdminManager/ChangeAdmin',
              method: 'post',
              //params参数必写 , 如果没有参数传{}也可以 
              headers:{
                    Authorization:'Bearer '+token
              },
              data:{   
                type:1,
                // id:this.id,             // 员工编号
                account:this.account,             // 员工名称
                isDel: Number(this.isDel)  ,    //  状态 1停用 0正常 
                RoleId:this.select_value//选中xia拉框的值  角色名称
              }
            })
            .then((res)=>{
              console.log(res.data)
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
          console.log(this.select_value)
          // console.log(this.editList)
          let token =localStorage.getItem('g_token');
          console.log(this.isDel)
          this.$axios({  
              url: '/api/AdminManager/ChangeAdmin',
              method: 'post',
              //params参数必写 , 如果没有参数传{}也可以 
              headers:{
                    Authorization:'Bearer '+token
              },
              data:{   
                type:2,
                id:this.id,             // 员工编号
                account:this.account,             // 员工名称
                isDel: Number(this.isDel)  ,    //  状态 1停用 0正常 
                RoleId:this.select_value//选中xia拉框的值  角色名称
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
          url: '/api/AdminManager/AdminList?selectPageNum='+val+'&everyPageNum=10',
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
  height: 200%;
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



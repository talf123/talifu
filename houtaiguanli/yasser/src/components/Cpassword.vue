<template> 
    <div class="main">
    <!-- 弹出框----改密 -->
        <div class="pop" >
            <el-form   ref="ruleForm" label-width="100px" class="demo-ruleForm">
                 <el-form-item label="请输入旧密码" prop="pass">
                  <el-input type="password" v-model="oldPassword" autocomplete="off" :show-password="true"></el-input>
                </el-form-item>
                <el-form-item label="请输入新密码" prop="pass">
                  <el-input type="password" v-model="newPassword1" autocomplete="off" :show-password="true"></el-input>
                </el-form-item>
                <el-form-item label="请确认新密码" prop="checkPass">
                  <el-input type="password" v-model="newPassword2" autocomplete="off" :show-password="true"></el-input>
                </el-form-item>
                
            <el-form-item>
                <el-button type="primary" @click="goKeepGai">修改</el-button>
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
        oldPassword:null,//老的密码
        newPassword1:null,//修改密码值
        newPassword2:null,//确认修改密码值、
      }
    },
    created() {
    },
    watch: {
      
    },
    filters: {
      
    },
    methods: {
      //保存--改密
      goKeepGai:function(){
        // console.log(md5("123456"))
        // console.log(md5(this.newPassword1))
        console.log(this.oldPassword)
        console.log(this.newPassword1)
        console.log(this.newPassword2)
          let token =localStorage.getItem('g_token');
          let id =localStorage.getItem('g_id');
          if(this.newPassword1==this.newPassword2){
               this.$axios({  
                  url: '/api/AdminManager/ChangeAdminState',
                  method: 'post',
                  //params参数必写 , 如果没有参数传{}也可以 
                  headers:{
                        Authorization:'Bearer '+token
                  },
                  data:{  
                    type:4, 
                    id:Number(id),
                    oldPwd:md5(this.oldPassword),//旧密码
                    newPwd:md5(this.newPassword1),//密码
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
                    this.$message(res.data.msg);
                  }
                })
                .catch((err)=>{
                      console.log(err)
                })
          }else{
              this.$message("两次输入密码不一致");
          }

          
         
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



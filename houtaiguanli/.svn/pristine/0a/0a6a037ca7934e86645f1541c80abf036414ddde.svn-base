<template>
  <div>
    <el-card class="login-form-layout">
      <el-form autoComplete="on"
               ref="loginForm"
               label-position="left">
        <div style="text-align: center">
          <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>
        </div>
        <h2 class="login-title color-main">后台管理</h2>
        <el-form-item prop="username">
          <el-input name="username"
                    type="text"
                    v-model="username"
                    autoComplete="on"
                    placeholder="请输入用户名">
          <span slot="prefix">
            <svg-icon icon-class="user" class="color-main"></svg-icon>
          </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password"
                    :type="pwdType"
                    @keyup.enter.native="handleLogin"
                    v-model="password"
                    autoComplete="on"
                    placeholder="请输入密码">
          <span slot="prefix">
            <svg-icon icon-class="password" class="color-main"></svg-icon>
          </span>
            <span slot="suffix" @click="showPwd">
            <svg-icon icon-class="eye" class="color-main"></svg-icon>
          </span>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px">
            <!-- <router-link to="/home"> -->
          <el-button style="width: 100%" type="primary" :loading="loading" @click="goLogin">
            登录
          </el-button>
          <!-- </router-link> -->
        </el-form-item>
      </el-form>
    </el-card>
    <img :src="login_center_bg" class="login-center-layout">
  </div>
</template>

<script>
  import md5 from 'js-md5';
  import {isvalidUsername} from '@/utils/validate';
  import {setSupport,getSupport,SupportUrl} from '@/utils/support';
  import login_center_bg from './imgs/login_center_bg.png'

  export default {
    name: 'login',
    data() {
      // const validateUsername = (rule, value, callback) => {
      //   if (!isvalidUsername(value)) {
      //     callback(new Error('请输入正确的用户名'))
      //   } else {
      //     callback()
      //   }
      // };
      // const validatePass = (rule, value, callback) => {
      //   if (value.length < 3) {
      //     callback(new Error('密码不能小于3位'))
      //   } else {
      //     callback()
      //   }
      // };
      return {
        username:null,
        password:null,
        // loginForm: {
        //   username: 'admin',
        //   password: '123456',
        // },
        // loginRules: {
        //   username: [{required: true, trigger: 'blur', validator: validateUsername}],
        //   password: [{required: true, trigger: 'blur', validator: validatePass}]
        // },
        loading: false,
        pwdType: 'password',
        login_center_bg,
        dialogVisible:false
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      goLogin() {
        // console.log(this.username);
        // console.log(this.password);
        // console.log(md5(this.password));
        this.$axios({  
          url: '/api/Auto',
          method: 'post',
        //params参数必写 , 如果没有参数传{}也可以
          data:{  
            account:this.username,
            passwd:md5(this.password)
          }
        })
        // this.$axios.post('http://192.168.84.170:9005/api/AdminManager/Login', {  
        // //params参数必写 , 如果没有参数传{}也可以
        //   params:{  
        //     account:"yxh",
        //     passwd:"21232f297a57a5a743894a0e4a801fc3"
        //   }
        // })
        .then((res)=>{
          // console.log(res)
          // console.log(res.data.token)
          if(res.data.code==1){ 
            localStorage.setItem("g_token",res.data.token);
            localStorage.setItem("g_userName", 'admin');
            localStorage.setItem("g_router", JSON.stringify(res.data.data));
            // this.$cookies.set("g_userName", 'admin');
            this.$router.push({path: '/'});
          }else if(res.data.code==-1){
            localStorage.setItem("g_token",res.data.token);
            localStorage.setItem("g_userName", 'admin');
            // this.$cookies.set("g_userName", 'admin');
            this.$router.push({path: '/'});
          }else if(res.data.code==-2){
            this.$message(res.data.msg);
          }
        })
        .catch((err)=>{
          console.log(err)
        })
      },
      dialogConfirm(){
        this.dialogVisible =false;
        setSupport(true);
        window.location.href=SupportUrl;
      },
      dialogCancel(){
        this.dialogVisible = false;
        setSupport(false);
      }
    }
  }
</script>

<style scoped>
  .login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 360px;
    margin: 140px auto;
    border-top: 10px solid #409EFF;
  }

  .login-title {
    text-align: center;
  }

  .login-center-layout {
    background: #409EFF;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin-top: 200px;
  }
</style>

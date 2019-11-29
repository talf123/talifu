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
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-input name="code"
                    type="text"
                    v-model="code"
                    autoComplete="on"
                    placeholder="请输入验证码">
            <span slot="suffix" @click="getCode">
              <img style="height:32px;cursor:pointer;" :src="codeImgUrl" alt="点击刷新" title="点击刷新">
              <!-- <svg-icon icon-class="eye" class="color-main"></svg-icon> -->
            </span>
          </el-input>
        </el-form-item>  
        <!-- 验证码 -->
        <el-form-item style="margin-bottom: 60px">
            <!-- <router-link to="/home"> -->
          <el-button style="width: 100%;" type="primary" :loading="loading" @click="goLogin">
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
  // import {isvalidUsername} from '@/utils/validate';
  // import {setSupport,getSupport,SupportUrl} from '@/utils/support';
  import login_center_bg from './imgs/login_center_bg.png'

  export default {
    name: 'login',
    data() {
      return {
        username:null,//账号
        password:null,//密码
        code:null,//验证码
        codeImgUrl:'http://192.168.84.170:9005/api/Auto?',//验证码获取地址
        codeId:null,//codeId

        num:1,//验证码初始url拼接数据
        loading: false,
        pwdType: 'password',
        login_center_bg,
        dialogVisible:false
      }
    },
    created () {
      this.getInitCode()
      
    },
    methods: {
      //初始化拿到验证码
      getInitCode:function(){
           this.$axios({  
            url: '/api/Auto',
            method: 'get',
          //params参数必写 , 如果没有参数传{}也可以
            data:{ 
            }
          })
          .then((res)=>{
            this.codeImgUrl="data:image/png;base64,"+res.data.msg;
            this.codeId=res.data.code;
          })
          .catch((err)=>{
            console.log(err)
          })
      },
      getCode:function(){
        this.$axios({  
            url: '/api/Auto',
            method: 'get',
          //params参数必写 , 如果没有参数传{}也可以
            data:{ 
            }
          })
          .then((res)=>{
            this.codeImgUrl="data:image/png;base64,"+res.data.msg;
            this.codeId=res.data.code;
          })
          .catch((err)=>{
            console.log(err)
          })

      },
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      goLogin() {
        this.$axios({  
          url: '/api/Auto',
          method: 'post',
        //params参数必写 , 如果没有参数传{}也可以
          data:{  
            account:this.username,
            passwd:md5(this.password),
            code:this.code,
            codeId:this.codeId,
          }
        })
        .then((res)=>{
          // console.log(res)
          // console.log(res.data.token)
          if(res.data.code==1){ 
            localStorage.setItem("g_id",res.data.count[0].id);
            localStorage.setItem("g_token",res.data.token);
            localStorage.setItem("g_userName", this.username);
            localStorage.setItem("g_router", JSON.stringify(res.data.data));
            this.$router.push({path: '/'});
          }else if(res.data.code==-1){
            // localStorage.setItem("g_token",res.data.token);
            // localStorage.setItem("g_userName", 'admin');
            // this.$cookies.set("g_userName", 'admin');
            // this.$router.push({path: '/'});
            this.$message(res.data.msg);
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

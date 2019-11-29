<template>
  <div id="app">
    <router-view/>
    <!-- <router-view name="Login" style=""></router-view> -->
    <router-view name="nav" style=""></router-view>
    <div class="body_main"> 
      <router-view name="sidebar" style=""></router-view>
      <router-view name="main" style="">
      </router-view>
    </div>
    
    <!-- </transition-group> -->
    <!-- <p>导航 ：
      <router-link to="/">首页</router-link>
      <router-link to="/helloworld">helloworld页面</router-link> |
      <router-link to="/hi">Hi页面</router-link> |
      <router-link :to="{name:'Hi1',params:{username:'xiaoxiao'}}">Hi页面1</router-link>|
      <router-link to="/hi/hi2">-Hi页面2</router-link>|
      <router-link to="/params/198/jspang website is very good">params</router-link> |
      <router-link to="/bbbbbb">我是瞎写的</router-link> |
      <router-link to="/count">计数</router-link> |
    </p> -->
    <!-- <b>{{ $route.meta.a}}</b> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
         goback(){
            this.$nextTick(function () {
              this.$router.go(-1); }
            )
          
        },
        gohome(){
            this.$nextTick(function () {
              this.$router.push('/'); }
            )
          
        }
   
  }
}
</script>

<style>
*{
  margin: 0;
  padding:0;
}
html,body{
  width:100%;
  height: 100%;
  overflow:auto;   /* 用于 android4+，或其他设备 */
  -webkit-overflow-scrolling:touch;    /* 用于 ios5+ */ 
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100%;
  height: 100%;
  display: flex;
  flex-direction:column;
}
a{text-decoration:none}
.fade-enter {
  opacity:0;
}
.fade-leave{
  opacity:1;
}
.fade-enter-active{
  transition:opacity .5s;
}
.fade-leave-active{
  opacity:0;
  transition:opacity .5s;
}
.nav{
  height: 51px;
  width:100%;
}
.body_main{
  flex: 1;
  display: flex;
}
.side{
  height: 100%;
  overflow-y: scroll;
  background: #545c64;
}
.main{
  overflow:scroll;
  /* min-width: 840px; */
  /* width:80%; */
  flex: 1;
  /* padding-bottom: 30px; */
}
/*解决合计在滚动条下 */
/* .el-table{
    overflow: auto;
}
 .el-table__header-wrapper, 
 .el-table__body-wrapper, 
 .el-table__footer-wrapper{
          overflow:visible;     
    }
  .el-table__body-wrapper{
    overflow-x:visible !important;
  } */
  /* 这个是为了解决前面样式覆盖之后伪类带出来的竖线 */
 /* .el-table::after{
    position: relative;
} */
</style>

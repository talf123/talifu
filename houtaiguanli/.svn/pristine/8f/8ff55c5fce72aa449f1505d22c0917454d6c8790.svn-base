<template>
  <div id="app">
    <router-view/>
    <!-- <router-view name="Login" style=""></router-view> -->
    <router-view name="nav" style=""></router-view>
    <div class="body_main"> 
      <router-view name="sidebar" style=""></router-view>
      <router-view name="main" style=""></router-view>
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
    <!-- <b>{{ $route.name}}</b> -->
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
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100%;
  height: 100%;
}
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
  /* border-bottom:1px solid saddlebrown; */
  height: 8%;
  /* position: absolute; */
  /* top: 0; */
  /* left: 0; */
  /* z-index: 999; */

}
.body_main{
  width:100%;
  height: 90%;
  display: flex;
}
.side{
  border-right: solid 1px #e6e6e6;
  box-sizing:border-box;
  height: 100%;
  background: #545c64;
}
.main{
  overflow:scroll;
  min-width: 840px;
  width:80%;
  flex: 1;
  /* padding-bottom: 50px; */
}
</style>

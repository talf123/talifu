// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
Vue.use(iView);

import store from './store'//引入store

import Global_ from './assets/js/Global'   //全局对象
Vue.prototype.GLOBAL = Global_; //添加Global_到Vue的原型对象上

// import Blob from './assets/js/Blob';
// import Export2Excel from './assets/js/Export2Excel';

import axios from 'axios';//引入axios
// import axios from './assets/js/axios';   //并依据创建文件
Vue.prototype.$axios = axios; //添加axios到Vue的原型对象上

import echarts from 'echarts'
Vue.prototype.$echarts = echarts  //echarts图表

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)   //markdown 编辑器

import './assets/global.scss'

import './assets/svgImg'

// 以下是注册组件的方法
import NavBar from './components/component/Nav.vue';
import SilderBar from './components/component/Silder.vue';
import TagBar from './components/component/Tag.vue';
Vue.component("NavBar",NavBar); // 全局注册组件
Vue.component("SilderBar",SilderBar); // 全局注册组件
Vue.component("TagBar",TagBar); // 全局注册组件

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//使用store
  components: { App },
  template: '<App/>'
})


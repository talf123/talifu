// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// import axios from 'axios';//引入axios
import axios from './assets/js/axios';   //并依据创建文件
Vue.prototype.$axios = axios; //添加axios到Vue的原型对象上

import './assets/global.scss'

import './assets/svgImg'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

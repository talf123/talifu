// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import axios from 'axios';//引入axios;
// import VueCookies from 'vue-cookies'
// Vue.prototype.$cookie = VueCookies
// Vue.use(VueCookies)
import axios from './assets/js/axios';
import './icons'
Vue.prototype.$axios = axios; //添加axios到Vue的原型对象上
// Vue.use(icon);
Vue.use(ElementUI,{ size: 'small', zIndex: 3000 });
Vue.config.productionTip = false

// import cookies from 'vue-cookies'
// Vue.prototype.$cookie = cookies;
// Vue.use(cookies)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

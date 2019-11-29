import Vue from 'vue'
import Router from 'vue-router' 
import Login from '@/components/Login' //登录
import Error from '@/components/Error' //错误
import Nav from '@/components/Nav' //导航栏
import Sidebar from '@/components/Sidebar' //侧边栏
import Dask from '@/components/Dask' //首页
import Privilege from '@/components/Privilege' //权限管理
import Role from '@/components/Role' //权限管理operators
import Operators from '@/components/Operators' //权限管理operators
import SaleManage from '@/components/SaleManage' //业务员管理
import RetailProduct from '@/components/RetailProduct' //零售产品明细
import RetailPay from '@/components/RetailPay' //零售产品支出



Vue.use(Router)

// import VueCookies from 'vue-cookies'
// Vue.use(VueCookies)
const router= new Router({
  mode:'history',
  routes: [
    {
      path:'*',
      component:Error
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
     {
      path: '/',//首页
      name: 'Index',
      components: {
        // default:Header,
        // default:Footer
        nav:Nav,
        main:Dask,
        sidebar:Sidebar
      }
    },
    {
      path: '/operators',//操作员管理
      name: 'Operators',
      components: {
        nav:Nav,
        main:Operators,
        sidebar:Sidebar
      }
    },
    {
      path: '/privilege',//权限管理
      name: 'Privilege',
      components: {
        nav:Nav,
        main:Privilege,
        sidebar:Sidebar
      }
    },
    {
      path: '/role',//角色管理
      name: 'Role',
      components: {
        nav:Nav,
        main:Role,
        sidebar:Sidebar
      }
    },
    {
      path: '/salemanage',//业务员管理
      name: 'SaleManage',
      components: {
        nav:Nav,
        main:SaleManage,
        sidebar:Sidebar
      }
    },
    {
      path: '/retailproduct',//零售产品明细
      name: 'RetailProduct',
      components: {
        nav:Nav,
        main:RetailProduct,
        sidebar:Sidebar
      }
    },
    {
      path: '/retailpay',//零售产品支出
      name: 'RetailPay',
      components: {
        nav:Nav,
        main:RetailPay,
        sidebar:Sidebar
      }
    },
  ]
})
// 全局路由守卫
router.beforeEach((to, from, next) => {
  // console.log('navigation-guards');
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  const nextRoute = ['Index', 'Count', 'HelloWorld','Privilege','Role','Operators'];
  let isLogin=localStorage.getItem("g_userName");// 是否登录
  // console.log(isLogin);
  // 未登录状态；当路由到nextRoute指定页时，跳转至login
  if (nextRoute.indexOf(to.name) >= 0) { 
    if (isLogin==null) {
      console.log('what fuck');
      router.push({ name: 'Login' })
    }
  }
  // 已登录状态；当路由到login时，跳转至home
  if (to.name === 'Login') {
    if (isLogin) {
      router.push({ name: 'Index' });
    }
  }
  next();
});
export default router

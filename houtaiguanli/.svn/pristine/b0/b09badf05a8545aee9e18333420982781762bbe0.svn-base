import Vue from 'vue'
import Router from 'vue-router' 
import Login from '@/components/Login' //登录
import Error from '@/components/Error' //错误
import Nav from '@/components/Nav' //导航栏
import Sidebar from '@/components/Sidebar' //侧边栏
import Dask from '@/components/Dask' //首页
import Cpassword from '@/components/Cpassword' //修改密码
import Privilege from '@/components/Privilege' //权限管理
import Role from '@/components/Role' //权限管理operators
import Operators from '@/components/Operators' //权限管理operators
import SaleManage from '@/components/SaleManage' //业务员管理
import RetailProduct from '@/components/RetailProduct' //零售--产品成本明细
import RetailPay from '@/components/RetailPay' //零售--产品支出明细
import ProductList from '@/components/ProductList' //产品列表   
import ActivityList from '@/components/ActivityList' //活动列表
import Salesman from '@/components/Salesman' //业务员列表
import Stock from '@/components/Stock' //进货还贷列表
import Wholesale from '@/components/Wholesale' //批发还款流水
import Warehouse from '@/components/Warehouse' //仓库流水
import Retail from '@/components/Retail' //零售流水明细
import Ware from '@/components/Ware' //仓库流水
import Warehouseinfo from '@/components/Warehouseinfo' //仓库流水详情
Vue.use(Router)

// import VueCookies from 'vue-cookies'
// Vue.use(VueCookies)
const router= new Router({
  // mode:'history',
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
      path: '/cpassword',//改密
      name: 'Cpassword',
      components: {
        nav:Nav,
        main:Cpassword,
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
    {
      path: '/productlist',//产品列表
      name: 'ProductList',
      components: {
        nav:Nav,
        main:ProductList,
        sidebar:Sidebar
      }
    },
    {
      path: '/activitylist',//活动列表
      name: 'ActivityList',
      components: {
        nav:Nav,
        main:ActivityList,
        sidebar:Sidebar
      }
    },
    {
      path: '/salesman',//业务员列表
      name: 'Salesman',
      components: {
        nav:Nav,
        main:Salesman,
        sidebar:Sidebar
      },
      meta:{
      }
    },
    {
      path: '/stock',//业务员列表
      name: 'Stock',
      components: {
        nav:Nav,
        main:Stock,
        sidebar:Sidebar
      },
      meta:{
      }
    },
    {
      path: '/wholesale',//批发回款流水
      name: 'Wholesale',
      components: {
        nav:Nav,
        main:Wholesale,
        sidebar:Sidebar
      },
      meta:{
      }
    },
    {
      path: '/warehouse',//仓库流水
      name: 'Warehouse',
      components: {
        nav:Nav,
        main:Warehouse,
        sidebar:Sidebar
      },
      meta:{
      }
    },
    {
      path: '/warehouseinfo',//仓库流水详情
      name: 'Warehouseinfo',
      components: {
        nav:Nav,
        main:Warehouseinfo,
        sidebar:Sidebar
      },
      meta:{
      }
    },
    {
      path: '/retail',//零售流水明细
      name: 'Retail',
      components: {
        nav:Nav,
        main:Retail,
        sidebar:Sidebar
      },
      meta:{
      }
    },
    {
      path: '/ware',//仓库列表
      name: 'Ware',
      components: {
        nav:Nav,
        main:Ware,
        sidebar:Sidebar
      },
      meta:{
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
  const nextRoute = ['Index', 'Cpassword','Privilege','Role','Operators','SaleManage','RetailProduct','RetailPay','productlist','activitylist','salesman','Stock','Wholesale','Warehouse','Retail','Warehouse','Warehouseinfo'];
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

<template> 
    <div class="side">
        <i v-if="isCollapse==false" class="el-icon-d-arrow-left show_none" @click="show_none" title="显示或隐藏"></i>
        <i v-else class="el-icon-d-arrow-right show_none" @click="show_none" title="显示或隐藏"></i>
        <el-menu 
        default-active="1-4-1" 
        class="el-menu-vertical-demo" 
        @open="handleOpen" 
        @close="handleClose" 
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">

            <el-submenu :index="index" v-for="(item,index) in routerData" :key="index">
                <template slot="title">
                <i :class="iconData[index]"></i>
                <span slot="title">{{item.name}}</span>
                </template>
                <el-menu-item-group>
                <router-link :to="item1.urlOrClass" v-for="(item1,index1) in item.zData" :key="index1">
                    <el-menu-item :index="index1">{{item1.name}}</el-menu-item>
                </router-link>
                <!-- <router-link to="/privilege">
                    <el-menu-item index="1-2">权限管理</el-menu-item>
                </router-link>-->
                <!-- <router-link to="/role">
                    <el-menu-item index="1-3">角色管理</el-menu-item>
                </router-link> -->
                </el-menu-item-group>
            </el-submenu>
            <!-- <el-submenu index="2">                      -------------------------------
                <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span slot="title">业务员管理</span>
                </template>
                <el-menu-item-group>
                <router-link to="/salemanage">
                    <el-menu-item :index="index">业务员的现金流</el-menu-item>
                </router-link>
                </el-menu-item-group>
            </el-submenu> -->
            <!-- <el-submenu index="3">
                <template slot="title">
                <i class="el-icon-tickets"></i>
                <span slot="title">零售流水明细</span>
                </template>
                <el-menu-item-group>
                <router-link to="/retail">
                    <el-menu-item :index="index">零售流水明细</el-menu-item>
                </router-link>
                <router-link to="/retailproduct">
                    <el-menu-item :index="index">产品成本明细</el-menu-item>
                </router-link>
                 <router-link to="/retailpay">
                    <el-menu-item :index="index">其他支出明细</el-menu-item>
                </router-link>
                </el-menu-item-group>
            </el-submenu> -->
            <!-- <el-submenu index="4">
                <template slot="title">
                <i class="el-icon-receiving"></i>
                <span slot="title">批发回款流水</span>
                </template>
                <el-menu-item-group>
                <router-link to="/wholesale">
                    <el-menu-item :index="index">批发回款流水</el-menu-item>
                </router-link>
                </el-menu-item-group>
            </el-submenu> -->
            <!-- <el-submenu index="5">
                <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">仓库流水</span>
                </template>
                <el-menu-item-group>
                <router-link to="/warehouse">
                    <el-menu-item :index="index">仓库流水</el-menu-item>
                </router-link>
                </el-menu-item-group>
            </el-submenu> -->
            <!-- <el-submenu index="6">
                <template slot="title">
                <i class="el-icon-collection"></i>
                <span slot="title">进货还款流水</span>
                </template>
                <el-menu-item-group>
                <router-link to="/stock">
                    <el-menu-item :index="index">进货还款流水</el-menu-item>
                </router-link>
                </el-menu-item-group>
            </el-submenu> -->
            <!-- <el-submenu index="7">
                <template slot="title">
                <i class="el-icon-film"></i>
                <span slot="title">活动列表</span>
                </template>
                <el-menu-item-group>
                <router-link to="/activitylist">
                    <el-menu-item :index="index">活动列表</el-menu-item>
                </router-link>
                </el-menu-item-group>
            </el-submenu> -->
            <!-- <el-submenu index="8">
                <template slot="title">
                <i class="el-icon-coordinate"></i>
                <span slot="title">业务员列表</span>
                </template>
                <el-menu-item-group>
                <router-link to="/salesman">
                    <el-menu-item :index="index">业务员列表</el-menu-item>
                </router-link>
                </el-menu-item-group>
            </el-submenu> -->
            <!-- <el-submenu index="9">
                <template slot="title">
                <i class="el-icon-cpu"></i>
                <span slot="title">产品列表</span>
                </template>
                <el-menu-item-group>
                <router-link to="/productlist">
                    <el-menu-item :index="index">产品列表</el-menu-item>
                </router-link>
                </el-menu-item-group>
            </el-submenu> -->
            <!-- <el-submenu index="10">
                <template slot="title">
                <i class="el-icon-box"></i>
                <span slot="title">仓库列表</span>
                </template>
                <el-menu-item-group>
                <router-link to="/ware">
                    <el-menu-item :index="index">仓库列表</el-menu-item>
                </router-link>
                </el-menu-item-group>
            </el-submenu> -->



            <!-- <router-link to="/salemanage">
            <el-menu-item index="2">
                    <i class="el-icon-s-custom"></i>
                    <span slot="title">业务员管理</span>  
            </el-menu-item>
            </router-link>
            <router-link to="/retail">
            <el-menu-item index="3">
                <i class="el-icon-tickets"></i>
                <span slot="title">零售流水明细</span>
            </el-menu-item>
            </router-link>
            <router-link to="/retailproduct">
            <el-menu-item index="4">
                <i class="el-icon-notebook-1"></i>
                <span slot="title">产品成本明细</span>
            </el-menu-item>
            </router-link>

            <router-link to="/retailpay">
                <el-menu-item index="5">
                    <i class="el-icon-notebook-2"></i>
                    <span slot="title">其他支出明细</span>
                </el-menu-item>
            </router-link>

            <router-link to="/wholesale">
                <el-menu-item index="6">
                    <i class="el-icon-receiving"></i>
                    <span slot="title">批发回款流水</span>
                </el-menu-item>
            </router-link>

            <router-link to="/warehouse">
                <el-menu-item index="7">
                    <i class="el-icon-setting"></i>
                    <span slot="title">仓库流水</span>
                </el-menu-item>
            </router-link>

            <router-link to="/stock">
                <el-menu-item index="8">
                    <i class="el-icon-collection"></i>
                    <span slot="title">进货还贷流水</span>
                </el-menu-item>
            </router-link>

            <router-link to="/activitylist">
                <el-menu-item index="9">
                    <i class="el-icon-film"></i>
                    <span slot="title">活动列表</span>
                </el-menu-item>
            </router-link>

            <router-link to="/salesman">
                <el-menu-item index="10">
                    <i class="el-icon-coordinate"></i>
                    <span slot="title">业务员列表</span>
                </el-menu-item>
            </router-link>

            <router-link to="/productlist">
                <el-menu-item index="11">
                    <i class="el-icon-cpu"></i>
                    <span slot="title">产品列表</span>
                </el-menu-item>
            </router-link>
            <router-link to="/ware">
                <el-menu-item index="12">
                    <i class="el-icon-box"></i>
                    <span slot="title">仓库列表</span>
                </el-menu-item>
            </router-link> -->
        </el-menu>     
    </div>
</template>
<script>


  const defaultListQuery = {
    keyword: null,
    pageNum: 1,
    pageSize: 5,
    publishStatus: null,
    verifyStatus: null,
    productSn: null,
    productCategoryId: null,
    brandId: null
  };
  export default {
    name: "productList",
    data() {
      return {
        isCollapse: false,
        routerFarther:[],//父类路由
        routerSon:[],//子类路由
        routerData:[],//总路由
        iconData:['el-icon-menu','el-icon-s-custom','el-icon-tickets','el-icon-notebook-1','el-icon-notebook-2','el-icon-receiving','el-icon-setting','el-icon-collection','el-icon-film','el-icon-box'],//icon图标
      }
    },
    created() {
        this.getRouter()
    },
    watch: {
      
    },
    filters: {
     
    },
    methods: {
      getRouter:function(){
          let arr = JSON.parse(localStorage.getItem("g_router"));//路由数组
          this.routerData=arr;
        //   let length = arr.length;
        //   for(let i = 0;i<length;i++){
        //       if(arr[i].parentId==0){
        //           this.routerFarther.push(arr[i]);
        //       }else if(arr[i].parentId==1){
        //           this.routerSon.push(arr[i]);
        //       }
        //   }
      },
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
        
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      show_none:function(){
          if(this.isCollapse){
              this.isCollapse=false
          }else{
              this.isCollapse=true
          }
      }
    }
  }
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.side{
    /* width:217px; */
    position: relative;
    text-align: left;
}
.side .show_none{
    /* display: none; */
    position:absolute;
    top: 40px;
    height: 30px;
    width: 30px;
    right: 0px;
    font-size: 30px;
    cursor: pointer;
    z-index: 10001;
}
</style>



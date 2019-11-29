<template> 
    <div class="side">
        <i class="el-icon-s-operation show_none" @click="show_none"></i>
        <el-menu 
        default-active="1-4-1" 
        class="el-menu-vertical-demo" 
        @open="handleOpen" 
        @close="handleClose" 
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">

        <el-submenu index="1" v-for="(item,index) in routerFarther" :key="index">
            <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{item.name}}</span>
            </template>
            <el-menu-item-group>
            <router-link :to="item.urlOrClass" v-for="(item,index) in routerSon" :key="index">
                <el-menu-item :index="index">{{item.name}}</el-menu-item>
            </router-link>
            <!-- <router-link to="/privilege">
                <el-menu-item index="1-2">权限管理</el-menu-item>
            </router-link>-->
            <!-- <router-link to="/role">
                <el-menu-item index="1-3">角色管理</el-menu-item>
            </router-link> -->
            </el-menu-item-group>
        </el-submenu>

        <router-link to="/salemanage">
        <el-menu-item index="2">
            <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">业务员管理</span>  
            </template>
        </el-menu-item>
        </router-link>
        <router-link to="/retailproduct">
        <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">零售产品明细</span>
        </el-menu-item>
        </router-link>
        <router-link to="/retailpay">
        <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">零售产品支出</span>
        </el-menu-item>
        </router-link>
        <!-- <el-menu-item index="5">
            <i class="el-icon-setting"></i>
            <span slot="title">接口管理</span>
        </el-menu-item>
        <el-menu-item index="6">
            <i class="el-icon-setting"></i>
            <span slot="title">系统管理</span>
        </el-menu-item> -->
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
          let length = arr.length;
          for(let i = 0;i<length;i++){
              if(arr[i].parentId==0){
                  this.routerFarther.push(arr[i]);
              }else if(arr[i].parentId==1){
                  this.routerSon.push(arr[i]);
              }
          }
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
    /* height: 100%;
    width:200px;
    background:#545c64; */
    position: relative;
}
.side .show_none{
    position:absolute;
    top: 0px;
    height: 35px;
    width: 35px;
    right: -34px;
    font-size: 30px;
    background: #cecece;
    cursor: pointer;
    z-index: 10001;
}
</style>



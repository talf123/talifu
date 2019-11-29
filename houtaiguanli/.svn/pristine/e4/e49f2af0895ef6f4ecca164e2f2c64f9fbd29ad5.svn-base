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

            <el-submenu index="1" v-for="(item,index) in routerFarther" :key="index">
                <template slot="title">
                <i class="el-icon-s-home"></i>
                <span slot="title">{{item.name}}</span>
                </template>
                <el-menu-item-group>
                <router-link :to="item.urlOrClass" v-for="(item,index) in routerSon" :key="index">
                    <el-menu-item :index="index">{{item.name}}{{index+1}}</el-menu-item>
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
            </router-link>
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
    width: 199px;
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



<template> 
    <div class="main">
        <div class="block" style="padding:30px 0px 30px 50px">
          <span class="demonstration">功能名称</span>
          <el-input v-model="input"
            placeholder="输入功能节点编号（上级编号）"
            size="medium"
            style="width:330px"
          ></el-input>
          <el-button type="primary" icon="el-icon-search" @click="goSearchId">搜索</el-button>
        </div>
        <div class="block2" style="padding:30px 0px 30px 50px">
            <el-button type="primary" icon="el-icon-search">批量删除</el-button>
            <el-button type="primary" icon="el-icon-search">操作员列表</el-button>
            <el-button type="primary" icon="el-icon-search" @click="goAdd">新增权限节点</el-button>
            共有数据  {{allCount}}  条
        </div>
        <div class="app-container">
             <el-table
              border
              :data="privilegeList"
              style="width: 100%">
              <!-- 单选框 -->
              <el-table-column
                type="selection">
              </el-table-column>

              <!-- 功能编号 -->
              <el-table-column
                label="功能编号"
                sortable
                prop="id">
              </el-table-column>
              <!-- 功能名称 -->
              <el-table-column
                label="功能名称"
                width="250"
                sortable
                prop="name">
              </el-table-column>
              <!-- 上级编号 -->
              <el-table-column
                label="上级编号"
                sortable
                prop="parentId">
              </el-table-column>
              <!-- 状态 -->
              <el-table-column
                label="状态"
                sortable
                prop="isDel">
              </el-table-column>
              <!-- 操作时间 -->
              <el-table-column
                label="操作时间"
                width="150"
                sortable
                prop="update_time">
              </el-table-column>
              <!-- 操作 -->
              <el-table-column
                fixed="right"
                label="操作"
                width="200">
                <template slot-scope="scope">
                  <el-button prop="isDel" @click="goStop(scope.row)" type="text" size="small">停/启用</el-button>
                  <el-button type="text" size="small" @click="goEdit(scope.row)">编辑</el-button>
                  <el-button type="text" size="small" @click="goDelete(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <div class="block_fenye">
          <!-- <span class="demonstration">完整功能</span> -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="allCount">
          </el-pagination>
        </div>
    <!-- z遮罩层 -->
        <div class="marsk" v-if="showNone_marsk"></div>
    <!-- 弹出框--编辑--新增 -->
        <div class="pop" v-if="showNone_add">
            <el-form  ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <!--  -->
                <el-form-item label="功能编号" prop="id">
                  <el-input v-model="id" placeholder="请输入功能编号" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="功能名称" prop="name">
                  <el-input v-model="name" placeholder="请输入功能名称" size="small"></el-input>
                </el-form-item>
                <el-form-item label="上级编号" prop="parentId">
                  <el-input v-model="parentId" placeholder="请输入上级编号 只支持数字" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="isDel">
                  <el-input v-model="isDel" placeholder="1停用 0启用"></el-input>
                </el-form-item>
                <el-form-item label="叶子节点" prop="isLeaf">
                  <el-input v-model="isLeaf" placeholder="0-否；1-是" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="菜单/按钮" prop="type">
                  <el-input v-model="type" placeholder="1-菜单  2-按钮" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="显示顺序" prop="displayOrder">
                  <el-input v-model="displayOrder" placeholder="默认为1" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="菜单链接" prop="displayOrder">
                  <el-input v-model="urlOrClass" placeholder=""></el-input>
                </el-form-item>
                <!-- id: 2               功能编号
                name: "管理员管理"      功能名称
                parentId: 1             上级编号
                isDel: "启用"        状态
                isLeaf: 0             叶子节点 0-否；1-是  
                type: 1                 菜单/按钮
                displayOrder: 1     显示顺序
                
                create_time: null   创建时间
                update_time: null       更新时间
                urlOrClass: "/SysOperator/List"    url -->
              <!--  -->
              <el-form-item>
                <el-button type="primary" @click="goKeepAdd">保存</el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
                <el-button @click="reset">关闭弹框</el-button>
              </el-form-item>
            </el-form>
        </div>
    <!-- 弹出框--编辑--新增 -->
    <!-- 弹出框--编辑-- -->
        <div class="pop" v-if="showNone_update">
            <el-form   ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <!--  -->
                <el-form-item label="功能编号" prop="id">
                  <el-input v-model="id" placeholder="请输入功能编号" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="功能名称" prop="name">
                  <el-input v-model="name" placeholder="请输入功能名称" size="small"></el-input>
                </el-form-item>
                <el-form-item label="上级编号" prop="parentId">
                  <el-input v-model="parentId" placeholder="请输入上级编号 只支持数字" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="isDel">
                  <el-input v-model="isDel" placeholder="1停用 0启用"></el-input>
                </el-form-item>
                <el-form-item label="叶子节点" prop="isLeaf">
                  <el-input v-model="isLeaf" placeholder="0-否；1-是" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="菜单/按钮" prop="type">
                  <el-input v-model="type" placeholder="1-菜单  2-按钮" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="显示顺序" prop="displayOrder">
                  <el-input v-model="displayOrder" placeholder="默认为1" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="菜单链接" prop="displayOrder">
                  <el-input v-model="urlOrClass" placeholder=""></el-input>
                </el-form-item>
                <!-- id: 2               功能编号
                name: "管理员管理"      功能名称
                parentId: 1             上级编号
                isDel: "启用"        状态
                isLeaf: 0             叶子节点 0-否；1-是  
                type: 1                 菜单/按钮
                displayOrder: 1     显示顺序
                
                create_time: null   创建时间
                update_time: null       更新时间
                urlOrClass: "/SysOperator/List"    url -->
              <!--  -->
              <el-form-item>
                <el-button type="primary" @click="goKeepUpdate">保存</el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
                <el-button @click="reset">关闭弹框</el-button>
              </el-form-item>
            </el-form>
        </div>
    <!-- 弹出框--编辑-- -->
    </div>
</template>
<script>
  export default {
    name: "productList",
    data() {
      return {
        privilegeList:null,//权限列表信息
        allCount:null,//权限列表信息zong条数
        input: '',//搜索双向绑定
        row:null,//被点击行的数据
        showNone_add:false,// 隐藏新增
        showNone_update:false,//隐藏 修改
        showNone_marsk:false,//遮罩层的隐藏显示
        currentPage4:5,//当前页数
        pageNow:null,//点击的页数
        // -----
        id: null ,             // 功能编号
        name: null,   //   功能名称
        parentId: null  ,         //  上级编号
        isDel: null  ,    //  状态 1停用 0正常 
        isLeaf: null  ,         //  叶子节点 0-否；1-是  
        type: null  ,            //   菜单/按钮
        displayOrder: null ,   // 显示顺序
        
        create_time: null , // 创建时间
        update_time: null , //     更新时间
        urlOrClass: null,//    url 菜单链接
      }
    },
    created() {
      this.getPrivilegeList();
    },
    watch: {
      
    },
    filters: {
      
    },
    methods: {
      //获取权限列表信息
      getPrivilegeList:function(){
        let token =localStorage.getItem('g_token');
        this.$axios({  
          url: '/api/AdminManager/MenuList?nodeId=0',
          method: 'get',
          headers:{
              Authorization:'Bearer '+token
          },
        //params参数必写 , 如果没有参数传{}也可以
          data:{
            // selectPageNum:2,
            // everyPageNum:10,
          }
        })
        .then((res)=>{
          if(res.data.code==1){
            this.privilegeList=res.data.data //zong列表信息
            this.allCount=res.data.count[0].allcount //zong条数
          }else if(res.data.code==-4){
              this.$message('登录信息过期，请重新登录');
                localStorage.removeItem('g_userName');
                localStorage.removeItem('g_token');
                this.$router.push({path: '/login'});
          }else{
            this.$message(res.data.msg);
          }
        })
        .catch((err)=>{
          console.log(err)
        })
      },
      //搜索id
      goSearchId:function(){
        let token =localStorage.getItem('g_token');
        this.$axios({  
          url: '/api/AdminManager/MenuList?nodeId='+this.input,
          method: 'get',
        //params参数必写 , 如果没有参数传{}也可以
          headers:{
              Authorization:'Bearer '+token
          },
          data:{  
            nodeId:this.input
          }
        })
        .then((res)=>{
          if(res.data.code==1){
            this.privilegeList=res.data.data //查询成功重新赋值列表信息
            this.allCount=res.data.count[0].allcount //查询成功重新赋值zong条数
          }else if(res.data.code==-4){
              this.$message('登录信息过期，请重新登录');
                localStorage.removeItem('g_userName');
                localStorage.removeItem('g_token');
                this.$router.push({path: '/login'});
          }else{
            this.$message(res.data.success[0].msg);
          }
        })
        .catch((err)=>{
          console.log(err)
        })
      },
      //删除一条
      goDelete:function(row){
         let token =localStorage.getItem('g_token');
        console.log(token);
        // console.log(this.row)
        // console.log(222)
        this.$axios({  
          url: '/api/AdminManager/ChangeMenuState',
          method: 'post',
        //params参数必写 , 如果没有参数传{}也可以
          headers:{
              Authorization:'Bearer '+token
          }, 
          data:{ 
            type:3,
            id:row.id
          }
        })
        .then((res)=>{
          if(res.data.code==1){
            // this.privilegeList=res.data.data //查询成功重新赋值列表信息
            // this.allCount=res.data.count[0].allcount //查询成功重新赋值zong条数
            location.reload()
          }else if(res.data.code==-4){
              this.$message('登录信息过期，请重新登录');
                localStorage.removeItem('g_userName');
                localStorage.removeItem('g_token');
                this.$router.push({path: '/login'});
          }else{
            this.$message(res.data.success[0].msg);
          }
        })
        .catch((err)=>{
          console.log(err)
        })
      },
      //新增一条
      goAdd:function(){
          let token =localStorage.getItem('g_token');
          this.showNone_marsk=true;
          this.showNone_add=true;

          this.id=null;
          this.name=null;
          this.parentId=null;
          this.isDel=null;
          this.isLeaf=null;
          this.type=null;
          this.displayOrder=null;
          this.urlOrClass=null;
      },
      //  停用？启用 1.启用 2.停用
      goStop:function(row){
        // console.log(row.isDel=="启用")
        // console.log(row.isDel=="停用")
         let token =localStorage.getItem('g_token');//状态 1停用 0启用
        if(row.isDel=="启用"){
            this.$axios({  
              url: '/api/AdminManager/ChangeMenuState',
              method: 'post',
            //params参数必写 , 如果没有参数传{}也可以
              headers:{
                  Authorization:'Bearer '+token
              }, 
              data:{ 
                type:2,
                id:row.id
              }
            })
            .then((res)=>{
              if(res.data.code==1){
                // this.privilegeList=res.data.data //查询成功重新赋值列表信息
                // this.allCount=res.data.count[0].allcount //查询成功重新赋值zong条数
                location.reload()
              }else if(res.data.code==-4){
              this.$message('登录信息过期，请重新登录');
                localStorage.removeItem('g_userName');
                localStorage.removeItem('g_token');
                this.$router.push({path: '/login'});
          }else{
                this.$message(res.data.success[0].msg);
              }
            })
            .catch((err)=>{
              console.log(err)
            })
        }else if(row.isDel=="停用"){
            this.$axios({  
              url: '/api/AdminManager/ChangeMenuState',
              method: 'post',
            //params参数必写 , 如果没有参数传{}也可以 
              headers:{
                  Authorization:'Bearer '+token
              },
              data:{ 
                type:1,
                id:row.id
              }
            })
            .then((res)=>{
              if(res.data.code==1){
                // this.privilegeList=res.data.data //查询成功重新赋值列表信息
                // this.allCount=res.data.count[0].allcount //查询成功重新赋值zong条数
                location.reload()
              }else if(res.data.code==-4){
              this.$message('登录信息过期，请重新登录');
                localStorage.removeItem('g_userName');
                localStorage.removeItem('g_token');
                this.$router.push({path: '/login'});
          }else{
                this.$message(res.data.success[0].msg);
              }
            })
            .catch((err)=>{
              console.log(err)
            })
        }
      },
      //编辑
      goEdit:function(row){
        this.showNone_marsk=true;
        this.showNone_update=true;
        this.row=row;
        console.log(this.row)

        this.id=row.id;
        this.name=row.name;
        this.parentId=row.parentId;
        this.isDel=row.isDel;
        this.isLeaf=row.isLeaf;
        this.type=row.type;
        this.displayOrder=row.displayOrder;    
        this.urlOrClass=row.urlOrClass;
      },
      //保存-新增  
      goKeepAdd:function(){
         let token =localStorage.getItem('g_token');
          this.$axios({  
              url: '/api/AdminManager/ChangeMenu',
              method: 'post',
              //params参数必写 , 如果没有参数传{}也可以 
              headers:{
                  Authorization:'Bearer '+token,
              },
              data:{   
                // id:this.id,             // 功能编号
                name: this.name,   //   功能名称
                parentId: Number(this.parentId),         //  上级编号
                isDel: Number(this.isDel)  ,    //  状态 1停用 0正常    1启用  2   停用

                isLeaf: null ,         //  叶子节点 0-否；1-是  
                type: null  ,            //   菜单/按钮
                displayOrder: 1 ,   // 显示顺序
                create_time: null , // 创建时间
                update_time: null , //     更新时间
                urlOrClass: this.urlOrClass,//    url
              }
            })
            .then((res)=>{
              if(res.data.code==1){
                // this.privilegeList=res.data.data //查询成功重新赋值列表信息
                // this.allCount=res.data.count[0].allcount //查询成功重新赋值zong条数
                location.reload()
              }else if(res.data.code==-4){
              this.$message('登录信息过期，请重新登录');
                localStorage.removeItem('g_userName');
                localStorage.removeItem('g_token');
                this.$router.push({path: '/login'});
              }else{
                    this.$message(res.data.success[0].msg);
              }
            })
            .catch((err)=>{
              console.log(err)
            })
      },
       //保存-修改
      goKeepUpdate:function(){
         let token =localStorage.getItem('g_token');
          this.$axios({  
              url: '/api/AdminManager/ChangeMenu',
              method: 'post',
              //params参数必写 , 如果没有参数传{}也可以 
              headers:{
                  Authorization:'Bearer '+token,
              },
              data:{   
                id:this.id,             // 功能编号
                name: this.name,   //   功能名称
                parentId: Number(this.parentId),         //  上级编号
                isDel: Number(this.isDel)  ,    //  状态 1停用 0正常    1启用  2   停用

                isLeaf: null ,         //  叶子节点 0-否；1-是  
                type: null  ,            //   菜单/按钮
                displayOrder: 1 ,   // 显示顺序
                create_time: null , // 创建时间
                update_time: null , //     更新时间
                urlOrClass: this.urlOrClass,//    url
              }
            })
            .then((res)=>{
              if(res.data.code==1){
                // this.privilegeList=res.data.data //查询成功重新赋值列表信息
                // this.allCount=res.data.count[0].allcount //查询成功重新赋值zong条数
                location.reload()
              }else if(res.data.code==-4){
              this.$message('登录信息过期，请重新登录');
                localStorage.removeItem('g_userName');
                localStorage.removeItem('g_token');
                this.$router.push({path: '/login'});
              }else{
                    this.$message(res.data.success[0].msg);
              }
            })
            .catch((err)=>{
              console.log(err)
            })
      },
      //关闭编辑弹框
      reset:function(){
        this.showNone_add=false;
        this.showNone_update=false;
        this.showNone_marsk=false;
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(val);
      },
    }
  }
</script>
<style>


/* .block2{
  text-align:right;
} */
.block_fenye{
  padding-left: 30px;
  padding-right: 30px;
}
.block_fenye .el-pagination__sizes{
  margin-right:450px;
}
.main{
    /* flex: 1; */
    position: relative;
    /* overflow: scroll; */
}
.marsk{
  position: absolute;
  top: 0;
  left: 0; 
  width: 100%;
  height: 150%;
  background: #000;
  opacity: 0.5;
  z-index: 9999;
}
.pop{
  padding:2% 4%;
  position: absolute;
  top: 9%;
  left: 18%; 
  width: 60%;
  height: 80%;
  background: #fff;
  z-index: 10000;
}
</style>



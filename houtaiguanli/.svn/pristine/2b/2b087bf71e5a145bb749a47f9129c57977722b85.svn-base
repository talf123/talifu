<template> 
    <div class="main">
      欢迎你，{{userName}}            <el-button @click="goGai()" type="text" size="small">改密</el-button>
        <!-- <div class="block" style="padding:30px 0px 30px 50px">
          <span class="demonstration">日期选择：</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <el-input v-model="input"
            placeholder="输入工号、姓名、角色编号、名称、手机"
            size="medium"
            style="width:330px"
          ></el-input>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div> -->
        <!-- <div class="block2" style="padding:30px 0px 30px 50px">
            <el-button type="primary" icon="el-icon-search">批量删除</el-button>
            <el-button type="primary" icon="el-icon-search">操作员列表</el-button>
            <el-button type="primary" icon="el-icon-search">新增操作员</el-button>
            共有数据  1  条
        </div> -->

         <!-- <div class="app-container">
             <el-table
              border
              style="width: 100%"> -->
              <!-- 单选框 -->
              <!-- <el-table-column
                type="selection">
              </el-table-column> -->
              <!-- 员工编号 -->
              <!-- <el-table-column
                label="员工编号"
                sortable
                prop="date">
              </el-table-column> -->
              <!-- 员工姓名 -->
              <!-- <el-table-column
                label="员工姓名"
                sortable
                prop="date">
              </el-table-column> -->
              <!-- 手机 -->
              <!-- <el-table-column
                label="手机"
                sortable
                prop="date">
              </el-table-column> -->
              <!-- 角色编号 -->
              <!-- <el-table-column
                label="角色编号"
                sortable
                prop="date">
              </el-table-column> -->
              <!-- 角色名称 -->
              <!-- <el-table-column
                label="角色名称"
                sortable
                prop="date">
              </el-table-column> -->
              <!-- 描述 -->
              <!-- <el-table-column
                label="描述"
                sortable
                prop="date">
              </el-table-column> -->
              <!-- 状态 -->
              <!-- <el-table-column
                label="状态"
                sortable
                prop="date">
              </el-table-column> -->
              <!-- 操作时间 -->
              <!-- <el-table-column
                label="操作时间"
                sortable
                prop="date">
              </el-table-column> -->

              <!-- <el-table-column
                label="操作"
                align="">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">停用</el-button>
                  <el-button
                    size="mini"
                    type=""
                    @click="handleDelete(scope.$index, scope.row)">改密</el-button>
                     <el-button
                    size="mini"
                    type=""
                    @click="handleDelete(scope.$index, scope.row)">编辑</el-button>
                     <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          
          
        </div> -->
       

</div>
  
</template>
<script>
  export default {
    name: "productList",
    data() {
      return {
       userName:null,//用户登录名字信息
      
      }
    },
    created() {
      this.getUserM()
    },
    watch: {
    
    },
    filters: {
     
    },
    methods: {
      goGai:function(){
        this.$router.push({path: '/cpassword'});
      },
      //获取用户名
      getUserM:function(){
        this.userName = localStorage.getItem('g_userName');
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
      }
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
}

</style>



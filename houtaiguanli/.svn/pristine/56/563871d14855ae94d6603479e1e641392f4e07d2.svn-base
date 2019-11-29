<template> 
    <div class="main">
        <div class="block" style="padding:30px 0px 30px 50px">
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
        </div>
        <div class="block2" style="padding:30px 0px 30px 50px">
            <el-button type="primary" icon="el-icon-search">批量删除</el-button>
            <el-button type="primary" icon="el-icon-search">操作员列表</el-button>
            <el-button type="primary" icon="el-icon-search">新增操作员</el-button>
            共有数据  1  条
        </div>

        <div class="app-container">
             <el-table
              border
              style="width: 100%">
              <!-- 单选框 -->
              <el-table-column
                type="selection">
              </el-table-column>
              <!-- 员工编号 -->
              <el-table-column
                label="员工编号"
                sortable
                prop="date">
              </el-table-column>
              <!-- 员工姓名 -->
              <el-table-column
                label="员工姓名"
                sortable
                prop="date">
              </el-table-column>
              <!-- 手机 -->
              <el-table-column
                label="手机"
                sortable
                prop="date">
              </el-table-column>
              <!-- 角色编号 -->
              <el-table-column
                label="角色编号"
                sortable
                prop="date">
              </el-table-column>
              <!-- 角色名称 -->
              <el-table-column
                label="角色名称"
                sortable
                prop="date">
              </el-table-column>
              <!-- 描述 -->
              <el-table-column
                label="描述"
                sortable
                prop="date">
              </el-table-column>
              <!-- 状态 -->
              <el-table-column
                label="状态"
                sortable
                prop="date">
              </el-table-column>
              <!-- 操作时间 -->
              <el-table-column
                label="操作时间"
                sortable
                prop="date">
              </el-table-column>

              <el-table-column
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
            :total="400">
          </el-pagination>
        </div>

</div>
  
</template>
<script>
//   import {
//     fetchList,
//     updateDeleteStatus,
//     updateNewStatus,
//     updateRecommendStatus,
//     updatePublishStatus
//   } from '@/api/operators'
//   import {fetchList as fetchSkuStockList,update as updateSkuStockList} from '@/api/skuStock'
  // import {fetchList as fetchProductAttrList} from '@/api/productAttr'
//   import {fetchList as fetchBrandList} from '@/api/brand'
//   import {fetchListWithChildren} from '@/api/productCate'

  // const defaultListQuery = {
  //   keyword: null,
  //   pageNum: 1,
  //   pageSize: 5,
  //   publishStatus: null,
  //   verifyStatus: null,
  //   productSn: null,
  //   productCategoryId: null,
  //   brandId: null
  // };
  export default {
    name: "productList",
    data() {
      return {
        currentPage4:4,
         pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: '',
        value2: '',
        input: '',

         tableData: [{
          date: '啊啊啊',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        search: ''



        // editSkuInfo:{
        //   dialogVisible:false,
        //   productId:null,
        //   productSn:'',
        //   productAttributeCategoryId:null,
        //   stockList:[],
        //   productAttr:[],
        //   keyword:null
        // },
        // operates: [
        //   {
        //     label: "商品上架",
        //     value: "publishOn"
        //   },
        //   {
        //     label: "商品下架",
        //     value: "publishOff"
        //   },
        //   {
        //     label: "设为推荐",
        //     value: "recommendOn"
        //   },
        //   {
        //     label: "取消推荐",
        //     value: "recommendOff"
        //   },
        //   {
        //     label: "设为新品",
        //     value: "newOn"
        //   },
        //   {
        //     label: "取消新品",
        //     value: "newOff"
        //   },
        //   {
        //     label: "转移到分类",
        //     value: "transferCategory"
        //   },
        //   {
        //     label: "移入回收站",
        //     value: "recycle"
        //   }
        // ],
        // operateType: null,
        // listQuery: Object.assign({}, defaultListQuery),
        // list: null,
        // total: null,
        // listLoading: true,
        // selectProductCateValue: null,
        // multipleSelection: [],
        // productCateOptions: [],
        // brandOptions: [],
        // publishStatusOptions: [{
        //   value: 1,
        //   label: '上架'
        // }, {
        //   value: 0,
        //   label: '下架'
        // }],
        // verifyStatusOptions: [{
        //   value: 1,
        //   label: '审核通过'
        // }, {
        //   value: 0,
        //   label: '未审核'
        // }]
      }
    },
    created() {
      // this.getList();
      // this.getBrandList();
      // this.getProductCateList();
    },
    watch: {
      // selectProductCateValue: function (newValue) {
      //   if (newValue != null && newValue.length == 2) {
      //     this.listQuery.productCategoryId = newValue[1];
      //   } else {
      //     this.listQuery.productCategoryId = null;
      //   }

      // }
    },
    filters: {
      // verifyStatusFilter(value) {
      //   if (value === 1) {
      //     return '审核通过';
      //   } else {
      //     return '未审核';
      //   }
      // }
    },
    methods: {
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
      },


      // getProductSkuSp(row, index) {
      //   if (index === 0) {
      //     return row.sp1;
      //   } else if (index === 1) {
      //     return row.sp2;
      //   } else {
      //     return row.sp3;
      //   }
      // },
      // getList() {
      //   this.listLoading = true;
      //   fetchList(this.listQuery).then(response => {
      //     console.log(response+'1111')
      //     this.listLoading = false;
      //     this.list = response.data.list;
      //     this.total = response.data.total;
      //   });
      // },
      // getBrandList() {
      //   fetchBrandList({pageNum: 1, pageSize: 100}).then(response => {
      //     this.brandOptions = [];
      //     let brandList = response.data.list;
      //     for (let i = 0; i < brandList.length; i++) {
      //       this.brandOptions.push({label: brandList[i].name, value: brandList[i].id});
      //     }
      //   });
      // },
      // getProductCateList() {
      //   fetchListWithChildren().then(response => {
      //     let list = response.data;
      //     this.productCateOptions = [];
      //     for (let i = 0; i < list.length; i++) {
      //       let children = [];
      //       if (list[i].children != null && list[i].children.length > 0) {
      //         for (let j = 0; j < list[i].children.length; j++) {
      //           children.push({label: list[i].children[j].name, value: list[i].children[j].id});
      //         }
      //       }
      //       this.productCateOptions.push({label: list[i].name, value: list[i].id, children: children});
      //     }
      //   });
      // },
     
    
     
      
     
   
      
     
      
      
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



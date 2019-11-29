<template>
  <div class="content">
    <silderBar></silderBar>
    <div class="body_main">
        <navBar></navBar>
        <div class="main" :style="widthMain">
            <div class="tips" id="{this.$route.name}">
                <Breadcrumb separator="<b class='demo-breadcrumb-separator'>=></b>">
                    <BreadcrumbItem :to="item.path" v-for="(item,index) in this.$route.meta.index" :key="index">{{item.name}}</BreadcrumbItem>
                </Breadcrumb>
            </div>
          <!-- 查询 新增 -->
          <div class="top">
            <label>时间：</label>
                <DatePicker type="daterange" size="small" split-panels placeholder="日期" style="width: 180px"></DatePicker>
                <Select v-model="mode" size="small" style="width:150px; margin-left: 15px;">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Button type="primary" size="small" @click="lookup">查询</Button>
          </div>
          <!-- 主页面内容 -->
          <div class="center" >
              <div v-if="mo">
                <Table border :columns="columns" :data="data" class="table"  ref="table">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                </Table>
              </div>
              <div v-else>
              </div>
          </div>
          <!-- 遮罩层 -->
          <div class="marsk" v-if="showNone"></div>
          <!-- 分页页面 -->
            <div class="bottom">
                <Page :total="100" show-total show-elevator @on-change='fenye'/>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {square} from '../../../assets/js/download'
export default {
  name: 'Index',
  data () {
    return {
        widthMain:{width:''},//table组件自适应
        //面包屑数组
        query: '', // 查询功能 绑定的数据
        mode: null, // 查询功能 方式
        showNone: false, // 控制页面遮罩层开关
        showNoneUpdate: false, // 修改页面弹出控制
        showNonecreate: false, // 新增页面弹出控制
        cityList: [ // 查询条件
            {
                value: '1',
                label: '列表展示'
            },
            {
                value: '2',
                label: '柱状图展示'
            }
        ],
        // 表格列名称
        columns: [
            {title: '日期',key: 'pay'},
            {title: '新增充值人数',key: 'id'}, 
            {title: '总充值人数',key: 'money'}
        ],
        data: [ // 数据表数据
            {
                pay: 'Android', // 支付类型
                id: 'com.sunday.80', // 商品ID
                money: 1 // 金额
            },
            {
                pay: 'taiwanAppStore',
                id: 'com.sunday.30',
                money: 1.99
            },
            {
                pay: 'iPhone',
                id: 'com.bunny.5',
                money: 3.99
            },
            {
                pay: 'AppStore',
                id: 'com.bunny.6',
                money: 1
            }
        ],
        pay: '', // 新增和编辑页面使用的数据    支付类型
        id: '', //  新增和编辑页面使用的数据    商品ID
        money: '' //  新增和编辑页面使用的数据    支付金额
    }
  },
  created() {
    window.addEventListener('resize', this.getWidth);
    this.getWidth()
  },
  destroyed () {
    window.removeEventListener('resize', this.getWidth)
  },
  mounted () {
      
  },
  computed: {
      mo:function() {
          if (this.mode == '1')
          {
              return true
          } else if (this.mode == '2') {
              return false
          }
      }
  },
  methods: {
      //table组件处理函数
      getWidth:function(){
              var wid =document.body.clientWidth;        //网页可见区域宽(body)
                this.widthMain.width=wid-200+'px';
      },
      lookup: function () { // 查找
          console.log(this.query)
      },
      fenye: function (page) { // 页面的分页功能
          console.log(page)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main{  // 主页面样式
    overflow-x: scroll;
    overflow: hidden;
    position: relative;
    .tips{ // 主页面
        text-align: left;
    }
    .top{margin-top:10px; margin-left: 20px; display: flex; padding: 5px;  // 表头部分 查找添加 样式
          button{
              margin-left: 15px;
          }
          label{
              margin-left: 15px;
            //   margin-right: 15px;
              font-size: 15px;
          }
    }
    .center{width:100%; margin-top:20px;
        button {
            margin-right: 5px
        }
    }  // 页面中部 表格部分样式
    .bottom{width:100%; margin-top:15px;} // 页面底部 分页部分样式

}
</style>
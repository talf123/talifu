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
            <label>小组长：</label>
              <Select v-model="query" size="small" style="width:150px">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            <label>房间ID：</label>
                <Input v-model="id" size="small" placeholder="请输入..." style="width:150px;"></Input>
            <label>时间范围：</label>
                <DatePicker type="daterange" size="small" split-panels placeholder="日期" style="width: 180px"></DatePicker>
                <Button type="primary" size="small" @click="lookup">查询</Button>
                <Button type="primary" size="small" @click="outPortcsv">导出csv</Button>
                <Button type="primary" size="small" @click="outPortxlsx">导出xlsx</Button>
          </div>
          <!-- 主页面内容 -->
          <div class="center" >
            <Table border :columns="columns" :data="data" class="table"  ref="table">
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
            </Table>
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
        showNone: false, // 控制页面遮罩层开关
        showNoneUpdate: false, // 修改页面弹出控制
        showNonecreate: false, // 新增页面弹出控制
        cityList: [ // 查询条件
            {
                value: 'Android',
                label: 'Android'
            },
            {
                value: 'iPhone',
                label: 'iPhone'
            },
            {
                value: 'AppStore',
                label: 'AppStore'
            },
            {
                value: 'taiwangooglestore',
                label: '台湾googlestore'
            },
            {
                value: 'taiwanAppStore',
                label: '台湾AppStore'
            }
        ],
        // 表格列名称
        columns: [
            {title: '房间ID',key: 'pay',width: 120},
            {title: '家族名称',key: 'pay',width: 120},
            {title: '大礼物流水',key: 'id',sortable: true,width: 130}, 
            {title: '小礼物流水',key: 'id',sortable: true,width: 130}, 
            {title: '其他礼物流水',key: 'money',sortable: true,width: 150},
            {title: '大礼物消耗',key: 'money',sortable: true,width: 130},
            {title: '小礼物消耗',key: 'volue',sortable: true,width: 130},
            {title: '其他礼物消耗',key: 'volue',sortable: true,width: 150},
            {title: '小组',key: 'gift',width: 120,},
            {title: '运营',key: 'gift',width: 120}
        ],
        data: [ // 数据表数据
            {
                pay: 'Android', // 支付类型
                id: 'com.sunday.80', // 商品ID
                money: 1, // 金额
                volue: 7000, //  币值
                gift: 0, // 礼物赠送币
                address: 'New York No. 1 Lake Park' // 说明
            },
            {
                pay: 'taiwanAppStore',
                id: 'com.sunday.30',
                money: 1.99,
                volue: 15000,
                gift: 0,
                address: 'London No. 1 Lake Park'
            },
            {
                pay: 'iPhone',
                id: 'com.bunny.5',
                money: 3.99,
                volue: 30000,
                gift: 0,
                address: 'Sydney No. 1 Lake Park'
            },
            {
                pay: 'AppStore',
                id: 'com.bunny.6',
                money: 1,
                volue: 7000,
                gift: 0,
                address: 'Ottawa No. 2 Lake Park'
            }
        ],
        pay: '', // 新增和编辑页面使用的数据    支付类型
        id: '', //  新增和编辑页面使用的数据    商品ID
        money: '', //  新增和编辑页面使用的数据    支付金额
        volue: '', //  新增和编辑页面使用的数据    币值
        gift: '', //  新增和编辑页面使用的数据    赠送币
        address: '', //  新增和编辑页面使用的数据      说明
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
      },
       outPortcsv:function(){
        this.$refs.table.exportCsv({
        filename: 'The original data'
        });
      },
      outPortxlsx() {
        this.downloadLoading = true;
        require.ensure([], () => {
            const {export_json_to_excel} = require('../../../assets/js/Export2Excel') //这个地址和页面的位置相关，这个地址是Export2Excel.js相对于页面的相对位置
            const tHeader = ["支付类型","商品ID","金额","币值","赠送币","说明",'操作']; //这个是表头名称 可以是iveiw表格中表头属性的title的数组
            const filterVal = ['pay','id','money','volue','gift','address']; //与表格数据配合 可以是iview表格中的key的数组
            const list = this.data; //表格数据，iview中表单数据也是这种格式！
            const data = this.formatJson(filterVal, list)
            export_json_to_excel(tHeader, data, '列表excel') //列表excel  这个是导出表单的名称
            this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
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
              margin-left: 10px;
            //   margin-right: 10px;
              font-size: 15px;
          }
    }
    .center{width:100%; margin-top:20px;
        button {
            margin-right: 5px
        }
    }  // 页面中部 表格部分样式
    .bottom{width:100%; margin-top:15px;} // 页面底部 分页部分样式
    .marsk{ // 遮罩层
        position: absolute;
        top: 0;
        left: 0; 
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.5;
        z-index: 2999;
    }
    .pop{  // 弹出层
        padding:2% 4%;
        position: absolute;
        top: 9%;
        left: 18%; 
        width: 60%;
        height: 80%;
        background: #fff;
        z-index: 3001;
    }
}
</style>
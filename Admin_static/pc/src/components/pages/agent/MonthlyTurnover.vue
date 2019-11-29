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
          <!-- 查询 -->
          <div class="top">
              <!-- <Select v-model="beg_y" size="small" style="width:120px; margin-right:5px;">
                  <Option v-for="item in beg_year" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Select v-model="beg_m" size="small" style="width:120px; margin-right:5px;">
                  <Option v-for="item in beg_month" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <label>至</label>
              <Select v-model="end_y" size="small" style="width:120px; margin-right:5px;">
                  <Option v-for="item in end_year" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Select v-model="end_m" size="small" style="width:120px; margin-right:20px;">
                  <Option v-for="item in end_month" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select> -->
              <DatePicker v-model="times" type="daterange" size="small" split-panels placeholder="日期" style="width: 200px; margin-right: 10px;"></DatePicker>
              <Select v-model="category" size="small" style="width:150px; margin-right:10px;">
                  <Option v-for="item in categorys" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Select v-model="state" size="small" style="width:150px; margin-right:5px;">
                  <Option v-for="item in states" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Input v-model="id" placeholder="请输入..." size="small" style="width:150px;"></Input>
              <Button type="primary" size="small" @click="lookup">查询</Button>
          </div>
          <!-- 主页面内容 -->
          <div class="center" >    
            <Table border :columns="columns" :data="data" class="table"  ref="table">
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
            </Table>
          </div>
          <div style="font-size: 15px; margin-top: 10px;">
              <label>当月总计：</label><span>1</span>
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
        category: '', // 查询栏 代理类别
        state: '', // 查询栏 状态
        times: '', // 查询栏 时间范围

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
        categorys: [ // 类别
            {
                value: '1',
                label: '全部'
            },
            {
                value: '2',
                label: '喵播代理'
            },
            {
                value: '3',
                label: '海外代理'
            },
            {
                value: '4',
                label: '特殊人员'
            }
        ],
        states: [ // 状态
            {
                value: '0',
                label: '在职'
            },
            {
                value: '1',
                label: '封停'
            }
        ],
        // 表格列名称
        columns: [
            {title: '代理商ID',key: 'pay'},
            {title: '代理商用户名',key: 'id'}, 
            {title: '当月销售额',key: 'money'}
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

        resets: { // 暂存页面内容数据
            pay: '',  // 支付类型
            id: '', // 商品ID
            money: '', // 支付金额
            volue: '', // 币值
            gift: '', // 赠送币
            address: '' // 说明
        }
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
          console.log(this.times)
      },
      fenye: function (page) { // 页面的分页功能
          console.log(page)
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main{
    overflow-x: scroll;
    overflow: hidden;
    position: relative;
    .tips{
        text-align: left;
    }
    .top{margin-top:20px; margin-left: 20px; display: flex; padding: 10px; border: solid rgb(211, 211, 211) 1px;
        button{
              margin-left: 15px;
          }
        label{
              margin-left: 5px;
              margin-right: 10px;
              font-size: 15px;
          }
    }
    .center{width:100%; margin-top:20px;}
    .bottom{width:100%; margin-top:15px;}
    .marsk{
        position: absolute;
        top: 0;
        left: 0; 
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.5;
        z-index: 2999;
    }
    .pop{
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
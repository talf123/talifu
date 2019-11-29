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
                <Select v-model="query" size="small" style="width:150px">
                    <Option v-for="item in anchortype " :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <label>IDX：</label>
                <Input v-model="query_idx" size="small" placeholder="请输入..." style="width:200px"></Input>
                <label>时间：</label>
                <DatePicker type="daterange" v-model="query_data" size="small" split-panels placeholder="日期" style="width: 200px"></DatePicker>
                <Button type="primary" size="small" @click="lookup">查询</Button>
            </div>
            <!-- 主页面内容 -->
            <div class="center" >
                <Table border :columns="biao" :data="data" class="table"  ref="table">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="text" size="small" style="margin-right: 5px" @click="pass(row)">通过</Button>
                        <Button type="text" size="small" @click="reject(row)">驳回</Button>
                    </template>
                </Table>
            </div>
            <!-- 遮罩层 -->
            <div class="marsk" v-if="showNone"></div>
            <!-- 驳回页面 -->
            <div class="pop" v-if="showNonecreate">
                <p style="font-size:25px; margin-bottom: 30px;">是否确认驳回?</p>
                <Button type="primary" @click="confirm1()">确认</Button>
                <Button style="margin-left:15px;" @click="close1()">取消</Button>
            </div>
            <!-- 通过确认页面 -->
            <div class="pop" v-if="showNoneUpdate">
                <p style="font-size:25px; margin-bottom: 30px;">是否确认通过?</p>
                <Button type="primary" @click="confirm()">确认</Button>
                <Button style="margin-left:15px;" @click="close()">取消</Button>
            </div>
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
        query_idx: '', // 查询功能idx
        query_data: '', // 查询功能 日期

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
        anchortype: [ // 查询条件
            {
                value: '1',
                label: '认证主播(星级)'
            },
            {
                value: '2',
                label: '签约家族'
            }
        ],
        biao: [],
        // 表格列名称
        columns1: [
            {title: '序号',key: 'pay',width: 120},
            {title: 'IDX',key: 'id' ,width: 120}, 
            {title: '昵称',key: 'money',width: 120},
            {title: '姓名',key: 'volue',width: 120},
            {title: '年龄',key: 'volue',width: 120},
            {title: '手机',key: 'gift',width: 120},
            {title: '微信',key: 'address',width: 120},
            {title: '有无直播经验',key: 'address',width: 200},
            {title: '照片',key: 'address',width: 120},
            {title: '状态',key: 'address',width: 120},
            {title: '操作',slot: 'action',align: 'center',width: 120}
        ],
        columns2: [
            {title: '序号',key: 'pay'},
            {title: 'IDX',key: 'id'}, 
            {title: '昵称',key: 'money'},
            {title: '姓名',key: 'volue'},
            {title: '手机',key: 'gift'},
            {title: '微信',key: 'address'},
            {title: '备注',key: 'volue'}
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
      pass: function(row) { // 通过页面
          this.showNone = true,
          this.showNoneUpdate = true,
          this.pay = row.pay,
          this.id = row.id,
          this.money = row.money,
          this.volue = row.volue,
          this.gift = row.gift,
          this.address = row.address,
          console.log(row)
      },
      confirm: function() { // 通过页面确认
          this.showNone = false,
          this.showNoneUpdate = false,
          console.log(this.id)
      },
      close: function () { // 通过页面取消
          this.showNone = false, // 遮罩层关闭
          this.showNoneUpdate = false, // 修改页面关闭
          this.showNonecreate = false // 新建页面关闭
      },
      
      reject: function(row) { // 驳回页面
        //   this.data.splice(index, 1);
          this.showNonecreate = true,
          this.showNone = true,
          this.id = row.id
          console.log(row)
      },
      confirm1: function() { // 驳回页面确认
          this.showNone = false,
          this.showNonecreate = false,
          console.log(this.id)
      },
      close1: function () { // 驳回页面取消
          this.showNone = false, // 遮罩层关闭
          this.showNoneUpdate = false, // 修改页面关闭
          this.showNonecreate = false // 新建页面关闭
      },
      lookup: function () { // 查找
          if (this.query == 1)
          {
              this.biao = this.columns1
          }
          else if (this.query == 2)
          {
              this.biao = this.columns2
          }
          else
          {
              console.log(this.query)
          }
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
    .top{margin-top:10px; margin-left: 20px; text-align: left; padding: 5px;  // 表头部分 查找添加 样式
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
    .marsk{ // 遮罩层
        position: fixed;
        top: 0;
        left: 0; 
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.5;
        z-index: 2999;
    }
    .pop{  // 弹出层
        padding:3% 4%;
        position: fixed;
        top: 21%;
        left: 32%; 
        width:35%;
        height: 30%;
        background: #fff;
        z-index: 3001;
    }
}
</style>
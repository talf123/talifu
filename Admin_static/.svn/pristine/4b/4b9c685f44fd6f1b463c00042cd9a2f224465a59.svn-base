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
            <label>时间范围：</label>
                <DatePicker type="daterange" size="small" split-panels placeholder="日期" style="width: 180px"></DatePicker>
                <Button type="primary" size="small" @click="lookup()">查询</Button>
          </div>
          <!-- 主页面内容 -->
          <div class="center" >
            <Table border :columns="columns" :data="data" class="table"  ref="table">
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="text" size="small" style="margin-right: 5px" @click="update(row)">查看</Button>
                </template>
            </Table>
          </div>
          <!-- 遮罩层 -->
          <div class="marsk" v-if="showNone"></div>
          <!-- 查看详情页面 -->
            <div class="pop" v-if="showNoneUpdate">
                <div class="top" style="margin-top: -15px;">
                    <Button type="primary" size="small" @click="close">返回上一级</Button>
                </div>
                <div class="center_detailed">
                    <table border="1" cellspacing="0" width="45%" height="150">
                        <tr><th colspan="2">系统币新增</th></tr>
                        <tr v-for="item in New_Currency" :key="item.name"><td width="50%">{{item.name}}</td><td width="50%">{{item.value}}</td></tr>
                    </table>
                    <table border="1" cellspacing="0" width="45%" height="150">
                        <tr><th colspan="2">系统币新增</th></tr>
                        <tr v-for="item in New_Currency" :key="item.name"><td width="50%">{{item.name}}</td><td width="50%">{{item.value}}</td></tr>
                    </table>
                </div>
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
            {title: '日期',key: 'pay'},
            {title: '系统币剩余',key: 'id'}, 
            {title: '礼物类消耗',key: 'money'},
            {title: '道具类消耗	',key: 'volue'},
            {title: '活动类消耗	',key: 'gift'},
            {title: '游戏消耗	',key: 'gift'},
            {title: '新增货币	',key: 'gift'},
            {title: '误差	',key: 'gift'},
            {title: '操作',slot: 'action',align: 'center'}
        ],
        New_Currency:[
            {name: '充值: ', value:'1'},
            {name: '赠送: ', value:'1'},
            {name: '收到红包: ', value:'1'},
            {name: '客户端得到贡献:	', value:'1'},
            {name: '9158币兑换喵币:	', value:'1'},
            {name: '喵播运动会加币: ', value:'1'},
            {name: '后台添加: ', value:'1'},
            {name: '游戏币兑换喵币: ', value:'1'},
            {name: '幸运礼物中奖: ', value:'1'}
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
      update: function(row) { // 修改页面
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
      close: function () { // 新建页面和修改页面取消修改
          this.showNone = false, // 遮罩层关闭
          this.showNoneUpdate = false, // 修改页面关闭
          this.showNonecreate = false// 新建页面关闭
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
              margin-left: 10px;
            //   margin-right: 10px;
              font-size: 15px;
          }
    }
    .center{
        width:100%; margin-top:20px; 
        // display: flex;
        // justify-content: space-around;
        // justify-content: space-between;
        // align-items: center;
        button {
            margin-right: 5px
        }
    }  // 页面中部 表格部分样式
    .center_detailed{
        width:100%; margin-top:20px; 
        display: flex;
        justify-content: space-around;
        // justify-content: space-between;
        // align-items: center;
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
        padding:2% 4%;
        position: fixed;
        top: 0%;
        left: 0%; 
        width: 100%;
        height: 100%;
        background: #fff;
        z-index: 3001;
    }
}
</style>
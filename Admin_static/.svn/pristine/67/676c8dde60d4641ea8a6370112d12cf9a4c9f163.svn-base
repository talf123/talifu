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
          <!-- 显示 -->
          <div class="top">
            <label>系统配置</label>
          </div>
          <div class="top">
            <label>当前VIP等级:</label><span></span>
            <label>第三方登录:</label><span></span>
            <label>分享按钮:</label><span></span>
            <label>是否赠币:</label><span></span>
          </div>
          <!-- 主页面内容 -->
          <div class="center" >
            <label class="wth">允许开播最低要求：</label>
            <Select v-model="query" size="small" style="width:200px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <label>选择时间段：</label>
            <DatePicker type="datetimerange" size="small" placeholder="日期" style="width: 300px"></DatePicker>
          </div>
          <div class="center" >
            <label class="wth">是否隐藏IOS第三方登录：</label>
            <Select v-model="query" size="small" style="width:200px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <label>选择时间段：</label>
            <DatePicker type="datetimerange" size="small" placeholder="日期" style="width: 300px"></DatePicker>
          </div>
          <div class="center" >
            <label class="wth">是否隐藏分享按钮：</label>
            <Select v-model="query" size="small" style="width:200px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <label>选择时间段：</label>
            <DatePicker type="datetimerange" size="small" placeholder="日期" style="width: 300px"></DatePicker>
          </div>
          <div class="center" >
            <label class="wth">是否赠币：</label>
            <Select v-model="query" size="small" style="width:200px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
          <div class="center" >
            <label class="wth">实名认证配置：</label>
            <Button type="primary" size="small" @click="install()">设置</Button>
          </div>
          <div class="bottom">
          <Button type="primary">提交</Button>
          </div>

        <!-- 遮罩层 -->
        <div class="marsk" v-if="showNone"></div>

        <!-- 设置页面 -->
        <div class="pop" v-if="showNoneUpdate">
            <div style="display:flex; padding:15px; font-size: 15px; border: 1px rgb(192, 192, 192) solid; margin:20px;">
                <label>实名认证：</label>
                <Button @click="judge" size="small">{{type_i}}</Button>
            </div>
            <div style="display:flex; padding:15px; font-size: 15px; border: 1px rgb(192, 192, 192) solid; margin:20px;">
                <label>时间段设置：</label>
                <Button @click="add" size="small">添加</Button>
            </div>
            <div style="display:flex; padding:15px; font-size: 15px; border: 1px rgb(192, 192, 192) solid; margin:20px;">
                <Table border :columns="columns" :data="tabledata" ref="table" style="width:100%">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="text" size="small" @click="add">修改</Button>
                        <Button type="text" size="small" @click="remove(index,row)">删除</Button>
                    </template>
                </Table>
            </div>
            <div style="display:flex; padding:15px; font-size: 15px; border: 1px rgb(192, 192, 192) solid; margin:20px;">
                <label>次数限制：</label>
                <Input v-model="value" size="small" placeholder="Enter something..." style="width: 200px; margin-right: 20px;" />
                <Button @click="modify(true)" size="small">修改</Button>
            </div>
            <Button type="primary" size="small" @click="moveback()">返回</Button>
        </div>
        <!-- 设置页面添加 -->
        <div class="pop1" v-if="showNonecreate">
            <h2>实名认证时间段添加</h2>
            <div style="display:flex; padding:15px; font-size: 15px; border: 1px rgb(192, 192, 192) solid; margin:20px;">
                <label>开始时段：</label>
                <TimePicker :value="time1" size="small" format="HH点mm分ss秒" placeholder="Select time" style="width: 168px"></TimePicker>
            </div>
            <div style="display:flex; padding:15px; font-size: 15px; border: 1px rgb(192, 192, 192) solid; margin:20px;">
                <label>结束时段：</label>
                <TimePicker :value="time2" size="small" format="HH点mm分ss秒" placeholder="Select time" style="width: 168px"></TimePicker>
            </div>
            <Button type="primary" size="small">保存</Button>
            <Button type="primary" size="small" @click="close">取消</Button>
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
        type_i: '强制', //设置功能用于按钮字显示
        i: 1, //设置功能用于判断
        sw: true,
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
            {title: '开始时段',key: 'pay'},
            {title: '结束时段',key: 'id'}, 
            {title: '操作',slot: 'action',align: 'center'}
        ],
        tabledata: [ // 数据表数据
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
      install: function(row) { // 设置页面
          this.showNoneUpdate = true
      },
      reset: function(row) { // 修改页面重置功能
          this.pay = this.resets.pay,
          this.id = this.resets.id,
          this.money = this.resets.money,
          this.volue = this.resets.volue,
          this.gift = this.resets.gift,
          this.address = this.resets.address
      },
      installadd: function() { // 修改页面保存
          this.showNone = false,
          this.showNoneUpdate = false,
          console.log(this.id)
      },
      close: function () { // 新建页面和修改页面取消修改
          this.showNone = false, // 遮罩层关闭
          this.showNonecreate = false // 新建页面关闭
      },
      moveback: function () {
          this.showNoneUpdate = false
      },
      lookup: function () { // 查找
          console.log(this.query)
      },
      fenye: function (page) { // 页面的分页功能
          console.log(page)
      },
      judge: function () {
          if (this.i == 1) {
              this.type_i = '不强制';
              this.i = 2;
          } else {
              this.type_i = '强制';
              this.i = 1;
          }
      },
      add: function () {
          this.showNone = true,
          this.showNonecreate = true
      },
      modify: function (nodesc) {
        //   alert('修改成功!')
        this.$Notice.success({
        title: '修改成功！',
        });
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
    .top{margin-top:10px; margin-left: 20px; padding: 5px;  // 表头部分 查找添加 样式
          button{
              margin-left: 15px;
          }
          label{
              margin-left: 15px;
              margin-right: 15px;
              font-size: 15px;
          }
    }
    .center{width:100%; margin-top:20px; display:flex; margin-left:18%;
        .wth {
            margin-left: 10px;
            width:200px;
            text-align: left;
            font-size: 15px;
            margin-right: 5px
        }
        label {
            margin-left: 20px;
            font-size: 15px;
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
        z-index: 3002;
    }
    .pop{  // 弹出层
        position: absolute;
        top: 0%;
        left: 0%; 
        width: 100%;
        height: 100%;
        background: #fff;
        z-index: 3001;
    }
    .pop1{  // 弹出层
        padding: 30px;
        position: absolute;
        top: 20%;
        left: 20%; 
        width: 50%;
        height: 50%;
        background: #fff;
        z-index: 3003;
    }
}
</style>
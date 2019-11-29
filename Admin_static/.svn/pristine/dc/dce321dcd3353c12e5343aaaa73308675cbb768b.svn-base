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
            <label>房间号：</label>
            <Input v-model="roomid" placeholder="Enter something..." style="width: 200px" />
            <label>用户IDX：</label>
            <Input v-model="userid" placeholder="Enter something..." style="width: 200px" />
            <Button type="primary" @click="lookup">查询</Button>
          </div>
          <!-- 主页面内容 -->
          <div class="center" >
            <Table border :columns="columns" :data="data" class="table"  ref="table">
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="text" size="small" style="margin-right: 5px" @click="hangup(row)">挂机</Button>
                </template>
            </Table>
          </div>
          <!-- 遮罩层 -->
          <div class="marsk" v-if="showNone"></div>
          <!-- 挂机页面 -->
            <div class="pop" v-if="showNonecreate">
                <Form :label-width="80">
                    <FormItem label="房间号：">
                        <Input v-model="roomid" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="挂机方式">
                        <Select v-model="pay">
                            <Option v-for="item in hungupmodes" :value="item.value"  :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>

                    <FormItem label="挂机人数：">
                        <Input v-model="hangupnumber" placeholder="请输入..." ></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="hangupadd">确定</Button>
                        <Button style="margin-left: 8px" type="dashed" @click="reset">重置</Button>
                        <Button style="margin-left: 8px" @click="close">返回</Button>
                    </FormItem>
                </Form>      
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
        roomid: null, // 查询使用 房间号
        userid: null, // 查询使用 用户id
        showNone: false, // 控制页面遮罩层开关
        showNoneUpdate: false, // 修改页面弹出控制
        showNonecreate: false, // 新增页面弹出控制
        // 表格列名称
        columns: [
            {title: '房间号',key: 'id'}, 
            {title: '室主IDX',key: 'money'},
            {title: '家族名称',key: 'volue'},
            {title: '真是人数',key: 'gift'},
            {title: '服务器ID',key: 'address'},
            {title: '所有人数',key: 'address'},
            {title: '挂机方式',key: 'address'},
            {title: '挂机人数',key: 'address'},
            {title: '操作',slot: 'action',align: 'center'}],
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
        hungupmodes: [ // 挂机方式
            {
                value: 1,
                label: '智能'
            },
            {
                value: 2,
                label: '自动'
            }
        ],
        hangupnumber: null, //挂机页面人数

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
      hangup: function(row) { // 挂机页面
          this.showNone = true,
          this.showNonecreate = true,
          console.log(row.id)
      },
      reset: function(row) { // 挂机页面重置功能
      },
      hangupadd: function() { // 挂机页面保存
          this.showNone = false,
          this.showNonecreate = false,
          console.log(this.id)
      },
      close: function () { // 挂机页面取消修改
          this.showNone = false, // 遮罩层关闭
          this.showNoneUpdate = false, // 修改页面关闭
          this.showNonecreate = false // 新建页面关闭
      },
      lookup: function () { // 查找
          console.log(this.roomid)
          console.log(this.userid)
      },
      fenye: function (page) { // 页面的分页功能
          console.log(page)
      }
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
    .top{margin-top:20px; margin-left: 20px; display: flex;
        button{
              margin-left: 15px;
          }
        label{
              margin-left: 15px;
              font-size: 20px;
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
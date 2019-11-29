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
                <label>用户ID：</label>
                    <Input v-model="id" size="small" placeholder="请输入..." style="width:150px"></Input>
                <label>充值渠道：</label>
                    <Select v-model="query" size="small" style="width:150px">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <label>金额大于等于：</label>
                    <Input v-model="id" size="small" placeholder="请输入..." style="width:120px"></Input>
                    <label>时间范围：</label>
                    <DatePicker type="daterange" size="small" split-panels placeholder="日期" style="width: 180px"></DatePicker>
                <Button type="primary" size="small" @click="lookup">查询</Button>
            </div>
            <!-- 主页面内容 -->
            <div class="center" >
                <div style="font-size: 20px; margin-bottom: 15px;">
                    <label>总金额：</label><span>{{tot}}</span>
                </div>
                <Table border :columns="columns" :data="data" class="table"  ref="table" @on-row-click="examination">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                </Table>
            </div>
            <!-- 遮罩层 -->
            <div class="marsk" v-if="showNone"></div>
            <!-- 新增页面 -->
            <div class="pop" v-if="showNonecreate">
                <div class="top">
                    <label>时间范围：</label>
                    <DatePicker type="daterange" size="small" split-panels placeholder="日期" style="width: 180px"></DatePicker>
                    <label>用户ID：</label>
                    <Input v-model="query_id" size="small" placeholder="请输入..." style="width:150px"></Input>
                    <Button type="primary" size="small" @click="lookup">查询</Button>
                    <Button  size="small" @click="close()">返回上一菜单</Button>
                </div>
                <div class="center">
                    <Table border :columns="columns1" :data="data" class="table"  ref="table">
                        <template slot-scope="{ row }" slot="name">
                            <strong>{{ row.name }}</strong>
                        </template>
                    </Table>
                    
                </div>
            </div>
            <!-- 修改编辑页面 -->
            <div class="pop" v-if="showNoneUpdate">
                <Form :label-width="80">
                    <FormItem label="支付类型：">
                        <Select v-model="pay">
                            <Option value="Android">Android</Option>
                            <Option value="iPhone">iPhone</Option>
                            <Option value="AppStore">AppStore</Option>
                            <Option value="taiwangooglestore">台湾googlestore</Option>
                            <Option value="taiwanAppStore">台湾AppStore</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="商品ID：">
                        <Input v-model="id" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="金额：">
                        <Input v-model="money" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="币值：">
                        <Input v-model="volue" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="赠送币：">
                        <Input v-model="gift" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="说明：">
                        <Input v-model="address" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="updateadd">保存</Button>
                        <Button style="margin-left: 8px" type="dashed" @click="reset">重置</Button>
                        <Button style="margin-left: 8px" @click="close">取消</Button>
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
        query: '', // 查询功能 绑定的数据
        query_id: '', // 查询功能 ID
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
            {title: '编号',key: 'pay'},
            {title: '用户IDX',key: 'id'}, 
            {title: '用户名',key: 'money'},
            {title: '金额',key: 'volue', sortable: true},
            {title: '充值渠道',key: 'gift'},
            {title: '充值类型',key: 'address'},
            {title: '时间',key: 'address'}
        ],
        columns1: [
            {title: '用户ID',key: 'pay'},
            {title: '登陆时间',key: 'id'}, 
            {title: 'IP',key: 'money'},
    
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
        tot: null, // 总金额

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
    this.getWidth();
    this.bbb();
  },
  destroyed () {
    window.removeEventListener('resize', this.getWidth)
  },
  mounted () {
      
  },
  computed: {
      
  },
  methods: {
      bbb: function () { // 计算总金额的函数
        //   var that =this;
        //   console.log(this.data.length)
          let sum = this.data.length;
          for (let i = 0; i < sum; i++ )
          {
              this.tot = this.data[i].volue + this.tot   
          }
      },
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
      examination: function (dada) {
          this.showNone = true;
          this.showNonecreate = true;
          this.query_id = dada.id
          console.log(dada)

      },
      close: function() {
          this.showNone = false;
          this.showNonecreate = false;
          this.query_id = ''
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
    .pop{
        padding:3% 4%;
        position: fixed;
        top: 0%;
        left: 0%; 
        width: 100%;
        height: 100%;
        background: #fff;
        z-index: 3001;
        overflow-y: scroll; // 让弹出的页面可以有滚动条
}

}
</style>
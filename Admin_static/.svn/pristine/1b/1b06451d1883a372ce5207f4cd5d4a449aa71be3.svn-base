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
            <p>广告列表<span style="color:red">(广告信息十分钟生效)</span></p>
          </div>
          <Button class="top" @click="add">添加广告图片</Button>
          <!-- 主页面内容 -->
          <div class="center" >
            <Table border :columns="columns" :data="data" class="table"  ref="table">
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="text" size="small" @click="update(row)">编辑</Button>
                    <Button type="text" size="small" @click="remove(index,row)">删除</Button>
                </template>
            </Table>
          </div>
          <!-- 遮罩层 -->
          <div class="marsk" v-if="showNone"></div>
          <!-- 添加广告图片 -->
          <div class="pop" v-if="showNonecreate">
              <Form :label-width="80">
                <FormItem label="分包类型：">
                    <CheckboxGroup v-model="fruit">
                        <Checkbox label="主包"></Checkbox>
                        <Checkbox label="喵live"></Checkbox>
                        <Checkbox label="马甲包"></Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <FormItem label="标题：">
                    <Input v-model="id" placeholder="请输入..."></Input>
                </FormItem> 
                <FormItem label="图片：">
                    <Input v-model="id" placeholder="请输入..."></Input>
                </FormItem> 
                <FormItem label="链接：">
                    <Input v-model="id" placeholder="请输入..."></Input>
                </FormItem> 
                <FormItem label="房间：">
                    <Input v-model="id" placeholder="请输入..."></Input>
                </FormItem> 
                <FormItem label="开始结束时间：">
                    <DatePicker type="daterange" v-model="datatime" split-panels placeholder="Select date" style="width: 100%"></DatePicker>
                </FormItem> 
                <FormItem label="排序：">
                    <Input v-model="id" placeholder="请输入..."></Input>
                </FormItem> 
                <FormItem label="广告位置：">
                    <Input v-model="id" placeholder="请输入..."></Input>
                </FormItem> 
                <FormItem label="小图(大小不可超过32K)：">
                    <Input v-model="id" placeholder="请输入..."></Input>
                </FormItem> 
                <FormItem label="说明文字：">
                    <Input v-model="id" placeholder="请输入..."></Input>
                </FormItem> 

                <FormItem>
                    <Button type="primary" @click="newadd">保存</Button>
                    <Button style="margin-left: 8px" type="dashed" @click="reset">重置</Button>
                    <Button style="margin-left: 8px" @click="close">取消</Button>
                </FormItem>
              </Form>
          </div>
          <!-- 修改编辑页面 -->
            <div class="pop" v-if="showNoneUpdate">
                <Form :label-width="80">
                    <FormItem label="标题：">
                        <Input v-model="id" placeholder="请输入..."></Input>
                    </FormItem>
                    <!-- 图片上传未做 -->
                    <FormItem label="图片：">
                        <Input v-model="money" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="链接：">
                        <Input v-model="volue" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="房间：">
                        <Input v-model="gift" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="开始结束时间：">
                         <DatePicker v-model="datatime" type="datetimerange" placeholder="请输入..." style="width: 100%"></DatePicker>
                    </FormItem>
                    <FormItem label="排序：">
                        <Input v-model="gift" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="分包类型：">
                        <CheckboxGroup v-model="fruit">
                            <Checkbox label="主包"></Checkbox>
                            <Checkbox label="喵live"></Checkbox>
                            <Checkbox label="马甲包"></Checkbox>
                        </CheckboxGroup>
                    </FormItem>
                    <FormItem label="广告位置：">
                        <Select v-model="Advertising" clearable style="width:100%">
                            <Option v-for="item in Adposition" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                     <!-- 图片上传未做 -->
                    <FormItem label="小图：">
                        <Input v-model="gift" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="说明文字：">
                        <Input v-model="gift" placeholder="请输入..."></Input>
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
        showNone: false, // 控制页面遮罩层开关
        showNoneUpdate: false, // 修改页面弹出控制
        showNonecreate: false, // 新增页面弹出控制
        // 表格列名称
        columns: [
            {title: '标题',key: 'pay'},
            {title: '图片',key: 'id'}, 
            {title: '链接',key: 'money'},
            {title: '房间',key: 'volue'},
            {title: '开始时间',key: 'gift'},
            {title: '结束时间',key: 'address'},
            {title: '排序',key: 'address'},
            {title: '分包展示',key: 'address'},
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
        Adposition: [ // 编辑页面广告选项数组
            {
                value: 'New York',
                label: 'New York'
            },
            {
                value: 'London',
                label: 'London'
            },
            {
                value: 'Sydney',
                label: 'Sydney'
            },
            {
                value: 'Ottawa',
                label: 'Ottawa'
            },
            {
                value: 'Paris',
                label: 'Paris'
            },
            {
                value: 'Canberra',
                label: 'Canberra'
            }
        ],
        Advertising: null, // 编辑页面广告项绑定的数据

        pay: '', // 新增和编辑页面使用的数据    支付类型
        id: '', //  新增和编辑页面使用的数据    商品ID
        money: '', //  新增和编辑页面使用的数据    支付金额
        volue: '', //  新增和编辑页面使用的数据    币值
        gift: '', //  新增和编辑页面使用的数据    赠送币
        address: '', //  新增和编辑页面使用的数据      说明
        datatime: null, //新增和编辑页面  开始结束时间
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
      add: function () {
          this.showNone = true,
          this.showNonecreate = true

      },
      update: function(row) { // 修改页面
          this.resets.pay = row.pay
          this.resets.id = row.id
          this.resets.money = row.money
          this.resets.volue = row.volue
          this.resets.gift = row.gift
          this.resets.address = row.address,

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
      reset: function(row) { // 修改页面重置功能
          this.pay = this.resets.pay,
          this.id = this.resets.id,
          this.money = this.resets.money,
          this.volue = this.resets.volue,
          this.gift = this.resets.gift,
          this.address = this.resets.address
      },
      updateadd: function() { // 修改页面保存
          this.showNone = false,
          this.showNoneUpdate = false,
          console.log(this.id)
      },
      close: function () { // 新建页面和修改页面取消修改
          this.showNone = false, // 遮罩层关闭
          this.showNoneUpdate = false, // 修改页面关闭
          this.showNonecreate = false, // 新建页面关闭

          this.resets.pay = null, // 页面重置功能 使用的缓存数据清空
          this.resets.id = null,
          this.resets.money = null,
          this.resets.volue = null,
          this.resets.gift = null,
          this.resets.address = null

      },
      remove: function(index,row) { // 删除
          this.data.splice(index, 1);
          console.log(row.id)
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
    }
    .center{width:100%; margin-top:20px;
        button {
            margin-right: 5px
        }
    }
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
        overflow-y: scroll; // 让弹出的页面可以有滚动条
    }
    /*webkit内核*/
    .pop::-webkit-scrollbar {
        width:0px;
        height:0px;
    }
    /*o内核*/
    .pop .-o-scrollbar{
        -moz-appearance: none !important;   
        background: rgba(0,255,0,0) !important; 
    }
    /*IE10,IE11,IE12*/
    .pop{
        -ms-scroll-chaining: chained;
        -ms-overflow-style: none;
        -ms-content-zooming: zoom;
        -ms-scroll-rails: none;
        -ms-content-zoom-limit-min: 100%;
        -ms-content-zoom-limit-max: 500%;
        -ms-scroll-snap-type: proximity;
        -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
        -ms-overflow-style: none;
        overflow: auto;
    }
}
</style>
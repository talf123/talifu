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
              <Select v-model="query" size="small" style="width:200px">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Button type="primary" size="small" @click="create">添加系统消息</Button>
          </div>
          <!-- 主页面内容 -->
          <div class="center" >
            <Table border :columns="columns" :data="data" class="table"  ref="table">
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="text" size="small" style="margin-right: 5px" @click="update(row)">编辑</Button>
                    <Button type="text" size="small" @click="remove(index,row)">删除</Button>
                </template>
            </Table>
          </div>
          <!-- 遮罩层 -->
          <div class="marsk" v-if="showNone"></div>
          <!-- 添加系统消息 -->
            <div class="pop" v-if="showNonecreate">
                <Tabs type="card">
                    <TabPane label="房间循环系统消息">
                        <Form :label-width="80">
                            <FormItem label="推送消息：">
                                <Input v-model="address" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="请输入..."></Input>
                            </FormItem>
                            <FormItem label="消息序号：">
                                <Input v-model="id" placeholder="请输入..."></Input>
                            </FormItem>
                            
                            <div style="display: flex; margin-bottom: 20px;">
                                <Select v-model="model" style="width:200px; margin-right: 15px;">
                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <Input v-model="id" placeholder="请输入..."></Input>
                            </div>
                            
                            <FormItem label="循环间隙时间：">
                                <Input v-model="money" placeholder="请输入..."></Input>
                            </FormItem>
                            <FormItem label="跳转字符：">
                                <Input v-model="volue" placeholder="请输入..."></Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="updateadd">保存</Button>
                                <Button style="margin-left: 8px" type="dashed" @click="reset">重置</Button>
                                <Button style="margin-left: 8px" @click="close">取消</Button>
                            </FormItem>
                        </Form> 
                    </TabPane>
                    <TabPane label="房间默认系统消息">
                        <Form :label-width="80">
                            <FormItem label="推送消息：">
                                <Input v-model="address" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="请输入..."></Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="updateadd">保存</Button>
                                <Button style="margin-left: 8px" type="dashed" @click="reset">重置</Button>
                                <Button style="margin-left: 8px" @click="close">取消</Button>
                            </FormItem>
                        </Form>
                    </TabPane>
                    <TabPane label="系统消息">
                        <Form :label-width="80">
                            <FormItem label="发送对象：">
                                <Select v-model="model1">
                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="消息内容：">
                                <Input v-model="address" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="请输入..."></Input>
                            </FormItem>
                            <FormItem label="消息类型：">
                                <Select v-model="model1">
                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="updateadd">保存</Button>
                                <Button style="margin-left: 8px" type="dashed" @click="reset">重置</Button>
                                <Button style="margin-left: 8px" @click="close">取消</Button>
                            </FormItem>
                        </Form>
                    </TabPane>
                </Tabs>     
            </div>
          <!-- 修改编辑页面 -->
            <div class="pop" v-if="showNoneUpdate">
                <Tabs type="card">
                    <TabPane label="房间循环系统消息">
                        <Form :label-width="80">
                            <FormItem label="推送消息：">
                                <Input v-model="address" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="请输入..."></Input>
                            </FormItem>
                            <FormItem label="消息序号：">
                                <Input v-model="id" placeholder="请输入..."></Input>
                            </FormItem>
                            
                            <div style="display: flex; margin-bottom: 20px;">
                                <Select v-model="model" style="width:200px; margin-right: 15px;">
                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <Input v-model="id" placeholder="请输入..."></Input>
                            </div>
                            
                            <FormItem label="循环间隙时间：">
                                <Input v-model="money" placeholder="请输入..."></Input>
                            </FormItem>
                            <FormItem label="跳转字符：">
                                <Input v-model="volue" placeholder="请输入..."></Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="updateadd">保存</Button>
                                <Button style="margin-left: 8px" type="dashed" @click="reset">重置</Button>
                                <Button style="margin-left: 8px" @click="close">取消</Button>
                            </FormItem>
                        </Form> 
                    </TabPane>
                    <TabPane label="房间默认系统消息">
                        <Form :label-width="80">
                            <FormItem label="推送消息：">
                                <Input v-model="address" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="请输入..."></Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="updateadd">保存</Button>
                                <Button style="margin-left: 8px" type="dashed" @click="reset">重置</Button>
                                <Button style="margin-left: 8px" @click="close">取消</Button>
                            </FormItem>
                        </Form>
                    </TabPane>
                    <TabPane label="系统消息">
                        <Form :label-width="80">
                            <FormItem label="发送对象：">
                                <Select v-model="model1">
                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="消息内容：">
                                <Input v-model="address" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="请输入..."></Input>
                            </FormItem>
                            <FormItem label="消息类型：">
                                <Select v-model="model1">
                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="updateadd">保存</Button>
                                <Button style="margin-left: 8px" type="dashed" @click="reset">重置</Button>
                                <Button style="margin-left: 8px" @click="close">取消</Button>
                            </FormItem>
                        </Form>
                    </TabPane>
                </Tabs>     
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
                value: '1',
                label: '跳转链接'
            },
            {
                value: '2',
                label: '跳转主播'
            },
        ],
        // 表格列名称
        columns: [
            {title: '编号',key: 'pay'},
            {title: '消息序号',key: 'id'}, 
            {title: '时间间隔(分钟)',key: 'money'},
            {title: '消息内容',key: 'volue'},
            {title: '操作',slot: 'action',align: 'center'}
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
      create: function () { // 新建数据页面
          this.showNone = true,
          this.showNonecreate = true,
          this.pay = null, // 清空数据，防止之前点击过修改造成数据缓存
          this.id = null,
          this.money = null,
          this.volue = null,
          this.gift = null,
          this.address = null
      },
      newadd: function () { // 新建页面保存
          this.showNone = false,
          this.showNonecreate = false,
          console.log(this.id)
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
              margin-right: 15px;
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
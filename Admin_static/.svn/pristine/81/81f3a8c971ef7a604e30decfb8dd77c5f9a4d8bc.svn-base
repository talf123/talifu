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
          <!-- 页面上部 -->
          <div class="top">
              <span class="delivery">投放设置</span>
              <span v-if="modechose">
                    <label>当前模式：</label>
                    <span style=" margin-right: 50px;">{{mymodelabel}}</span>
                    <Button type="primary" @click="switchmode">设置循环模式</Button>

                    <div style="margin-top: 20px;" v-if="mymode">
                        <span v-if="timechose">
                            <label>间隔：</label>
                            <Select v-model="time" style="width:200px">
                                <Option v-for="item in times" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            <Button type="primary" @click="switchtime">确认间隔</Button>
                        </span>
                        <span v-else>
                            <label>间隔：</label>
                            <span style="margin-right: 50px;">{{time}}</span>
                            <Button type="primary" @click="switchtime">设置间隔</Button>
                        </span>
                    </div>
              </span>
              <span v-else>
                  <label>当前模式：</label>
                    <Select v-model="mymode" style="width:200px">
                        <Option v-for="item in mymodes" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Button type="primary" @click="switchmode">确认循环模式</Button>
              </span>         
          </div>
          
          <!-- 主页面内容 -->
          <div class="center" >
            <span class="delivery">广告列表</span>
            <span class="bon">
            <Button type="primary" @click="add()">添加新广告</Button>
            </span>
            <Tabs type="card">
                <TabPane label="标签一">
                    <Table border :columns="columns" :data="data" class="table"  ref="table">
                        <template slot-scope="{ row }" slot="name">
                            <strong>{{ row.name }}</strong>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <Button type="text" size="small" @click="remove(index,row)">下架</Button>
                        </template>
                    </Table>  
                </TabPane>
                <TabPane label="标签二">
                    <Table border :columns="columns2" :data="data" class="table"  ref="table">
                        <template slot-scope="{ row }" slot="name">
                            <strong>{{ row.name }}</strong>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <Button type="text" size="small" @click="remove(index,row)">上架</Button>
                            <Button type="text" size="small" @click="remove(index,row)">编辑</Button>
                            <Button type="text" size="small" @click="remove(index,row)">删除</Button>
                        </template>
                    </Table>  
                </TabPane>
            </Tabs>


          </div>
          <!-- 遮罩层 -->
          <div class="marsk" v-if="showNone"></div>
          <!-- 新增页面 -->
            <div class="pop" v-if="showNonecreate">
                <Form :label-width="80">
                    <FormItem label="广告标题：">
                        <Input v-model="id" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="广告类型：">
                        <Input v-model="money" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="广告内容：">
                        <Input v-model="volue" placeholder="请输入..." ></Input>
                    </FormItem>
                    <FormItem label="投放平台：">
                        <RadioGroup v-model="animal">
                            <Radio label="全部"></Radio>
                            <Radio label="IOS"></Radio>
                            <Radio label="Android"></Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="物料图片(大)：">
                        <Input v-model="volue" placeholder="请输入..." ></Input>
                    </FormItem>

                    <FormItem label="物料图片(小)：">
                        <Input v-model="volue" placeholder="请输入..." ></Input>
                    </FormItem>

                    <FormItem label="广告链接：">
                        <Select v-model="query" style="width:150px">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Input v-model="volue" placeholder="请输入..." style="width:70%;"></Input>
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
                    <FormItem label="支付类型：">
                        <Select v-model="query" style="width:150px">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <!-- <FormItem label="Input">
                        <Input v-model="addItem.pay" placeholder="请输入..."></Input>
                    </FormItem> -->
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
        showNone: false, // 控制页面遮罩层开关
        showNoneUpdate: false, // 修改页面弹出控制
        showNonecreate: false, // 新增页面弹出控制
        modechose: true, // 切换模式部分显示的内容
        timechose: true, // 切换时间间隔部分显示的内容
        mymode: null, //  保存mymodes中的value的值， 与组件中的数据绑定
        mymodes: [ // 切换模式选择
            {
                value: 0,
                label: '单次广告展示一次'
            },
            {
                value: 1,
                label: '多广告循环'
            }
        ],
        time: null,
        times: [ // 切换模式选择
            {
                value: 1,
                label: 1
            },
            {
                value: 2,
                label: 2
            },
            {
                value: 3,
                label: 3
            }
        ],
        mymodelabel: null, // 保存mymodes中的label值

        // 表格列名称
        columns: [
            {title: '广告标题',key: 'id'}, 
            {title: '投放平台',key: 'money'},
            {title: '小图',key: 'volue'},
            {title: '大图',key: 'gift'},
            {title: '最近上架时间',key: 'gift'},
            {title: '最近下架时间',key: 'gift'},
            {title: '位置',key: 'gift'},
            {title: '展示量',key: 'gift'},
            {title: '点击量',key: 'address'},
            {title: '操作',slot: 'action',align: 'center'}
            ],
        columns2: [
            {title: '类别',key: 'pay'},
            {title: '广告标题',key: 'id'}, 
            {title: '投放平台',key: 'money'},
            {title: '小图',key: 'volue'},
            {title: '大图',key: 'gift'},
            {title: '最近上架时间',key: 'gift'},
            {title: '最近下架时间',key: 'gift'},
            {title: '位置',key: 'gift'},
            {title: '展示量',key: 'gift'},
            {title: '点击量',key: 'address'},
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
        animal: '', // 投放平台

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
      add: function () { // 新建数据页面
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
          
          const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter your password'));
                }
            };
      },
      lookup: function () { // 查找
          console.log(this.query)
      },
      fenye: function (page) { // 页面的分页功能
          console.log(page)
      },
      switchmode: function () { // 循环模式切换
          if ( this.modechose === true)
          {
              this.modechose = false
          } else {
              this.modechose = true,
              this.mymodelabel = this.mymodes[this.mymode].label  // 取出 mymodes 数组中的label的值
          }
      },
      switchtime: function () { // 时间间隔选择
          if ( this.timechose === true)
          {
              this.timechose = false
          } else {
              this.timechose = true
          }
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
    .top{margin-top:20px; margin-left: 10px; font-size: 15px;
        .delivery { //页面上的小标题
            border-bottom: 2px solid rgb(167, 167, 167); 
            font-size: 20px; 
            padding-bottom: 5px; 
            display:flex;
            margin-bottom: 35px;
        }
    }
    .center{width:100%; margin-top:20px; margin-left: 10px;
        .delivery {
            border-bottom: 2px solid rgb(167, 167, 167); 
            font-size: 20px; 
            padding-bottom: 5px; 
            display:flex;
            margin-bottom: 10px;
        }
        .bon { // 添加新广告按钮样式
            position: relative;
            left: 40%;
            top: 30px;
            z-index: 10;
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
    }
}
</style>
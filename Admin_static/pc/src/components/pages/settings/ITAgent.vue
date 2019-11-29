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
              <Select v-model="query" size="small" style="width:150px; margin-right:10px;">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <label>IP地址：</label>
              <Input v-model="id" placeholder="请输入..." size="small" style="width: 150px; margin-right:10px;"></Input>

              <Select v-model="query" size="small" style="width:150px; margin-right:10px;">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Input v-model="id" placeholder="请输入..." size="small" style="width: 150px; margin-right:10px;"></Input>
              <label>端口：</label>
              <Input v-model="id" placeholder="请输入..." size="small" style="width: 150px;"></Input>
              <Button type="primary" size="small" @click="lookup">查询</Button>
              <Button type="primary" size="small" @click="add">添加</Button>
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
          <!-- 新增页面 -->
            <div class="pop" v-if="showNonecreate">
                <Form ref="formDynamic" :model="formDynamic" :label-width="90">
                    <FormItem>
                        <Select v-model="pay">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="服务器ID：">
                        <Input v-model="id" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem
                            v-for="(item, index) in formDynamic.items"
                            v-if="item.status"
                            :key="index"
                            :label="'IP' + item.index + ':'"
                            :prop="'items.' + index + '.value'"
                            :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">
                        <Row>
                            <Col span="18">
                                <Input type="text" v-model="item.value" placeholder="Enter something..."></Input>
                            </Col>
                            <Col span="4" offset="1">
                                <Button @click="handleRemove(index)">删除</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Row>
                            <Col span="7">
                                <Button type="dashed" long @click="handleAdd" icon="md-add">添加</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem label="端口号：">
                        <Input v-model="volue" placeholder="多个端口请用英文逗号隔开; eg:2000,2005" ></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="newadd('formDynamic')">保存</Button>
                        <Button @click="reset('formDynamic')" style="margin-left: 8px">重置</Button>
                        <Button @click="close" style="margin-left: 8px">取消</Button>
                    </FormItem>
                </Form>      
            </div>
          <!-- 修改编辑页面 -->
            <div class="pop" v-if="showNoneUpdate">
                <Form ref="formDynamic1" :model="formDynamic" :label-width="80">
                    <FormItem>
                        <Select v-model="pay">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="服务器ID：">
                        <Input v-model="id" placeholder="请输入..."></Input>
                    </FormItem>
                    
                    <FormItem
                            v-for="(item, index) in formDynamic.items"
                            v-if="item.status"
                            :key="index"
                            :label="'IP' + item.index + ':'"
                            :prop="'items.' + index + '.value'"
                            :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">
                        <Row>
                            <Col span="18">
                                <Input type="text" v-model="address" placeholder="Enter something..."></Input>
                            </Col>
                            <Col span="4" offset="1">
                                <Button @click="handleRemove(index)">删除</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Row>
                            <Col span="7">
                                <Button type="dashed" long @click="handleAdd" icon="md-add">添加</Button>
                            </Col>
                        </Row>
                    </FormItem>

                    <FormItem label="端口号：">
                        <Input v-model="volue" placeholder="多个端口请用英文逗号隔开; eg:2000,2005" ></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="updateadd('formDynamic1')">保存</Button>
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
        index: 1,
        formDynamic: {
                    items: [
                        {
                            value: '',
                            index: 1,
                            status: 1
                        }
                    ]

        },


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
            {title: '服务器ID',key: 'pay'},
            {title: '服务端IP',key: 'id'}, 
            {title: '端口号',key: 'money'},
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

          this.pay = row.pay
          this.id = row.id
          this.volue = row.volue
          this.address = row.address
          console.log(row)
      },
      reset: function(row) { // 修改页面重置功能

      },
      updateadd (name) { // 修改页面保存
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
      },
      lookup: function () { // 查找
          console.log(this.query)
      },
      fenye: function (page) { // 页面的分页功能
          console.log(page)
      },

    newadd (name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                this.$Message.success('Success!');
                this.showNone = false;
                this.showNonecreate = false;
            } else {
                this.$Message.error('Fail!');
            }
        })
    },
    handleAdd () { // 添加 编辑功能中的 ip添加功能 添加
        this.index++;
        this.formDynamic.items.push({
            value: '',
            index: this.index,
            status: 1
        });
    },
    handleRemove (index) { // 添加 编辑功能中的 ip添加功能 删除
        this.formDynamic.items[index].status = 0;

        this.index = this.index - 1;
        this.formDynamic.items[index].index = this.index;
        console.log(this.formDynamic.items[index].index)
        console.log(this.index)
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
              margin-right: 10px;
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
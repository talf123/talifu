<template>
  <div class="content">
    <silderBar></silderBar>
    <div class="body_main">
        <navBar></navBar>
        <div class="main" :style="widthMain">
            <div class="tips">
                <Breadcrumb separator="<b class='demo-breadcrumb-separator'>=></b>">
                    <BreadcrumbItem to="/">首页</BreadcrumbItem>
                    <BreadcrumbItem to="">房间页面</BreadcrumbItem>
                    <BreadcrumbItem to="/power">power</BreadcrumbItem>
                </Breadcrumb>
            </div>
          <!-- 查询 新增 -->
          <div class="top">
            <label>支付类型：</label>
              <Select v-model="query" size="small" style="width:150px">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Button type="primary" size="small" @click="lookup">查询</Button>
              <Button type="primary" size="small" @click="create">新增</Button>
              <Button type="primary" size="small" @click="outPortcsv">导出csv</Button>
              <Button type="primary" size="small" @click="outPortxlsx">导出xlsx</Button>
          </div>
          <!-- 主页面内容 -->
          <div class="center" >
            <Table border :columns="columns" :data="data" class="table"  ref="table">
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="text" size="small" style="margin-right: 5px" @click="update(row)">修改</Button>
                    <Button type="text" size="small" @click="remove(index,row)">删除</Button>
                </template>
            </Table>
          </div>
          <!-- 遮罩层 -->
          <div class="marsk" v-if="showNone"></div>
          <!-- 新增页面 -->
            <div class="pop" v-if="showNonecreate">
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
                        <Input v-model="volue" placeholder="请输入..." ></Input>
                    </FormItem>
                    <FormItem label="赠送币：">
                        <Input v-model="gift" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="说明：">
                        <Input v-model="address" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="请输入..."></Input>
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
                        <Select v-model="pay">
                            <Option value="Android">Android</Option>
                            <Option value="iPhone">iPhone</Option>
                            <Option value="AppStore">AppStore</Option>
                            <Option value="taiwangooglestore">台湾googlestore</Option>
                            <Option value="taiwanAppStore">台湾AppStore</Option>
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
            <!-- ------------- -->
            <div class="box">
                 <div class="item" v-for="(item,index) in testData" :key="index">
                {{item}}
                </div>
                <div :class="item" v-for="(item,index) in testData" :key="index">
                {{item}}
                </div>
                <div class="btn" @click="add">點擊添加</div>
            </div>
            <!-- ------------- -->
        
        </div>
    </div>
    
  </div>
</template>

<script>
import {square} from '../../assets/js/download'
export default {
  name: 'Index',
  data () {
    return {
        widthMain:{width:''},//table组件自适应
        //面包屑数组
        testData:[1],//
        indexData:1,
        index:1,
        query: '',
        showNone: false,
        showNoneUpdate: false,
        showNonecreate: false,
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
        columns: [{title: '支付类型',key: 'pay'},
            {title: '商品ID',key: 'id'}, 
            {title: '金额',key: 'money'},
            {title: '币值',key: 'volue'},
            {title: '赠送币',key: 'gift'},
            {title: '说明',key: 'address'},
            {title: '操作',slot: 'action',align: 'center'}],
        data: [ // 数据表数据
            {
                pay: 'Android',
                id: 'com.sunday.80',
                money: 1,
                volue: 7000,
                gift: 0,
                address: 'New York No. 1 Lake Park'
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
        pay: '',
        id: '',
        money: '',
        volue: '',
        gift: '',
        address: '',
        resets: { // 重置按钮使用的 暂存页面内容数据
            pay: '',
            id: '',
            money: '',
            volue: '',
            gift: '',
            address: ''
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
      indexADD(){
          return 1
      },
      add(){
          this.indexData++;
          this.testData.push(this.indexData)
      },
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

          this.resets.pay = null, // 页面重置功能使用的缓存数据清空
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
      fenye: function (page) {
          console.log(page)
      },
      outPortcsv:function(){
        this.$refs.table.exportCsv({
        filename: 'The original data'
        });
      },
      out(){
          
          
      },
      outPortxlsx() {
        this.downloadLoading = true;
        require.ensure([], () => {
            const {export_json_to_excel} = require('../../assets/js/Export2Excel') //这个地址和页面的位置相关，这个地址是Export2Excel.js相对于页面的相对位置
            const tHeader = ["支付类型","商品ID","金额","币值","赠送币","说明",'操作']; //这个是表头名称 可以是iveiw表格中表头属性的title的数组
            const filterVal = ['pay','id','money','volue','gift','address']; //与表格数据配合 可以是iview表格中的key的数组
            const list = this.data; //表格数据，iview中表单数据也是这种格式！
            const data = this.formatJson(filterVal, list)
            export_json_to_excel(tHeader, data, '列表excel') //列表excel  这个是导出表单的名称
            this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
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
    .box{
        background: #cecece;
        .item{
            display: inline-block;
            padding: 5px 10px;
            border: 1px solid #000;
            margin: 2px 4px;
        }
        .showBox{

        }
        .noneBox{
            display: none;
        }
        .btn{
            background: #cecece;
            border: 1px solid #000;
            cursor: pointer;
        }
    }
    .top{margin-top:20px; margin-left: 20px;}
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
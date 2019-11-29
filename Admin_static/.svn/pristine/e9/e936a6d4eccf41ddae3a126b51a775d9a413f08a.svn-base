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
                <label>家族级别：</label>
                <Select v-model="Family" size="small" style="width:150px">
                    <Option v-for="item in FamilyLevel " :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <label>小组长：</label>
                <Select v-model="Group" size="small" style="width:150px">
                    <Option v-for="item in GroupLeader" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <label>房间ID：</label>
                <Input v-model="RoomID" placeholder="Enter something..." size="small" style="width: 200px" />

                <Button type="primary" size="small" @click="lookup">查询</Button>
                <Button type="primary" size="small" @click="add">添加</Button>
                <Button type="primary" size="small" @click="outPortcsv">导出csv</Button>
                <Button type="primary" size="small" @click="outPortxlsx">导出xlsx</Button>
            </div>
          <!-- 主页面内容 -->
            <div class="center" >
                <Table border :columns="columns" :data="tabledata" class="table"  ref="table">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="text" size="small" @click="update(row)">修改</Button>
                        <Button type="text" size="small" @click="remove(index,row)">删除</Button>
                    </template>
                </Table>
            </div>
          <!-- 遮罩层 -->
            <div class="marsk" v-if="showNone"></div>
          <!-- 新增页面 -->
            <div class="pop" v-if="showNonecreate">
                <Form :label-width="90">
                    <!-- <FormItem label="Input">
                        <Input v-model="addItem.pay" placeholder="请输入..."></Input>
                    </FormItem> -->
                    <FormItem label="房间ID：">
                        <Input v-model="roomid" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="家族名称：">
                        <Input v-model="familyname" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="是否签约：">
                        <Select v-model="Signing">
                            <Option v-for="item in FamilyLevel " :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="支付宝账号：">
                        <Input v-model="volue" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="支付宝昵称：">
                        <Input v-model="zfb_number" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="家族级别：">
                        <Input v-model="Family_type" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="归属运营：">
                        <Input v-model="Sub_operation" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="归属小组：">
                        <Input v-model="Sub_group" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="姓名">
                        <Input v-model="name" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="银行卡号">
                        <Input v-model="bank_card" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="开户行">
                        <Input v-model="open_card" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="省份">
                        <Input v-model="province" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="城市">
                        <Input v-model="city" placeholder="请输入..."></Input>
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
                <Form :label-width="90">
                    <!-- <FormItem label="Input">
                        <Input v-model="addItem.pay" placeholder="请输入..."></Input>
                    </FormItem> -->
                    <FormItem label="房间ID：">
                        <Input v-model="roomid" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="家族名称：">
                        <Input v-model="familyname" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="是否签约：">
                        <Select v-model="Signing">
                            <Option v-for="item in FamilyLevel " :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="支付宝账号：">
                        <Input v-model="volue" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="支付宝昵称：">
                        <Input v-model="zfb_number" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="家族级别：">
                        <Input v-model="Family_type" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="归属运营：">
                        <Input v-model="Sub_operation" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="归属小组：">
                        <Input v-model="Sub_group" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="姓名">
                        <Input v-model="name" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="银行卡号">
                        <Input v-model="bank_card" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="开户行">
                        <Input v-model="open_card" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="省份">
                        <Input v-model="province" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="城市">
                        <Input v-model="city" placeholder="请输入..."></Input>
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
        // query: '', // 查询功能 绑定的数据
        search_Family: null, // 搜索功能中的家族级别
        search_Group: null, // 搜索功能中的小组长
        search_RoomID: null, // 搜索功能中的房间ID
        showNone: false, // 控制页面遮罩层开关
        showNoneUpdate: false, // 修改页面弹出控制
        showNonecreate: false, // 新增页面弹出控制

        FamilyLevel: [ // 查询条件 家族等级
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
        GroupLeader: [ // 查询条件 小组长
            {
                value: 'Android1',
                label: 'Android1'
            },
            {
                value: 'iPhone1',
                label: 'iPhone1'
            },
            {
                value: 'AppStore1',
                label: 'AppStore1'
            },
            {
                value: 'taiwangooglestore1',
                label: '台湾googlestore1'
            },
            {
                value: 'taiwanAppStore1',
                label: '台湾AppStore1'
            }
        ],
        columns: [ // 表格列名称
            {title: '房间ID',key: 'roomid'}, 
            {title: '家族名称',key: 'familyname'},
            {title: '是否签约',key: 'Signing'},
            {title: '支付宝账号',key: 'zfb_number'},
            {title: '支付宝昵称',key: 'zfb_name'},
            {title: '手机号',key: 'phone_number'},
            {title: '家族类型',key: 'Family_type'},
            {title: '录入时间',key: 'input_time'},
            {title: '归属运营',key: 'Sub_operation'},
            {title: '归属小组',key: 'Sub_group'},
            {title: '操作',slot: 'action',align: 'center'}],
        tabledata: [ // 数据表数据
            {
                roomid: 'Android', // 支付类型
                familyname: 'com.sunday.80', // 商品ID
                money: 1, // 金额
                Signing: 7000, //  币值
                zfb_name: 0, // 礼物赠送币
                Sub_operation: 'New York No. 1 Lake Park' // 说明
            }
        ],
        roomid: '', // 新增和编辑页面使用的数据    房间ID
        familyname: '', //  新增和编辑页面使用的数据    家族名称
        Signing: '', //  新增和编辑页面使用的数据    是否签约
        zfb_number: '', //  新增和编辑页面使用的数据    支付宝账号
        zfb_name: '', //  新增和编辑页面使用的数据    支付宝昵称
        phone_number: '', //  新增和编辑页面使用的数据      手机号
        Family_type: '', //  新增和编辑页面使用的数据      家族类型
        input_time: '', //  新增和编辑页面使用的数据      录入时间
        Sub_operation: '', //  新增和编辑页面使用的数据      归属运营
        Sub_group: '', //  新增和编辑页面使用的数据      归属小组

        //新增和修改比显示页面多出的  数据
        name: '', // 新增和编辑页面使用的数据  姓名
        bank_card : '', // 新增和编辑页面使用的数据  银行卡号
        open_card : '', // 新增和编辑页面使用的数据  开户行
        province : '', // 新增和编辑页面使用的数据  省份
        city: '', // 新增和编辑页面使用的数据  城市


        resets: { // 暂存页面内容数据 用于重置输入框时候使用
                roomid: '', // 房间ID
                familyname: '', // 家族名称
                Signing: '', // 是否签约
                zfb_number: '', // 支付宝账号
                zfb_name: '', // 支付宝昵称
                phone_number: '', // 手机号
                Family_type: '', // 家族类型
                input_time: '', // 录入时间
                Sub_operation: '', // 归属运营
                Sub_group: '', // 归属小组
                name: '', //  姓名
                bank_card : '', // 银行卡号
                open_card : '', // 开户行
                province : '', // 省份
                city: '', //  城市
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
          this.resets.roomid = row.roomid
          this.resets.familyname = row.familyname
          this.resets.Signing = row.Signing
          this.resets.zfb_number = row.zfb_number
          this.resets.zfb_name = row.zfb_name
          this.resets.phone_number = row.phone_number,
          this.resets.Family_type = row.Family_type,
          this.resets.input_time = row.input_time,
          this.resets.Sub_operation = row.Sub_operation,
          this.resets.Sub_operation = row.Sub_operation,
          this.resets.Sub_operation = row.Sub_operation,

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
          this.roomid = this.resets.roomid,
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
      },
      lookup: function () { // 查找
          console.log(this.query)
      },
      fenye: function (page) { // 页面的分页功能
          console.log(page)
      },
      outPortcsv:function(){
        this.$refs.table.exportCsv({
        filename: 'The original data'
        });
      },
      outPortxlsx() {
        this.downloadLoading = true;
        require.ensure([], () => {
            const {export_json_to_excel} = require('../../../assets/js/Export2Excel') //这个地址和页面的位置相关，这个地址是Export2Excel.js相对于页面的相对位置
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
    .tips{
        text-align: left;
    }
    .top{margin-top:20px; margin-left: 20px; display: flex;
        button{
              margin-left: 15px;
          }
        label{
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
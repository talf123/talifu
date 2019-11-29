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
          <!-- 查询 -->
          <div class="top">
          </div>
          <!-- 提交 -->
          <div class="center" >
              <Form :label-width="120">
                    <FormItem label="加币用户IDX：">
                        <Input v-model="id" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="增加数量：">
                        <Input v-model="money" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="说明：">
                        <Select v-model="address">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="confirm()">保存</Button>
                        <Button style="margin-left: 8px" type="dashed" @click="reset()">重置</Button>
                    </FormItem>
                </Form>      
          </div>
          <!-- 遮罩层 -->
          <div class="marsk" v-if="showNone"></div>
          
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
                value: '活动申请',
                label: '活动申请'
            },
            {
                value: '维护申请',
                label: '维护申请'
            },
            {
                value: '扶持申请',
                label: '扶持申请'
            },
            {
                value: '销售申请',
                label: '销售申请'
            },
            {
                value: '其他申请',
                label: '其他申请'
            },
            {
                value: '内部操作',
                label: '内部操作'
            },
            {
                value: '猫播申请',
                label: '猫播申请'
            },
            {
                value: '充错号码调用',
                label: '充错号码调用'
            },
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
      lookup: function () { // 查找
          console.log(this.query)
      },
      confirm: function () {

      },
      reset: function () {
          this.id = null,
          this.money = null,
          this.address = null
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
    .top{margin-top:20px; margin-left: 20px; display: flex;  // 表头部分 查找添加 样式
          button{
              margin-left: 15px;
          }
          label{
              margin-left: 15px;
              font-size: 20px;
          }
    }
    .center{width:70%; margin-top:20px; padding-left: 25%;
        button {
            margin-right: 5px
        }
    }  // 页面中部 表格部分样式
    .bottom{width:100%; margin-top:15px;} // 页面底部 分页部分样式
}
</style>
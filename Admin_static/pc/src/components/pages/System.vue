<template>
  <div class="content">
    <silderBar></silderBar>
    <div class="body_main">
        <navBar></navBar>
        <div class="main">
            <!-- 页面上部 统计 -->
            <div class="top">
                <label>统计：</label>
                <label>网宿总计：</label>
                <span>{{ws_total}}</span>
                <label>七牛总计：</label>
                <span>{{qn_total}}</span>
                <label>网宿在线：</label>
                <span>{{ws_online}}</span>
                <label>七牛在线：</label>
                <span>{{qn_online}}</span>
            </div>
            <!-- 页面中部 表格 -->
            <div class="border">
                <div class="center">
                    <Form :label-width="80">
                        <FormItem label="切换方式：">
                            <Select v-model="sw">
                                <Option v-for="(item,index) in switch_mode"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                                </Option>    
                            </Select>
                        </FormItem>
                        <FormItem label="CDN：">
                            <Select v-model="cdn">
                                <Option v-for="(item,index) in cdn_mode"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="用户ID：">
                            <Input v-model="textarea" type="textarea" :autosize="{minRows: 5,maxRows: 7}" placeholder="请输入..."></Input>
                        </FormItem>
                    </Form>
                    <Button style="margin-right:5%; margin-left: 30px;" @click="save">保存</Button>
                    <Button type="dashed" @click="reset">重置</Button>
                </div>
                <!-- 页面底部 说明 -->
                <div class="bottom">
                    <label>说明：</label>
                    <span>{{address}}</span>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'system',
  data () {
      return {
        widthMain:{width:''},//table组件自适应
        ws_total: 5,
        qn_total: 5,
        ws_online: 2,
        qn_online: 1,
        
        sw: '', // 切换方式
        cdn: '', // CDN
        textarea: '', // 用户ID      
        address: '部分账号切换限制最大50个账号，账号之间以"|"分割，如:1245678|65234981（"|"符号数字算一个字符）', // 说明

        switch_mode: [ // 切换方式数据
            {
                name: '全切',
                id: 1
            },
            {
                name: '部分',
                id: 2
            }
        ],
        cdn_mode: [ // CDN 数据
            {
                name: '网宿',
                id: '1'
            },
            {
                name: '七牛',
                id: '2'
            }
        ]
      }
  },
  methods: {
      save: function () { // 保存按钮
          console.log(this.sw),
          console.log(this.cdn),
          console.log(this.textarea)
      },
      reset: function () { // 重置按钮
          this.sw = null,
          this.cdn = null,
          this. textarea = null
      }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main{
    .top { // 页面 统计部分风格样式
        font-size: 15px;
        text-align: left;
        margin-top: 1%;
        margin-left: 10px;
        padding: 5px;
        border: 1px solid rgb(192, 192, 192);
    }
    .border { // 页面表格部分样式
        font-size: 15px;
        // text-align: left;
        margin-top: 2%;
        margin-left: 10px;
        padding: 50px 0 50px 0;
        border: 1px solid rgb(192, 192, 192);
    }
    .center { // 页面居中样式
        max-width: 500px;
        margin-left: 20%;
        // position: relative;;
        // left:25%;
    }
    .bottom { // 说明部分样式
        font-size: 15px;
        text-align: left;
        margin-top: 20px;
        margin-left: 10%;
        padding: 5px;
    }
    span { // 统计部分，说明部分绑定的数据字体设置
        color: red;
        margin-right: 10px;
    }
}
</style>

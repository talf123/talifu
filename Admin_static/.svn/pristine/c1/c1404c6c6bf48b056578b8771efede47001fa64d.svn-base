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
            <!-- 删除 -->
            <div class="top">
                <label>主播IDX：</label>
                    <Input size="small" v-model="useridx" placeholder="IDX" style="width: 180px" />
                    <Button size="small" type="primary" @click="remove">删除</Button>
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
        tagData:null,//tag数据
        colorName:'',//对比的tag名字
        tagDataLength:true,//可取消的状态
        
        useridx: null //删除功能ID
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
    getTag:function(){
        this.tagData=JSON.parse(localStorage.getItem("g_tagMArry"));
        this.colorName=this.$route.meta.name;
    },
    tagClose:function(item){

        if(this.tagData.length>1){
            let arr3 = this.tagData;
            let arr4 = arr3.filter(item3=>{
                return item3.name != item.name;     
            })
            this.tagData=arr4;
            localStorage.setItem('g_tagMArry',JSON.stringify(arr4))
            if(item.name==this.$route.meta.name){
                    this.$router.push({path: arr4[0].index[2].path});
                    this.colorName=arr4[0].name;
            }else{
            }
        }else{
            localStorage.removeItem('g_tagMArry');
            this.$router.push({path:'/'});
        }
        
    },
    tagChange:function(item){
        this.colorName=item.name;
        this.$router.push({path: item.index[2].path});
    },
    clearAll:function(){
        let arry =[];
        arry.push(this.$route.meta);
        this.tagData=arry;
        localStorage.setItem('g_tagMArry',JSON.stringify(arry))
    },
    remove: function(index,row) { // 删除
        let token = localStorage.getItem('h_g_access_token');
        this.$axios({
            url: '/api/BPMService/User/AnchorInfoDelAsync',
            method: 'post',
            //params 参数必写 , 如果没有参数传{}也可以
            headers:{
                    Authorization:'Bearer '+token
            },
            data:{
                idx: Number(this.useridx)
            }
        })
        .then((res)=>{
            console.log(res)
            if(res.data.code == 1){
                this.$Message.success('删除成功!');
            }else{
                this.$Message.error('删除失败!')
            }
        })
        .catch((err)=>{
            console.log(err)
            if(err.response.status==401){
                this.$Message.error('登录过期，请重新登录');
                this.$router.push({path: '/login'});
            }
        })
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
}
</style>
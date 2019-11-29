<template>
  <div class="content">
    <silderBar></silderBar>
    <div class="body_main">
        <navBar></navBar>
        <div class="main" :style="widthMain">
            <div class="tips" id="" style="background:#cecece;text-align:left;">
                <Tag v-for="(item,index) in tagData" :key="index" :name="item.name" type="dot" closable checkable :color="item.name==colorName?'primary':'default'" @on-close="tagClose(item)" @on-change="tagChange(item)">{{item.index[2].name}}</Tag>
                <!-- <Tag v-for="(item,index) in tagData" :key="index" :name="item.name" type="dot"  checkable :color="item.name==colorName?'primary':'default'" @on-close="tagClose(item)" @on-change="tagChange(item)" v-else>
                    {{item.index[2].name}}</Tag> -->
            </div>

            <div class="">
               <div v-for="(item,index) in pageData" :key="index" @click="toRedirect(item)" style="margin-top:10px;cursor:pointer">{{item.name}}</div>
               
               
            </div>
         
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
        tagData:null,//tag数据
        colorName:'',//对比的tag名字
        tagDataLength:true,//可取消的状态
        pageData:[{name:'系统设置',path:'/keyword'},
        {name:'路由守卫',path:'/activity'},
        {name:'index',path:'/index'},
        {name:'echerts',path:'/college'},
        {name:'system',path:'/system'},
        {name:'morkdown',path:'/power'},
        {name:'add',path:'/add'},
        {name:'upload',path:'/up'},]
    }
  },
  created() {
    window.addEventListener('resize', this.getWidth);
    this.getWidth();
    this.getTag();
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
                // if(arr4.length=1){
                //     this.tagDataLength=false
                // }
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
      toRedirect:function(item){
          this.$router.push(item.path);
      },

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
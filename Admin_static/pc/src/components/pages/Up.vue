<template>
  <div class="content">
    <silderBar></silderBar>
    <div class="body_main">
        <navBar></navBar>
        <div class="main" :style="widthMain">
<!-- 上传图片 -->
                <Upload
                    multiple
                    ref="upload"
                    :before-upload="handleUpload"
                    :show-upload-list="false"
                    :on-success="uploadSuccess"
                    action="//jsonplaceholder.typicode.com/posts/">
                    <Button type="ghost" icon="ios-cloud-upload-outline">浏览</Button>
                </Upload>
                <div v-for="(item, index) in file" :key="index">Upload file: {{ item.name }} 
                    <a href="javascript:;"  @click="delectFile(item.keyID)">X</a>
                    <Button style="margin-left:30px;" size="small" v-if="index === 0" type="primary" @click="upload" >上传</Button>
                </div>
              <!-- ----- -->
      
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
       file: [], // 总文件List
        uploadFile: [], // 需要上传的文件List
        // --------
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
    //   --
   handleUpload (file) { // 保存需要上传的文件
                let keyID = Math.random().toString().substr(2);
                file['keyID'] = keyID;
                this.file.push(file);
                this.uploadFile.push(file)
                return false;
            },
            delectFile (keyID) { // 删除文件
                this.file = this.file.filter(item => {
                    return item.keyID != keyID
                })
                this.uploadFile = this.uploadFile.filter(item => {
                    return item.keyID != keyID
                })
            },
            upload () { // 上传文件
                if(this.uploadFile.length === 0 ) {
                    this.$Message.error('未选择上传文件') 
                    return false
                } 
                for (let i = 0; i < this.uploadFile.length; i++) {
                    let item = this.file[i]
                    this.$refs.upload.post(item);
                }
            },
            uploadSuccess (response, file, fileList) { // 文件上传回调 上传成功后删除待上传文件
                console.log(response) // 后端返回数据
                console.log(file)   // 当前上传文件
                console.log(fileList) // 整个input file 里的文件数组
            },
    // ---
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main{
    overflow-x: scroll;
    overflow: hidden;
    position: relative;
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
}


</style>
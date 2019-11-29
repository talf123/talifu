<template>
  <div class="mark">
      <div class="markdown">
          <mavon-editor v-model="value"/>
      </div>
      <button @click="print">点</button>    
  </div>
        
</template>

<script>
import {square} from '../../assets/js/download'
export default {
  name: 'Index',
  data () {
    return {
        value:'请编辑....',
    }
  },
  created() {
   
  },
  destroyed () {
    
  },
  mounted () {
      
  },
  computed: {
      
  },
  methods: {
    print:function(){
        console.log(this.value)
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.mark{
    width:100%;
    height:100%;
    .markdown{
        height: 80%;
        width: 80%;
        margin: auto;
        .markdown-body{
            height: 100%;
            width: 100%;
        }
    }
}

</style>
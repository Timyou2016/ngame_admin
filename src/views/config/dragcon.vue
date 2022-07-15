<template>
  <div class="components-container">
      <div style="margin:20px 20px;">
    <el-button type="primary" :loading="loading" @click="onSubmit">保存</el-button>
    </div>
  
    <div class="editor-container">
      <json-editor ref="jsonEditor" v-model="value" />
    </div>

  </div>
</template>

<script>
import JsonEditor from '@/components/JsonEditor'
import { getInfo } from '@/api/user'
const jsonData = '[{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"CORN"}],"name":""},{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"XAGUSD"},{"market_type":"forexdata","symbol":"AUTD"},{"market_type":"forexdata","symbol":"AGTD"}],"name":"贵金属"},{"items":[{"market_type":"forexdata","symbol":"CORN"},{"market_type":"forexdata","symbol":"WHEAT"},{"market_type":"forexdata","symbol":"SOYBEAN"},{"market_type":"forexdata","symbol":"SUGAR"}],"name":"农产品"},{"items":[{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"USOIL"},{"market_type":"forexdata","symbol":"NGAS"}],"name":"能源化工"}]'
//JSON.parse(jsonData)
export default {
  name: 'DragCon',
  components: { JsonEditor },
  data() {
    return {
      loading:false,
      value: {}
    }
  },
  created() {
        getInfo({id:1,rad:'ids'}).then(response => {
        this.value= response.data
        }).catch((err) => {
          console.log(err)
        })  
  },  
  methods:{
    onSubmit(){
        console.log(this.value)
    }
  }
}
</script>

<style scoped>
.editor-container{
  position: relative;
  height: 30%;
}
</style>


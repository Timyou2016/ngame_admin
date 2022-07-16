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
import { dragcardConGet,dragcardConSet } from '@/api/ngame'
export default {
  name: 'DragCard',
  components: { JsonEditor },
  data() {
    return {
      loading:false,
      value: {}
    }
  },
  created() {
        dragcardConGet().then(response => {
        this.value= response.data
        }).catch((err) => {
          console.log(err)
        })  
  },  
  methods:{
    onSubmit(){
        this.loading = true
        dragcardConSet({val:JSON.stringify(this.value)}).then(response => {
            this.$message({
              type: 'success',
              message: '保存成功'
            })             
          this.loading = false
        }).catch((err) => {
          console.log(err)
          this.loading = false
        }) 
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


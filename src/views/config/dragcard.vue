<template>
  <div class="app-container">
    <div style="margin:20px 20px;">
    <el-button type="primary" :loading="loading" @click="onSubmit">保存</el-button>
    </div>
    <div class="editor-container">
      <json-editor ref="jsonEditor" v-model="value" />
    </div>
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />
    </el-tooltip>
  </div>
</template>

<script>
import JsonEditor from '@/components/JsonEditor'
import BackToTop from '@/components/BackToTop'
import { dragcardConGet,dragcardConSet } from '@/api/ngame'
export default {
  name: 'DragCardCon',
  components: { JsonEditor ,BackToTop},
  data() {
    return {
      // customizable button style, show/hide critical point, return position
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
      },      
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
  width:97%;
  position: relative;
  height: 100%;
}
</style>


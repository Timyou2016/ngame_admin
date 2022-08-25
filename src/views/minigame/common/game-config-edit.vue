<template>
  <div class="app-container">
    <el-form ref="editform" :model="editform" :rules="rules" label-width="120px"> 
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>           
      <el-form-item label="所属游戏" prop="game_id">
        <select-game ref="refSelectGame" @changeSelect="selectGameId" :value=editform.game_id :status=1 ></select-game>
      </el-form-item>  
      <el-form-item label="AdminId" prop="admin_id">
        <el-input v-model="editform.admin_id" />
      </el-form-item>              
      <el-form-item label="配置KEY" prop="config_key">
        <el-input v-model="editform.config_key" />
      </el-form-item>    
      <el-form-item label="配置内容" prop="config_value">
        <json-editor ref="jsonEditor" v-model="editform.config_value" />
        <el-tooltip placement="top" content="返回顶部">
        <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />
        </el-tooltip>        
      </el-form-item>            
    </el-form>    
  </div>
</template>

<script>
import JsonEditor from '@/components/JsonEditor'
import BackToTop from '@/components/BackToTop'
import { minigameGetGameConfig,minigameGameConfigEdit } from '@/api/minigame/common'
import SelectGame from '@/layout/components/Minigame/selectGame'
export default {
  name: 'GameConfigEdit',
  components: { JsonEditor,BackToTop,SelectGame },
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
      editform: {
        id:0,
        game_id: 0,
        config_key:'',
        config_value: {},
        admin_id: 0,
      },
    }
  },
  created() {
     this.resetForm()
    if (this.$route.query && this.$route.query.id > 0){
      this.editform.id = this.$route.query.id
        minigameGetGameConfig({id:this.editform.id}).then(response => {
        this.editform= response.data
        this.select_game_id = this.editform.game_id
        }).catch((err) => {
          console.log(err)
        })      
    }   
        minigameGetGameConfig().then(response => {
        this.value= response.data
        }).catch((err) => {
          console.log(err)
        })  
  },  
  methods:{
    selectGameId(e){
      console.log(e,3333)
      this.editform.game_id = e
    },      
    onSubmit(){
        this.loading = true
          var params = {...this.editform}
          console.log(params,this.editform)  
          params.config_value = JSON.stringify(this.editform.value)      
        minigameGameConfigEdit(params).then(response => {
            this.$message({
              type: 'success',
              message: '保存成功'
            })             
          this.loading = false
           this.back()
        }).catch((err) => {
          console.log(err)
          this.loading = false
        }) 
    },
    onCancel() {
      this.resetForm()
      this.back()
    },
    resetForm() {
      this.editform = {
        id:0,
        game_id: 0,
        config_key:'',
        config_value: {},
        admin_id: 0,
      }
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


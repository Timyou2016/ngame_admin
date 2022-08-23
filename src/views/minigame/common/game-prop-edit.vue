<template>
  <div class="app-container">
    <div style="margin:20px 20px;">
    <el-button type="primary" :loading="loading" @click="onCancel">返回</el-button>
    </div>
    <el-form ref="editform" :model="editform" :rules="rules" label-width="120px">        
      <el-form-item label="所属游戏" prop="game_id">
        <select-game ref="refSelectGame" @changeSelect="selectGameId" :value=editform.game_id :status=1 ></select-game>
      </el-form-item>         
      <el-form-item label="道具ID" prop="prop_id">
        <el-input v-model="editform.prop_id" />
      </el-form-item>    
      <el-form-item label="道具名称" prop="prop_name">
        <el-input v-model="editform.prop_name" />
      </el-form-item> 
      <el-form-item label="道具英文名称" prop="prop_name_en">
        <el-input v-model="editform.prop_name_en" />
      </el-form-item> 
      <el-form-item label="道具图标地址" prop="prop_icon">
        <el-input v-model="editform.prop_icon" />
      </el-form-item>
       <el-form-item label="道具过期时间(秒)" prop="prop_exp">
        <el-input v-model="editform.prop_exp" />
      </el-form-item>             
    <el-form-item label="道具描述">
        <el-input type="textarea" v-model="editform.prop_desc"></el-input>
    </el-form-item>
    <el-form-item label="道具英文描述">
        <el-input type="textarea" v-model="editform.prop_desc_en"></el-input>
    </el-form-item>
    <el-form-item label="道具备注">
        <el-input type="textarea" v-model="editform.prop_mark"></el-input>
    </el-form-item>             
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { minigameGamePropEdit,minigameGetGameProp } from '@/api/minigame/common'
import SelectGame from '@/layout/components/Minigame/selectGame'
export default {
  name:"MinigameGamePropEdit",
  components: { SelectGame },
  data() {   
    return {
      editform: {
        id:0,
        prop_name: '',
        prop_name_en:'',
        prop_desc: '',
        prop_id: 0,
        prop_exp: "",
        game_id: 0,
        prop_desc_en:  '',
        prop_icon: '',
        prop_mark: '',
      },
      loading: false,
      textMap: {
        update: '编辑',
        create: '创建'
      },
      rules: {
        game_id: [
            { required: true, message: '请选择游戏', trigger: 'blur'},
          ],     
        prop_id: [
            { required: true, message: '请输入道具ID', trigger: 'blur'},
          ],              
        prop_name: [
          { required: true, trigger: 'blur',message:'请输入道具名称'}
        ],
      },            
    }
  },
  created() {
    this.resetForm()
    if (this.$route.query && this.$route.query.id > 0){
      this.editform.id = this.$route.query.id
        minigameGetGameProp({id:this.editform.id}).then(response => {
        this.editform= response.data
        this.select_game_id = this.editform.game_id
        }).catch((err) => {
          console.log(err)
        })      
    }
  },  
  methods: {
    back() {
      this.$router.go(-1);
    }, 
    selectGameId(e){
      console.log(e,3333)
      this.editform.game_id = e
    },      
    onSubmit() {
      this.$refs['editform'].validate((valid) => {  
        console.log(valid)
        if (valid) {
          this.loading = true
          var params = {...this.editform}
          console.log(params,this.editform)
          minigameGamePropEdit(params).then(response => {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
            this.loading = false   
            this.back()
          }).catch((err) => {
            this.loading = false
            console.log(err)
          })          
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onCancel() {
      this.resetForm()
      this.back()
    },
    resetForm() {
      this.editform = {
        id:0,
        prop_name: '',
        prop_name_en:'',
        prop_desc: '',
        prop_id: 0,
        prop_exp: "",
        game_id: 0,
        prop_desc_en:  '',
        prop_icon: '',
        prop_mark: '',
      }
    }    
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>


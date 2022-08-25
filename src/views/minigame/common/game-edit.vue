<template>
  <div class="app-container">
    <div style="margin:20px 20px;">
    <el-button type="primary" :loading="loading" @click="onCancel">返回</el-button>
    </div>
    <el-form ref="editform" :model="editform" :rules="rules" label-width="120px">               
      <el-form-item label="游戏名称" prop="name">
        <el-input v-model="editform.name" />
      </el-form-item>    
      <el-form-item label="游戏Icon" prop="icon">
        <el-input v-model="editform.icon" />
      </el-form-item> 
      <el-form-item label="游戏大图" prop="img">
        <el-input v-model="editform.img" />
      </el-form-item> 
      <el-form-item label="游戏入口页(默认)" prop="url">
        <el-input v-model="editform.url" />
      </el-form-item>
       <el-form-item label="游戏入口页(手机)" prop="mobile_url">
        <el-input v-model="editform.mobile_url" />
      </el-form-item>   
       <el-form-item label="游戏入口页(PC)" prop="pc_url">
        <el-input v-model="editform.pc_url" />
      </el-form-item>   
       <el-form-item label="AdminId" prop="admin_id">
        <el-input v-model="editform.admin_id" />
      </el-form-item>                    
    <el-form-item label="游戏描述">
        <el-input type="textarea" v-model="editform.desc"></el-input>
    </el-form-item>  
       <el-form-item label="状态" prop="status">
        <el-radio-group v-model="editform.status">
          <el-radio :label=0 >删除</el-radio>
          <el-radio :label=1 >正常</el-radio>
          <el-radio :label=2 >维护</el-radio>
          <el-radio :label=3 >规划中</el-radio>
        </el-radio-group>
      </el-form-item>              
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { minigameEditGame,minigameGetGame } from '@/api/minigame/common'
export default {
  name:"MinigameGameEdit",
  components: {},
  data() {   
    return {
      editform: {
        id:0,
        name: '',
        desc:'',
        icon: '',
        img: '',
        url: "",
        pc_url: '',
        mobile_url:  '',
        status: 1,
        admin_id: 0,
      },
      loading: false,
      textMap: {
        update: '编辑',
        create: '创建'
      },
      rules: {
        name: [
            { required: true, message: '请输入游戏名称', trigger: 'blur'},
          ],     
        icon: [
            { required: true, message: '请输入Icon地址', trigger: 'blur'},
          ],   
        url: [
            { required: true, message: '游戏入口页(默认)', trigger: 'blur'},
        ],                     
      },            
    }
  },
  created() {
    this.resetForm()
    if (this.$route.query && this.$route.query.id > 0){
        this.loading = true
        this.editform.id = this.$route.query.id
        minigameGetGame({id:this.editform.id}).then(response => {
        this.editform= response.data
        this.loading = false
        }).catch((err) => {
          console.log(err)
          this.loading = false
        })      
    }
  },  
  methods: {
    back() {
      this.$store.dispatch('tagsView/delView', this.$route)
      this.$router.go(-1);
    },     
    onSubmit() {
      this.$refs['editform'].validate((valid) => {  
        console.log(valid)
        if (valid) {
          this.loading = true
          var params = {...this.editform}
          console.log(params,this.editform)
          minigameEditGame(params).then(response => {
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
        name: '',
        desc:'',
        icon: '',
        img: '',
        url: "",
        pc_url: '',
        mobile_url:  '',
        status: 1,
        admin_id: 0,
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


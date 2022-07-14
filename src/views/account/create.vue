<template>
  <div class="app-container">
    <el-form ref="userform" :model="userform" :rules="rules" label-width="120px">
      <el-form-item label="登录账号" prop="account">
        <el-input v-if="userform.id > 0" :disabled="true" v-model="userform.account" />
        <el-input v-if="userform.id == 0"  v-model="userform.account" />
      </el-form-item>
      <el-form-item label="初始密码" prop="password">
        <el-input v-model="userform.password" />
      </el-form-item>      
      <el-form-item label="员工名称" prop="nickname">
        <el-input v-model="userform.nickname" />
      </el-form-item>      
      <el-form-item label="所属部门" prop="departments">
        <select-department ref="refSelectDepartment" @changeSelect="selectDepartment" :value=userform.departments ></select-department>
      </el-form-item>         
      <el-form-item label="所属角色" prop="roles">
        <select-role ref="refSelectRole" @changeSelect="selectRole" :value=userform.roles ></select-role>
      </el-form-item>
      <el-form-item label="员工工号" prop="number">
        <el-input v-model="userform.number" />
      </el-form-item>    
      <el-form-item label="员工手机" prop="tel">
        <el-input v-model="userform.tel" />
      </el-form-item> 
      <el-form-item label="员工邮箱" prop="email">
        <el-input v-model="userform.email" />
      </el-form-item> 
      <el-form-item label="员工微信号" prop="wechat">
        <el-input v-model="userform.wechat" />
      </el-form-item>             
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="userform.sex">
          <el-radio :label=0 >未知</el-radio>
          <el-radio :label=1 >男</el-radio>
          <el-radio :label=2 >女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="userform.status">
          <el-radio :label=0 >正常</el-radio>
          <el-radio :label=1 >冻结</el-radio>
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
import { userCreate,getInfo } from '@/api/user'
import SelectRole from '@/layout/components/Account/selectRole'
import SelectDepartment from '@/layout/components/Account/selectDepartment'
export default {
  name:"AccountCreate",
  components: { SelectRole ,SelectDepartment},
  data() {   
    return {
      userform: {
        id:0,
        account: '',
        password:'123456',
        nickname: '',
        roles: [],
        departments:[],        
        sex: 1,
        status: 0,
        department_id: 0,
        number:  '',
        tel: '',
        email: '',
        wechat: ''
      },
      loading: false,
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        account: [
            { required: true, message: '请输入登录账号', trigger: 'blur'},
            { min: 4, max: 30, message: '登录账号长度在 4 到 30 个字符', trigger: 'blur' }
          ],     
        password: [
            { required: true, message: '请设置初始密码', trigger: 'blur'},
            { min: 6, max: 30, message: '密码长度在 6 到 30 个字符', trigger: 'blur' }
          ],              
        nickname: [
          { required: true, trigger: 'blur',message:'请输入员工名称'}
          ],
        roles: [{ required: true, trigger: 'blur', message:'请选择角色'}],
        departments: [{ required: true, trigger: 'blur',message:'请选择部门' }]
      },            
    }
  },
  created() {
    this.resetForm()
    if (this.$route.query && this.$route.query.id > 0){
      this.userform.id = this.$route.query.id
        getInfo({id:this.userform.id,rad:'ids'}).then(response => {
        this.userform= response.data
        }).catch((err) => {
          console.log(err)
        })      
    }
  },  
  methods: {
    back() {
      this.$router.go(-1);
    }, 
     selectRole(e){
      console.log(e)
      this.userform.roles = e
    },
    selectDepartment(e){
      this.userform.departments = e
      if (e.length > 0){
        this.userform.department_id = e[e.length - 1]
      }
      console.log(e)
    },      
    onSubmit() {
      this.$refs['userform'].validate((valid) => {  
        console.log(valid)
        if (valid) {
          this.loading = true
          var params = {...this.userform}
          params.password = this.$md5(params.password).toUpperCase()
          console.log(params,this.userform)
          userCreate(params).then(response => {
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
      this.back()
    },
    resetForm() {
      this.userform = {
        id:0,
        account: '',
        password:'123456',
        nickname: '',
        roles: [],
        departments:[],        
        sex: 1,
        status: 0,
        department_id: 0,
        number:  '',
        tel: '',
        email: '',
        wechat: ''        
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


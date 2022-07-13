<template>
  <el-dialog title="修改密码" :visible.sync="dialogChangePwd">
    <el-row :gutter="20" v-if="pwdform.id > 0">
      <el-col :span="6"><div class="grid-content bg-purple">账号：{{account}}</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">昵称：{{nickname}}</div></el-col>
    </el-row>  
    <el-form ref="changePwdForm" :rules="rules" :model="pwdform" label-position="left" label-width="120px" style="width: 450px; margin-left:50px;">
      <el-form-item label="新密码" prop="password">
        <el-input v-model="pwdform.password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="password1">
        <el-input v-model="pwdform.password1" />
      </el-form-item>        
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogChangePwd = false">
        Cancel
      </el-button>
      <el-button type="primary" @click="onCreate()">
        Confirm
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import { userChangePwd } from '@/api/user'
export default {
  name: "ChangePwd",
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('至少6位数'))
      } else {
        callback()
      }
    }
    const validatePassword1 = (rule, value, callback) => {
      if (value !== this.pwdform.password) {
        callback(new Error('前后密码不一致'))
      } else {
        callback()
      }
    }     
    return {    
      pwdform: {
        id:0,
        password: '',
        password1: '',
        from: '',
      },
      account:'',
      nickname:'',
      dialogChangePwd:false,
      needLoginOut:false,
      rules: {
        password: [{ required: true, message: '请输入新密码', trigger: 'blur' , validator: validatePassword }],
        password1: [{ required: true, message: '请输入确认密码', trigger: 'blur', validator: validatePassword1 }]
      },      
    }
  },

  methods: {
    clearTemp(){
      this.pwdform = {
        id:0,
        password:'',
        password1:'',
        from:''
      }
      this.account = ''
      this.nickname = ''
      this.needLoginOut = false
    },
    changePwding(row,need,from){
        this.clearTemp()
        this.pwdform.id = row.id
        this.account = row.account
        this.nickname = row.nickname
        this.dialogChangePwd=true
        if( need ){
          this.needLoginOut = true
        }
        if ( from !== ''){
          this.pwdform.from = from
        }
    },    
    onCreate() {
      this.$refs['changePwdForm'].validate((valid) => {
        if (valid) {
          let params
          params = {
            id:this.pwdform.id,
            password:this.$md5(this.pwdform.password).toUpperCase(),
            from:this.pwdform.from
          }
          console.log(params,this.pwdform)
          userChangePwd(params).then(response => {
            this.$message('修改成功')
            this.dialogChangePwd=false
            if( this.needLoginOut ){
                this.logout()
            }
          }) 
        }
      })        
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }    
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>


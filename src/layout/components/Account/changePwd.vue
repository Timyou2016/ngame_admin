  <el-dialog :title="修改密码" :visible.sync="dialogChangePwd">
  <div>账号：{{account}},昵称：{{nickname}}</div>
    <el-form ref="changePwdForm" :rules="rules" :model="pwdform" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
      <el-form-item label="新密码" prop="passwd">
        <el-input v-model="pwdform.passwd" />
      </el-form-item>
      <el-form-item label="确认新密码" prop="passwd1">
        <el-input v-model="pwdform.passwd1" />
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

<script>
export default {
  name: "changePwd",
  data() {
    return {
      pwdform: {
        id:0,
        passwd: '',
        passwd1: '',
      },
      account:'',
      nickname:'',
      dialogChangePwd:false,
      rules: {
        passwd: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        passwd1: [{ required: true, message: '请输入确认密码', trigger: 'blur' }]
      },      
    }
  },
  watch:{
      changePwding(row){
        this.pwdform.id = row.id
        this.account = row.account
        this.nickname = row.nickname
        this.dialogChangePwd=true
    },
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>


<template>
  <div class="app-container">
    <div style="margin:20px 20px;">
    <el-button type="info" @click="back">返回</el-button>
    <el-button type="primary" @click="getChecked">保存</el-button>
    </div>  
    <el-tree
      :data="value"
      show-checkbox
      node-key="id"
      ref="refSetPermission"
      :default-expanded-keys="expanded"
      :default-checked-keys="checked"
      :props="defaultProps" @check-change="handleCheckChange">
    </el-tree>    
  </div>
</template>

<script>
import { regrouterTree } from '@/api/regrouter'
import { roleSetPermission,roleGetPermission } from '@/api/role'
export default {
  name: 'SetPermission',
  data() {
    return {
      loading:false,
      value: {},
      expanded:[],
      checked:[],
      defaultProps: {
        children: 'childrens',
        label: 'name'
      },
      rolePermission:{
        role_id:0,
        permission:[]
      }      
    }
  },
  created() {
        this.resetRolePermission()
        if (this.$route.query && this.$route.query.role_id > 0){
          this.rolePermission.id = this.$route.query.role_id    
        }else{
          this.back()
        }
        regrouterTree().then(response => {
          this.value= response.data
          roleGetPermission({id:this.rolePermission.id}).then(response => {
          this.rolePermission.permission = response.data
          this.checked= response.data
          if (this.checked.length > 0){
            this.expanded = [this.checked[0]]
          }
          }).catch((err) => {
            console.log(err)
          })          
        }).catch((err) => {
          console.log(err)
        })  
  },  
  methods:{
      resetRolePermission(){
        this.rolePermission = {
          id:0,
          permission:[]          
        };
      },    
      back(){
        this.$router.go(-1);
      },
      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      },
      getChecked() {
        console.log(this.$refs.refSetPermission.getCheckedNodes());
        console.log(this.$refs.refSetPermission.getCheckedKeys());
        this.rolePermission.permission = this.$refs.refSetPermission.getCheckedKeys()
        roleSetPermission(this.rolePermission).then(response => {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
        })        
      },      
    onSubmit(){
        this.loading = true
        hangupConSet({val:JSON.stringify(this.value)}).then(response => {
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



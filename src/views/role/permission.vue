<template>
  <div class="app-container">
    <div style="margin:20px 20px;">
    <el-button type="info" @click="back">返回</el-button>
    <el-button type="primary" @click="getChecked">保存</el-button>
    <el-divider></el-divider>
    </div>  
    <div style="margin:10px 20px;">
    <span>当前授权角色</span>
    <el-divider direction="vertical"></el-divider>
    <span>{{show_name}}</span>    
    <el-divider></el-divider>
    </div> 
    <div style="margin:10px 20px;">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <el-checkbox-group v-model="checked" @change="handleCheckedCitiesChange">
        <div style="margin:25px 0;" v-for="row in value">
          <el-checkbox :label="row.id" :key="row.id">{{row.name}}</el-checkbox>
          <div style="margin:15px 0;" v-if="row.childrens">
            <el-checkbox v-for="c in row.childrens" :label="c.id" :key="c.id">{{c.name}}</el-checkbox>
          </div>
        </div>
      </el-checkbox-group>
    </div> 
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
      checkAll: false,
      value: [],
      checked:[],
      show_name:"",
      total:0,
      allChecked:[],
      isIndeterminate: true,
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
          this.show_name =   this.$route.query.name  
        }else{
          this.back()
        }
        this.loading=true
        regrouterTree({filterHide:1}).then(response => {
          this.value= response.data
          let total = this.value.length
          let allChecked = []
          for(let i=0;i<this.value.length;i++){
              allChecked.push(this.value[i].id)
              let count = this.value[i].childrens ? this.value[i].childrens.length : 0
              total = total + count
              if(count > 0){
                for(let j = 0 ; j< count ;j++){
                    allChecked.push(this.value[i].childrens[j].id)
                }
              }
          }
          console.log("total:",total)
          console.log("allChecked:",allChecked)
          this.total = total
          this.allChecked = allChecked
          console.log("value:",this.value)
          roleGetPermission({id:this.rolePermission.id}).then(response => {
          this.rolePermission.permission = response.data
          this.checked= response.data
          console.log("checked:",this.checked)
          this.loading=false
          }).catch((err) => {
            this.loading=false
            console.log(err)
          })          
        }).catch((err) => {
          this.loading=false
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
      handleCheckAllChange(val) {
        console.log("handleCheckAllChange-val",val)
        this.checked = val ? this.allChecked : [] ;
        this.isIndeterminate = false;
        console.log("handleCheckAllChange-checked",this.checked)
      },
      handleCheckedCitiesChange(value) {
        console.log("handleCheckedCitiesChange-value",value)
        console.log("handleCheckedCitiesChange-checked",this.checked)
        let checkedCount = value.length;
        this.checkAll = checkedCount === total;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.checked.length;
      },      
      getChecked() {
        this.loading = true
        this.rolePermission.permission = this.checked
        roleSetPermission(this.rolePermission).then(response => {
            this.$message({
              type: 'success',
              message: '操作成功'
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



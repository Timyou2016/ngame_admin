<template>
  <div class="components-container">
    <el-dialog v-el-drag-dialog :visible.sync="dialogTableVisible" :title="title" width="30%">   
      <el-table :data="gridData">
        <el-table-column property="id" label="部门ID" width="150" />
        <el-table-column property="name" label="部门名称" width="200" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { departmentAllParent } from '@/api/department'
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui

export default {
  name: 'ShowParentDepartments',
  directives: { elDragDialog },
  data() {
    return {
      dialogTableVisible: false,
      user: {},
      department: {},
      gridData: [],
      title:"",
    }
  },
  methods: {
    setUser(user){
        this.title = "当前用户("+user.account+" | "+user.nickname+")-所属部门"
        this.gridData = []
        this.user = user
        this.dialogTableVisible = true
        this.getDataByUser()
    },
    setDepartment(department){
      this.title = "所属部门"
      this.gridData = []
      this.department = department
      this.dialogTableVisible = true
      this.getDataByDepartment()
  },    
    // v-el-drag-dialog onDrag callback function
    getDataByUser() {
        departmentAllParent({id:this.user.department_id}).then(response => {
            this.gridData = response.data

        })   
    },
    getDataByDepartment() {
      departmentAllParent({id:this.department.id}).then(response => {
          this.gridData = response.data

      })   
  },    
  }
}
</script>

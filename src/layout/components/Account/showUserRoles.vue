<template>
  <div class="components-container">
    <el-dialog v-el-drag-dialog :visible.sync="dialogTableVisible" :title="title" width="30%">   
      <el-table :data="gridData">
        <el-table-column property="id" label="角色ID" width="150" />
        <el-table-column property="name" label="角色名称" width="200" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { roleList } from '@/api/role'
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui

export default {
  name: 'ShowUserRoles',
  directives: { elDragDialog },
  data() {
    return {
      dialogTableVisible: false,
      user: {},
      gridData: [],
      title:"",
    }
  },
  methods: {
    setUser(user){
        this.title = "当前用户("+user.account+" | "+user.nickname+")-所属角色"
        this.gridData = []
        this.user = user
        this.dialogTableVisible = true
        this.getData()
    },
    // v-el-drag-dialog onDrag callback function
    getData() {
        roleList({noPage:1,IdArr:this.user.roles}).then(response => {
            this.gridData = response.data.list

        })   
    }
  }
}
</script>

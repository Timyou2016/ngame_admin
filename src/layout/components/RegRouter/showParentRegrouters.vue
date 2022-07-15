<template>
  <div class="components-container">
    <el-dialog v-el-drag-dialog :visible.sync="dialogTableVisible" :title="title" width="70%">   
      <el-table :data="gridData">
        <el-table-column property="id" label="路由ID" width="150" />
        <el-table-column property="name" label="路由名称" width="150" />
        <el-table-column property="path_name" label="前端标识" width="150" />
        <el-table-column property="api_path" label="API访问接口" width="200" />
        <el-table-column property="is_show" label="是否前端路由" width="200" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { regrouterAllParent } from '@/api/regrouter'
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui

export default {
  name: 'ShowParentRegrouters',
  directives: { elDragDialog },
  data() {
    return {
      dialogTableVisible: false,
      regrouter: {},
      gridData: [],
      title:"",
    }
  },
  methods: {
    setRegrouter(regrouter){
      this.title = "所属路由"
      this.gridData = []
      this.regrouter = regrouter
      this.dialogTableVisible = true
      this.getDataByRegrouter()
  },    
    getDataByRegrouter() {
      regrouterAllParent({id:this.regrouter.id}).then(response => {
          this.gridData = response.data

      })   
  },    
  }
}
</script>

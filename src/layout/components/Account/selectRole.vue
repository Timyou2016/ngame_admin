<template>
  <div class="components-container">
    <el-drag-select v-model="value" style="width:200px;" multiple placeholder="请选择角色" v-on="$listeners">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-drag-select>
  </div>
</template>

<script>
import ElDragSelect from '@/components/DragSelect' // base on element-ui
import { roleList } from '@/api/role'
export default {
  name: 'SelectRole',
  components: { ElDragSelect },
  data() {
    return {
      value: [],
      options: []
    }
  },
  created() {
    this.roleList()
  },
  methods: {
    roleList(){
        roleList({noPage:1}).then(response => {
            let list = response.data.list
            list.forEach((item) => {
                console.log(item)
                let option = {
                    value:item.id,
                    label:item.name,
                }
            this.options.push(option)
            })
            console.log(this.options)
        })   
    },  
  }
}
</script>

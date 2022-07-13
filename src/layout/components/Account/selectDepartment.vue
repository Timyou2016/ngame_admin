<template>
<el-cascader
    v-model="selectVal"
    :options="options"
    :props="{ checkStrictly: true }"
    clearable></el-cascader>
</template>
<script>
import { departmentTree } from '@/api/department'
  export default {
    name:"SelectDepartment",
    data() {
      return {
        value:[],
        options: []
      };
    },
   computed: {
    selectVal: {
      get() {
        return [...this.value]
      },
      set(val) {
        console.log(val)
        this.value = val
        console.log(this.value)
      }
    }
  },   
  created() {
    this.departmentTree()
  },
  methods: {
    recurDeparments(list){
      let options = []
      list.forEach((child) => {
            console.log(child)
            let option = {
                value:child.id,
                label:child.name,
            }
            if(child.childrens.length > 0){
              option.children = this.recurDeparments(child.childrens)
            }
            options.push(option)
      })
      return options
    },
    departmentTree(){
        departmentTree().then(response => {
            let list = response.data
            let options = this.recurDeparments(list)
            this.options = options
            console.log(this.options)
        })   
    },  
  }
  };
</script>
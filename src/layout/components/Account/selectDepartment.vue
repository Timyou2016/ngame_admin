<template>
  <div class="components-container">
    <el-cascader-select v-model="selectVal" :options=options :props=showProps :clearable=true v-on="$listeners">
    </el-cascader-select>
  </div>    
</template>
<script>
import { departmentTree } from '@/api/department'
import ElCascaderSelect from '@/components/CascaderSelect' // base on element-ui
  export default {
    name:"SelectDepartment",
    components: { ElCascaderSelect },
    data() {
      return {
        options: [],
        showProps:{
          checkStrictly: true,
          value:'id',
          label:'name',
          children:'childrens',
        }
      };
    }, 
  props: {
    value: {
      type: Array,
      default: []
    }
  },    
  computed: {
    selectVal: {
      get() {
        return [...this.value]
      },
      set(val) {
        this.$emit('input', [...val])
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
            //let options = this.recurDeparments(list)
            this.options = list
            console.log(this.options)
        })   
    },  
  }
  };
</script>
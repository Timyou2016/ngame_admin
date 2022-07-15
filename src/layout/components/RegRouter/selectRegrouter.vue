<template>
  <div class="components-container">
    <el-cascader-select v-model="selectVal" :options=options :props=showProps :clearable=true v-on="$listeners">
    </el-cascader-select>
  </div>    
</template>
<script>
import { regrouterTree } from '@/api/regrouter'
import ElCascaderSelect from '@/components/CascaderSelect' // base on element-ui
  export default {
    name:"SelectRegrouter",
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
    this.regrouterTree()
  },
  methods: {
    recurRegrouters(list){
      let options = []
      list.forEach((child) => {
            console.log(child)
            let option = {
                value:child.id,
                label:child.name,
            }
            if(child.childrens.length > 0){
              option.children = this.recurRegrouters(child.childrens)
            }
            options.push(option)
      })
      return options
    },
    regrouterTree(){
        regrouterTree().then(response => {
            let list = response.data
            //let options = this.recurRegrouters(list)
            this.options = list
            console.log(this.options)
        })   
    },  
  }
  };
</script>
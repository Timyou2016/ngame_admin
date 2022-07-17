<template>
  <div class="app-container">
    <select-all v-model="value"></select-all>
  </div>
</template>

<script>
import SelectAll from '@/components/SelectAll'
import { regrouterTree } from '@/api/regrouter'
export default {
  name: 'SetPermission',
  components: { SelectAll },
  data() {
    return {
      loading:false,
      value: {}
    }
  },
  created() {
        regrouterTree().then(response => {
        this.value= response.data
        }).catch((err) => {
          console.log(err)
        })  
  },  
  methods:{
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



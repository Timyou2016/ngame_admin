<template>
    <el-select v-model="selectVal" v-bind="$attrs" clearable placeholder="请选择游戏" v-on="$listeners">
        <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
        </el-option>
    </el-select> 
</template>

<script>
import { minigameGameList } from '@/api/minigame/common'
export default {
  name: 'SelectGame',
  data() {
    return {
      options: []
    }
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    status: {
      type: Number,
      default: -1
    },      
  },    
  computed: {
    selectVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
        this.$emit('changeSelect', val)
      }
    }
  },   
  created() {
    this.gameList()  
  },
  methods: {
    gameList(){
        minigameGameList({noPage:1,status:this.status}).then(response => {
            let list = response.data.list
            list.forEach((item) => {               
                let option = {
                    value:item.id,
                    label:item.name,
                }
            this.options.push(option)
            })
            this.$emit('changeSelect', this.options[0].value)  
            console.log(this.options)
        })   
    },  
  }
}
</script>

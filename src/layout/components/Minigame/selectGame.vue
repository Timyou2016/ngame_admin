<template>
  <div class="components-container">
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
  </div>
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
        console.log(222222,val)
        console.log(11111,this.value)
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
                console.log(item)
            if (this.value == 0){
                this.$emit('changeSelect', item.id)
            }                
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

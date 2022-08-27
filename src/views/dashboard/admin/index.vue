<template>
  <div class="dashboard-editor-container">
    <div slot="header" class="clearfix">
      <span style="font-weight:bold;font-size:20px;">玩家总量</span>
      <el-button class="filter-item" type="primary" style="float:right;margin-right:30%;"  @click="handleFilter(1)">
        刷新
      </el-button>      
    </div>    
    <game-user-count ref="refGameUserCount"/>
    <el-divider content-position="left"></el-divider>
    <div slot="header" class="clearfix">
      <span style="font-weight:bold;font-size:20px;">新增玩家走势(最近<el-input-number v-model="lastDay" :step="7" @change="handleFilter" :min="7" :max="28" label="查询天数"></el-input-number>天)</span>
    </div>     
    <panel-group ref="refPanelGroupNewUser" :list="list" @handleSetLineChartData="handleSetLineChartData" />
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart ref="refLineChartNewUser" :chart-data="lineChartData" />
    </el-row>
    <el-divider content-position="left"></el-divider>
    <div slot="header" class="clearfix"> 
      <span style="font-weight:bold;font-size:20px;">活跃玩家走势(最近<el-input-number v-model="lastDay" :step="7" @change="handleFilter" :min="7" :max="28" label="查询天数"></el-input-number>天)</span>
    </div>     
    <panel-group ref="refPanelGroupActiveUser" :list="active_list" @handleSetLineChartData="handleSetActiveLineChartData" />
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart ref="refLineChartActiveUser"  :chart-data="active_lineChartData" />
    </el-row>
  </div>
</template>

<script>
import GameUserCount from './components/GameUserCount'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'

import { minigameLastDaysNewUserCount,minigameLastDaysActiveUserCount } from '@/api/minigame/user'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    GameUserCount,
  },
  data() {
    return {
      lineChartData: {
        gameName:"",
        gameData:{
          stats:[],
          dates:[],
        }
      },
      list:{},
      active_lineChartData: {
        gameName:"",
        gameData:{
          stats:[],
          dates:[],
        }
      },
      active_list:{}, 
      lastDay:7     
    }
  }, 
  mounted() {
    this.$nextTick(() => {
      this.handleFilter()
    })
  },  
  methods: {
    handleFilter(v){
      this.getList()
      this.getStatsActive()
      this.$refs.refGameUserCount.getList()
       if(v == 1){
        this.$message({
          message: '刷新完毕',
          type: 'success'
        });        
      }     
    },    
    handleSetLineChartData(type) {
      this.lineChartData = this.list[type]
    },
    handleSetActiveLineChartData(type) {
      this.active_lineChartData = this.active_list[type]
    },    
    getList(){
      minigameLastDaysNewUserCount({last_day:this.lastDay}).then(response => {
        console.log(response)
        this.list = response.data
        this.lineChartData = this.list[0]
        // Just to simulate the time of the request
        setTimeout(() => {
        }, 1.5 * 1000)
      }).catch((err) => {
          console.log(err)
      })         
    }, 
    getStatsActive(){
      minigameLastDaysActiveUserCount({last_day:this.lastDay}).then(response => {
        console.log(response)
        this.active_list =  response.data
        for (let index in this.active_list) {
            console.log("active_list-index:",index)
            this.active_lineChartData = this.active_list[index]
            break
        }
        
        console.log(77777,this.active_list)
        // Just to simulate the time of the request
        setTimeout(() => {
        }, 1.5 * 1000)
      }).catch((err) => {
          console.log(err)
      })         
    },          
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>

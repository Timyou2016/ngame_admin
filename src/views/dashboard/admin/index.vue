<template>
  <div class="dashboard-editor-container">
    <div slot="header" class="clearfix">
      <span style="font-weight:bold;font-size:20px;">玩家总量</span>
    </div>    
    <game-user-count />
    <el-divider content-position="left"></el-divider>
    <div slot="header" class="clearfix">
      <span style="font-weight:bold;font-size:20px;">玩家每日新增(最近15天)</span>
    </div>     
    <panel-group ref="refPanelGroupNewUser" :list="list" @handleSetLineChartData="handleSetLineChartData" />
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart ref="refLineChartNewUser" :chart-data="lineChartData" />
    </el-row>
    <el-divider content-position="left"></el-divider>
    <div slot="header" class="clearfix">
      <span style="font-weight:bold;font-size:20px;">每日付费玩家(最近15天)</span>
    </div>     
    <panel-group ref="refPanelGroupPayedUser" :list="payed_list" />
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart ref="refLineChartPayedUser"  :chart-data="payed_lineChartData" />
    </el-row>
  </div>
</template>

<script>
import GameUserCount from './components/GameUserCount'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'

import { minigameLastDaysNewUserCount } from '@/api/minigame/user'
import { minigameSspLastDaysPayedCount } from '@/api/minigame/ssp'

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
      payed_lineChartData: {
        gameName:"",
        gameData:{
          stats:[],
          dates:[],
        }
      },
      payed_list:{},      
    }
  },
  created() {
    this.getList()
    this.getSsp()
  },    
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = this.list[type]
    },
    getList(){
      minigameLastDaysNewUserCount({last_day:15}).then(response => {
        console.log(response)
        this.list = response.data
        this.lineChartData = this.list[0]
        console.log(99999,this.list)
        // Just to simulate the time of the request
        setTimeout(() => {
        }, 1.5 * 1000)
      }).catch((err) => {
          console.log(err)
      })         
    }, 
    getSsp(){
      minigameSspLastDaysPayedCount({last_day:15}).then(response => {
        console.log(response)
        this.payed_list = {"101":response.data}
        this.payed_lineChartData = this.payed_list["101"]
        console.log(77777,this.payed_list)
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

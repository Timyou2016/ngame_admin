<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />
    <el-divider content-position="left" style="font-size:20px"></el-divider>
    <div slot="header" class="clearfix">
      <span style="font-weight:bold;font-size:20px;">总玩家数量</span>
    </div>    
    <game-user-count />
    <el-divider content-position="left"></el-divider>
    <div slot="header" class="clearfix">
      <span style="font-weight:bold;font-size:20px;">新玩家数量(最近15天)</span>
    </div>     
    <panel-group :list=list @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :className="NewUserCount" :chart-data="lineChartData" />
    </el-row>

  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import GameUserCount from './components/GameUserCount'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import { minigameLastDaysNewUserCount } from '@/api/minigame/user'


export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    GameUserCount,
  },
  data() {
    return {
      lineChartData: {},
      list:[],
    }
  },
  created() {
    this.getList()
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

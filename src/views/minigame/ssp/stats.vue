<template>
  <div class="dashboard-editor-container">
    <div slot="header" class="clearfix" v-loading="listLoading">
      <span style="font-weight:bold;font-size:20px;margin-right:50px;">总付费数据</span>
      <el-button v-waves class="filter-item" type="primary" style="float:right;margin-right:30%;"  @click="loadData(1)">
        刷新
      </el-button>
    </div> 
    <total-person-spend ref="refTotalPersonSpend" /> 
    <el-row :gutter="20" class="panel-group" style="margin-top:5px;">
      <el-col :xs="12" :sm="12" :lg="24" class="card-panel-col">
        <cake :chartData="cakeData" :height="cakeheight" :title_sub="showPropTitle" ref="refTotalPropsCount" />  
      </el-col> 
    </el-row>     
    <el-divider content-position="left"></el-divider>
    <div slot="header" class="clearfix">
      <span style="font-weight:bold;font-size:20px;">付费数据走势(最近<el-input-number v-model="lastDay" :step="7" @change="handleFilter" :min="7" :max="28" label="查询天数"></el-input-number>日)</span>
    </div>     
    <el-row :gutter="20">
      <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
        <single-line-chart :className="personChart"  :Yname="personYname" :chartData="personData" ref="refPersonLineChart" :serieName="personYname" />
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
        <single-line-chart :className="spendChart" :colorVlaue="colorVlaue" :Yname="spendYname" :chartData="spendData" ref="refSpendLineChart" :serieName="spendYname" />
      </el-col>      
    </el-row>        

     <div slot="header" class="clearfix" style="margin-bottom:20px;">
      <span style="font-weight:bold;font-size:20px;"></span>
    </div> 
    <el-row :gutter="20" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="24" class="card-panel-col">
        <more-line-chart :chartData="moreLineChartData" ref="refLastDaysPropsCount" />  
      </el-col>             
    </el-row>    
  </div>
</template>

<script>
import { minigameSspStatPropsCount,minigameSspLastDaysPropsCount,minigameSspLastDaysPersonSpend } from '@/api/minigame/ssp'
import TotalPersonSpend from './total-person-spend'
import Cake from '@/components/Cake'
import MoreLineChart from '@/components/MoreLineChart'
import CountTo from 'vue-count-to'
import SingleLineChart from '@/components/SingleLineChart'
import waves from '@/directive/waves' // waves directive
export default {
  name: 'MinigameSspStats',
  directives: { waves },
  components: {
    TotalPersonSpend,
    Cake,
    MoreLineChart,
    CountTo,
    SingleLineChart
  },
  data() {
    return {
      listLoading: false,
      lastDay:7,
      cakeheight: "300px",
      showPropTitle: "",
      cakeData:{showData:[]},
      moreLineChartData:{xData:[],yData:[]},
      colorVlaue:"#409EFF",  
      personChart:"personChart",
      spendChart:"spendChart",
      personYname:"付费人数",
      spendYname:"Nbox",
      personData:{
        xData:[],
        yData:[],
      },
      spendData:{
         xData:[],
         yData:[],       
      },      
      lastDaysPersonSpend:{
        gameData:{
          total_person:0,
          total_spend:0,
          person_data:[],
          spend_data:[],
          dates:[],
        }
      }      
    }
  },     
  methods: {
     async loadData(v){
      this.listLoading = true
      await this.$refs.refTotalPersonSpend.getSspTotalPersonSpend()
      this.getSspLastDaysPersonSpend()
      this.getStatPropsCount()
      this.getLastDaysPropsCount()
      this.listLoading = false
      if(v == 1){
        this.$message({
          message: '刷新完毕',
          type: 'success'
        });        
      }
    }, 
    handleFilter(){
      this.getSspLastDaysPersonSpend()
      this.getLastDaysPropsCount()
    },
    getStatPropsCount() {
      minigameSspStatPropsCount({}).then(response => {
        /*
        this.cakeData.showData = response.data.map(item=>{
          return {
            name:item.prop_id,
            value:item.num
          }
        })*/
        this.cakeData.showData = response.data
        // Just to simulate the time of the request
        setTimeout(() => {
        }, 1.5 * 1000)
      }).catch((err) => {
          console.log(err)
      }) 
    },
    getLastDaysPropsCount() {
      minigameSspLastDaysPropsCount({last_day:this.lastDay}).then(response => {
        this.moreLineChartData.xData = response.data.dates
        this.moreLineChartData.yData = response.data.data
        // Just to simulate the time of the request
        setTimeout(() => {
        }, 1.5 * 1000)
      }).catch((err) => {
          console.log(err)
      }) 
    }, 
    getSspLastDaysPersonSpend(){
      minigameSspLastDaysPersonSpend({last_day:this.lastDay}).then(response => {
        // Just to simulate the time of the request
        this.lastDaysPersonSpend = response.data
        this.personData.xData = this.lastDaysPersonSpend.gameData.dates
        this.personData.yData = this.lastDaysPersonSpend.gameData.person_data
        this.spendData.xData = this.lastDaysPersonSpend.gameData.dates
        this.spendData.yData = this.lastDaysPersonSpend.gameData.spend_data
        console.log("minigameSspLastDaysPersonSpend",response.data)
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

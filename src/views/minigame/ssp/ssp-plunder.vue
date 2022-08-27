<template>
  <div class="app-container">
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="攻击花费" name="first"><minigame-ssp-spend-list ref="refSspSpend" /> </el-tab-pane>
    <el-tab-pane label="道具奖励" name="second"><minigame-ssp-reward-list ref="refSspReward" /></el-tab-pane>
    <el-tab-pane label="攻击日志" name="third"><minigame-ssp-plunder-log ref="refSspPlunderLog" /></el-tab-pane>
    <el-tab-pane label="数据图表" name="four"><minigame-ssp-stats ref="refSspStats" /></el-tab-pane>
  </el-tabs>
  </div>
</template>
<script>
import MinigameSspRewardList from '@/views/minigame/ssp/reward-list'
import MinigameSspSpendList from '@/views/minigame/ssp/spend-list'
import MinigameSspPlunderLog from '@/views/minigame/ssp/plunder-log'
import MinigameSspStats from '@/views/minigame/ssp/stats'
  export default {
    name: 'MinigameSspPlunder',
    components: { MinigameSspRewardList ,MinigameSspSpendList,MinigameSspPlunderLog,MinigameSspStats},
    data() {
      return {
        activeName: 'four'
      };
    },
    mounted() {
      this.$nextTick(() => {
        this.init();
      })
    },       
    methods: {
      init(){
        if (this.activeName == "first"){
            this.$refs.refSspSpend.handleFilter();
        }
        if (this.activeName == "second"){
            this.$refs.refSspReward.handleFilter();
        }
        if (this.activeName == "third"){
            this.$refs.refSspPlunderLog.handleFilter();
        } 
        if (this.activeName == "four"){
            this.$refs.refSspStats.loadData();
        } 
      },
      handleClick(tab, event) {
        console.log(tab, event);
        console.log(this.activeName);
        this.init();             
      }
    }
  };
</script>
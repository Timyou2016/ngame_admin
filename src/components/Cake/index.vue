<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'Cake',  
  props: {
    className: {
      type: String,
      default: 'cake'
    },
    chartData: {
      type: Object,
      required: true,
    },
    width: {
      type: String,
      default: '100%'
    },  
    height: {
      type: String,
      default: '350px'
    },    
    title: {
      type: String,
      default: ''
    },
    title_sub: {
      type: String,
      default: ''
    }, 
     serieName: {
      type: String,
      default: ''
    },            
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el)
      this.setOptions(this.chartData)
    },
    //showData {name:"abc",value:123}
    setOptions({showData} = {}) {
      console.log("showData",showData)
      this.chart.setOption({  
        title: {
            text: this.title,
            subtext: this.title_sub,
            left: 'center'
        },
        color:["#91cc75","#ee6666","#5470c6","#fac858","#73c0de","#9a60b4","#ea7ccc","#3ba272","#fc8452"],
        tooltip: {
            trigger: 'item',
            show: true,
            showContent: true,
        },
        legend: {},
        series: [
            {
            name:this.serieName,
            type: 'pie',
            radius: '50%',
            data: showData,
            emphasis: {
                itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
            }
        ]
  })
}
  }
}
</script>

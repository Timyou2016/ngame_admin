<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import * as resize from '@/components/mixins/resize'
export default {
  name:"MoreLineChart",
  mixins: [resize],  
  props: {
    className: {
      type: String,
      default: 'morechart'
    },
     Xname: {
      type: String,
      default: '日期'
    }, 
     Yname: {
      type: String,
      default: '数量'
    }, 
    autoResize: {
      type: Boolean,
      default: true
    },               
    width: {
      type: String,
      default: '100%'
    },  
    height: {
      type: String,
      default: '350px'
    }, 
    chartData: {
      type: Object,
      required: true,
    }
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
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ xData, yData } = {}) {
      console.log("xData",xData)
      console.log("yData",yData)
      let seriesList = yData.map(item=>{
        return {
            name: item.name,
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
            emphasis: {
                focus: 'series'
            },
            data: item.data            
        }
      })
      this.chart.setOption({
        xAxis: {
          type:"category",
          name:this.Xname,
          nameLocation:"center",
          nameTextStyle:{padding:5},
          data:xData
        },
        yAxis: {
          type:"value",
          name:this.Yname,          
        },
        color:["#91cc75","#ee6666","#5470c6","#fac858","#73c0de","#9a60b4","#ea7ccc","#3ba272","#fc8452"],
        legend: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },                     
        series: seriesList
      })
    }
  }
}
</script>

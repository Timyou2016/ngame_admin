<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import * as resize from '@/components/mixins/resize'
export default {
  name:"SingleLineChart",
  mixins: [resize],  
  props: {
    className: {
      type: String,
      default: 'chart'
    },
     Xname: {
      type: String,
      default: '日期'
    }, 
     Yname: {
      type: String,
      default: '数量'
    },
    serieName: {
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
    colorVlaue: {
      type: String,
      default: '#67C23A'
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
         grid: {
          left: 20,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        color:["#91cc75","#ee6666","#5470c6","#fac858","#73c0de","#9a60b4","#ea7ccc","#3ba272","#fc8452"], 
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        }, 
        legend: {},                    
        series: [{
          name:this.serieName,
          itemStyle: {
            normal: {
              label: {
                show: true, //开启显示数值
                position: 'top', //数值在上方显示
                textStyle: {  //数值样式
                  color: '#F56C6C',   //字体颜色
                  fontSize: 14  //字体大小
                }
              },
              color: this.colorVlaue,
              lineStyle: {
                color: this.colorVlaue,
                width:1
              }
            }
          },
          smooth: true,
          type: 'bar',
          data: yData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }]
      })
    }
  }
}
</script>

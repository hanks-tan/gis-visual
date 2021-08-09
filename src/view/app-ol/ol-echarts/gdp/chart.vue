<template>
  <div>
    <div ref="chart" class="overlay-chart"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
    }
  },
  props: ['source'],
  mounted () {
    this.chart = echarts.init(this.$refs['chart'])
    if (this.source) {
      this.drawChart(this.source)
    }
  },
  methods: {
    /**
     * 绘制图表
     */
    drawChart (data) {
      let dateLine = Array.apply(null, { length: 29 }).map((item, index) => {
        return '2.' + (index + 1).toString()
      })

      let option = {
        title: {
          text: '全国/湖北疫情趋势'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['全国新增', '湖北新增']
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: dateLine
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '全国新增',
            type: 'line',
            data: data.quanguoTotal
          },
          {
            name: '湖北新增',
            type: 'line',
            data: data.hubeiTotal
          }
        ]
      }

      this.chart.setOption(option)
    }
  }
}
</script>
<style lang="less" scoped>
  .overlay-chart{
    width: 100%;
    height: 100%;
  }
</style>

<template>
  <div v-if="visible" class="overlay-container">
    <div class="overlay-header">
      <span>{{name}}</span>
    </div>
    <div>
      <chart class="chart-container" v-if="overlay" :source="chartData"></chart>
    </div>
  </div>
</template>
<script>
import Overlay from 'ol/Overlay'
import chart from './chart'
export default {
  data () {
    return {
      visible: false,
      name: '疫情趋势',
      overlay: undefined
    }
  },
  components: {chart},
  methods: {
    show () {
      let overlay = new Overlay({
        element: this.$mount().$el,
        stopEvent: false, // 设为false,允许事件传播
        autoPanAnimation: {
          duration: 250
        },
        // offset: [20,0],
        position: this.position,
        positioning: 'center-center',
        className: 'point-overlay'
      })
      this.map.addOverlay(overlay)
      this.overlay = overlay
      this.visible = true
    },
    close () {
      this.visible = false
    }
  }
}
</script>
<style lang="less">
  .overlay-container{
    width: 480px;
    min-height: 320px;
    background-color: #f5f5f5;
    .overlay-header{
      height: 20px;
      position: relative;
      background-color: #171819;
      color: #cec3ce;
      text-align: center;
      .name{
        font-size: 16px;
				font-weight: bold;
				line-height: 1.2;
        width: 95%;
      }
    }
    .chart-container{
      height: 360px;
      width: 100%;
    }
  }
</style>
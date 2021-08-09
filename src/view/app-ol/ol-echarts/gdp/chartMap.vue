<template>
  <div id="map">
  </div>
</template>
<script>
import Vue from 'vue'
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import overlayChart from './overlayChart'
import ncovData from './ncovData'

const OverlayChart = Vue.extend(overlayChart)

export default {
  data () {
    return {
      map: undefined,
      overlayChartObj: undefined,
      data: {

      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    /**
     * 地图初始化
     */
    init () {
      let baseLayer = new TileLayer({
        source: new XYZ({
          url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
        })
      })
      this.map = new Map({
        target: 'map',
        layers: [baseLayer],
        view: new View({
          projection: 'EPSG:4326',
          zoom: 5,
          center: [114, 32]
        })
      })

      console.log(ncovData)
      this.map.on('click', (evt) => {
        let data = ncovData.add
        this.showOverlayChart(evt.coordinate, data)
      })
    },

    /**
     * 显示图表
     */
    showOverlayChart (position, data) {
      if (this.overlayChartObj) {
        this.overlayChartObj.close()
        this.overlayChartObj = null
      }

      this.overlayChartObj = this.createOverlay({
        position,
        data
      })
      this.overlayChartObj.show()
    },

    /**
     * 创建一个overlay组件实例
     */
    createOverlay (params) {
      let obj = new OverlayChart({
        data: {
          map: this.map,
          position: params.position,
          chartData: params.data
        }
      })

      return obj
    }
  }
}
</script>

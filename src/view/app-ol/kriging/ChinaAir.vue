<template>
  <div>
    <map-view ref="mapview"></map-view>
  </div>
</template>

<script>
import MapView from '@/components/_public/MapView.vue'
// import AirLayer from './airLayer'
export default {
  data () {
    return {
      map: undefined
    }
  },
  mounted () {
    this.init()
  },
  components: { MapView },
  methods: {
    init () {
      this.map = this.$refs.mapview.map
      Promise.all(this.getData())
      this.getData('/api/air').then(data => {
        this.showKrigingMap(data)
      })
    },
    getData (api) {
      return this.axios.get(api).then(response => {
        return response.data
      })
    },

    showKrigingMap (data) {
      // let airLayer = new AirLayer({
      //   map: this.map,
      //   sampledData: data,
      //   region: undefined
      // })
    }
  }
}
</script>

import Air from '@/view/app-ol/airPointMap/Air'
import CssFilter from '@/view/app-ol/cssFilter/CssFilter'
import ChinaAir from '@/view/app-ol/kriging/ChinaAir'
import chartMap from '@/view/app-ol/ol-echarts/gdp/chartMap'
import VueRouter from 'vue-router'
const routes = [
  { path: '/', name: 'firstPage', component: null, meta: { title: '首页' } },
  { path: '/ol/air', name: 'olAirPointMap', component: Air, meta: { title: '空气质量散点图' } },
  { path: '/ol/css-filter', name: 'cssFilter', component: CssFilter, meta: { title: '地图背景色切换' } },
  { path: '/ol/kriging', name: 'kriging', component: ChinaAir, meta: { title: '克里金插值' } },
  { path: '/ol/chart-map', name: 'chart-map', component: chartMap, meta: { title: '新冠肺炎趋势图' } }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + ' | WebGIS之路'
  next()
})

export default router

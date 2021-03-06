var webpack = require('webpack')
const express = require('express')
const glob = require('glob')
const path = require('path')
const app = express()
let apiRoutes = express.Router()
app.use('/api', apiRoutes)

// 本地数据处理, 构造以文件名为本地数据接口
let getApi = []
let jsonFilesList = glob.sync('./src/assets/api/*.json')
for (let index = 0; index < jsonFilesList.length; index++) {
  let jsonFile = jsonFilesList[index]
  let data = require(jsonFile)
  let name = path.basename(jsonFile).split('.')[0]
  getApi.push({
    name,
    data
  })
}

module.exports = {
  // publicPath: '/',
  outputDir: 'docs', // 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
  assetsDir: '', // 放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
  indexPath: 'index.html', // 指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  pages: {// pages 里配置的路径和文件名在你的文档目录必须存在 否则启动服务会报错
    index: {// 除了 entry 之外都是可选的
      entry: 'src/index.js', // page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件
      template: 'public/index.html', // 模板来源
      filename: 'index.html', // 在 dist/index.html 的输出
      title: 'GIS可视化之路', // 当使用 title 选项时,在 template 中使用：<title><%= htmlWebpackPlugin.options.title %></title>
      chunks: ['chunk-vendors', 'chunk-common', 'index'] // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk
    }
    // subpage: 'src/subpage/main.js'// 官方解释：当使用只有入口的字符串格式时,模板会被推导为'public/subpage.html',若找不到就回退到'public/index.html',输出文件名会被推导为'subpage.html'
  },
  lintOnSave: true, // 是否在保存的时候检查
  runtimeCompiler: true,
  productionSourceMap: true, // 生产环境是否生成 sourceMap 文件
  css: {
    requireModuleExtension: false,
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps
    loaderOptions: {} // css预设器配置项
  },
  devServer: {// 环境配置
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false,
    open: true, // 配置自动启动浏览器
    before (app) {
      for (let g = 0; g < getApi.length; g++) {
        let item = getApi[g]
        app.get('/api/' + item.name, function (rep, res) {
          res.json({
            result: item.data
          })
        })
      }
    }
  },
  pluginOptions: {// 第三方插件配置
    // ...
  },
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ]
  }
  // configureWebpack: config => {
  //   config.output.filename = '[name].[contenthash:8].js'
  //   config.output.chunkFilename = '[name].[contenthash:8].js'
  // }
}

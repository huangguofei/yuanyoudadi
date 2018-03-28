// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    proxyTable: {
    }
  },
  dev: {
    env: require('./dev.env'),
    port: 8988,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/yydd-web-admin': {
       target: 'http://192.168.3.222:8080',
//				target: 'http://192.168.3.217:8080',,
        changeOrigin: true,
        pathRewrite: {
          '^/yydd-web-admin': '/yydd-web-admin'
        }
      },
      '/editor-jsp': {
       target: 'http://192.168.3.222:8080',
//        target: 'http://192.168.3.217:8080',,
        changeOrigin: true,
        pathRewrite: {
          '^/editor-jsp': '/editor-jsp'
        }
      }
    },
    cssSourceMap: false
  }
}
//http://120.24.55.153:8982/api/admin/user/login
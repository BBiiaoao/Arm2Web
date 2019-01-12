module.exports = {
    // 基本路径
    baseUrl: '/',
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => { },
    configureWebpack: () => { },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    parallel: require('os').cpus().length > 1,
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        open: true,                                 //配置自动启动浏览器
        host: 'localhost',
        port: 8080,                                 // 端口号
        https: false,
        hotOnly: false,                             // https:{type:Boolean}
        // proxy: null,                                // 设置代理
        proxy: {                                    // 配置跨域
            '/api':{
                target:'http://192.168.3.153:8080', //源地址
                // target:'http://120.78.191.131:8080', //源地址
                changeOrigin:true,                  //改变源
                ws:true,                            //是否代理websockets
                pathRewrite:{
                    '^/api':''
                }
            }
        },                                           // 配置跨域处理,只有一个代理
        // proxy: {                                 // 配置多个代理
        //     '/api': {
        //         target: '<url>',
        //         ws: true,
        //         changeOrigin: true
        //     },
        //     '/foo': {
        //         target: '<other_url>'
        //     }
        // },
        before: app => { }
    },
    // 第三方插件配置
    pluginOptions: {

    }
}
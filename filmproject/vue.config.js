const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,//关闭语法检查
  // 开启代理服务器，代理服务器的地址路径默认跟本机一样为8080端口，所以代码里向代理服务器8080端口发请求，代理服务器拿着这个请求向5000端口后端服务器发请求
  devServer:{
    proxy:'http://localhost:5000'
  }

})

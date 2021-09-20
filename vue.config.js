module.exports = {
  devServer: {
    // 开启代理服务器 解决跨域问题
    proxy: {
      // 请求标识 路径端口号后面有 /toutiao 就走代理
      '/toutiao': {
        // target: 'http://ttapi.research.itcast.cn/',  // 接口502
        // target: 'http://api-toutiao-web.itheima.net',   // 后台接口，暂时可用
        target: 'http://toutiao-app.itheima.net',
        changeOrigin: true,
        ws: true,
        // 路径重写 将路径中的/toutiao/ 替换为空
        pathRewrite: { '^/toutiao/': '' }
      }
    }
  }
}

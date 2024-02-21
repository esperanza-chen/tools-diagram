module.exports = {
  //开发环境适配
  developmentSetting: {
    // 项目部署根节点名称
    // 是否启用本地登录页
    useLoginHtml: true,
    //该项目首页地址用作全局路由重定向
    HomeRouter: '/#/home',
    //开发环境登录地址
    loginHost: 'http://kes2.hczy.top:8888',
    //开发环境如果含有websocket模块需配置
    socketHost: 'http://kes2.hczy.top:16666',
    //开发环境下首页地址
    webHost: 'http://127.0.0.1:19527',
  },
  //登录开关true 为需要登录 false
  logged: false,
};

const { resolve } = require('path');
const webpack = require('webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/tools-diagram' : './', //公共路径
  outputDir: 'dist/tools-diagram', //输出路径
  assetsDir: 'static', //静态资源打包地址
  lintOnSave: false, //每次ctrl+s 是否执行代码验证
  productionSourceMap: false,
  pages: {
    //多页模式
    // login: {
    //   entry: 'src/views/login/login.js',
    //   template: 'public/index.html',
    //   filename: 'login.html',
    //   title: '登录',
    // },
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '首页',
    },
  },
  configureWebpack: {
    name: '项目',
    resolve: {
      alias: {
        '@': resolve('src'),
        jquery: 'jquery',
      },
    },
    plugins: [
      new CompressionWebpackPlugin({
        exclude: /.map$/,
        test: /\.js$|\.html$|\.css/, // 匹配文件名
        threshold: 10240, // 对超过10kb的数据进行压缩
        deleteOriginalAssets: false, // 是否删除原文件
      }),
      // new webpack.ProvidePlugin({
      //   $: 'jquery',
      //   jquery: "jquery",
      //   jQuery: "jquery"
      // })
    ],
  },
  devServer: {
    port: '19528',
    open: false,
    compress: false, // gzip
    overlay: {
      warnings: false,
      errors: true,
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();
    config.optimization.minimizer('terser').tap((args) => {
      // del console
      args[0].terserOptions.compress.drop_console = true;
      return args;
    });
    config.when(process.env.NODE_ENV === 'development', (config) => config.devtool('cheap-source-map'));
    // config.plugin("provide").use(webpack.ProvidePlugin, [
    //   {
    //     $: "jquery",
    //     jquery: "jquery",
    //     jQuery: "jquery",
    //     "window.jQuery": "jquery"
    //   }
    // ])
  },
};

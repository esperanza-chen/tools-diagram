import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios'
// 因缩放适配分辨率，调整了element.ui源码，故引入调整后的element.ui,
// 源码地址：https://git.hczy.top:2443/html/netiler-element-ui
import ElementUI from '@/components/element/index';
import '@/components/element/index.css';
import '@/static/styles/index.css';


Vue.use(ElementUI); // 注册elementUI组件库;
Vue.config.productionTip = false;
Vue.prototype.$axios = axios

Vue.directive('focus', {
  inserted: function (el) {
    el.querySelector("input").focus()
  }
})

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
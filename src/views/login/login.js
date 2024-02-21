import Vue from 'vue';
import { Button, Checkbox, Message, Loading, Input, Select, Option, Form, FormItem, Row } from 'element-ui';
import LoginPage from '@/views/login/login.vue';
import 'normalize.css';
// 因缩放适配分辨率，调整了element.ui源码，故引入调整后的element.ui,
// 源码地址：https://git.hczy.top:2443/html/netiler-element-ui
import '@/components/element/index.css';

Vue.config.productionTip = false;

Vue.component(Button.name, Button);
Vue.component(Checkbox.name, Checkbox);
Vue.component(Input.name, Input);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(Row.name, Row);

//Vue.prototype.$workspace = workspace;
Vue.prototype.$message = Message;
Vue.prototype.$fingerloading = Loading;

new Vue({
  render: (h) => h(LoginPage),
}).$mount('#app');

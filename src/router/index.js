import Vue from 'vue';
import VueRouter from 'vue-router';
import staticRoute from './modules/staticRoute';
import { loginIntercept, loginStatusPolling } from '@/utils/loginIntercept';
import { developmentSetting, logged } from './modules/routersetting';
/**
 * 解决重复点菜单报错问题
 */
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  mode: 'hash',
  routes: staticRoute,
  linkActiveClass: 'is-actived',
  linkExactActiveClass: 'is-actived',
});

router.beforeEach((to, from, next) => {
  //开发环境兼容，避免大量无意义的重定向
  if (window.location.href.indexOf('/leadal.acl/login.nsp') !== -1) return;
  if (logged) {
    if (developmentSetting.useLoginHtml) {
      loginStatusPolling(to, from, next, developmentSetting);
    } else {
      loginIntercept(to, from, next, developmentSetting);
    }
  } else {
    next();
  }
});

router.afterEach((to) => {
  document.title = to.meta.title;
});

export default router;

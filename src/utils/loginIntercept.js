import { Message } from 'element-ui';
import storage from '@/utils/storage';
import { getUserInfo } from '@/api';
export function loginIntercept(to, from, next, developmentSetting) {
  let loginFlag = process.env.NODE_ENV === 'development';
  if (loginFlag) {
    try {
      getUserInfo().then((res) => {
        console.log(res);
        if (res && res.id) {
          next();
        } else {
          location.href =
            developmentSetting.loginHost +
            '/leadal.acl/login.nsp?redirectUrl=' +
            encodeURIComponent(developmentSetting.webHost + developmentSetting.HomeRouter);
        }
      });
    } catch (e) {
      Message({
        message: '登录验证出现错误',
        type: 'error',
        duration: 4 * 1000,
      });
    }
  } else {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      // 此路由需要身份验证，请检查是否已登录
      const clientCookie = storage.getCookie('NETILERSESSION_C');
      if (!clientCookie) {
        location.href = '/leadal.acl/login.nsp?redirectUrl=' + developmentSetting.HomeRouter;
      } else {
        next();
      }
    } else {
      next();
    }
  }
}
export function loginStatusPolling(to, from, next, developmentSetting) {
  let loginFlag = process.env.NODE_ENV === 'development';
  if (loginFlag) {
    getUserInfo().then((res) => {
      if (res && res.id) {
        next();
      } else {
        document.location.href = '/login.html';
      }
    });
  } else {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      const clientCookie = storage.getCookie('NETILERSESSION_C');
      if (!clientCookie) {
        document.location.href = '/login.html';
      } else {
        next();
      }
    }
  }
}

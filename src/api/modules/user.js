import request from '@/utils/request';

export function loginSubmit(data) {
  return request({
    url: '/acl/sso/login',
    method: 'POST',
    data,
  });
}
/**获取用户信息 */
export function getUserInfo() {
  return request({
    url: '/acl/auth/current',
    method: 'GET',
  });
}

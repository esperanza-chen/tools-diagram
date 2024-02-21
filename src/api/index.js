import request from '@/utils/request';
export function fn1() {
  return request({
    url: 'url',
    method: 'GET',
  });
}
export * from './modules/user';

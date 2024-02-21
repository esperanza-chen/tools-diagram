export const chrome = window.chrome ? window.chrome : {};

// 根据当前模块，是否是云的部署,域名访问，是，返回正确的地址
// 参数传递：对应模块的域名前缀（string），参考域名划分
export function checkYun(type) {
  // 当前模块域名前缀
  let local = 'home';
  const pattern =
    /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
  const flagIp = pattern.test(window.location.hostname);
  if (local.indexOf('.') === -1) local += '.';
  if (type.indexOf('.') === -1) type += '.';
  let url = window.location.protocol + '//' + window.location.host + '/';
  if (
    !flagIp &&
    window.location.hostname.indexOf(local) === 0 &&
    window.location.hostname.indexOf('localhost') === -1
  ) {
    url = url.replace(local, type);
  }
  return url;
}


export const env =  window.location.origin?.includes('localhost') || window.location.origin?.includes('127.0.0.1')
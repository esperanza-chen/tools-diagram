import Bus from './bus'

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

// 支持上传的文件格式
export function checkoutFileUploadFormat(fileType) {
  let fileFormat = ["doc", "docx", "xls", "xlsx", "ppt", "pptx", "wps", "pdf", "ofd", "txt", "jpg", "png", "gif", "jpeg", "bmp", "avi", "rmvb", "rm", "asf", "divx", "mpg", "mpeg", "mpe", "wmv", "mp4", "mkv", "vob", "aac", "ac3", "ape", "cda", "flac", "m4a", "mid", "mka", "mp2", "mp3", "ofr", "ogg", "ra", "tta", "wav", "wma", "wv", "mpa", "mpc", "dts"]
  let checkFormat = true
  if (fileFormat.indexOf(fileType) === -1) {
    checkFormat = false
  }
  return checkFormat
}


export function getStringLength(str) {
  var len = str.length;
  var realLength = 0;
  for (var i = 0; i < len; i++) {
    if ((str.charCodeAt(i) & 0xff00) != 0) {
      realLength++;
    }
    realLength++;
  }
  return realLength;
};

export const onDiagramMessage = () => {
  window.onmessage = (data) => {
    Bus.$emit('TreeBoxMsg', data)
    Bus.$emit('index1Msg', data)
    Bus.$emit('titlePopupMsg', data)
    Bus.$emit('home1CreateEditMsg', data)
    Bus.$emit('home2TaskQueryMsg', data)
    Bus.$emit('home3FlowQueryMsg', data)
    Bus.$emit('home4CreateFlowTaskMsg', data)
    Bus.$emit('editMsg', data)
  };
}

export const uniqArr = (arr) => {
  let newArr = arr.filter((item) => item)
  let uniqIds = []
  newArr.forEach((item) => {
    if (!uniqIds.includes(item)) {
      uniqIds.push(item)
    }
  })
  return uniqIds
}

export const getTreeLeaf = (treeData) => {
  let newList = [];
  treeData.forEach((item) => {
    if (item.children && item.children.length > 0) {
      newList = [...newList, ...getTreeLeaf(item.children)];
    } else {
      newList.push(item);
    }
  });
  return newList;
};

export const env = window.location.origin && (window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1'))
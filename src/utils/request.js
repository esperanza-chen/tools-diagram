import axios from 'axios';
import { Message } from 'element-ui';
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true, // send cookies when cross-domain requests
  timeout: Infinity, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error), // do something with request error
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code.
   */
  (response) => {
    const res = response.data;
    // if the custom code is not 200, it is judged as an error.
    if (res && res.code && res.code === 440) {
      //to do deleted cookie
    } else if (res && res.code && res.code !== 200) {
      Message({
        message: res.message || '请检查数据返回格式',
        type: 'error',
        dangerouslyUseHTMLString: true,
        duration: 5 * 1000,
      });
      return Promise.reject(res.message || 'error');
    }
    return res;
  },
  (error) => {
    if (process.env.NODE_ENV === 'development') {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000,
      });
    } else {
      console.error(error);
    }
    return Promise.reject(error);
  },
);

export default service;

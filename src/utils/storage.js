import CryptoJS from './cryptoAES';
const storage = {
  validate(type) {
    try {
      const storage = window[type];
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return false;
    }
  },
  // 存到本地
  set(key, value, isEncrypt) {
    if (key && value) {
      const setItem = (k, v) => {
        if (storage.validate('localStorage')) {
          const ls = localStorage;
          if (v.constructor === Object) {
            v = JSON.stringify(v);
          }
          ls.setItem(k, v);
        }
        return storage.get(k);
      };
      if (isEncrypt) {
        const obj = {};
        if (value.constructor === Object) {
          Object.keys(value).forEach((key) => {
            obj[key] = storage.cryptoAES.aes.encode(value[key]);
          });
          value = obj;
        } else {
          value = storage.cryptoAES.aes.encode(value);
        }
        return setItem(key, value);
      }
      return setItem(key, value);
    }
  },
  // 从本地获取
  get(key, isUnEncrypt) {
    if (!key) {
      return;
    }
    const getItem = () => {
      let value = null;
      if (storage.validate('localStorage')) {
        const ls = localStorage;
        try {
          value = JSON.parse(ls.getItem(key));
        } catch {
          value = ls.getItem(key);
        }
      }
      return value;
    };
    if (isUnEncrypt) {
      const value = getItem();
      if (value && value.constructor === Object) {
        const obj = {};
        Object.keys(value).forEach((key) => {
          obj[key] = storage.cryptoAES.aes.decode(value[key]);
        });
        return obj;
      }
      return storage.cryptoAES.aes.decode(value);
    }
    return getItem();
  },
  remove(key) {
    if (storage.validate('localStorage')) {
      const ls = localStorage;
      if (key) {
        ls.removeItem(key);
      }
    }
  },
  setCookie(cName, value, expiredays) {
    const exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    const encode = (v) => {
      let retutnValue;
      if (typeof storage.cryptoAES !== 'undefined' && typeof CryptoJS !== 'undefined') {
        retutnValue = storage.cryptoAES.aes.encode(v);
      } else {
        retutnValue = escape(v);
      }
      return retutnValue;
    };
    document.cookie = cName + '=' + encode(value) + (expiredays == null ? '' : ';expires=' + exdate.toGMTString());
  },
  getCookie(cName) {
    const decode = (v) => {
      let retutnValue;
      if (typeof $crypto !== 'undefined' && typeof CryptoJS !== 'undefined') {
        if (storage.cryptoAES.aes.isCryptoIAES(v)) {
          retutnValue = storage.cryptoAES.aes.decode(v);
        }
        retutnValue = unescape(v);
      } else {
        retutnValue = unescape(v);
      }
      return retutnValue;
    };
    if (document.cookie.length > 0) {
      let cStart;
      let cEnd;
      cStart = document.cookie.indexOf(cName + '=');
      if (cStart !== -1) {
        cStart = cStart + cName.length + 1;
        cEnd = document.cookie.indexOf(';', cStart);
        if (cEnd === -1) {
          cEnd = document.cookie.length;
        }
        return decode(document.cookie.substring(cStart, cEnd));
      }
    }
    return '';
  },
  attrs: {},
  /**
   * 设置属性
   */
  setAttr(key, value) {
    if (key.split('.').length < 3) {
      storage.alert('Attribute key must format with product.project.model to be unique');
      return;
    }
    const win = window.top();
    if (value) {
      this.attrs[key] = value;
      win.storage.attrs[key] = value;
    } else {
      delete this.attrs[key];
      delete win.storage.attrs[key];
    }
    // 页面销毁后，移除释放注册的属性
    window.addEventListener('beforeunload', () => {
      Object.keys(window.storage.attrs).forEach((key) => {
        delete win.storage.attrs[key];
      });
    });
  },
  /**
   * 获取属性
   */
  getAttr(key) {
    const win = window.top();
    const value = win.storage.attrs[key];
    if (typeof value === 'undefined') {
      return null;
    }
  },
  // 加密
  cryptoAES: {
    aes: {
      ks: 'bjllOHQ3aTZsNTRlM3J1aQ==',
      ivs: 'MDEyMzQ1Njc4OTEyMzQ1Ng==',
      prefix: '{NUIA}',
      /**
       *
       * @param text
       * 待加密的串
       * @param ks
       * 自定义 key
       * @param ivs
       * 自定义 偏移量
       */
      encode(text, ks, ivs) {
        if (typeof CryptoJS === 'undefined') {
          // eslint-disable-next-line no-console
          console.warn('请引入 CryptoJS!');
          return;
        }
        if (!ks) {
          ks = 'bjllOHQ3aTZsNTRlM3J1aQ==';
        }
        if (!ivs) {
          ivs = 'MDEyMzQ1Njc4OTEyMzQ1Ng==';
        }
        const key = CryptoJS.enc.Utf8.parse(atob(ks));
        const iv = CryptoJS.enc.Utf8.parse(atob(ivs));
        const srcs = CryptoJS.enc.Utf8.parse(text);
        const encrypted = CryptoJS.AES.encrypt(srcs, key, {
          iv,
          mode: CryptoJS.mode.CBC,
        });
        return this.prefix + encrypted.toString();
      },
      /**
       * @param encodeText
       *            已加密的串
       * @param ks
       *            自定义 key
       * @param ivs
       *            自定义 偏移量
       */
      decode(encodeText, ks, ivs) {
        if (typeof CryptoJS === 'undefined') {
          // eslint-disable-next-line no-console
          console.warn('请引入 CryptoJS!');
          return;
        }
        if (!encodeText) {
          return null;
        }
        if (!this.isCryptoIAES(encodeText)) {
          return null;
        }
        encodeText = encodeText.substr(6);
        if (!ks) {
          ks = 'bjllOHQ3aTZsNTRlM3J1aQ==';
        }
        if (!ivs) {
          ivs = 'MDEyMzQ1Njc4OTEyMzQ1Ng==';
        }
        const key = CryptoJS.enc.Utf8.parse(atob(ks));
        const iv = CryptoJS.enc.Utf8.parse(atob(ivs));
        const decrypt = CryptoJS.AES.decrypt(encodeText, key, {
          iv,
          mode: CryptoJS.mode.CBC,
        });
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
      },
      /**
       * 是否为UI AES加密串
       */
      isCryptoIAES(encodeText) {
        if (encodeText.indexOf(this.prefix) === 0) {
          return true;
        }
        return false;
      },
    },
  },
};

export default storage;

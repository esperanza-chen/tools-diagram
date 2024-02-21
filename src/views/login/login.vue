<template>
  <div>
    <el-input v-model="userName" type="text"></el-input>
    <el-input v-model="passWord" type="text"></el-input>
    <div @click="handleLogin">
      我是登录按钮
    </div>
  </div>
</template>
<script>
import { loginSubmit } from '@/api/modules/user';
import { chrome } from '@/utils/utils';
import { developmentSetting } from '@/router/modules/routersetting';
export default {
  name: 'LoginPage',
  data() {
    return {
      userName: '',
      passWord: '',
    };
  },
  created() {
    if (JSON.stringify(chrome) !== '{}' && typeof chrome.openWithTab === 'function') {
      chrome.closeOtherTab();
      // 切换账号时需要隐藏头部和底部
      chrome.hideHeaderFrame();
      chrome.setAttribute('isSetHeader', false);
      chrome.hideFooterFrame();
      chrome.setAttribute('isSetFooter', false);
      chrome.moveable(true);
      chrome.resize(820, 640);
      chrome.center();
    }
  },
  mounted() {
    let that = this;
    document.onkeydown = function (e) {
      let event = window.event || e;
      //保证是在登录页面发出的enter事件
      if (event.code === 'Enter' || event.code === 'enter') {
        //调用登录函数
        that.handleLogin();
      }
    };
  },
  methods: {
    handleLogin() {
      //todo
      let datas = 'userName=' + this.userName + '&passWord=' + this.passWord + '&appId=developer';
      loginSubmit(datas).then((res) => {
        if (res.success) {
          if (JSON.stringify(chrome) !== '{}' && typeof chrome.openWithTab === 'function') {
            chrome.moveto(0, 0);
            chrome.resize(window.screen.availWidth, window.screen.availHeight);
            document.location.href = developmentSetting.HomeRouter;
          } else {
            document.location.href = developmentSetting.HomeRouter;
          }
        } else {
          this.$message.warning(res.msg);
        }
      });
    },
  },
};
</script>

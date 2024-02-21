<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
html {
  font-size: 18px;
}
ul,
ol {
  list-style: none;
}
body {
  width: 100vw;
  height: 100vh;
  /* background-image: url('~@/assets/map.png');
  background-color: #087dc3; */
  font-family: 'Alibaba PuHuiTi Regular';
  overflow: hidden;
  user-select: none;
}
html,
body,
ul,
li,
ol,
dl,
dd,
dt,
p,
h1,
h2,
h3,
h4,
h5,
h6,
form,
fieldset,
legend,
img {
  margin: 0;
  padding: 0;
}
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.date-form .el-picker-panel__footer .el-button--text {
  display: none;
}
.el-select-dropdown.el-popper {
  z-index: 20000!important;
}
</style>

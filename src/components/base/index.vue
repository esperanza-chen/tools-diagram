<template>
  <div id="flowDom"></div>
</template>

<script>
import { insertScripts } from './main'

export default {
  name: '',
  props: {
    msg: String,
  },
  mounted() {
    const dom = document.getElementById('flowDom')
    insertScripts(dom)
  },
  methods: {}
};
</script>

<style>
.onerootinfo {
  position: fixed;
  width: 80px;
  height: 30px;
  top: 3px;
  right: 130px;
  background-color: aquamarine;
  counter-reset: #fff;
  line-height: 30px;
  text-align: center;
}

.onerootinfo.allinfo {
  right: 40px;
}

.FileList1 {
  width: 450px;
  /* height: 200px; */
}
.FileList0 {
  width: 450px;
  height: 200px;
}
.FileList2 {
  width: 450px;
  height: auto;
}
.FileList3 {
  width: 450px;
  height: 200px;
}
.FileList4 {
  width: 450px;
  height: 140px;
}
.Filehead {
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  box-sizing: border-box;
  color: #383842;
  font-size: 18px;
  font-weight: 400;
  font-family: 'Alibaba PuHuiTi Medium';
}
.FileSwitch {
  width: 62px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('~@/static/switchImg.png') no-repeat;
  background-size: 100% 100%;
}
.el-icon-arrow-down {
  margin-left: 5px;
  transform: rotate(-180deg);
  transition: 0.5s;
  cursor: pointer;
}
.FileContentList {
  height: calc(100% - 35px);
  width: 100%;
}
.FileTableList {
  height: 150px;
  width: 100%;
  overflow-y: auto;
  margin-bottom: 8px;
}
.FileContent {
  height: 150px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  cursor: pointer;
}
.FileContent-logo {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding-top: 35px;
}
.FileContent-text {
  width: 100%;
  height: 24px;
  overflow: hidden;
  text-align: center;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 400;
  color: #585865;
}
.costcontent {
  width: 100%;
  height: calc(100% - 35px);
  padding: 18px 10px 10px 15px;
  box-sizing: border-box;
  overflow-y: auto;
}
.costList {
  width: 100%;
  height: 35px;
  /* padding: 10px 10px;
  box-sizing: border-box; */
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.costInput1 {
  width: 216px;
  height: 34px;
}
.costInput2 {
  width: 168px;
  height: 34px;
  margin: 7px 10px 5px 10px;
}
.costInput2 >>> .el-input-group__append {
  width: 25px;
}
.el-icon-delete {
  font-size: 18px;
  cursor: pointer;
}
.costList >>> .el-input__inner::placeholder {
  color: #383842;
  opacity: 0.6;
  font-weight: 400;
}
.costBtn {
  width: 112px;
  height: 44px;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid #5385f7;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.FileList {
  margin-bottom: 20px;
  transition: 0.5s;
  border-radius: 6px;
  float: right;
  background-color: #edf2fa;
  flex-shrink: 0;
}
.planTime {
  margin: 24px 0 0 24px;
  display: flex;
}
.planTime >>> .el-input {
  width: 216px;
}
.planTime >>> .el-input__inner {
  width: 216px;
  height: 40px;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid #ffffff;
  border-radius: 4px;
}
.planTime .el-select >>> .el-input--suffix,
.planTime .el-select >>> .el-input__inner {
  width: 152px;
}
.planTime .el-select >>> .el-select__caret {
  color: #548fdb;
}
/* .upload-demo,.upload-demo >>> .el-upload{
  height: 100%;
  width: 100%;
}
.upload-demo >>> .el-upload-dragger{
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
} */
#designer_canvas {
  background: #e1eaf7 !important;
  box-shadow: none;
}
.lanebar {
  background-color: #d1e1f8 !important;
  border-radius: 0 0 5px 5px;
  left: 300px;
  right: 0px;
}
.thislist {
  display: flex;
  justify-content: space-between;
  height: 40px;
  align-items: center;
  padding: 0 60px;
}
.listSpan1 {
  width: 80%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 400;
  color: #2458bf;
  font-size: 16px;
}
#designer_contextmenu {
  display: none;
}

#canvas_container {
  padding: 20px !important;
}
#designer_layout {
  background: #e1eaf7 !important;
}
#showItem {
  top: 70px !important;
}
.el-select-dropdown.el-popper {
  z-index: 10000 !important;
}
</style>

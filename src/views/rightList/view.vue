<template>
  <div id="showItem">
    <div class="FileList0 FileList">
      <div class="Filehead">
        <div>工作内容</div>
        <div class="FileSwitch" @click="FileSwitch(0)">
          <i class="el-icon-arrow-down" :style="FileListFlag0 ? '' : 'transform: rotate(0)'"></i>
        </div>
      </div>
      <div v-show="FileListFlag0" style="padding: 0 40px">
        <span class="listspan2">{{ showedMessage.workContent }}</span>
      </div>
    </div>
    <!--右上上传文件第一个工作模板-->
    <div class="FileList1 FileList">
      <div class="Filehead">
        <div>工作模板</div>
        <div class="FileSwitch" @click="FileSwitch(1)">
          <i class="el-icon-arrow-down" :style="FileListFlag1 ? '' : 'transform: rotate(0)'"></i>
        </div>
      </div>
      <div class="FileContentList">
        <div class="FileContent" v-show="FileListFlag1 && showedMessage.workFireList.length === 0">
          <div class="FileContent-logo">
            <img width="50" src="@/static/task/listdefault.png" />
          </div>
          <div class="FileContent-text">暂无工作模板</div>
        </div>
        <div class="FileTableList" v-show="FileListFlag1 && showedMessage.workFireList.length > 0">
          <div class="thislist" v-for="(item, index) in showedMessage.workFireList" :key="index">
            <span class="listSpan1">{{ item.fileName }}</span>
            <span class="listspan2">{{ item.createUser.length > 8 ? item.createUserName : item.createUser }}</span>
          </div>
        </div>
      </div>
    </div>
    <!--右上上传文件第二个参考知识-->
    <div class="FileList2 FileList">
      <div class="Filehead">
        <div>参考知识</div>
        <div class="FileSwitch" @click="FileSwitch(2)">
          <i class="el-icon-arrow-down" :style="FileListFlag2 ? '' : 'transform: rotate(0)'"></i>
        </div>
      </div>
      <div class="FileContentList">
        <div class="FileContent" v-show="FileListFlag2 && showedMessage.knowFireList.length === 0">
          <div class="FileContent-logo">
            <img width="50" src="@/static/task/listdefault.png" />
          </div>
          <div class="FileContent-text">暂无参考知识</div>
        </div>
        <div class="FileTableList" v-show="FileListFlag2 && showedMessage.knowFireList.length > 0">
          <div class="thislist" v-for="(item, index) in showedMessage.knowFireList" :key="index">
            <span class="listSpan1">{{ item.fileName }}</span>
            <span class="listspan2">{{ item.createUser.length > 8 ? item.createUserName : item.createUser }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      // 展示出来的文件
      showedMessage: {
        workContent: '',
        workFireList: [],
        knowFireList: [],
      },
      // 节点
      itemMessage: {
        workContent: '',
        workFireList: [],
        knowFireList: [],
      },
      // 流程
      flowMessage: {
        workContent: '',
        workFireList: [],
        knowFireList: [],
      },
      //右上展开和收缩
      FileListFlag0: false,
      FileListFlag1: false,
      FileListFlag2: false,
      msgType: 1,
    };
  },
  mounted() {
    this.initSwitch();
  },
  methods: {
    initSwitch() {
      // 进入流程图，先展开右上角，展示数据后再根据toDoFileSwitch收缩
      this.FileSwitch(0);
      this.FileSwitch(1);
      this.FileSwitch(2);
    },
    FileSwitch(val) {
      // 展开与关闭
      const dom = document.querySelector(`.FileList${val}`);
      if (!dom) {
        return;
      }
      const styleConfig = this.changeStyle(val);
      dom.style.width = styleConfig.width;
      dom.style.height = styleConfig.height;
      this.handleFlag(val);
    },
    changeStyle(val) {
      // 改变width 与 height
      const defaultStyle = {
        width: '168px',
        height: '35px',
      };
      const itemListFlags = [this.FileListFlag0, this.FileListFlag1, this.FileListFlag2];
      // FileListFlag目前为true表示为展开状态 即将变为false 则需要更换成收缩样式
      if (itemListFlags[val]) {
        return defaultStyle;
      }
      if (val === 0 || val === 3) {
        return {
          width: '450px',
          height: '200px',
        };
      }
      if (val === 1 || val === 2) {
        return {
          width: '450px',
          height: 'auto',
        };
      }
    },
    handleFlag(val) {
      // FileListFlag0,1,2,3,4的true与false控制
      val === 0 && (this.FileListFlag0 = !this.FileListFlag0);
      val === 1 && (this.FileListFlag1 = !this.FileListFlag1);
      val === 2 && (this.FileListFlag2 = !this.FileListFlag2);
    },
    toDoFileSwitch(val) {
      let canDo = false;
      // 当 FileListFlag0 为 false(关闭状态) 但是 workContent有内容 --- 则需要展开
      // 当 FileListFlag0 为 true(展开状态) 但是 workContent无内容 --- 则需要关闭
      val === 0 && (canDo = Boolean(this.showedMessage.workContent) ^ this.FileListFlag0);
      val === 1 && (canDo = Boolean(this.showedMessage.workFireList.length > 0) ^ this.FileListFlag1);
      val === 2 && (canDo = Boolean(this.showedMessage.knowFireList.length > 0) ^ this.FileListFlag2);
      canDo && this.FileSwitch(val);
    },
    // 回显流程节点中的工作内容、工作模板、参考知识
    resetFlowItemMsg(workContent, workFiles, refercontents) {
      this.itemMessage = {
        workContent: workContent ? workContent : '',
        workFireList: workFiles ? workFiles : [],
        knowFireList: refercontents ? refercontents : [],
      };
      this.changeShowedMsg(2);
      return;
    },
    initFlowMsg(iframeMessage) {
      console.log(iframeMessage.workContent[0], 'fffffffffffff111');
      // 打开流程图初始化右侧栏，并根据内容展开
      const content =
        Array.isArray(iframeMessage.workContent) && iframeMessage.workContent.length
          ? iframeMessage.workContent[0].text
          : iframeMessage.workContent;
      this.flowMessage = {
        workContent: content ? content : '',
        workFireList: iframeMessage.workFiles ? iframeMessage.workFiles : [],
        knowFireList: iframeMessage.refercontents ? iframeMessage.refercontents : [],
      };
      this.changeShowedMsg(1);
      return;
    },
    changeShowedMsg(msgType) {
      // 根据当前聚焦（流程节点还是画布）替换showedMessage msgType 为1取flowMessage 为2取itemMessage
      this.msgType = msgType;
      if (msgType === 1) {
        this.showedMessage = this.flowMessage;
      } else {
        this.showedMessage = this.itemMessage;
      }
      this.toDoFileSwitch(0);
      this.toDoFileSwitch(1);
      this.toDoFileSwitch(2);
      return;
    },
  },
};
</script>
<style scoped>
#showItem {
  z-index: 1;
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
  flex-wrap: wrap;
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
.FileList {
  margin-bottom: 20px;
  transition: 0.5s;
  border-radius: 6px;
  float: right;
  background-color: #edf2fa;
  flex-shrink: 0;
}
.thislist {
  display: flex;
  justify-content: space-between;
  height: 40px;
  align-items: center;
  padding: 0 40px;
}
.listSpan1 {
  display: inline-block;
  width: 10em;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 400;
  color: #2458bf;
  font-size: 16px;
}
.listspan2 {
  font-weight: 400;
  color: #2458bf;
  font-size: 16px;
}
</style>

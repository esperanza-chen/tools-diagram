<template>
  <div id="showItem">
    <RightBox v-if="hasBox0" title="工作内容" flag-width="450px" flag-height="200px" :isExpanded.sync="boxFlag0" :canFlag="canEidtContent">
      <template #default>
        <el-input
          style="margin-bottom: 15px; height: 139px"
          type="textarea"
          :rows="2"
          resize="none"
          placeholder="请输入内容"
          maxlength="200"
          v-model="showedMessage.workContent"
        >
        </el-input>
      </template>
    </RightBox>
    <RightBox v-if="hasBox1" title="工作用时" flag-width="450px" flag-height="140px" :isExpanded.sync="boxFlag1">
      <template #default>
        <div class="planTime">
          <el-input
            type="number"
            style="margin-right: 10px"
            v-model="showedMessage.time"
            placeholder="请输入"
            @input="handleTime"
          ></el-input>
          <el-select v-model="showedMessage.timeUnit" placeholder="请选择">
            <el-option v-for="item in timeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </template>
    </RightBox>
    <RightBox
      v-if="hasBox2"
      title="工作模板"
      flag-width="450px"
      flag-height="auto"
      :isExpanded.sync="boxFlag2"
      :is-add-file="true"
      :file-array="showedMessage.workFireList"
      @click-add="addWorkFile"
      @click-del="delWorkFile"
      @click-file="lookFile"
    >
    </RightBox>
    <RightBox
      v-if="hasBox3"
      title="参考知识"
      flag-width="450px"
      flag-height="auto"
      :isExpanded.sync="boxFlag3"
      :is-add-file="true"
      :file-array="showedMessage.knowFireList"
      @click-add="addRefFile"
      @click-del="delRefFile"
      @click-file="lookFile"
    >
    </RightBox>
    <box-file-one
      v-if="isFileFlag1"
      :switch-show="isFileFlag1"
      title="上传工作模板"
      @sure="sureAddWork"
      @cancel="cancelAddWork"
    ></box-file-one>
  </div>
</template>
<script>
import RightBox from './box.vue';
import BoxFileOne from '@/components/messageBox/BoxFile1.vue';
import Bus from '@/utils/bus';
// props-boxIds---可以展示box的id数组
export default {
  components: {
    RightBox,
    BoxFileOne,
  },
  props: {
    boxIds: {
      type: Array,
      default: [0, 1, 2, 3],
      require: true,
    },
  },
  data() {
    return {
      // 展示出来的文件
      showedMessage: {
        workContent: '',
        workFireList: [],
        knowFireList: [],
        time: '',
        timeUnit: '',
      },
      //上传工作文档弹框开关
      isFileFlag1: false,
      //右上展开和收缩控制的变量
      boxFlag0: false, // 工作内容
      boxFlag1: false, // 计划用时
      boxFlag2: false, // 工作模板
      boxFlag3: false, // 参考知识
      timeOptions: [
        { value: '分钟', lable: '分钟' },
        { value: '小时', lable: '小时' },
        { value: '天', lable: '天' },
        { value: '月', lable: '月' },
      ],
      hasBox0: false, // 是否展示工作内容、计划用时等
      hasBox1: false,
      hasBox2: false,
      hasBox3: false,
      canEidtContent: true, // 是否可编辑工作内容
    };
  },
  mounted() {
    this.initBox();
    Bus.$on('editMsg', this.windowOnmsg);
  },
  methods: {
    initBox() {
      // 配置展示的box
      this.boxIds.forEach((ele) => {
        ele === 0 && (this.hasBox0 = true);
        ele === 1 && (this.hasBox1 = true);
        ele === 2 && (this.hasBox2 = true);
        ele === 3 && (this.hasBox3 = true);
      });
    },
    // window.onmessage绑定函数
    windowOnmsg(event) {
      switch (event.data.type) {
        case 'addToReference':
          this.addToReference(event.data.iframeMessage);
          break;
        case 'addToWorkFile':
          this.addToWorkFile(event.data.iframeMessage);
          break;
      }
    },
    handleFlag(val) {
      // boxFlag0,1,2,3,4的true与false控制
      val === 0 && (this.boxFlag0 = !this.boxFlag0);
      val === 1 && (this.boxFlag1 = !this.boxFlag1);
      val === 2 && (this.boxFlag2 = !this.boxFlag2);
      val === 3 && (this.boxFlag3 = !this.boxFlag3);
    },

    //上传工作文档取消
    cancelAddWork() {
      this.isFileFlag1 = false;
    },
    //上传工作文档确认
    sureAddWork(list) {
      window.parent.postMessage(
        { iframeMessage: list, id: this.showedMessage?.id, index: this.$route.query?.index, type: 'uploadWorkCon' },
        '*',
      );
      this.isFileFlag1 = false;
    },
    // 添加工作模板
    addToWorkFile(data) {
      this.showedMessage.workFireList = this.showedMessage.workFireList.concat(data);
    },
    // 添加参考知识
    addToReference(data) {
      this.showedMessage.knowFireList = this.showedMessage.knowFireList.concat(data);
    },
    toDoFileSwitch(val) {
      let canDo = false;
      // 当 boxFlag0 为 false(关闭状态) 但是 workContent有内容 --- 则需要展开
      // 当 boxFlag0 为 true(展开状态) 但是 workContent无内容 --- 则需要关闭
      // 新建任务中的流程，若是显示流程图的信息则提示不可修改工作内容（有任务描述，功能重复）
      val === 0 && this.canEidtContent && this.hasBox0 && (canDo = Boolean(this.showedMessage.workContent) ^ this.boxFlag0);
      val === 2 && this.hasBox2 && (canDo = Boolean(this.showedMessage.workFireList.length > 0) ^ this.boxFlag2);
      val === 3 && this.hasBox3 && (canDo = Boolean(this.showedMessage.knowFireList.length > 0) ^ this.boxFlag3);
      canDo && this.handleFlag(val);
    },
    // 回显流程节点中的工作内容、工作模板、参考知识
    resetFlowItemMsg(workContent, workFiles, refercontents, id) {
      const itemMessage = {
        workContent: workContent ? workContent : '',
        workFireList: workFiles ? workFiles : [],
        knowFireList: refercontents ? refercontents : [],
        id: id,
      };
      this.changeShowedMsg(itemMessage);
      this.canEidtContent = true;
      return;
    },
    initFlowMsg(iframeMessage) {
      // 打开流程图初始化右侧栏，并根据内容展开
      const { workFiles, refercontents, workContent } = iframeMessage;
      let content = '';
      if (Array.isArray(workContent)) {
        workContent.length && (content = workContent[0].text);
      } else {
        content = workContent;
      }
      const flowMessage = {
        workContent: content,
        workFireList: workFiles ? workFiles : [],
        knowFireList: refercontents ? refercontents : [],
      };
      this.changeShowedMsg(flowMessage);
      this.canEidtContent = false;
      return;
    },
    changeShowedMsg(msgDetails) {
      // 根据当前聚焦状态（流程节点还是画布）替换showedMessage
      this.showedMessage = msgDetails;
      this.boxIds.forEach((val) => {
        this.toDoFileSwitch(val);
      });
      return;
    },
    handleTime(e) {
      this.showedMessage.time = e >= 0 ? parseInt(e) : 0;
      // TODO: flowMesage与itemMessage的同步
    },
    addWorkFile() {
      // 上传工作模板
      this.isFileFlag1 = true;
    },
    delWorkFile(index) {
      // 删除工作模板
      const current = { ...this.showedMessage.workFireList[index] };
      window.parent.postMessage({ iframeMessage: current.id, type: 'delwork' }, '*');
      this.showedMessage.workFireList.splice(index, 1);
    },
    addRefFile() {
      // 上传参考知识
      window.parent.postMessage({ iframeMessage: true, id: this.showedMessage?.id, type: 'openRefDialog',index: this.$route.query?.index, }, '*');
    },
    delRefFile(index) {
      // 删除参考知识
      const current = { ...this.showedMessage.knowFireList[index] };
      window.parent.postMessage({ iframeMessage: current.id, type: 'deleteRecFile' }, '*');
      this.showedMessage.knowFireList.splice(index, 1);
    },
    returnCurrentMsg() {
      // 获取当前showedMessage的信息
      return this.showedMessage;
    },
    lookFile(fileItem) {
      window.parent.postMessage(
        { iframeMessage: fileItem, id: this.showedMessage?.id, index: this.$route.query?.index, type: 'lookFile' },
        '*',
      );
    },
  },
  beforeDestroy() {
    Bus.$off('editMsg');
  },
};
</script>
<style scoped>
#showItem {
  z-index: 1;
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
</style>

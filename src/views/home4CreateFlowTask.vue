<template>
  <Page page-class="home4">
    <template #showItem><right-list ref="rightList" :box-ids="[0, 2, 3]"></right-list></template>
    <template #designerCanvas>
      <title-popup
        ref="titlePop"
        :canCloseSet.sync="canClose"
        :personSet.sync="flowItemInfo.person"
        :showTask="showTask"
        :tostopclick="tostopclick"
        :flowItemInfo="flowItemInfo"
        :selectPerson="selectPerson"
        :toStopClose="toStopClose"
        :taskTop="taskTop"
        :taskLeft="taskLeft"
        :taskHeight="taskHeight"
        :taskWidth="taskWidth"
        :itemWidth="itemWidth"
        :TreeBoxType="TreeBoxType"
        :noStatus="false"
        :startTime="startTime"
        :endTime="endTime"
      ></title-popup>
    </template>
  </Page>
</template>
<script>
import Page from '@/components/Page.vue';
import RightList from '@/views/rightList/edit.vue';
import { scripts } from '@/utils/public';
import Bus from '@/utils/bus';
import { onDiagramMessage } from '@/utils/utils';
import TitlePopup from '@/components/titlePopup/titlePopup.vue';
import Debounce from '@/utils/debounce';
import Store from '@/utils/titlePopupStore';

export default {
  components: {
    // TreeBox,
    RightList,
    Page,
    TitlePopup,
  },
  data() {
    return {
      scripts: scripts,
      showTask: false,
      taskTop: 0,
      taskLeft: 0,
      taskHeight: 0,
      taskWidth: 0,
      itemWidth: 0,
      flowItemInfo: {
        timeValue: null,
        taskState: 1,
        person: 0,
        hostItem: {},
        executeItem: [],
        permissionItem: [],
      },
      canClose: true,
      showTaskItemId: '',
      showTaskItem: {},
      TreeBoxType: false,
      selectFlowItemId: '',
      stateNum: 0,
      canToChange: true,
      showBox: false,
      pickerOption: {
        disabledDate: (time) => {
          let beginTime = this.startTime || '1999-01-01';
          let endTime = this.endTime || '2100-01-01';
          return time.getTime() < new Date(beginTime) || time.getTime() > new Date(endTime);
        },
      },
      startTime: '',
      endTime: '',
      taskData: [],
      iframeHeight: 0,
      iframeWidth: 0,
      beforeFlowItemInfo: '',
      clickCallbackTimer: null,
    };
  },
  mounted() {
    onDiagramMessage();

    this.iframeHeight = window.innerHeight;
    this.iframeWidth = window.innerWidth;
    for (let i = 0; i < this.scripts.length; i++) {
      let nav = document.createElement('script');
      nav.type = 'text/javascript';
      nav.defer = true;
      nav.async = false;
      nav.src = this.scripts[i] + '?t=' + new Date().getTime();
      document.body.appendChild(nav);
    }
    Bus.$on('home4CreateFlowTaskMsg', this.IfDesignerNone);

    // 获取组织机构树
    window.parent.postMessage({ type: 'getUserTree', index: this.$route.query?.index }, '*');
  },
  methods: {
    IfDesignerNone(event) {
      if (window.Designer && window.CLB) {
        this.controlls(event);
      } else {
        setTimeout(() => {
          this.IfDesignerNone(event);
        }, 100);
      }
    },
    setTaskStyle(tagId, propsx, propsy) {
      // 根据task标签id设置showTask的定位
      const dom = document.getElementById(tagId);
      const height = dom.clientHeight;
      const width = dom.clientWidth;
      this.taskLeft = propsx - 20;
      this.taskTop = propsy - 25;
      this.taskHeight = height + 30;
      this.taskWidth = width + 430;
      this.itemWidth = width + 20;
    },
    layoutScroll() {
      // 选择节点时designer_layout的滚动定位
      const left = this.taskLeft - (this.iframeWidth - this.taskWidth) / 2;
      const top = this.taskTop - (this.iframeHeight - this.taskHeight) / 2;
      document.getElementById('designer_layout').scrollTo(left, top);
    },
    controlls(event) {
      if (event.data.name == 'toshowItemTask') {
        setTimeout(() => {
          this.showItemTask(event.data.item);
        }, 100);
      } else if (event.data.name == 'toCloseItemTask') {
        //  this.canClose = false 当前正在节点选择人员等
        if (!this.canClose) {
          return;
        }
        this.closeItemTask();
      } else if (event.data.type == 'watchData') {
        this.watchFlowData(event.data);
      } else if (event.data.type === 'toShowItem') {
        //接收任务流程中newFindProcessTaskInfo的节点数据
        this.hasTaskInfo(event.data);
      } else if (event.data.type === 'initFlowMsg') {
        // 流程右侧面板数据回显
        this.$refs.rightList.initFlowMsg(event.data.iframeMessage);
      }
    },
    watchFlowData(eventData) {
      // 接收任务流程中的getProcessById
      this.startTime = eventData.startTime;
      this.endTime = eventData.endTime;
      this.taskData = eventData.taskRes;
      Designer.open(JSON.parse(eventData.iframeMessage));
      Designer.initialize.canvasSizeAuto();
      this.lockingInfo();
      document.getElementById('designer_layout').scrollTop = 0;
      document.getElementById('designer_layout').scrollLeft = 0;
    },
    showItemTask(itemData) {
      if (!this.canToChange) return;
      const showTaskItem = JSON.parse(itemData);
      this.showTaskItem = showTaskItem;
      this.showTaskItemId = showTaskItem.id;

      if (showTaskItem.category === 'flow' || showTaskItem.category === 'basic') {
        this.setTaskStyle(showTaskItem.id, showTaskItem.props.x, showTaskItem.props.y);
        this.layoutScroll();

        window.parent.postMessage(
          { iframeMessage: showTaskItem.id || '', type: 'getTaskDetail', index: this.$route.query?.index },
          '*',
        );
        return;
      }
      this.canClose && (this.showTask = false);
    },
    setItemMessage(itemMessage) {
      // 节点的右侧参考知识等回显
      if (!itemMessage) {
        this.$refs.rightList.resetFlowItemMsg();
        return;
      }
      this.$refs.rightList.resetFlowItemMsg(
        itemMessage.workContent,
        itemMessage.workFireList,
        itemMessage.knowFireList,
        itemMessage.id,
      );
    },
    closeItemTask() {
      this.showTask = false;

      Debounce('updateProcess', () => {
        this.updateProcess();

        this.clickCallbackTimer = setTimeout(() => {
          if (this.showTask) {
            return;
          }
          // 显示流程图的右侧参考资料等--可能存在重新请求
          window.parent.postMessage({ index: this.$route.query?.index, iframeMessage: true, type: 'showFlowRightMenu' }, '*');
        }, 500);
      });
    },
    updateProcess() {
      // 失焦保存工作内容等
      const rightMsg = this.$refs.rightList.returnCurrentMsg();
      const messageContent = {
        workContent: rightMsg.workContent,
        workFiles: rightMsg.workFireList,
        refercontents: rightMsg.knowFireList,
      };
      const itemInfo = { ...this.flowItemInfo, ...messageContent, ...this.getCachenode() };

      window.parent.postMessage({index: this.$route.query?.index, iframeMessage: itemInfo, type: 'toUpdateProcess' }, '*');
      this.flowItemInfo = {
        timeValue: null,
        taskState: 1,
        person: 0,
        hostItem: {},
        executeItem: [],
        permissionItem: [],
      };
    },
    getCachenode() {
      // 获取当前失焦的参与人员缓存
      const currentCacheNode = this.$refs.titlePop.getEditNode();
      if (!currentCacheNode) {
        return {};
      }

      return {
        endTime: currentCacheNode.endTime,
        hostItem: Store.changeValue(currentCacheNode.executePerson).join(),
        executeItem: Store.changeValue(currentCacheNode.helpPerson).join(),
        permissionItem: Store.changeValue(currentCacheNode.permissionItem).join(),
        startTime: currentCacheNode.startTime,
      };
    },
    hasTaskInfo(data) {
      this.showTask = true;
      let flowItemInfo = data.iframeMessage;
      this.selectFlowItemId = data.iframeMessage?.processTaskId;

      // 设置当前流程节点的时间、人员等信息 以及回显流程图的节点的itemMessage
      if (flowItemInfo === null) {
        this.flowItemInfo = {
          timeValue: null,
          taskState: 1,
        };
        this.setItemMessage();
      } else {
        this.flowItemInfo = flowItemInfo;
        const flowChangeValue = {
          processTaskId: flowItemInfo.processTaskId,
          startTime: flowItemInfo.startTime,
          endTime: flowItemInfo.endTime,
          ext: flowItemInfo,
          executePerson: flowItemInfo.executes?.map((item) => item.userId) || null, // 执行人
          helpPerson: flowItemInfo.participants?.map((item) => item.userId) || [], // 协办人
          permissionItem: flowItemInfo.viewpeoples?.map((item) => item.userId) || [], // 可见权限
        };

        const itemMsg = {
          workContent: data.iframeMessage.workContent,
          workFireList: data.iframeMessage.workFiles,
          knowFireList: data.iframeMessage.refercontents,
          id: data.iframeMessage.id,
        };
        this.setItemMessage(itemMsg);
        if (this.clickCallbackTimer) {
          clearTimeout(this.clickCallbackTimer);
          this.clickCallbackTimer = null;
        }

        console.log('点击节点,回显节点信息', flowChangeValue);
        // Store.setCacheByNewAdd(flowItemInfo.processTaskId, null, flowChangeValue);
        this.$refs.titlePop.insertCacheByEdit(flowChangeValue);
      }
      // 记录原始的FlowItemInfo
      // this.beforeFlowItemInfo = JSON.stringify(this.flowItemInfo);
    },
    tostopclick() {
      // 当节点编辑的右侧框下层存在其他流程节点时，需要阻止事件冒泡
      this.canToChange = false;
      setTimeout(() => {
        this.canToChange = true;
      }, 300);
    },
    toStopClose() {
      this.canClose = false;
    },
    //锁定页面数据--不可编辑流程节点
    lockingInfo() {
      let oldDdata = Utils.copy(Model.define);
      let mapData = Object.values(oldDdata.elements);
      let b = mapData.map((item) => {
        return item.id;
      });
      if (b.length == 0) {
        return;
      }
      const d = [];
      for (let c = 0; c < b.length; c++) {
        const a = Model.getShapeById(b[c]);
        a.locked = true;
        d.push(a);
      }
      Utils.unselect();
      // Utils.selectShape(b);
      Model.updateMulti(d);
    },
    // 弹出选择人员
    selectPerson() {
      this.TreeBoxType = true;
    },
    // 确定选择参与人员
    sureAddTreeType(hostItem, executeItem, permissionItem) {
      this.flowItemInfo.hostItem = hostItem;
      this.flowItemInfo.executeItem = executeItem;
      this.flowItemInfo.permissionItem = permissionItem;
      this.TreeBoxType = false;
      if (this.canClose) {
        if (this.showTask === true) {
          let name = this.showTaskItem?.textBlock?.[0]?.text.replace(/<[^>]+>/g, '') || '';
          window.parent.postMessage(
            {
              iframeMessage: this.flowItemInfo,
              flowItemId: this.showTaskItemId,
              name: name,
              type: 'toSubmitItem',
              index: this.$route.query?.index,
            },
            '*',
          );
        }
      }
    },
    // 取消选择参与人员
    cancelAddTreeType() {
      this.TreeBoxType = false;
    },
  },
  beforeDestroy() {
    Bus.$off('home4CreateFlowTaskMsg');
  },
};
</script>

<style scoped>
.showTask {
  width: 550px;
  height: 110px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 1px 5px 0px rgba(0, 65, 154, 0.25);
  border-radius: 4px;
  position: absolute;
  z-index: 999;
  min-height: 100px;
}

.taskDetail {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* background: linear-gradient(to right,rgba(255,255,255,0.2),rgba(255,255,255,0.5),rgba(255,255,255,0.5),rgba(255,255,255,0.5)); */
  padding-left: 20px;
  background: #fff;
  overflow: hidden;
}
.taskDeatil-main {
  display: flex;
  flex-flow: column;
  height: 65px;
  width: calc(100% - 20px);
  justify-content: space-between;
  position: relative;
  z-index: 999;
}
.noUpdate {
  position: absolute;
  z-index: 1000;
}
.taskDeatil-main-item {
  display: flex;
  align-items: center;
  height: 20px;
  width: 100%;
  font-size: 16px;
  color: #4a5f81;
}
.taskDeatil-main-item img {
  margin-right: 12px;
  min-width: 20px;
  min-height: 20px;
}
.taskDeatil-main-itemImg {
  display: flex;
  align-items: center;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  font-size: 16px;
}
.el-dropdown-link img {
  margin-left: 12px;
}

.el-input__inner {
  height: 35px;
  line-height: 35px;
}
.taskDeatil-main-item >>> .el-date-editor .el-range-separator,
.taskDeatil-main-item >>> .el-date-editor .el-range__icon {
  line-height: 27px;
}

.selectPerson {
  padding: 0 10px;
  background: #fff;
  cursor: pointer;
  border: 1px solid #c0c4cc;
}

.options_menu {
  height: 0;
  overflow: hidden;
  padding: 0;
  border: none;
}

.box-main {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box-main-item {
  height: 60px;
  width: 140px;
  border: 2px dotted #2458bf;
  border-radius: 6px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.box-main-item-select {
  width: 20px;
  height: 20px;
  border: 1px solid #2458bf;
  background: #e9eef8;
  border-radius: 3px;
  overflow: hidden;
  position: relative;
}
.box-main-item-select-icon {
  background: #2458bf;
  height: 12px;
  width: 25px;
  position: absolute;
  top: 2px;
  left: -2px;
  transform: rotate(-50deg);
}
.box-main-item-select-icon-center {
  position: absolute;
  top: 0;
  right: 0;
  height: 9px;
  width: 22px;
  background: #e9eef8;
}
.box-main-item-name {
  width: calc(100% - 40px);
  text-align: center;
  color: #072f49;
  font-weight: 400;
  font-family: 'Alibaba PuHuiTi Medium';
  font-size: 20px;
}

.taskDeatil-main-item >>> .el-date-editor .el-range-input {
  width: 140px;
}
</style>
<style>
.home4 {
  height: 100%;
}
/* 连线文字禁止修改 */
.home4 #linker_text_edit {
  display: none !important;
}
.home4 .text_canvas.linker_text {
  display: block !important;
}
/* 屏蔽操作 */
.home4 #shape_panel {
  display: none;
}
.home4 #designer_viewport {
  margin-left: 0;
}
.home4 #designer_header {
  display: none;
  height: 0;
}
.home4 #designer,
.home4 #designer_viewport {
  height: 100%;
}
.home4 #designer_viewport .shape_anchor {
  display: none !important;
}
.home4 #designer_viewport .shape_locker {
  display: none !important;
}
.home4 #designer_canvas {
  position: relative;
  background: #e1eaf7 !important;
  box-shadow: none;
}
.home4 #canvas_container {
  padding: 20px 400px 20px 20px !important;
}
.home4 #designer_layout {
  background: #e1eaf7 !important;
  transition: all 2s;
  scroll-behavior: smooth;
}
.home4 .lanebar {
  background-color: #d1e1f8 !important;
  border-radius: 0 0 5px 5px;
}
.home4 #navigation_view {
  display: none !important;
}
</style>

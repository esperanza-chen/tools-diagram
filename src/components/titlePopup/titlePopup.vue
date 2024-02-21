<template>
  <div>
    <div
      class="showTask"
      @click.stop="tostopclick"
      @mouseleave="canClose = true"
      @mouseenter="toStopClose"
      :style="
        'top:' +
        popupPos.taskTop +
        'px;left:' +
        popupPos.taskLeft +
        'px;height:' +
        popupPos.taskHeight +
        'px;width:' +
        popupPos.taskWidth +
        'px;'
      "
      v-if="popupPos.showTask"
    >
      <div
        class="notShowTask"
        :style="'width:calc(100% - ' + popupPos.itemWidth + 'px);margin-left:' + popupPos.itemWidth + 'px'"
        @click.stop=""
        @click="toHint"
        v-if="!isUpdate || popupPos.flowItemInfo.taskState == 3"
      ></div>
      <div
        class="taskDetail"
        :style="'width:calc(100% - ' + popupPos.itemWidth + 'px);margin-left:' + popupPos.itemWidth + 'px'"
      >
        <div class="taskDeatil-main" :class="noStatus ? '' : 'height'">
          <div class="noUpdate"></div>
          <div class="taskDeatil-main-item">
            <img src="@/static/task/flowdate.png" />
            <el-date-picker
              v-model="timeValue"
              value-format="yyyy-MM-dd HH:mm:ss"
              format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              type="datetimerange"
              :picker-options="pickerOption"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              @change="datePickerChange"
            >
            </el-date-picker>
          </div>
          <div class="taskDeatil-main-item">
            <img src="@/static/task/flowUser.png" class="taskDeatil-main-item-img" />
            <div class="taskDeatil-main-itemImg">
              <div
                v-if="popupPos.flowItemInfo?.personInfo?.length <= 0 || !popupPos.flowItemInfo?.personInfo"
                class="selectPerson"
                @click="selectPerson"
              >
                选择人员
              </div>
              <div
                v-else
                style="display: flex; height: 20px; padding-right: 5px; width: auto"
                v-for="(item, index) in popupPos.flowItemInfo.personInfo"
                :key="index"
                @click="selectPerson"
                class="ellipsis"
              >
                <img style="height: 20px; margin-right: 5px !important" src="@/static/task/autor.png" />
                <div style="max-width: 60px; overflow: hidden; text-overflow: ellipsis; white: nowrap">
                  {{ item?.userName || item?.name }}
                </div>
              </div>
              <div
                v-if="
                  popupPos.flowItemInfo && popupPos.flowItemInfo.otherInfo && popupPos.flowItemInfo.otherInfo.length > 0
                "
                style="cursor: pointer"
                :title="popupPos.flowItemInfo.userNameStr"
              >
                ...
              </div>
            </div>
          </div>
          <div class="taskDeatil-main-item" v-if="noStatus">
            <img src="@/static/task/flowTime.png" />
            <div>
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  <span v-if="Number(popupPos.flowItemInfo.taskState) === 3" style="color: #1d9149">已完成</span>
                  <span v-if="Number(popupPos.flowItemInfo.taskState) === 2" style="color: #e73511">进行中</span>
                  <span v-if="Number(popupPos.flowItemInfo.taskState) === 1" style="color: #d76333">待进行</span>
                  <img
                    src="@/static/task/flowPoint.png"
                    v-if="Number(popupPos.flowItemInfo.taskState) !== 3 && isUpdate"
                  />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="3" style="color: #1d9149">已完成</el-dropdown-item>
                  <el-dropdown-item v-if="Number(popupPos.flowItemInfo.taskState) === 1" command="2" style="color: #e73511">进行中</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
    <use-select
      v-show="TreeBoxType"
      :switch-show="TreeBoxType"
      title="参与人员"
      width="900px"
      height="420px"
      @sure="sureAddTreeType"
      @cancel="cancelAddTreeType"
      :userTree="userTree"
      :processTaskId="popupPos.flowItemInfo.processTaskId"
    ></use-select>
  </div>
</template>

<script>
import Bus from '@/utils/bus';
import Store from '@/utils/titlePopupStore';
import { getTreeLeaf } from '@/utils/utils';
import taskFlowDiagram from '@/utils/taskFlowDiagram';
import UseSelect from '@/components/titlePopup/useSelect.vue';

export default {
  props: {
    handleCommand: {
      type: Function,
      default: () => {},
    },
    tostopclick: {
      type: Function,
      default: () => {},
    },
    toStopClose: {
      type: Function,
      default: () => {},
    },
    taskHeight: {
      type: Number,
      default: -1,
    },
    taskWidth: {
      type: Number,
      default: -1,
    },
    isUpdate: {
      type: Boolean,
      default: true,
    },
    canCloseSet: {
      type: Boolean,
      default: true,
    },
    showTask: {
      type: Boolean,
      default: false,
    },
    flowItemInfo: {
      type: Object,
      default: '',
    },
    personSet: {
      type: Number,
      default: 0,
    },
    noStatus: {
      type: Boolean,
      default: true,
    },
    startTime: {
      type: String,
      default: '',
    },
    endTime: {
      type: String,
      default: '',
    },
  },
  components: {
    UseSelect,
  },
  data() {
    return {
      TreeBoxType: false,
      timeValue: [],
      popupPos: {
        taskTop: 0,
        taskLeft: 0,
        taskHeight: 0,
        taskWidth: 0,
        itemWidth: 0,
        showTask: false,
        flowItemInfo: {},
      },
      // startTime: '',
      // endTime: '',
      pickerOption: {
        disabledDate: (time) => {
          let beginTime = this.startTime || '1999-01-01';
          let endTime = this.endTime || '2100-01-01';
          return time.getTime() < new Date(beginTime) || time.getTime() > new Date(endTime);
        },
      },
      userTree: [],
      processInfo: null,
      editNodes: [],
    };
  },
  mounted() {
    Bus.$on('titlePopupMsg', (event) => {
      if (event.data.type === 'forUserTree') {
        Store.userTreeLeaf = event.data.iframeMessage || [];
        this.userTree = Store.userTree = event.data.iframeMessage ? getTreeLeaf(event.data.iframeMessage) : [];
      } else if (event.data.type === 'toShowItem') {
        if (event.data.iframeMessage) {
          this.processInfo = event.data.iframeMessage;
          this.queryProcessInfo();
          this.resetPosition(this.processInfo?.processTaskId);
        } else {
          this.$message.info('未获取到节点信息');
        }
      }
    });

    // this.resetPosition(this.processInfo?.processTaskId);
  },
  beforeDestroy() {
    Bus.$off('titlePopupMsg');
  },
  methods: {
    // 重置位置
    resetPosition(id) {
      if (window?.Utils) {
        const dataJSON = window.Utils.copy(Model.define);
        const currentShape = dataJSON.elements[id];
        if (currentShape) {
          this.popupPos.taskTop = currentShape.props.y * Designer.config.scale;
          this.popupPos.taskLeft = currentShape.props.x * Designer.config.scale;
          this.popupPos.itemWidth = currentShape.props.w * Designer.config.scale;
        }
      }
    },
    datePickerChange(val) {
      const isSame = Store.editNodes.findIndex((item) => item.processTaskId === this.processInfo?.processTaskId);
      Store.editNodes[isSame].startTime = val[0];
      Store.editNodes[isSame].endTime = val[1];
      this.timeValue = val;
    },
    // 编辑时直接把节点信息塞入缓存
    insertCacheByEdit(flowItemInfo) {
      this.popupPos.flowItemInfo = flowItemInfo.ext;
      this.processInfo = flowItemInfo.ext;
      // const isSame = Store.editNodes.findIndex((item) => item.processTaskId === flowItemInfo?.processTaskId);
      // if (isSame !== -1) {
      const { personInfo, otherInfo, timeValue } = Store.setCacheByEdit(flowItemInfo.processTaskId, flowItemInfo);
      this.popupPos.flowItemInfo.personInfo = personInfo;
      this.popupPos.flowItemInfo.otherInfo = otherInfo;
      this.timeValue = timeValue;
      // }
    },
    // 查看缓存内是否存在值 缓存时间 缓存节点扩展信息 节点id
    queryProcessInfo(val) {
      const { personInfo, otherInfo, timeValue } = Store.setCacheByNewAdd(
        this.processInfo?.processTaskId,
        val,
        this.processInfo,
      );

      console.log(personInfo, 'personInfo1');
      this.popupPos.flowItemInfo.personInfo = personInfo;
      this.popupPos.flowItemInfo.otherInfo = otherInfo;
      this.timeValue = timeValue;
    },
    toHint() {
      if (!this.isUpdate) {
        this.$message.warning('暂时无法编辑,请查看主任务是否启动或是否有编辑权限!');
      } else {
        this.$message.warning('任务已完成,无法编辑!');
      }
    },
    selectPerson() {
      this.TreeBoxType = true;
    },
    // 选择人员确认
    sureAddTreeType(hostItem, executeItem = [], permissionItem = [], cache) {
      // const personInfo = userTree?.filter((item) => {
      //   return [hostItem?.id, ...executeItem, ...permissionItem].includes(item?.id);
      // });

      // this.popupPos.flowItemInfo.personInfo = personInfo?.slice(0, 5);
      // this.popupPos.flowItemInfo.otherInfo = personInfo?.slice(5);

      this.TreeBoxType = false;
      this.nodeInfoCache(hostItem, executeItem, permissionItem);
    },

    // 编辑时 转换数据结构 缓存执行人/协助人/有权限查看的人
    nodeInfoCache(hostItem, executeItem, permissionItem) {
      const helpPerson = Store.userTree?.filter((item) => {
        return executeItem.includes(item.id);
      });
      const permissionItem1 = Store.userTree?.filter((item) => {
        return permissionItem.includes(item.id);
      });
      const nodeInfo = {
        processTaskId: this.processInfo.processTaskId,
        startTime: this.timeValue[0],
        endTime: this.timeValue[1],
        ext: this.processInfo,
        executePerson: Array.isArray(hostItem) ? hostItem : [hostItem],
        helpPerson: helpPerson,
        permissionItem: permissionItem1,
      };

      const { personInfo, otherInfo, timeValue } = Store.setCacheByEdit(nodeInfo?.processTaskId, nodeInfo);
      this.popupPos.flowItemInfo.personInfo = personInfo;
      this.popupPos.flowItemInfo.otherInfo = otherInfo;
      this.timeValue = timeValue;
    },
    cancelAddTreeType() {
      this.TreeBoxType = false;
    },
    getEditNode() {
      const item = Store.getEditNode(this.processInfo?.processTaskId);
      return item;
    },
    initShowItemInfo(newval) {
      if (newval) {
        this.popupPos.flowItemInfo = newval;
        this.processInfo = newval;
        this.sureAddTreeType(newval.hostItem, newval.executeItem, newval.permissionItem);
      }
    },
  },
  computed: {
    canClose: {
      get() {
        return this.canCloseSet;
      },
      set(val) {
        this.$emit('update:canCloseSet', val);
      },
    },
  },
  watch: {
    showTask: function (newval, oldval) {
      this.popupPos.showTask = newval;
    },
    taskHeight: function (newval, oldval) {
      this.popupPos.taskHeight = newval;
    },
    taskWidth: function (newval, oldval) {
      this.popupPos.taskWidth = newval;
    },
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
  min-height: 120px;
}

.notShowTask {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  /* width: 550px; */
  height: 100%;
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
  height: 85px;
  width: calc(100% - 20px);
  justify-content: space-between;
  position: relative;
  z-index: 999;
}

.taskDeatil-main.height {
  height: 65px;
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
.taskDeatil-main-item-img {
  min-width: 20px;
  min-height: 20px;
  display: inline-block;
}
.taskDeatil-main-item img {
  margin-right: 12px;
}
.taskDeatil-main-itemImg {
  display: flex;
  align-items: center;
}

.taskDeatil-main-item >>> .el-date-editor .el-range-separator,
.taskDeatil-main-item >>> .el-date-editor .el-range__icon {
  line-height: 27px;
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

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.selectPerson {
  padding: 0 10px;
  background: #fff;
  cursor: pointer;
  border: 1px solid #c0c4cc;
}
</style>

<template>
  <el-dialog
    class="messageBoxDialig"
    ref="messageBoxDialig"
    :title="title"
    :visible.sync="switchShow"
    :width="width"
    :append-to-body="true"
    :before-close="cancel"
    :close-on-click-modal="false"
  >
    <div class="box-main">
      <div class="message-box-main">
        <slot name="message-main"></slot>
        <el-form :model="form" label-width="120px" label-position="right">
          <el-form-item label="选择执行人：">
            <treeselect
              class="treeselectOne"
              v-if="toshowHost"
              v-model="hostValue"
              :multiple="true"
              :options="popupPos.userTree"
              :normalizer="normalizer"
              @select="selectHost"
              @deselect="deselectHost"
              flat
              :disable-branch-nodes="true"
              noOptionsText="暂无数据"
              noResultsText="无搜索结果"
              placeholder="请选择执行人"
            />
          </el-form-item>
          <el-form-item label="选择协办人：">
            <treeselect
              v-model="executeValue"
              :multiple="true"
              :options="popupPos.userTree"
              :normalizer="normalizer"
              @select="executeHost"
              @deselect="deexecuteHost"
              :value-consists-of="treeSWitechType"
              noOptionsText="暂无数据"
              noResultsText="无搜索结果"
              placeholder="请选择协办人"
            />
          </el-form-item>
          <el-form-item label="查看权限：">
            <treeselect
              v-model="permissionValue"
              :multiple="true"
              :options="popupPos.userTree"
              :normalizer="normalizer"
              @select="permissionHost"
              @deselect="depermissionHost"
              :value-consists-of="treeSWitechType"
              noOptionsText="暂无数据"
              noResultsText="无搜索结果"
              placeholder="默认全部可见"
            />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="message-box-button">
        <el-button class="btnCancel" @click="cancel">取 消</el-button>
        <el-button class="btnSure" type="primary" @click="sure">确 定</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
// import the component
import Treeselect from '@riophae/vue-treeselect';
import Store from '@/utils/titlePopupStore';
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

export default {
  components: { Treeselect },
  name: 'treeBox',
  props: {
    processTaskId: {
      type: String,
      default: '',
    },
    userTree: {
      type: Array,
      default: [],
    },
    switchShow: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [Number, String],
      default: '30%',
    },
    height: {
      type: [Number, String],
      default: '30%',
    },
    title: {
      type: String,
      default: '提示语',
    },
  },
  data() {
    return {
      form: {},
      hostValue: null,
      executeValue: [],
      permissionValue: [],
      normalizer(node) {
        if (node.children && !node.children.length) {
          delete node.children;
        }
        return {
          id: node.id,
          label: node.name,
          userId: node.id,
          children: node.children && node.children.length > 0 ? node.children : 0,
          // isDisabled:node?.type!=='organ'?false:true,
        };
      },
      hostItem: {},
      executeItem: [],
      permissionItem: [],
      toshowHost: true,
      treeSWitechType: 'LEAF_PRIORITY',
      popupPos: {
        userTree: [],
      },
    };
  },
  created() {},
  mounted() {
    this.setHeight();
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    sure() {
      this.$emit('sure', this.hostValue, this.executeValue, this.permissionValue);
    },
    setHeight() {
      this.$refs.messageBoxDialig.$el.firstChild.style.height = this.height;
    },
    selectHost(item) {
      this.hostItem = item;
      this.hostValue = [item.id];
      this.toshowHost = false;
      this.$nextTick(() => {
        this.toshowHost = true;
      });
    },
    deselectHost(item) {
      this.hostItem = '';
    },
    executeHost(item) {
      this.executeItem.push(item);
    },
    deexecuteHost(item) {
      for (let i = 0, length = this.executeItem.length; i < length; i++) {
        if (item.id === this.executeItem[i].id) {
          this.executeItem.splice(i, 1);
          break;
        }
      }
    },
    permissionHost(item) {
      this.permissionItem.push(item);
    },
    depermissionHost(item) {
      for (let i = 0, length = this.permissionItem.length; i < length; i++) {
        if (item.id === this.permissionItem[i].id) {
          this.permissionItem.splice(i, 1);
          break;
        }
      }
    },
    // 判断是 ['id'] 或 [{id:'id'}] 全部转换为 ['id']
    changeValue(arr) {
      if (arr && typeof arr[0] === 'object') {
        return arr?.map((item) => item.userId || item.id);
      } else if (arr && typeof arr[0] === 'string') {
        return arr;
      }
    },
  },
  watch: {
    switchShow: function (newval, oldval) {
      if (newval) {
        this.popupPos.userTree = Store.userTreeLeaf;
        let processNode = Store.getEditNode(this.processTaskId);
        // 为数组['id'] 或为全量数据时转换
        const hostIds = this.changeValue(processNode?.executePerson) || [];
        this.hostValue = hostIds || null;
        const executeIds = this.changeValue(processNode?.helpPerson) || [];
        this.executeValue = executeIds;

        const permissionIds = this.changeValue(processNode?.permissionItem) || [];
        const permissionIds1 = [];
        permissionIds?.forEach((item) => {
          if (item !== '1') {
            permissionIds1.push(item);
          }
        });
        this.permissionValue = permissionIds1;
      }
    },
  },
};
</script>

<style scoped>
.messageBoxDialig >>> .el-dialog {
  border-radius: 12px;
  box-shadow: 0px 4px 10px 0px rgba(0, 52, 130, 0.24);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0px !important;
}
/* 弹窗 */
.message-box-main {
  width: 100%;
  height: calc(100% - 70px);
  flex: 4;
  padding-top: 40px;
  box-sizing: border-box;
}

.message-box-button {
  width: 100%;
  display: flex;
  justify-content: center;
}
.messageBoxDialig >>> .el-dialog__header {
  background-color: rgba(183, 208, 245, 0.2);
  border-bottom: 1px solid #b7d0f5;
  border-radius: 12px 12px 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 40px;
  box-sizing: border-box;
}
.messageBoxDialig >>> .el-dialog__body {
  width: 100%;
  height: calc(100% - 56px);
  padding: 0;
}
.box-main {
  width: 100%;
  height: 100%;
  position: relative;
  font-size: 16px;
}
.message-box-button {
  position: absolute;
  left: 50%;
  bottom: 30px;
  transform: translateX(-50%);
}
.btnCancel {
  width: 100px;
  height: 40px;
  background-color: #fff;
  border: 1px solid #1e5db4;
  border-radius: 6px;
  margin-right: 20px;
}
.btnSure {
  width: 100px;
  height: 40px;
  background-color: #1e5db4;
  border-radius: 6px;
}
.message-box-main >>> .el-form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.message-box-main >>> .el-form-item {
  display: flex;
  margin-bottom: 30px;
}
.message-box-main >>> .el-form-item__label {
  font-weight: 500;
  color: #072f49;
  font-size: 18px;
}
.message-box-main >>> .el-form-item__content {
  width: 600px;
  /* height: 40px; */
  margin-left: 38px !important;
  line-height: 0px;
}
.message-box-main >>> .vue-treeselect__placeholder {
  font-size: 16px;
  font-weight: 500;
  color: #4a5f81;
}
.message-box-main >>> .vue-treeselect--has-value .vue-treeselect__multi-value {
  margin-bottom: 0;
  margin-bottom: -5px;
}
.message-box-main >>> .vue-treeselect__multi-value-item-container {
  padding-top: 0;
  margin-bottom: 5px;
}
.message-box-main >>> .vue-treeselect__value-container {
  overflow: hidden;
}
.message-box-main >>> .vue-treeselect__multi-value-item {
  /* width: 92px; */
  height: 32px;
  background: rgba(222, 225, 239, 0.4);
  border-radius: 6px;
}
.message-box-main >>> .vue-treeselect__multi-value-label {
  /* width: 80%; */
  /* background: rgba(222,225,239,0.4000); */
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;
  font-size: 18px;
  font-weight: 400;
  color: #797c8a;
}
.message-box-main >>> .vue-treeselect__icon {
  border-left: none;
}
.message-box-main >>> .vue-treeselect__value-remove {
  color: #797cba;
}
.message-box-main >>> .vue-treeselect__value-remove > svg {
  width: 8px;
  height: 8px;
}
.message-box-main >>> .vue-treeselect__label {
  cursor: pointer;
}
.message-box-main >>> .vue-treeselect__option--disabled .vue-treeselect__label-container {
  color: inherit;
}
.message-box-main >>> .vue-treeselect--has-value .vue-treeselect__multi-value {
  margin-bottom: -5px;
  overflow-y: auto;
  max-height: 64px;
}
</style>

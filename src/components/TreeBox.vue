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
              :options="userTree"
              :normalizer="normalizer"
              @select="selectHost"
              @deselect="deselectHost"
              flat
              :disable-branch-nodes="true"
              noOptionsText="暂无数据"
              placeholder="请选择执行人"
            />
          </el-form-item>
          <el-form-item label="选择协办人：">
            <treeselect
              v-model="executeValue"
              :multiple="true"
              :options="userTree"
              :normalizer="normalizer"
              @select="executeHost"
              @deselect="deexecuteHost"
              :value-consists-of="treeSWitechType"
              noOptionsText="暂无数据"
              placeholder="请选择协办人"
            />
          </el-form-item>
          <el-form-item label="查看权限：">
            <treeselect
              v-model="permissionValue"
              :multiple="true"
              :options="userTree"
              :normalizer="normalizer"
              @select="permissionHost"
              @deselect="depermissionHost"
              :value-consists-of="treeSWitechType"
              noOptionsText="暂无数据"
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
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import { uniqArr } from '@/utils/utils';
import Bus from '@/utils/bus';

export default {
  components: { Treeselect },
  name: 'treeBox',
  props: {
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
    persondata: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      form: {},
      hostValue: null,
      executeValue: [],
      permissionValue: [],
      userTree: [],
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
    };
  },
  created() {},
  mounted() {
    let onmessage = (data) => {
      if (data.data.type === 'forUserTree') {
        this.userTree = data.data.iframeMessage;
        this.persondata.hostItem.id = this.persondata.hostItem.userId || this.persondata.hostItem.id;
        this.hostItem = this.persondata.hostItem || null;

        const executeItem = uniqArr(this.persondata.executeItem || []);
        console.log(this.persondata, 'kkkkkkkkkkkk');

        if (executeItem.length && typeof executeItem[0] !== 'string') {
          for (let i = 0, length = executeItem.length; i < length; i++) {
            executeItem[i].id = executeItem[i].userId || executeItem[i].id;
          }
        }

        this.executeItem = executeItem;

        for (let i = 0, length = this.persondata.permissionItem.length; i < length; i++) {
          this.persondata.permissionItem[i].id =
            this.persondata.permissionItem[i].userId || this.persondata.permissionItem[i].id;
        }
        this.permissionItem = this.persondata.permissionItem || [];
        this.hostValue = this.hostItem?.id ? [this.hostItem?.id] : null;
        this.executeItem.forEach((item) => {
          this.executeValue.push(item.userId || item.id);
        });
        this.permissionItem.forEach((item) => {
          this.permissionValue.push(item.userId);
        });
        console.log(this.hostValue, this.executeValue, this.permissionValue, 'fgdsgfds');
        this.$forceUpdate();
      }
    };
    Bus.$on('TreeBoxMsg', onmessage);

    this.setHeight();
    window.parent.postMessage({ type: 'getUserTree', index: this.$route.query?.index }, '*');
    // getOrganUserTree().then(res=>{
    //   this.userTree = res.data;
    //   this.hostItem = this.persondata.hostItem||null;
    //   this.executeItem = this.persondata.executeItem||[];
    //   this.permissionItem = this.persondata.permissionItem||[];
    //   this.hostValue = this.hostItem?.id||null;
    //   this.executeItem.forEach(item=>{
    //     this.executeValue.push(item.id);
    //   });
    //   this.permissionItem.forEach(item=>{
    //     this.permissionValue.push(item.id);
    //   });
    // })
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    sure() {
      this.$emit('sure', this.hostItem, this.executeValue, this.permissionValue);
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
      console.log(item, 'dgshgdsh');
      this.executeItem.push(item);
      console.log(this.executeValue);
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
  },
  beforeDestroy() {
    Bus.$off('TreeBoxMsg');
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

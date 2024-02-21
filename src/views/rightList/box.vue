<template>
  <div
    class="right-box"
    :class="{ close: !expanded }"
    :style="expanded ? 'width:' + flagWidth + ' ;height: ' + flagHeight + '' : ''"
    :flag-width="flagWidth"
    :flag-height="flagHeight"
  >
    <div class="box-header">
      <div>{{ title }}</div>
      <div class="switch-icon" @click="doSwitch">
        <i class="el-icon-arrow-down" :style="expanded ? '' : 'transform: rotate(0)'"></i>
      </div>
    </div>
    <div class="box-content" v-show="expanded">
      <slot></slot>
      <div v-if="isAddFile">
        <div class="no-file" v-show="fileArray.length === 0" @click="handleAdd">
          <div class="add-logo">
            <img src="@/static/task/addFire.png" />
          </div>
          <div class="add-text">点击上传，文件大小不得超过500M</div>
        </div>
        <div class="has-file" v-show="fileArray.length > 0">
          <div class="file-list">
            <div class="file-item" v-for="(item, index) in fileArray" :key="index">
              <span class="file-name" @click="clickFileFun(item)" :title="item?.fileName || item?.name || '...'">{{ item.name ? item.name : item.fileName }}</span>
              <i class="el-icon-delete" @click="handleDel(index)"></i>
            </div>
          </div>
          <div class="add-btn" @click="handleAdd">+上传文档</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RightBox',
  components: {},
  props: {
    canFlag:{ // 是否可操作
      type: Boolean,
      default: true,
      require: false,
    },
    title: {
      type: String,
      default: 'props-name',
      require: true,
    },
    flagWidth: {
      type: String,
      default: '450px',
      require: true,
    },
    flagHeight: {
      type: String,
      default: '200px',
      require: true,
    },
    isExpanded: {
      type: Boolean,
      default: false,
      require: true,
    },
    isAddFile: {
      type: Boolean,
      default: false,
      require: true,
    },
    fileArray: {
      type: Array,
      default: () => [],
      require: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    expanded: {
      get() {
        return this.isExpanded;
      },
      set(val) {
        this.$emit('update:isExpanded', val);
      },
    },
  },
  mounted() {},
  methods: {
    doSwitch() {
      if(!this.canFlag) {
        this.$message.warning('请选择流程节点后填写工作内容');
        return 
      }
      // switch-ico展开与关闭事件
      this.expanded = !this.expanded;
    },
    handleAdd() {
      // 点击上传文件
      this.$emit('click-add', true);
    },
    handleDel(index) {
      // 删除对应文件
      this.$emit('click-del', index);
    },
    clickFileFun(fileItem) {
        // 点击对应文件
      this.$emit('click-file', fileItem);
    }
  },
};
</script>
<style scoped>
.right-box {
  width: 168px;
  margin-bottom: 20px;
  transition: 0.5s;
  border-radius: 6px;
  background-color: #edf2fa;
  flex-shrink: 0;
}
.right-box.close {
  height: 35px;
}
.right-box .box-header {
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
.box-header .switch-icon {
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

.right-box .box-content {
  height: calc(100% - 35px);
  width: 100%;
}
.has-file {
}
.no-file {
  height: 150px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  cursor: pointer;
}
.add-logo {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding-top: 35px;
}
.add-text {
  width: 100%;
  height: 24px;
  overflow: hidden;
  text-align: center;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 400;
  color: #585865;
}

.file-list {
  height: 150px;
  width: 100%;
  overflow-y: auto;
  margin-bottom: 8px;
}
.file-item {
  display: flex;
  justify-content: space-between;
  height: 40px;
  align-items: center;
  padding: 0 60px;
}
.file-name {
  width: 80%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 400;
  color: #2458bf;
  font-size: 16px;
  cursor: pointer;
}
.el-icon-delete {
  font-size: 18px;
  cursor: pointer;
  margin-left: 10px;
}
.add-btn {
  width: 112px;
  height: 44px;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid #5385f7;
  border-radius: 6px;
  line-height: 44px;
  text-align: center;
  cursor: pointer;
  margin: 0 0 15px 15px;
}
</style>

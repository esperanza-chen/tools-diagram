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
        <div class="Upload-box">
          <el-upload
            class="upload-demo"
            action="#"
            accept="#"
            drag
            multiple
            :show-file-list="false"
            :before-upload="beforAvatarUpload"
            :http-request="handleRequest"
          >
            <i class="el-icon-receiving"></i>
            <div class="el-upload__text">点击上传文件</div>
          </el-upload>
          <div class="upload-list">
            <div class="work-list" v-for="(item, index) in filelist" :key="index">
              <div class="workList1">{{ item.name }}</div>
              <!-- <div class="workList2">{{ item.type }}</div> -->
              <div class="workList3" @click="delFileList(index)">x</div>
            </div>
          </div>
        </div>
        <slot name="message-main"></slot>
      </div>
      <div slot="footer" class="message-box-button">
        <el-button class="btnCancel" @click="cancel">取 消</el-button>
        <el-button class="btnSure" type="primary" @click="sure">确 定</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { checkoutFileUploadFormat } from '@/utils/utils';
export default {
  name: 'BoxFile1',
  props: {
    switchShow: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [Number, String],
      default: '600px',
    },
    height: {
      type: [Number, String],
      default: '380px',
    },
    title: {
      type: String,
      default: '提示语',
    },
  },
  data() {
    return {
      filelist: [],
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
      let length = 0;
      this.filelist.forEach((item) => {
        length += item.size;
      });
      if (length === 0) {
        this.$message.error('不能上传空文件');
        return;
      }
      if (length > 524288000) {
        this.$message.error('上传文件过大，仅支持500M内文件');
        return;
      }
      this.$emit('sure', this.filelist);
    },
    setHeight() {
      this.$refs.messageBoxDialig.$el.firstChild.style.height = this.height;
    },
    beforAvatarUpload(file) {
      try {
        const types = file.name?.split('.') || null;
        let fileType = types[types.length - 1];
        let checkFormat = checkoutFileUploadFormat(fileType);
        if (!checkFormat) {
          this.$message.error('文件格式不合规,请更换文件');
          return;
        }
        this.filelist.push(file);
      } catch (err) {
        this.$message.error('文件格式截取错误');
      }
    },
    handleRequest() {},
    delFileList(index) {
      this.filelist.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.messageBoxDialig >>> .el-dialog {
  border-radius: 12px;
  box-shadow: 0px 4px 10px 0px rgba(0, 52, 130, 0.24);
}
/* 弹窗 */
.message-box-main {
  width: 100%;
  height: calc(100% - 65px);
  flex: 4;
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
  bottom: 20px;
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
.Upload-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  /* align-items: center;
   */
  padding-top: 15px;
  box-sizing: border-box;
  flex-wrap: wrap;
}
.upload-demo >>> .el-upload-dragger {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: #1e5db4;
  border: 1px dashed #2458bf;
}
.upload-demo >>> .el-upload-dragger .el-upload__text {
  color: #1e5db4;
  font-size: 16px;
  margin-top: 10px;
}
.el-icon-receiving {
  font-size: 36px;
}
.upload-list {
  width: 100%;
  height: 60px;
  margin-top: 5px;
  overflow-y: auto;
}
.work-list {
  width: 70%;
  display: flex;
  justify-content: space-between;
  margin-left: 90px;
  margin-bottom: 5px;
}
.workList3 {
  cursor: pointer;
}
</style>

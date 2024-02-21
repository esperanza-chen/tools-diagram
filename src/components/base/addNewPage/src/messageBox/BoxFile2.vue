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
        <el-form class="uploadForm" label-width="85px" label-position="right">
          <!-- <el-form-item label="上传"> -->
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
          <!-- </el-form-item> -->
          <div class="upload-list" v-if="filelist.length > 0">
            <div class="work-list" v-for="(item, index) in filelist" :key="index">
              <div class="workList1">{{ item.name }}</div>
              <!-- <div class="workList2">{{ item.type }}</div> -->
              <div class="workList3" @click="delFileList(index)">x</div>
            </div>
          </div>
          <!-- <el-form-item class="iptItem" label="外部关联">
            <el-input placeholder="请输入..." v-model="value"> </el-input>
            <div class="addIptItem" @click="CliskAddIptItem">新增</div>
          </el-form-item>
          <div class="upload-list" v-if="valueList.length > 0">
              <div class="work-list" v-for="(item, index) in valueList" :key="index">
                <div class="workList1">{{ item.name }}</div>
                <div class="workList3" @click="delFileList(index)">x</div>
              </div>
          </div>
          <el-form-item class="iptItem" label="内部关联">
            <el-select  v-model="valueType1" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="valueType2" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <div class="addIptItem" @click="CliskAddIptItem">新增</div>
          </el-form-item> -->
        </el-form>
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
  name: 'BoxFile2',
  props: {
    switchShow: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [Number, String],
      default: '700px',
    },
    height: {
      type: [Number, String],
      default: '580px',
    },
    title: {
      type: String,
      default: '提示语',
    },
  },
  data() {
    return {
      filelist: [],
      value: '',
      valueList: [],
      valueType1: '',
      valueType2: '',
      options: [
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ],
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
      let obj = {
        value1: this.valueType1,
        value2: this.valueType2,
      };
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
      this.$emit('sure', this.filelist, this.valueList, obj);
    },
    setHeight() {
      // this.$refs.messageBoxDialig.$el.firstChild.style.height = "470px"
      this.$refs.messageBoxDialig.$el.firstChild.style.maxHeight = this.height;
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
    CliskAddIptItem() {
      let obj = {};
      obj.name = this.value;
      this.valueList.push(obj);
      console.log(this.valueList);
      this.value = '';
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
  padding-bottom: 60px;
  box-sizing: border-box;
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
  display: flex;
  justify-content: center;
  padding-top: 15px;
  box-sizing: border-box;
  flex-wrap: wrap;
  font-size: 18px;
}
.upload-demo >>> .el-upload-dragger {
  width: 440px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: #1e5db4;
  border: 1px dashed #2458bf;
  margin: 0 auto;
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
  max-height: 45px;
  margin-top: 5px;
  overflow-y: auto;
}
.work-list {
  width: 100%;
  display: flex;
  justify-content: space-between;
  line-height: 22px;
  padding-right: 10px;
  box-sizing: border-box;
}
.workList3 {
  cursor: pointer;
}
.uploadForm {
  width: 100%;
  height: 100%;
  padding-top: 20px;
  box-sizing: border-box;
}
.uploadForm >>> .el-form-item {
  margin: 15px;
}
.uploadForm >>> .el-form-item__label {
  margin: 0px 20px 0px 50px;
  font-size: 18px;
  color: #072f49;
}
.iptItem .el-input {
  width: 66%;
  margin-right: 30px;
}
.uploadForm >>> .el-form-item__content {
  display: flex;
}
.addIptItem {
  width: 72px;
  height: 40px;
  background: #00419a;
  border-radius: 4px;
  text-align: center;
  color: #fff;
}
.iptItem >>> .el-select {
  width: 172px;
  margin-right: 13px;
}
</style>

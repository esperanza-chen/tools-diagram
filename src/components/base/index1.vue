<template>
  <div class="hello">
    <AddNewPage></AddNewPage>

    <div v-if="showItem" id="showItem">
      <div class="FileList0 FileList">
        <div class="Filehead">
          <div>工作内容</div>
          <div class="FileSwitch" @click="FileSwitch(0)">
            <i class="el-icon-arrow-down" :style="FileListFlag0 ? '' : 'transform: rotate(0)'"></i>
          </div>
        </div>
        <el-input
          v-show="FileListFlag0 && FileList0.length <= 0"
          @click="isFileFlag0 = true"
          style="margin-bottom: 15px; height: 139px"
          type="textarea"
          :rows="2"
          resize="none"
          placeholder="请输入内容"
          maxlength="200"
          v-model="itemMessage.workContent"
        >
        </el-input>
      </div>
      <div class="FileList4 FileList">
        <div class="Filehead">
          <!--  <span v-if="!isTemplate" style="color:red;position: absolute;left: -12px;top: -2px">*</span> -->
          <div style="position: relative">计划用时</div>
          <div class="FileSwitch" @click="FileSwitch(4)">
            <i class="el-icon-arrow-down" :style="FileListFlag4 ? '' : 'transform: rotate(0)'"></i>
          </div>
        </div>
        <div class="planTime" v-show="FileListFlag4 && FileList4.length <= 0" @click="isFileFlag4 = true">
          <el-input
            type="number"
            style="margin-right: 10px"
            @input="handleEdit"
            v-model="itemMessage.time"
            placeholder="请输入"
          ></el-input>
          <el-select v-model="itemMessage.timeUnit" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
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
          <div
            class="FileContent"
            v-show="FileListFlag1 && FileList1.length <= 0 && itemMessage.workFireList.length === 0"
            @click="isFileFlag1 = true"
          >
            <div class="FileContent-logo">
              <img src="@/static/task/addFire.png" />
            </div>
            <div class="FileContent-text">点击上传，文件大小不得超过500M</div>
          </div>
          <div
            class="FileTableList"
            v-show="FileListFlag1 && FileList1.length <= 0 && itemMessage.workFireList.length > 0"
          >
            <div class="thislist" v-for="(item, index) in itemMessage.workFireList" :key="index">
              <span class="listSpan1">{{ item.name }}</span>
              <i
                class="el-icon-delete"
                style="margin-left: 10px"
                @click="itemMessage.workFireList.splice(index, 1)"
              ></i>
            </div>
          </div>
          <div
            class="costBtn"
            v-show="FileListFlag1 && FileList1.length <= 0 && itemMessage.workFireList.length > 0"
            @click="isFileFlag1 = true"
            style="margin: 0 0 15px 15px"
          >
            +上传文档
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
          <div
            class="FileContent"
            v-show="FileListFlag2 && FileList2.length <= 0 && itemMessage.knowFireList.length === 0"
            @click="isFileFlag2 = true"
          >
            <div class="FileContent-logo">
              <img src="@/static/task/addFire.png" />
            </div>
            <div class="FileContent-text">点击上传，文件大小不得超过500M</div>
          </div>
          <div
            class="FileTableList"
            v-show="FileListFlag2 && FileList2.length <= 0 && itemMessage.knowFireList.length > 0"
          >
            <div class="thislist" v-for="(item, index) in itemMessage.knowFireList" :key="index">
              <span class="listSpan1">{{ item.name }}</span>
              <i
                class="el-icon-delete"
                style="margin-left: 10px"
                @click="itemMessage.knowFireList.splice(index, 1)"
              ></i>
            </div>
          </div>
          <div
            class="costBtn"
            v-show="FileListFlag2 && FileList2.length <= 0 && itemMessage.knowFireList.length > 0"
            @click="isFileFlag2 = true"
            style="margin: 0 0 15px 15px"
          >
            +上传文档
          </div>
        </div>
      </div>
      <!--右上上传文件第三个费用-->
      <div class="FileList3 FileList">
        <div class="Filehead">
          <div>费用</div>
          <div class="FileSwitch" @click="FileSwitch(3)">
            <i class="el-icon-arrow-down" :style="FileListFlag3 ? '' : 'transform: rotate(0)'"></i>
          </div>
        </div>
        <div v-show="FileListFlag3" class="costcontent">
          <div class="costList" v-for="(item, index) in itemMessage.CostList" :key="index">
            <el-input class="costInput1" v-model="item.key" placeholder="请输入内容"></el-input>
            <el-input
              class="costInput2"
              oninput="value=value.replace(/[^0-9.]/g,'')"
              placeholder="请输入内容"
              v-model="item.value"
            >
              <el-select v-model="item.type" slot="append" placeholder="请选择">
                <el-option label="元" value="1"></el-option>
                <el-option label="百" value="2"></el-option>
                <el-option label="千" value="3"></el-option>
                <el-option label="万" value="4"></el-option>
              </el-select>
            </el-input>
            <i class="el-icon-delete" @click="delectCost(index)"></i>
          </div>
          <div class="costBtn" @click="addCostList">+新增费用</div>
        </div>
      </div>
    </div>

    <div v-else id="showItem">
      <div class="FileList0 FileList">
        <div class="Filehead">
          <div>工作内容</div>
          <div class="FileSwitch" @click="FileSwitch(0)">
            <i class="el-icon-arrow-down" :style="FileListFlag0 ? '' : 'transform: rotate(0)'"></i>
          </div>
        </div>
        <el-input
          v-show="FileListFlag0 && FileList0.length <= 0"
          @click="isFileFlag0 = true"
          style="margin-bottom: 15px; height: 139px"
          type="textarea"
          :rows="2"
          resize="none"
          placeholder="请输入内容"
          maxlength="200"
          v-model="flowMessage.workContent"
        >
        </el-input>
      </div>
      <div class="FileList4 FileList">
        <div class="Filehead">
          <div>计划用时</div>
          <div class="FileSwitch" @click="FileSwitch(4)">
            <i class="el-icon-arrow-down" :style="FileListFlag4 ? '' : 'transform: rotate(0)'"></i>
          </div>
        </div>
        <div class="planTime" v-show="FileListFlag4 && FileList4.length <= 0" @click="isFileFlag4 = true">
          <el-input
            type="number"
            style="margin-right: 10px"
            v-model="flowMessage.time"
            placeholder="请输入"
            @input="handleEdit"
          ></el-input>
          <el-select v-model="flowMessage.timeUnit" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
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
          <div
            class="FileContent"
            v-show="FileListFlag1 && FileList1.length <= 0 && flowMessage.workFireList.length === 0"
            @click="isFileFlag1 = true"
          >
            <div class="FileContent-logo">
              <img src="@/static/task/addFire.png" />
            </div>
            <div class="FileContent-text">点击上传，文件大小不得超过500M</div>
          </div>
          <div
            class="FileTableList"
            v-show="FileListFlag1 && FileList1.length <= 0 && flowMessage.workFireList.length > 0"
          >
            <div class="thislist" v-for="(item, index) in flowMessage.workFireList" :key="index">
              <span class="listSpan1">{{ item.name }}</span>
              <i
                class="el-icon-delete"
                style="margin-left: 10px"
                @click="flowMessage.workFireList.splice(index, 1)"
              ></i>
            </div>
          </div>
          <div
            class="costBtn"
            v-show="FileListFlag1 && FileList1.length <= 0 && flowMessage.workFireList.length > 0"
            @click="isFileFlag1 = true"
            style="margin: 0 0 15px 15px"
          >
            +上传文档
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
          <div
            class="FileContent"
            v-show="FileListFlag2 && FileList2.length <= 0 && flowMessage.knowFireList.length === 0"
            @click="isFileFlag2 = true"
          >
            <div class="FileContent-logo">
              <img src="@/static/task/addFire.png" />
            </div>
            <div class="FileContent-text">点击上传，文件大小不得超过500M</div>
          </div>
          <div
            class="FileTableList"
            v-show="FileListFlag2 && FileList2.length <= 0 && flowMessage.knowFireList.length > 0"
          >
            <div class="thislist" v-for="(item, index) in flowMessage.knowFireList" :key="index">
              <span class="listSpan1">{{ item.name }}</span>
              <i
                class="el-icon-delete"
                style="margin-left: 10px"
                @click="flowMessage.knowFireList.splice(index, 1)"
              ></i>
            </div>
          </div>
          <div
            class="costBtn"
            v-show="FileListFlag2 && FileList2.length <= 0 && flowMessage.knowFireList.length > 0"
            @click="isFileFlag2 = true"
            style="margin: 0 0 15px 15px"
          >
            +上传文档
          </div>
        </div>
      </div>
      <!--右上上传文件第三个费用-->
      <div class="FileList3 FileList">
        <div class="Filehead">
          <div>费用</div>
          <div class="FileSwitch" @click="FileSwitch(3)">
            <i class="el-icon-arrow-down" :style="FileListFlag3 ? '' : 'transform: rotate(0)'"></i>
          </div>
        </div>
        <div v-show="FileListFlag3" class="costcontent">
          <div class="costList" v-for="(item, index) in flowMessage.CostList" :key="index">
            <el-input class="costInput1" v-model="item.key" placeholder="请输入内容"></el-input>
            <el-input
              class="costInput2"
              oninput="value=value.replace(/[^0-9.]/g,'')"
              placeholder="请输入内容"
              v-model="item.value"
            >
              <el-select v-model="item.type" slot="append" placeholder="请选择">
                <el-option label="元" value="1"></el-option>
                <el-option label="百" value="2"></el-option>
                <el-option label="千" value="3"></el-option>
                <el-option label="万" value="4"></el-option>
              </el-select>
            </el-input>
            <i class="el-icon-delete" @click="delectCost(index)"></i>
          </div>
          <div class="costBtn" @click="addCostList">+新增费用</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddNewPage from './addNewPage/src/index.vue';
import Bus from '@/utils/bus';

export default {
  components: {
    AddNewPage,
  },
  name: '',
  props: {
    msg: String,
  },
  data() {
    return {
      scripts: [
        'assets/js/util.js',
        'scripts_bin/zh/diagraming/schema/schema.js',
        'scripts_bin/zh/diagraming/schema/themes.js',
        'scripts_bin/zh/diagraming/schema/categories/basic.js',
        'scripts_bin/zh/diagraming/schema/categories/flow.js',
        'scripts_bin/zh/diagraming/schema/categories/lane.js',
        'scripts_bin/zh/diagraming/designer.core.js',
        'scripts_bin/zh/diagraming/designer.2svg.js',
        'scripts_bin/zh/collaboration.js',
        'scripts_bin/zh/diagraming/files/export.js',
        'scripts_bin/zh/diagraming/designer.methods.js',
        'scripts_bin/zh/diagraming/designer.events.js',
        'scripts_bin/zh/diagraming/designer.ui.js',
        'scripts_bin/zh/diagraming/designer.beautify.js',
        'scripts_bin/zh/diagraming/designer.team.js',
        'scripts_bin/zh/diagraming/svgUtil.js',
        'scripts_bin/zh/diagraming/collaboration.js',
      ],
      showItem: false,
      itemMessage: {
        workContent: '',
        time: '',
        timeUnit: '',
        workFireList: [],
        knowFireList: [],
        cost: [],
        CostList: [],
      },
      flowMessage: {
        workContent: '',
        time: '',
        timeUnit: '',
        workFireList: [],
        knowFireList: [],
        cost: [],
        CostList: [],
      },
      //右上展开和收缩
      FileListFlag4: true,
      FileList4: [],
      FileListFlag0: true,
      FileList0: [],
      FileListFlag1: true,
      FileList1: [],
      FileListFlag2: true,
      FileList2: [],
      FileListFlag3: true,
      options: [
        { value: '分钟', lable: '分钟' },
        { value: '小时', lable: '小时' },
        { value: '天', lable: '天' },
        { value: '月', lable: '月' },
      ],
    };
  },
  mounted() {
    this.FileSwitch(0);
    this.FileSwitch(1);
    this.FileSwitch(2);
    this.FileSwitch(3);
    this.FileSwitch(4);
    this.isTemplate = window.location.hash?.split('?')[1]?.split('&')[0]?.split('=')[1] === 'template' ? true : false;

    this.addEvent();

    for (var i = 0; i < this.scripts.length; i++) {
      let nav = document.createElement('script');
      nav.type = 'text/javascript';
      nav.defer = true;
      nav.async = false;
      nav.src = this.scripts[i];
      document.body.appendChild(nav);
    }
  },
  methods: {
    addEvent() {
      Bus.$on('index1Msg', (event) => {
        if (event.data.name == 'toShowItem') {
          info = Utils.getSelected();

          if (info.length == 1) {
            this.showItem = true;
            if (info[0].property === 'double') {
              this.addDomUpLine(info);
              this.addDomDownLine(info);
              this.delDomUpLine(info);
              this.delDomDownLine(info);
            }
          } else {
            this.showItem = false;
          }

          if (info[0].itemMessage) {
            let bl = false;
            Object.values(info[0].itemMessage).forEach((item) => {
              if (item) bl = true;
            });
            if (bl) this.itemMessage = info[0].itemMessage;
            if (
              (this.itemMessage.workContent && !this.FileListFlag0) ||
              (!this.itemMessage.workContent && this.FileListFlag0)
            )
              this.FileSwitch(0);
            if ((this.itemMessage.time && !this.FileListFlag4) || (!this.itemMessage.time && this.FileListFlag4))
              this.FileSwitch(4);
            if (
              (this.itemMessage.workFireList.length > 0 && !this.FileListFlag1) ||
              (!this.itemMessage.workFireList.length > 0 && this.FileListFlag1)
            )
              this.FileSwitch(1);
            if (
              (this.itemMessage.knowFireList.length > 0 && !this.FileListFlag2) ||
              (!this.itemMessage.knowFireList.length > 0 && this.FileListFlag2)
            )
              this.FileSwitch(2);
            if (
              (this.itemMessage.CostList.length > 0 && !this.FileListFlag3) ||
              (!this.itemMessage.CostList.length > 0 && this.FileListFlag3)
            )
              this.FileSwitch(3);
          } else
            info[0].itemMessage = {
              workContent: '',
              time: '',
              timeUnit: '',
              workFireList: [],
              knowFireList: [],
              cost: [],
              CostList: [],
            };
        } else if (event.data.name == 'toCloseItem') {
          this.showItem = false;
          // console.log('toCloseItem');
          if (
            (this.flowMessage.workContent && !this.FileListFlag0) ||
            (!this.flowMessage.workContent && this.FileListFlag0)
          )
            this.FileSwitch(0);
          if ((this.flowMessage.time && !this.FileListFlag4) || (!this.flowMessage.time && this.FileListFlag4))
            this.FileSwitch(4);
          if (
            (this.flowMessage.workFireList.length > 0 && !this.FileListFlag1) ||
            (!this.flowMessage.workFireList.length > 0 && this.FileListFlag1)
          )
            this.FileSwitch(1);
          if (
            (this.flowMessage.knowFireList.length > 0 && !this.FileListFlag2) ||
            (!this.flowMessage.knowFireList.length > 0 && this.FileListFlag2)
          )
            this.FileSwitch(2);
          if (
            (this.flowMessage.CostList.length > 0 && !this.FileListFlag3) ||
            (!this.flowMessage.CostList.length > 0 && this.FileListFlag3)
          )
            this.FileSwitch(3);
        } else if (event.data.type == 'getFlow') {
          // 获取流程信息
          this.queryType = event.data?.queryType === 'template' ? true : false;
          let flow = this.toGetMapInfo();
          if (flow) window.parent.postMessage({ iframeMessage: JSON.stringify(flow), type: 'toSubmit' }, '*');
        } else if (event.data.type === 'editData') {
          // console.log(event.data.iframeMessage, 'aaabbb');
          this.flowMessage = JSON.parse(event.data.iframeMessage).flowMessage;
          if (this.flowMessage.workContent) this.FileSwitch(0);
          if (this.flowMessage.time) this.FileSwitch(4);
          if (this.flowMessage.workFireList.length > 0) this.FileSwitch(1);
          if (this.flowMessage.knowFireList.length > 0) this.FileSwitch(2);
          if (this.flowMessage.CostList.length > 0) this.FileSwitch(3);
          this.branchNum = JSON.parse(event.data.iframeMessage).oldindex || 1;
          Designer.open(JSON.parse(event.data.iframeMessage));
          Designer.initialize.canvasSizeAuto();
        } else if (event.data.type === 'findsxyd') {
          // console.log('fhwshfdh');
          this.showDouble = true;
          const dataJSON = Utils.copy(Model.define);
          // console.log(dataJSON, 'dataJSON1');
          let info = Utils.getSelected();
          // console.log(info, 'dataJSON2');
          let sum = 0;
          for (let i = 0, length = info[0].children.length; i < length; i++) {
            if (info[0].children[i].indexOf('sxyd') !== -1) {
              sum++;
            }
          }
          this.laneText = sum;
          this.oldLaneText = this.laneText;
        } else if (event.data.type === 'notsxyd') {
          this.showDouble = false;
        }
      });

      window.parent.postMessage({ type: 'toGetTemInfo' }, '*');
    },
    handleEdit(e) {
      this.flowMessage.time = e >= 0 ? parseInt(e) : 0;
    },
    //新增费用
    addCostList() {
      let obj = { key: '', valye: 0, type: '1' };
      if (this.showItem) this.itemMessage.CostList.push(obj);
      else this.flowMessage.CostList.push(obj);
    },
    //删除费用
    delectCost(index) {
      if (this.showItem) this.itemMessage.CostList.splice(index, 1);
      else this.flowMessage.CostList.splice(index, 1);
    },
    //节点导入
    //右上角收缩
    FileSwitch(val) {
      if (val === 0) {
        let dom = document.querySelector('.FileList0');
        if (this.FileListFlag0) {
          dom.style.width = '168px';
          dom.style.height = '35px';
        } else {
          dom.style.width = '450px';
          dom.style.height = '200px';
        }
        this.FileListFlag0 = !this.FileListFlag0;
      } else if (val === 1) {
        let dom = document.querySelector('.FileList1');
        if (this.FileListFlag1) {
          dom.style.width = '168px';
          dom.style.height = '35px';
        } else {
          dom.style.width = '450px';
          dom.style.height = 'auto';
        }
        this.FileListFlag1 = !this.FileListFlag1;
      } else if (val === 2) {
        let dom = document.querySelector('.FileList2');
        if (this.FileListFlag2) {
          dom.style.width = '168px';
          dom.style.height = '35px';
        } else {
          dom.style.width = '450px';
          dom.style.height = 'auto';
        }
        this.FileListFlag2 = !this.FileListFlag2;
      } else if (val === 3) {
        let dom = document.querySelector('.FileList3');
        if (this.FileListFlag3) {
          dom.style.width = '168px';
          dom.style.height = '35px';
        } else {
          dom.style.width = '450px';
          dom.style.height = '200px';
        }
        this.FileListFlag3 = !this.FileListFlag3;
      } else if (val === 4) {
        let dom = document.querySelector('.FileList4');
        if (this.FileListFlag4) {
          dom.style.width = '168px';
          dom.style.height = '35px';
        } else {
          dom.style.width = '450px';
          dom.style.height = '140px';
        }
        this.FileListFlag4 = !this.FileListFlag4;
      }
    },
  },
  beforeDestroy() {
    Bus.$off('index1Msg');
  },
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

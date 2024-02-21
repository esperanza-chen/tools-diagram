<template>
  <Page class="home1" id="home1">
    <template #lanebar>
      <div class="lanebar" style="display: block; position: absolute; top: 53px">
        <div class="lanebar_box" style="float: left; margin: 5px 20px">
          <div id="bar_lane_num" class="spinner active" style="width: 60px; border-color: #63abf7"></div>
          <div class="lanebar_tit" style="padding-top: 6px">泳道数量<span v-show="showDouble">(垂直)</span></div>
        </div>
        <div class="lanebar_small_devider"></div>
        <div v-show="showDouble" id="crossNum" class="lanebar_box" style="float: left; margin: 5px 20px; display: none">
          <div id="bar_lane_num2" class="spinner active" style="width: 60px; border-color: #63abf7">
            <div class="spinner_input2">
              <input
                @blur="tochangeLaneText"
                @keyup.enter="tochangeLaneText"
                v-model="laneText"
                style="text-align: center; width: 45px"
              />
            </div>
            <div class="buttons">
              <div class="spinner_up" @click="addLine"></div>
              <div class="spinner_down" @click="delLine"></div>
            </div>
          </div>
          <div class="lanebar_tit" style="padding-top: 6px">泳道数量(水平)</div>
        </div>
        <div v-show="showDouble" class="lanebar_small_devider"></div>
        <div v-show="!showDouble" class="lanebar_box">
          <div class="lanebar_button" id="bar_pool_horizontal" title="泳池(水平)">
            <div class="ico diagraming-icons">&#xe7c9;</div>
          </div>
          <div class="lanebar_button" id="bar_pool_vertical" title="泳池(垂直)">
            <div class="ico diagraming-icons">&#xe7ca;</div>
          </div>
          <div class="lanebar_tit">泳池方向</div>
        </div>
        <div v-show="!showDouble" class="lanebar_small_devider"></div>
        <div class="lanebar_box">
          <div class="lanebar_button" id="bar_text_vertical" title="文本(垂直)">
            <div class="ico diagraming-icons">&#xe7c7;</div>
          </div>
          <div class="lanebar_button" id="bar_text_horizontal" title="文本(水平)">
            <div class="ico diagraming-icons">&#xe7c8;</div>
          </div>
          <div class="lanebar_tit">文本方向</div>
        </div>
      </div>
    </template>
    <template #rightTopBtns>
      <!-- <div v-if="env" class="onerootinfo" @click="toGetRootInfo">节点信息</div>
      <div v-if="env" class="onerootinfo" style="right: 220px" @click="toSvg">缩略图</div>
      <div v-if="env" class="onerootinfo allinfo" @click="toGetMapInfo">画布信息</div>
      <div v-if="env" class="onerootinfo" style="top: 40px" @click="redoList">撤回列表</div>
      <div v-if="env" class="onerootinfo" style="top: 40px; right: 220px" @click="magnify">
        <i class="el-icon-full-screen"></i>全屏
      </div> -->
    </template>
    <template #showItem>
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
              v-model="itemMessage.time"
              placeholder="请输入"
            ></el-input>
            <!-- @input="handleEdit" -->
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
      </div>
    </template>
    <template #default>
      <box-file-one
        v-if="isFileFlag1"
        :switch-show="isFileFlag1"
        title="上传工作模板"
        @sure="sureAddWork"
        @cancel="cancelAddWork"
      ></box-file-one>
      <box-file-one
        v-if="isFileFlag2"
        :switch-show="isFileFlag2"
        title="上传参考知识"
        @sure="sureAddPoint"
        @cancel="cancelAddPoint"
      ></box-file-one>
    </template>
  </Page>
</template>
<script>
import Page from '@/components/Page.vue';
import BoxFileOne from '@/components/messageBox/BoxFile1.vue';
import { env, onDiagramMessage } from '@/utils/utils';
import { scripts } from '@/utils/public';
import Bus from '@/utils/bus';

let info = null;
let delinfo = null;

export default {
  components: {
    Page,
    BoxFileOne,
  },
  data() {
    return {
      scripts: scripts,
      showItem: false,
      options: [
        { value: '分钟', lable: '分钟' },
        { value: '小时', lable: '小时' },
        { value: '天', lable: '天' },
        { value: '月', lable: '月' },
      ],
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

      //上传工作文档弹框开关
      isFileFlag1: false,
      //上传参考文档弹框开关
      isFileFlag2: false,
      //选择参与人员弹框开关
      isSelectPerson: false,
      //子任务列表
      sonTaskList: [],
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
      queryType: false,
      branchNum: 1,
      laneText: 0,
      oldLaneText: 0,
      deletedData: [],
      showDouble: false,
      isTemplate: false,
      env: env,
      testShape: null,
      stackPop: [],
      showNavigation: false,
    };
  },
  watch: {
    itemMessage: {
      handler(nv, ov) {
        if (nv) info[0].itemMessage = nv;
      },
      deep: true,
    },
  },
  mounted() {
    Bus.$on('home1CreateEditMsg', this.onMessage);
    onDiagramMessage();

    this.FileSwitch(0);
    this.FileSwitch(1);
    this.FileSwitch(2);
    // this.FileSwitch(3);
    this.FileSwitch(4);
    this.isTemplate = window.location.hash?.split('?')[1]?.split('&')[0]?.split('=')[1] === 'template' ? true : false;

    for (var i = 0; i < this.scripts.length; i++) {
      let nav = document.createElement('script');
      nav.type = 'text/javascript';
      nav.class = 'javascriptClass';
      nav.defer = true;
      nav.async = false;
      nav.src = this.scripts[i] + '?t=' + new Date().getTime();
      document.body.appendChild(nav);
    }

    this.addEvent();

    setTimeout(() => {
      Designer.zoomIn();
      Designer.zoomIn();
    }, 1000);
  },
  methods: {
    addEvent() {
      Bus.$on('home1CreateEditMsg', (event) => {
        // console.log(event.data, 'uuuuuu')
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
            // if (
            //   (this.itemMessage.CostList.length > 0 && !this.FileListFlag3) ||
            //   (!this.itemMessage.CostList.length > 0 && this.FileListFlag3)
            // )
            //   this.FileSwitch(3);
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
          // if (
          //   (this.flowMessage.CostList.length > 0 && !this.FileListFlag3) ||
          //   (!this.flowMessage.CostList.length > 0 && this.FileListFlag3)
          // )
          //   this.FileSwitch(3);
        } else if (event.data.type == 'getFlow') {
          // 获取流程信息
          this.queryType = event.data?.queryType === 'template' ? true : false;
          let flow = this.toGetMapInfo();
          if (flow) window.parent.postMessage({ iframeMessage: JSON.stringify(flow), type: 'toSubmit' }, '*');
        } else if (event.data.type === 'editData') {
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
        } else if (event.data.type === 'backsave') {
          const oldDdata = Utils.copy(Model.define);
          window.parent.postMessage({ iframeMessage: JSON.stringify(oldDdata), type: 'backsaveItem' }, '*');
        } else if (event.data.type === 'showOldData') {
          this.flowMessage = JSON.parse(event.data.iframeMessage);
          Designer.open(JSON.parse(event.data.iframeMessage));
          Designer.initialize.canvasSizeAuto();
          this.flowMessage = {
            workContent: '',
            time: '',
            timeUnit: '',
            workFireList: [],
            knowFireList: [],
            cost: [],
            CostList: [],
          };
        } else if (event.data.type === 'toFullScreen') {
          this.magnify();
        }
      });

      window.parent.postMessage({ type: 'toGetTemInfo' }, '*');
    },
    handleEdit(e) {
      // console.log(e, '000000000000')
      this.flowMessage.time = e >= 0 ? parseInt(e) : 0;
    },
    tochangeLaneText() {
      if (this.laneText < 2) {
        this.laneText = 2;
      }

      let oldtext = this.oldLaneText;
      if (this.oldLaneText < this.laneText) {
        while (oldtext < this.laneText) {
          this.addLine(false);
          oldtext++;
        }
      } else {
        while (oldtext > this.laneText) {
          this.delLine(false);
          oldtext--;
        }
      }
    },
    // 清空画布上的图形
    getAllChartsinfo(info) {
      const infoJSON = Utils.copy(info);
      const dataJSON = Utils.copy(Model.define);
      // 去掉其他相关东西
      let c = {
        page: dataJSON.page,
        elements: [],
        version: 0,
      };

      Designer.op.removeShape(); // 删除选中图形

      Model.update(a);

      return c;
    },
    addLine(bl = true) {
      let info = Utils.getSelected();
      this.testShape = info;
      const dataJSON = Utils.copy(Model.define);
      const elements = Utils.copy(Model.define.elements);

      const props = dataJSON.elements[info[0].id].props;
      const num = '_' + new Date().getTime().toString();
      const res = Object.values(dataJSON.elements).filter((item) => {
        return item.name === 'horizontalSeparator' && info[0].children.indexOf(item.id) !== -1;
      });
      const clomnRes = info[0].children.filter((item) => {
        return item.indexOf('sxyd') === -1;
      });
      const nextTop = res[res.length - 1].props.y + res[res.length - 1].props.h;
      if (info[0].children[0].includes('sxyd')) {
        dataJSON.elements[info[0].id].children.unshift('wjcdesxydd' + num);
      } else {
        dataJSON.elements[info[0].id].children.push('wjcdesxydd' + num);
      }
      dataJSON.elements['wjcdesxydd' + num] = {
        id: 'wjcdesxydd' + num,
        name: 'horizontalSeparator',
        title: '分隔符(水平)<br>需拖动到泳池泳道上',
        category: 'lane',
        group: '',
        groupName: null,
        locked: false,
        link: '',
        children: [],
        parent: info[0].id,
        resizeDir: ['b'],
        attribute: {
          container: false,
          visible: true,
          rotatable: false,
          linkable: false,
          collapsable: false,
          collapsed: false,
          markerOffset: 5,
        },
        dataAttributes: [],
        props: { x: props.x, y: nextTop, w: dataJSON.elements[info[0].id].props.w, h: 250, zindex: 2, angle: 0 },
        shapeStyle: { alpha: 1 },
        lineStyle: {},
        fillStyle: { color: '212,227,250' },
        theme: {},
        path: [
          {
            fillStyle: { type: 'none' },
            lineStyle: { lineStyle: 'solid' },
            actions: [
              { action: 'move', x: 0, y: 'h' },
              { action: 'line', x: 'w', y: 'h' },
            ],
          },
          {
            actions: [
              { action: 'move', x: 0, y: 0 },
              { action: 'line', x: 28, y: 0 },
              { action: 'line', x: 28, y: 'h' },
              { action: 'line', x: 0, y: 'h' },
              { action: 'close' },
            ],
          },
        ],
        fontStyle: {
          // orientation: 'horizontal',
          textAlign: 'center',
        },
        textBlock: [{ position: { x: 0, y: 5, w: 28, h: 'h-10' }, text: '&ZeroWidthSpace;' }],
        anchors: [],
        itemMessage: {
          workContent: '',
          time: '',
          timeUnit: '',
          workFireList: [],
          knowFireList: [],
          cost: [],
          CostList: [],
        },
      };

      dataJSON.elements[info[0].id].props.h += 250;
      let test = [];
      clomnRes.forEach((item) => {
        dataJSON.elements[item].props.h += 250;
        test.push(dataJSON.elements[item]);
      });

      if (bl) this.laneText++;
      this.oldLaneText = this.laneText;

      const hei = dataJSON.elements[info[0].id].props.h;

      const stacks = [
        {
          action: 'create',
          content: [dataJSON.elements['wjcdesxydd' + num], dataJSON.elements],
        },
        {
          action: 'update',
          content: {
            shapes: Object.values(Model.define.elements),
            updates: Object.values(dataJSON.elements),
          },
        },
      ];

      MessageSource.undoStack.push(stacks);

      Designer.open(dataJSON);
      Designer.initialize.initCanvas();

      var e = Utils.getControlBox([info[0].id]);
      Designer.op.changeCanvas(e);

      // Utils.unselect();
      setTimeout(() => {
        this.addDomUpLine(info);
        this.addDomDownLine(info);
        this.delDomUpLine(info);
        this.delDomDownLine(info);
      }, 500);
    },
    delLine(bl = true) {
      const selected = Utils.getSelected();
      //选中单个双向泳道且横向泳道数量大于2进入下一步
      if (!Array.isArray(selected) || selected.length > 1 || (this.laneText <= 2 && bl)) {
        return;
      }

      const parentId = selected[0].id; //双向泳道id
      let selectedChildren = []; //所有泳道id泳道id集合

      //判断顺序，如果不对进行反转
      if (selected[0].children[0].includes('sxyd')) {
        selectedChildren = selected[0].children;
      } else {
        selectedChildren = selected[0].children.reverse();
      }

      let selectedSxyd = []; //横向泳道集合
      for (let i = 0, length = selectedChildren.length; i < length; i++) {
        if (selectedChildren[i].includes('sxyd')) {
          selectedSxyd.push(selectedChildren[i]);
        }
      }

      //时间戳判断排序
      for (let i = 0, length = selectedSxyd.length; i < length - 1; i++) {
        for (let j = 0; j < length - i - 1; j++) {
          if (
            selectedSxyd[j].split('_')[selectedSxyd[j].split('_').length - 1] <
            selectedSxyd[j + 1].split('_')[selectedSxyd[j + 1].split('_').length - 1]
          ) {
            let temp = selectedSxyd[j];
            selectedSxyd[j] = selectedSxyd[j + 1];
            selectedSxyd[j + 1] = temp;
          }
        }
      }

      //获取最后一个横向泳道及倒数第二个横向泳道
      let delchild = null,
        prechild = null;
      let hasDeleted = false;
      for (let i = 0, len = selectedSxyd.length; i < len; i++) {
        const child = selectedSxyd[i];
        if (child.includes('sxyd')) {
          if (!this.deletedData.includes(child) && !hasDeleted) {
            // console.log('123456789aaa', child, selectedSxyd[i + 1]);
            // delete dataJSON.elements[child];
            hasDeleted = true;
            delchild = child;
            prechild = selectedSxyd[i + 1];
            // console.log('123456789aaa');
            this.deletedData.push(child);
          }
        } else {
          // dataJSON.elements[child].props.h -= 250;
        }
      }
      const shapesEle = Utils.copy(Model.define.elements);
      // selected[0].children.splice(selected[0].children.indexOf(delchild),1)
      let childObj = Model.getShapeById(delchild);
      Model.remove([childObj]);
      if (bl) this.laneText--;
      this.oldLaneText = this.laneText;

      const updatesEle = Utils.copy(Model.define.elements);

      console.log(shapesEle, updatesEle);
      // console.log(dataJSON,selected,delchild,"dataJSON")
      // Designer.open(dataJSON);
      // Designer.initialize.initCanvas();

      Utils.unselect();
      Utils.selectShape(parentId);
      // MessageSource.commit();
      var e = Utils.getControlBox([parentId]);
      Designer.op.changeCanvas(e);

      const dataJSON = Utils.copy(Model.define);

      dataJSON.elements[parentId].props.h -= 250;

      // console.log(prechild,dataJSON.elements[prechild],'dhgshgadfasjdgjhs')
      dataJSON.elements[prechild].props.h -= 250;
      // dataJSON.elements[prechild].props.y -= 250;
      for (let i = 0, len = selectedChildren.length; i < len; i++) {
        if (!selectedChildren[i].includes('sxyd')) {
          dataJSON.elements[selectedChildren[i]].props.h -= 250;
        }
      }

      const MessageStacks = JSON.parse(JSON.stringify(MessageSource.undoStack.stack));
      const history = MessageStacks[MessageStacks.length - 1];

      const stacks = [
        ...history,
        {
          action: 'update',
          content: {
            shapes: Object.values(Model.define.elements),
            updates: Object.values(dataJSON.elements),
          },
        },
      ];
      MessageSource.undoStack.push(stacks);

      //  MessageSource.stacks[MessageStacks.length - 1].push(stacks)

      Designer.open(dataJSON);
      Designer.initialize.initCanvas();

      Utils.unselect();
      Utils.selectShape(parentId);
    },
    submitPoint() {},
    //测试获取数据
    toGetMapInfo() {
      let oldDdata = Utils.copy(Model.define);

      let mapData = Object.values(oldDdata.elements);
      this.reSetData(mapData);
      // console.log(JSON.stringify(mapData), 111);
      // return
      let toFlow = {
        startEvent: {},
        endEvent: [],
        userTask: [],
        sequenceFlow: [],
        exclusiveGateway: [],
      };

      let workContent = [],
        referenceFile = [],
        workFile = [],
        cost = [],
        planTime = [];

      for (let i = 0, length = mapData.length; i < length; i++) {
        if (mapData[i].name === 'displayNone') {
          continue;
        }

        let dataName = '';
        //节点信息转换格式
        if (mapData[i].name == 'terminator') {
          //开始节点
          console.log(toFlow.startEvent.id || this.queryType, 'dhsjhdsjh');
          if (toFlow.startEvent.id && !this.queryType) {
            this.$message.error('流程无法有多个开始节点!');
            return;
          }
          toFlow.startEvent = {
            id: mapData[i].id,
            name: mapData[i]?.textBlock?.[0]?.text?.replace(/<[^>]+>/g, '') || '',
          };
          dataName = mapData[i]?.textBlock?.[0]?.text?.replace(/<[^>]+>/g, '') || '';
        } else if (mapData[i].name == 'terminator2') {
          //结束节点
          toFlow.endEvent.push({
            id: mapData[i].id,
            name: mapData[i]?.textBlock?.[0]?.text?.replace(/<[^>]+>/g, '') || '',
          });
          dataName = mapData[i]?.textBlock?.[0]?.text?.replace(/<[^>]+>/g, '') || '';
        } else if (mapData[i].name == 'decision') {
          //判断节点
          toFlow.exclusiveGateway.push({
            id: mapData[i].id,
            name: mapData[i]?.textBlock?.[0]?.text?.replace(/<[^>]+>/g, '') || '',
          });
          dataName = mapData[i]?.textBlock?.[0]?.text?.replace(/<[^>]+>/g, '') || '';
        } else if (mapData[i].name == 'linker') {
          //连线
          toFlow.sequenceFlow.push({
            id: mapData[i].id,
            start: mapData[i].from.id,
            end: mapData[i].to.id,
            name: mapData[i]?.text.replace(/<[^>]+>/g, '') || '',
            conditionExpression: mapData[i]?.text?.replace(/<[^>]+>/g, '') || '',
            index: i,
          });
          dataName = '连线不需名字';
        } else if (mapData[i].category !== 'lane') {
          //其他所有节点(排除泳池泳道)
          toFlow.userTask.push({
            id: mapData[i].id,
            name: mapData[i]?.textBlock?.[0]?.text?.replace(/<[^>]+>/g, '') || '',
          });
          dataName = mapData[i]?.textBlock?.[0]?.text?.replace(/<[^>]+>/g, '') || '';
        }

        if (!dataName && mapData[i].category !== 'lane' && !this.queryType && mapData[i].name !== 'displayNone') {
          console.log(mapData[i], 'fhjdsgsfj');
          this.$message.warning('存在未命名节点!');
          return;
        }

        //右侧节点数据转换格式
        if (mapData[i].itemMessage) {
          //工作内容
          if (mapData[i].itemMessage.workContent) {
            workContent.push({
              processNodeId: mapData[i].id,
              text: mapData[i].itemMessage.workContent,
            });
          }
          //计划用时
          if (mapData[i].itemMessage.time && mapData[i].itemMessage.timeUnit.length > 0) {
            planTime.push({
              time_type: mapData[i].itemMessage.timeUnit,
              time_cost: mapData[i].itemMessage.time,
              processNodeId: mapData[i].id,
            });
          } else if (mapData[i].name !== 'linker' && mapData[i].category !== 'lane' && !this.queryType) {
            planTime.push({
              time_type: '',
              time_cost: 0,
              processNodeId: mapData[i].id,
            });
            // this.$message.warning(dataName+"节点未选择计划用时");
            // return;
          }
          //工作模板
          if (mapData[i].itemMessage.workFireList.length > 0) {
            for (let j = 0, l = mapData[i].itemMessage.workFireList.length; j < l; j++) {
              workFile.push({
                name: mapData[i].itemMessage.workFireList[j].name,
                url: mapData[i].itemMessage.workFireList[j].url,
                processNodeId: mapData[i].id,
              });
            }
          }
          //参考知识
          if (mapData[i].itemMessage.knowFireList.length > 0) {
            for (let j = 0, l = mapData[i].itemMessage.knowFireList.length; j < l; j++) {
              referenceFile.push({
                name: mapData[i].itemMessage.knowFireList[j].name,
                url: mapData[i].itemMessage.knowFireList[j].url,
                processNodeId: mapData[i].id,
              });
            }
          }
          //费用
          if (mapData[i].itemMessage.CostList.length > 0) {
            for (let j = 0, l = mapData[i].itemMessage.CostList.length; j < l; j++) {
              cost.push({
                cost_name: mapData[i].itemMessage.CostList[j].key,
                cost_money: mapData[i].itemMessage.CostList[j].value,
                cost_type: mapData[i].itemMessage.CostList[j].type,
                processNodeId: mapData[i].id,
              });
            }
          }
        }
      }
      //补充开始节点
      if (!toFlow.startEvent.id) {
        let temporaryList = toFlow.userTask.concat(toFlow.exclusiveGateway);
        for (let i = 0, length = temporaryList.length; i < length; i++) {
          let j = 0;
          for (let l = toFlow.sequenceFlow.length; j < l; j++) {
            if (toFlow.sequenceFlow[j].end === temporaryList[i].id) {
              break;
            }
          }
          if (j === toFlow.sequenceFlow.length) {
            toFlow.startEvent = {
              id: 'qnmdsjbgdsb',
              name: '自动补充默认开始节点',
            };
            toFlow.sequenceFlow.push({
              id: 'hczy' + (Math.random() * 100000000000000000).toString(),
              start: 'qnmdsjbgdsb',
              end: temporaryList[i].id,
              name: '',
              conditionExpression: '',
            });
            planTime.push({
              time_type: '小时',
              time_cost: 0,
              processNodeId: 'qnmdsjbgdsb',
            });
          }
        }
      }
      if (!toFlow.startEvent.id) {
        this.$message.warning('无法找到开始节点,请手动添加开始节点!');
        return;
      }
      //补充结束节点
      for (let i = 0, length = toFlow.userTask.length; i < length; i++) {
        let j = 0;
        for (let l = toFlow.sequenceFlow.length; j < l; j++) {
          if (toFlow.sequenceFlow[j].start === toFlow.userTask[i].id) {
            break;
          }
        }
        if (j === toFlow.sequenceFlow.length) {
          let endId = 'hczy' + (Math.random() * 100000000000000000).toString();
          toFlow.endEvent.push({
            id: endId,
            name: '自动补充结束节点' + i,
          });
          toFlow.sequenceFlow.push({
            id: 'hczy' + (Math.random() * 100000000000000000).toString(),
            start: toFlow.userTask[i].id,
            end: endId,
            name: '',
            conditionExpression: '',
          });
          planTime.push({
            time_type: '小时',
            time_cost: 0,
            processNodeId: endId,
          });
        }
      }

      if (!this.queryType) {
        if (toFlow.userTask.length < 2) {
          console.log(toFlow.userTask, 'hhhhhhhhhhhhh');
          this.$message.error('流程节点数量不足');
          return;
        }
        for (let i = 0, length = toFlow.sequenceFlow.length; i < length; i++) {
          if (toFlow.sequenceFlow[i].end === toFlow.startEvent.id) {
            this.$message.error('开始节点只能在起始位置');
            return;
          }
          for (let j = 0, l = toFlow.endEvent.length; j < l; j++) {
            if (toFlow.sequenceFlow[i].start === toFlow.endEvent[j].id) {
              this.$message.error('结束节点只能在末尾位置');
              return;
            }
          }
          //查看开始节点的下一个是不是网关,如果是需要增加普通任务节点
          if (toFlow.sequenceFlow[i].start === toFlow.startEvent.id) {
            for (let j = 0, l = toFlow.exclusiveGateway.length; j < l; j++) {
              if (toFlow.sequenceFlow[i].end === toFlow.exclusiveGateway[j].id) {
                let taskUid = 'defaultTask' + (Math.random() * 100000000000000000).toString();
                toFlow.userTask.push({
                  id: taskUid,
                  name: '默认添加网关前流程节点',
                });
                toFlow.sequenceFlow[i].end = taskUid;
                toFlow.sequenceFlow.push({
                  id: 'hczy' + (Math.random() * 100000000000000000).toString(),
                  start: taskUid,
                  end: toFlow.exclusiveGateway[j].id,
                  name: '',
                  conditionExpression: '',
                });
              }
            }
          }
        }

        //根据后期有流程任务需要,增加分支编号
        for (let i = 0, length = toFlow.exclusiveGateway.length; i < length; i++) {
          for (let j = 0, l = toFlow.sequenceFlow.length; j < l; j++) {
            if (
              toFlow.exclusiveGateway[i].id === toFlow.sequenceFlow[j].start &&
              toFlow.sequenceFlow[j].conditionExpression === ''
            ) {
              this.$message.error('判断节点缺少判断条件');
              return;
            } else if (toFlow.exclusiveGateway[i].id === toFlow.sequenceFlow[j].start) {
              console.log(toFlow.sequenceFlow[j], '11111');
              toFlow.sequenceFlow[j].branchNum = this.branchNum;
              console.log(toFlow.sequenceFlow[j].index);
              if (mapData[toFlow.sequenceFlow[j].index])
                mapData[toFlow.sequenceFlow[j].index].branchNum = this.branchNum;
              this.branchNum++;
              // delete toFlow.sequenceFlow[j].index;
            } else {
              // delete toFlow.sequenceFlow[j].index;
            }
          }
        }
      }

      //加入流程整体数据
      if (this.flowMessage.workContent) {
        workContent.push({
          text: this.flowMessage.workContent,
        });
      }
      //计划用时
      if (this.flowMessage.time) {
        planTime.push({
          time_type: this.flowMessage.timeUnit,
          time_cost: this.flowMessage.time,
        });
      }
      //工作模板
      if (this.flowMessage.workFireList.length > 0) {
        for (let j = 0, l = this.flowMessage.workFireList.length; j < l; j++) {
          workFile.push({
            name: this.flowMessage.workFireList[j].name,
            url: this.flowMessage.workFireList[j].url,
          });
        }
      }
      //参考知识
      if (this.flowMessage.knowFireList.length > 0) {
        for (let j = 0, l = this.flowMessage.knowFireList.length; j < l; j++) {
          referenceFile.push({
            name: this.flowMessage.knowFireList[j].name,
            url: this.flowMessage.knowFireList[j].url,
          });
        }
      }
      //费用
      if (this.flowMessage.CostList.length > 0) {
        for (let j = 0, l = this.flowMessage.CostList.length; j < l; j++) {
          cost.push({
            cost_name: this.flowMessage.CostList[j].key,
            cost_money: this.flowMessage.CostList[j].value,
            cost_type: this.flowMessage.CostList[j].type,
          });
        }
      }
      oldDdata.flowMessage = this.flowMessage;
      oldDdata.oldindex = this.branchNum;
      let abbrImg = this.toSvg();
      const process = {
        flowChart: toFlow,
        flowChartOriginal: oldDdata,
        workContent: workContent,
        referenceFile: referenceFile,
        workFile: workFile,
        cost: cost,
        planTime: planTime,
        abbrImg: abbrImg,
      };

      console.log(process, 'process');

      return process;
    },
    //选择节点数据
    toGetRootInfo() {
      // let info = Utils.getSelected();
      // console.log(info);
      // return
      let ele = [
        {
          id: 'CdKuGnwxAM767271',
          name: 'verticalPool',
          title: '泳池(垂直)',
          category: 'lane',
          group: '',
          groupName: null,
          locked: false,
          link: '',
          children: ['MtdXxmKZtB852351', 'cyoycVtFMg963348', 'wjcdesxyda_1671613567758', 'wjcdesxydb_1671613567758'],
          parent: '',
          resizeDir: ['l', 'b', 'r'],
          attribute: {
            container: true,
            visible: true,
            rotatable: false,
            linkable: false,
            collapsable: false,
            collapsed: false,
            markerOffset: 5,
          },
          dataAttributes: [],
          props: { x: 504, y: 255, w: 500, h: 540, zindex: -1, angle: 0 },
          shapeStyle: { alpha: 1 },
          lineStyle: {},
          fillStyle: { color: '198,218,249' },
          theme: {},
          path: [
            {
              fillStyle: { type: 'none' },
              lineStyle: { lineStyle: 'solid' },
              actions: [
                { action: 'move', x: '0', y: '0' },
                { action: 'line', x: 'w', y: '0' },
                { action: 'line', x: 'w', y: 'h' },
                { action: 'line', x: '0', y: 'h' },
                { action: 'close' },
              ],
            },
            {
              lineStyle: { lineStyle: 'solid' },
              actions: [
                { action: 'move', x: 0, y: 0 },
                { action: 'line', x: 'w', y: 0 },
                { action: 'line', x: 'w', y: 40 },
                { action: 'line', x: 0, y: 40 },
                { action: 'close' },
              ],
            },
          ],
          fontStyle: { size: 16 },
          textBlock: [{ position: { x: 10, y: 0, w: 'w-20', h: 40 }, text: '&ZeroWidthSpace;' }],
          anchors: [],
          property: 'double',
          itemMessage: {
            workContent: '',
            time: '',
            timeUnit: '',
            workFireList: [],
            knowFireList: [],
            cost: [],
            CostList: [],
          },
        },
        {
          id: 'MtdXxmKZtB852351',
          name: 'verticalLane',
          title: '泳道(垂直)',
          category: 'lane',
          group: '',
          groupName: null,
          locked: false,
          link: '',
          children: [],
          parent: 'CdKuGnwxAM767271',
          resizeDir: ['l', 'b', 'r'],
          attribute: {
            container: true,
            visible: true,
            rotatable: false,
            linkable: false,
            collapsable: false,
            collapsed: false,
            markerOffset: 5,
          },
          dataAttributes: [],
          props: { x: 504, y: 295, w: 250, h: 500, zindex: -1, angle: 0 },
          shapeStyle: { alpha: 1 },
          lineStyle: {},
          fillStyle: { color: '212,227,250' },
          theme: {},
          path: [
            {
              fillStyle: { type: 'none' },
              lineStyle: { lineStyle: 'solid' },
              actions: [
                { action: 'move', x: '0', y: '0' },
                { action: 'line', x: 'w', y: '0' },
                { action: 'line', x: 'w', y: 'h' },
                { action: 'line', x: '0', y: 'h' },
                { action: 'close' },
              ],
            },
            {
              lineStyle: { lineStyle: 'solid' },
              actions: [
                { action: 'move', x: 0, y: 0 },
                { action: 'line', x: 'w', y: 0 },
                { action: 'line', x: 'w', y: 30 },
                { action: 'line', x: 0, y: 30 },
                { action: 'close' },
              ],
            },
          ],
          fontStyle: {},
          textBlock: [{ position: { x: 10, y: 0, w: 'w-20', h: 30 }, text: '&ZeroWidthSpace;' }],
          anchors: [],
        },
        {
          id: 'cyoycVtFMg963348',
          name: 'verticalLane',
          title: '泳道(垂直)',
          category: 'lane',
          group: '',
          groupName: null,
          locked: false,
          link: '',
          children: [],
          parent: 'CdKuGnwxAM767271',
          resizeDir: ['l', 'b', 'r'],
          attribute: {
            container: true,
            visible: true,
            rotatable: false,
            linkable: false,
            collapsable: false,
            collapsed: false,
            markerOffset: 5,
          },
          dataAttributes: [],
          props: { x: 754, y: 295, w: 250, h: 500, zindex: -1, angle: 0 },
          shapeStyle: { alpha: 1 },
          lineStyle: {},
          fillStyle: { color: '212,227,250' },
          theme: {},
          path: [
            {
              fillStyle: { type: 'none' },
              lineStyle: { lineStyle: 'solid' },
              actions: [
                { action: 'move', x: '0', y: '0' },
                { action: 'line', x: 'w', y: '0' },
                { action: 'line', x: 'w', y: 'h' },
                { action: 'line', x: '0', y: 'h' },
                { action: 'close' },
              ],
            },
            {
              lineStyle: { lineStyle: 'solid' },
              actions: [
                { action: 'move', x: 0, y: 0 },
                { action: 'line', x: 'w', y: 0 },
                { action: 'line', x: 'w', y: 30 },
                { action: 'line', x: 0, y: 30 },
                { action: 'close' },
              ],
            },
          ],
          fontStyle: {},
          textBlock: [{ position: { x: 10, y: 0, w: 'w-20', h: 30 }, text: '&ZeroWidthSpace;' }],
          anchors: [],
        },
        {
          id: 'wjcdesxyda_1671613567758',
          name: 'horizontalSeparator',
          title: '分隔符(水平)<br>需拖动到泳池泳道上',
          category: 'lane',
          group: '',
          groupName: null,
          locked: false,
          link: '',
          children: [],
          parent: 'CdKuGnwxAM767271',
          resizeDir: ['b'],
          attribute: {
            container: false,
            visible: true,
            rotatable: false,
            linkable: false,
            collapsable: false,
            collapsed: false,
            markerOffset: 5,
          },
          dataAttributes: [],
          props: { x: 504, y: 295, w: 500, h: 250, zindex: 2, angle: 0 },
          shapeStyle: { alpha: 1 },
          lineStyle: {},
          fillStyle: { color: '212,227,250' },
          theme: {},
          path: [
            {
              fillStyle: { type: 'none' },
              lineStyle: { lineStyle: 'solid' },
              actions: [
                { action: 'move', x: 0, y: 'h' },
                { action: 'line', x: 'w', y: 'h' },
              ],
            },
            {
              actions: [
                { action: 'move', x: 0, y: 0 },
                { action: 'line', x: 20, y: 0 },
                { action: 'line', x: 20, y: 'h' },
                { action: 'line', x: 0, y: 'h' },
                { action: 'close' },
              ],
            },
          ],
          fontStyle: {
            // orientation: 'horizontal',
            textAlign: 'center',
          },
          textBlock: [{ position: { x: 0, y: 5, w: 20, h: 'h-10' }, text: '&ZeroWidthSpace;' }],
          anchors: [],
          itemMessage: {
            workContent: '',
            time: '',
            timeUnit: '',
            workFireList: [],
            knowFireList: [],
            cost: [],
            CostList: [],
          },
        },
        {
          id: 'wjcdesxydb_1671613567758',
          name: 'horizontalSeparator',
          title: '分隔符(水平)<br>需拖动到泳池泳道上',
          category: 'lane',
          group: '',
          groupName: null,
          locked: false,
          link: '',
          children: [],
          parent: 'CdKuGnwxAM767271',
          resizeDir: ['b'],
          attribute: {
            container: false,
            visible: true,
            rotatable: false,
            linkable: false,
            collapsable: false,
            collapsed: false,
            markerOffset: 5,
          },
          dataAttributes: [],
          props: { x: 504, y: 545, w: 500, h: 250, zindex: 2, angle: 0 },
          shapeStyle: { alpha: 1 },
          lineStyle: {},
          fillStyle: { color: '212,227,250' },
          theme: {},
          path: [
            {
              fillStyle: { type: 'none' },
              lineStyle: { lineStyle: 'solid' },
              actions: [
                { action: 'move', x: 0, y: 'h' },
                { action: 'line', x: 'w', y: 'h' },
              ],
            },
            {
              actions: [
                { action: 'move', x: 0, y: 0 },
                { action: 'line', x: 20, y: 0 },
                { action: 'line', x: 20, y: 'h' },
                { action: 'line', x: 0, y: 'h' },
                { action: 'close' },
              ],
            },
          ],
          fontStyle: {
            // orientation: 'horizontal',
            textAlign: 'center',
          },
          textBlock: [{ position: { x: 0, y: 5, w: 20, h: 'h-10' }, text: '&ZeroWidthSpace;' }],
          anchors: [],
          itemMessage: {
            workContent: '',
            time: '',
            timeUnit: '',
            workFireList: [],
            knowFireList: [],
            cost: [],
            CostList: [],
          },
        },
      ];
      let c = {
        page: {
          padding: 20,
          orientation: 'portrait',
          backgroundColor: '255,255,255',
          gridSize: 15,
          width: 1628,
          lineJumps: false,
          showGrid: true,
          height: 1000,
        },
        elements: {},
        version: 0,
      };
      for (var i = 0; i < ele.length; i++) {
        c.elements[ele[i].id] = ele[i];
      }

      // MessageSource.undoStack.push([{
      //   action:  "create",
      //   content: ele
      // }])

      window.onkeydown = function (e) {
        if (e.ctrlKey) {
          if (e.key === 'z') {
            Model.remove(ele, false);
          }
        }
      };

      Designer.open(c);
      Designer.initialize.canvasSizeAuto();
    },
    redoList() {
      console.log(MessageSource.undoStack.stack);
    },
    //处理数据
    reSetData(arr) {
      let hasPool =
        arr &&
        arr.some((item) => {
          if (item.category == 'lane') {
            return true;
          }
        });
      console.log(hasPool, 222);
      if (hasPool) {
        //有泳道
        //水平泳道
      }
    },

    //生成缩略图
    toSvg() {
      let oldDdata = Utils.copy(Model.define);
      let mapData = Object.values(oldDdata.elements);
      var b = TeamShape.flow2svg.init(mapData);
      console.log(this.baseImg(b));
      return b;
    },
    baseImg(dataurl) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    magnify() {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        return;
      }
      document.getElementById('home1').mozRequestFullScreen();
    },
    onMessage(event) {
      if (event.data.type === 'returnShow') {
        if (this.showItem) {
          this.itemMessage.workFireList = this.itemMessage.workFireList.concat(event.data.iframeMessage);
        } else {
          this.flowMessage.workFireList = this.flowMessage.workFireList.concat(event.data.iframeMessage);
        }
      } else if (event.data.type === 'returnShow2') {
        if (this.showItem) {
          this.itemMessage.knowFireList = this.itemMessage.knowFireList.concat(event.data.iframeMessage);
        } else {
          this.flowMessage.knowFireList = this.flowMessage.knowFireList.concat(event.data.iframeMessage);
        }
      }
    },
    //节点导入
    //右上角收缩
    FileSwitch(val) {
      const dom = document.querySelector(`.FileList${val}`);
      if (dom) {
        if (val === 0) {
          if (this.FileListFlag0) {
            dom.style.width = '168px';
            dom.style.height = '35px';
          } else {
            dom.style.width = '450px';
            dom.style.height = '200px';
          }
          this.FileListFlag0 = !this.FileListFlag0;
        } else if (val === 1) {
          if (this.FileListFlag1) {
            dom.style.width = '168px';
            dom.style.height = '35px';
          } else {
            dom.style.width = '450px';
            dom.style.height = 'auto';
          }
          this.FileListFlag1 = !this.FileListFlag1;
        } else if (val === 2) {
          if (this.FileListFlag2) {
            dom.style.width = '168px';
            dom.style.height = '35px';
          } else {
            dom.style.width = '450px';
            dom.style.height = 'auto';
          }
          this.FileListFlag2 = !this.FileListFlag2;
        } else if (val === 3) {
          if (this.FileListFlag3) {
            dom.style.width = '168px';
            dom.style.height = '35px';
          } else {
            dom.style.width = '450px';
            dom.style.height = '200px';
          }
          this.FileListFlag3 = !this.FileListFlag3;
        } else if (val === 4) {
          if (this.FileListFlag4) {
            dom.style.width = '168px';
            dom.style.height = '35px';
          } else {
            dom.style.width = '450px';
            dom.style.height = '140px';
          }
          this.FileListFlag4 = !this.FileListFlag4;
        }
      }
    },
    //新增费用
    addCostList() {
      let obj = { key: '', valye: 0, type: '1' };

      console.log(this.itemMessage.CostList, 'rrrrrrrrrrrrr');
      if (this.showItem) this.itemMessage.CostList.push(obj);
      else this.flowMessage.CostList.push(obj);
    },
    //删除费用
    delectCost(index) {
      if (this.showItem) this.itemMessage.CostList.splice(index, 1);
      else this.flowMessage.CostList.splice(index, 1);
    },

    //上传工作文档确认
    sureAddWork(list) {
      window.parent.postMessage({ iframeMessage: list, type: 'uploadFile' }, '*');
      this.isFileFlag1 = false;
    },
    //上传工作文档取消
    cancelAddWork() {
      this.isFileFlag1 = false;
    },
    //上传参考知识确认
    sureAddPoint(list1) {
      window.parent.postMessage({ iframeMessage: list1, type: 'uploadFile2' }, '*');
      this.isFileFlag2 = false;
    },
    //取消弹框
    cancelAddPoint() {
      this.isFileFlag2 = false;
    },
    addDom(info, id = 'doublePlus', className = 'double-plus', style, cb) {
      const doublePlusDom = document.getElementById(id);
      const dom = document.getElementById(info[0].id);
      const props = info[0].props;
      if (!doublePlusDom) {
        var n = document.createElement('div');
        n.id = id;
        n.className = className;
        n.style = style;
        dom.appendChild(n);

        const doublePlusDom = document.getElementById(id);
        doublePlusDom.addEventListener('click', (e) => {
          console.log('=======');
          e.stopPropagation();
          cb(e);
        });
      }
    },
    addDomUpLine(info) {
      const id = 'doublePlus';
      const className = 'double-plus';
      const style = `
        position: absolute; 
        right: 2px;
        top: 8px;
        z-index: 0;
      `;
      this.addDom(info, id, className, style, (e) => {
        Utils.selectShape([info[0].id]);
        console.log('=======', document.querySelector('.lanebar_box .spinner_up'));
        document.querySelector('.lanebar_box .spinner_up').click();
      });
    },
    addDomDownLine(info) {
      const id = 'doubleDownPlus';
      const className = 'double-plus';
      const style = `
        position: relative; 
        right: -8px;
        top: -3px;
        height: 16px;
        z-index: 0;
      `;
      this.addDom(info, id, className, style, (e) => {
        Utils.selectShape([info[0].id]);
        this.addLine();
      });
    },
    delDomUpLine(info) {
      const id = 'doubleDel';
      const className = 'double-del';
      const style = `
        position: absolute; 
        right: 2px;
        top: 26px;
        z-index: 0;
      `;
      this.addDom(info, id, className, style, (e) => {
        Utils.selectShape([info[0].id]);
        document.querySelector('.lanebar_box .spinner_down').click();
      });
    },
    delDomDownLine(info) {
      const id = 'doubleDelPlus';
      const className = 'double-del';
      const style = `
        position: relative; 
        right: -27px;
        top: -19px;
        height: 16px;
        z-index: 0;
      `;
      this.addDom(info, id, className, style, (e) => {
        Utils.selectShape([info[0].id]);
        this.delLine();
      });
    },
  },
  beforeDestroy() {
    Bus.$off('home1CreateEditMsg');
  },
};
</script>

<style>
.home1 .double-plus::after {
  content: ' ';
  position: absolute;
  top: 0px;
  left: 0;
  background: url('~@/static/plus.png') no-repeat;
  height: 16px;
  width: 16px;
  cursor: pointer;
  background-size: 100%;
}
.home1 .double-del::after {
  content: ' ';
  position: absolute;
  top: 0px;
  left: 0;
  background: url('~@/static/delete.png') no-repeat;
  height: 16px;
  width: 16px;
  cursor: pointer;
  background-size: 100%;
}
.home1 #designer_canvas {
  background: #e1eaf7 !important;
  box-shadow: none;
}
.home1 .lanebar {
  background-color: #d1e1f8 !important;
  border-radius: 0 0 5px 5px;
  left: 300px;
  right: 0px;
}
.home1 .thislist {
  display: flex;
  justify-content: space-between;
  height: 40px;
  align-items: center;
  padding: 0 60px;
}
.home1 .listSpan1 {
  width: 80%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 400;
  color: #2458bf;
  font-size: 16px;
}
.home1 #designer_contextmenu {
  display: none;
}

.home1 #canvas_container {
  padding: 20px !important;
}
.home1 #designer_layout {
  background: #e1eaf7 !important;
}
.home1 .el-select-dropdown.el-popper {
  z-index: 20000 !important;
}
</style>

<style scoped>
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

/* .vue-treeselect__menu-container {
  font-size: 15px;
} */
</style>

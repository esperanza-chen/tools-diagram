<template>
  <div style="height: 100%" ref="designerPage" id="flowTool1">
    <canvas id="support_canvas" style="display: none"></canvas>

    <div id="load_mask" style="position: absolute; z-index: 1000; background: white; width: 100%; height: 5000px"></div>
    <div id="designer_header">
      <!-- <div class="titlebar">
        <a class="btn_back" href="/diagraming/back?id=62874ea8513b7190af124543" title="返回"
          ><span class="ico ico_goback"></span
        ></a>
        <div class="row row1">
          <div id="title_container">
            <span class="diagram_title">产品登录流程</span>
          </div>
        </div>
        <div class="row row2 menubar">
          <ul id="menu_bar">
            <li id="menu_bar_file" tit="menu_bar_file" menu="bar_list_file">文件</li>
            <li id="menu_bar_edit" tit="menu_bar_edit" menu="bar_list_edit">编辑</li>
            <li id="menu_bar_view" tit="menu_bar_view" menu="bar_list_view">视图</li>
            <li id="menu_bar_insert" tit="menu_bar_insert" menu="bar_list_insert">插入</li>
            <li id="menu_bar_page" tit="menu_bar_page" menu="bar_list_page">页面</li>
            <li id="menu_bar_arrange" tit="menu_bar_arrange" menu="bar_list_arrange">排列</li>
            <li id="menu_bar_help" tit="menu_bar_help" menu="bar_list_help">帮助</li>
          </ul>
          <div id="saving_tip"></div>
        </div>
        <div class="share_container">
          <div class="header_right_btn">
            <div class="toolbar_button active" id="export_btn" style="padding: 0px 10px;" menu="export_file">下载</div>
            <div id="colla_btn" class="toolbar_button active" style="padding: 0px 10px;" onclick="UI.showAddColla()">
              协作
            </div>
            <div id="publish_btn" class="toolbar_button active" style="padding: 0px 10px;" onclick="UI.showPublish()">
            
              发布
            </div>
            <div
              id="share_btn"
              class="toolbar_button drop_button active"
              onmousedown="UI.showShareMenu(event)"
              style="display: none;"
            >
              分享
              <span class="icon_0323">&#xe99d;</span>
            </div>
            <div
              id="wemeet_share_btn"
              class="toolbar_button drop_button active"
              style="display: none; background: #4386f5ff; color: #ffffff;"
              onmousedown="UI.showShareMenu(event)"
            >
              分享
              <img
                class="mind-icons"
                src="assets/images/wemeet/wemeet_share_white.svg"
                style="width: 18px; height: 18px; padding: 2px 0;"
              />
            </div>
          </div>
          <div class="user" onmousedown="UI.showUserMenu(event)">
            <img src="http://user-photo.ks3-cn-beijing.ksyuncs.com/62874ea5513b7190af12453d.png" />
            <div class="ico ico_accordion"></div>
          </div>
        </div>
      </div> -->

      <div class="toolbar">
        <div class="toolbar_con">
          <div class="toolbar_con_left icons">&#xe6c1d;</div>
          <div class="toolbar_con_right icons">&#xe7c5;</div>
          <div class="toolbar_con_box">
            <div id="bar_theme" tit="bar_theme" class="toolbar_button" title="切换风格">
              <div class="diagraming-icons" style="margin-right: 5px">&#xe729;</div>
            </div>
            <div class="toolbar_devider"></div>
            <div id="bar_undo" tit="bar_undo" class="toolbar_button" title="撤销 (Ctrl+Z)">
              <div class="ico diagraming-icons">&#xe72a;</div>
            </div>
            <div id="bar_redo" tit="bar_redo" class="toolbar_button" title="恢复 (Ctrl+Y)">
              <div class="ico diagraming-icons">&#xe72b;</div>
            </div>
            <div id="bar_brush" tit="bar_brush" class="toolbar_button" title="格式刷 (Ctrl+Shift+B)">
              <div class="ico diagraming-icons">&#xe785;</div>
            </div>
            <div class="toolbar_devider"></div>
            <div id="bar_font_family" title="字体" class="toolbar_button" style="width: 80px">
              <div class="text_content">Alibaba PuHuiTi Regular</div>
              <div class="ico ico_dropdown"></div>
            </div>
            <div class="toolbar_small_devider"></div>
            <div id="bar_font_size" title="字号" class="spinner" style="width: 50px"></div>
            <div class="toolbar_small_devider"></div>
            <div id="bar_font_bold" title="粗体 (Ctrl+B)" class="toolbar_button">
              <div class="ico diagraming-icons">&#xe72e;</div>
            </div>
            <div id="bar_font_italic" title="斜体 (Ctrl+I)" class="toolbar_button">
              <div class="ico diagraming-icons">&#xe72f;</div>
            </div>
            <div id="bar_font_underline" title="下划线 (Ctrl+U)" class="toolbar_button">
              <div class="ico diagraming-icons">&#xe782;</div>
            </div>
            <div id="bar_font_color" title="文本颜色" class="toolbar_button drop_button">
              <div class="ico diagraming-icons">&#xe784;</div>
              <div class="btn_color" style="background-color: rgb(50, 50, 50)"></div>
              <div class="ico ico_dropdown"></div>
            </div>
            <div id="bar_font_align" title="对齐" class="toolbar_button drop_button">
              <div class="ico diagraming-icons">&#xe735;</div>
              <div class="ico ico_dropdown"></div>
            </div>
            <div id="bar_font_height" title="行高" class="toolbar_button drop_button">
              <div class="ico diagraming-icons">&#xe762;</div>
              <div class="ico ico_dropdown"></div>
            </div>
            <div class="toolbar_devider"></div>
            <div id="bar_fill" tit="bar_fill" title="填充样式" class="toolbar_button drop_button">
              <div class="ico diagraming-icons">&#xe738;</div>
              <div class="btn_color" style="background-color: rgb(255, 255, 255)"></div>
              <div class="ico ico_dropdown"></div>
            </div>
            <div id="bar_line_color" tit="bar_line_color" title="线条颜色" class="toolbar_button drop_button">
              <div class="ico diagraming-icons">&#xe73a;</div>
              <div class="btn_color" style="background-color: rgb(50, 50, 50)"></div>
              <div class="ico ico_dropdown"></div>
            </div>
            <div id="bar_line_width" tit="bar_line_width" title="线宽" class="toolbar_button drop_button">
              <div class="ico diagraming-icons">&#xe737;</div>
              <div class="ico ico_dropdown"></div>
            </div>
            <div id="bar_line_style" tit="bar_line_style" title="线条样式" class="toolbar_button drop_button">
              <div class="ico diagraming-icons">&#xe739;</div>
              <div class="ico ico_dropdown"></div>
            </div>
            <div class="toolbar_devider"></div>
            <div id="bar_linkertype" tit="bar_linkertype" title="连线类型" class="toolbar_button drop_button">
              <div tit="broken" class="ico diagraming-icons">&#xe73d;</div>
              <div tit="curve" class="ico diagraming-icons" style="display: none">&#xe73c;</div>
              <div tit="normal" class="ico diagraming-icons" style="display: none">&#xe73b;</div>
              <div class="ico ico_dropdown"></div>
            </div>
            <div id="bar_beginarrow" tit="bar_beginarrow" title="起点" class="toolbar_button drop_button">
              <div arrow="none" class="ico diagraming-icons">
                <svg class="icon-svg" aria-hidden="true"><use xlink:href="#iconwuduandian_huaban1_huaban1"></use></svg>
              </div>
              <div arrow="solidArrow" class="ico diagraming-icons" style="display: none">&#xe73f;</div>
              <div arrow="dashedArrow" class="ico diagraming-icons" style="display: none">&#xe740;</div>
              <div arrow="normal" class="ico diagraming-icons" style="display: none">&#xe741;</div>
              <div arrow="solidDiamond" class="ico diagraming-icons" style="display: none">&#xe73e;</div>
              <div arrow="dashedDiamond" class="ico diagraming-icons" style="display: none">&#xe742;</div>
              <div arrow="solidCircle" class="ico diagraming-icons" style="display: none">&#xe745;</div>
              <div arrow="dashedCircle" class="ico diagraming-icons" style="display: none">&#xe743;</div>
              <div arrow="cross" class="ico diagraming-icons" style="display: none">&#xe746;</div>
              <div arrow="asynch1" class="ico diagraming-icons" style="display: none">&#xe744;</div>
              <div arrow="asynch2" class="ico diagraming-icons" style="display: none">&#xe747;</div>
              <div class="ico ico_dropdown"></div>
            </div>
            <div id="bar_endarrow" tit="bar_endarrow" title="终点" class="toolbar_button drop_button">
              <div arrow="none" class="ico diagraming-icons">
                <svg class="icon-svg" aria-hidden="true">
                  <use xlink:href="#iconwuduandian_huaban1_huaban1-copy"></use>
                </svg>
              </div>
              <div arrow="solidArrow" class="ico diagraming-icons" style="display: none">&#xe76a;</div>
              <div arrow="dashedArrow" class="ico diagraming-icons" style="display: none">&#xe769;</div>
              <div arrow="normal" class="ico diagraming-icons" style="display: none">&#xe768;</div>
              <div arrow="solidDiamond" class="ico diagraming-icons" style="display: none">&#xe76b;</div>
              <div arrow="dashedDiamond" class="ico diagraming-icons" style="display: none">&#xe767;</div>
              <div arrow="solidCircle" class="ico diagraming-icons" style="display: none">&#xe765;</div>
              <div arrow="dashedCircle" class="ico diagraming-icons" style="display: none">&#xe766;</div>
              <div arrow="cross" class="ico diagraming-icons" style="display: none">&#xe76c;</div>
              <div arrow="asynch1" class="ico diagraming-icons" style="display: none">&#xe764;</div>
              <div arrow="asynch2" class="ico diagraming-icons" style="display: none">&#xe76d;</div>
              <div class="ico ico_dropdown"></div>
            </div>
            <div class="toolbar_devider"></div>
            <div id="bar_arrange_align" tit="bar_arrange_align" title="图形对齐" class="toolbar_button drop_button">
              <div class="ico diagraming-icons">&#xe749;</div>
              <div class="ico ico_dropdown"></div>
            </div>
            <div id="bar_front" tit="bar_front" title="置于顶层 (Ctrl+] )" class="toolbar_button">
              <div class="ico diagraming-icons">&#xe751;</div>
            </div>
            <div id="bar_back" tit="bar_back" title="置于底层 (Ctrl+[ )" class="toolbar_button">
              <div class="ico diagraming-icons">&#xe752;</div>
            </div>
            <div class="toolbar_devider"></div>
            <div id="bar_lock" tit="bar_lock" title="锁定 (Ctrl+L1)" class="toolbar_button">
              <div class="ico diagraming-icons">&#xe753;</div>
            </div>
            <div id="bar_unlock" tit="bar_unlock" title="解锁 (Ctrl+Shift+L)" class="toolbar_button">
              <div class="ico diagraming-icons">&#xe754;</div>
            </div>
            <div class="toolbar_small_devider"></div>
            <div id="bar_link" tit="bar_link" title="插入链接" class="toolbar_button">
              <div class="ico diagraming-icons">&#xe755;</div>
            </div>
            <div class="toolbar_small_devider"></div>
            <div id="bar_beautify" tit="bar_beautify" title="一键美化，优化图形布局、连线和大小" class="toolbar_button">
              <div class="ico diagraming-icons">&#xe789;</div>
            </div>
          </div>
        </div>
        <div class="toolbar_right">
          <!-- <div id="brain-power" class="brainpower" original-title="功能查找">
            <span style="font-size: 14px;" class="ico diagraming-icons">&#xe78c;</span>功能查找
          </div> -->
          <!-- <div id="bar_collapse" class="toolbar_button"><div class="ico collapse"></div></div> -->
        </div>
        <!-- <a id="bar_return" class="toolbar_button" href="/diagraming/back?id=62874ea8513b7190af124543" title="返回"
          ><span class="ico ico_goback"></span
        ></a> -->
      </div>
      <div class="lanebar">
        <div class="lanebar_box" style="float: left; margin: 5px 20px">
          <div id="bar_lane_num" class="spinner active" style="width: 60px; border-color: #63abf7"></div>
          <div class="lanebar_tit" style="padding-top: 6px">泳道数量</div>
        </div>
        <div class="lanebar_small_devider"></div>
        <div class="lanebar_box">
          <div class="lanebar_button" id="bar_pool_horizontal" title="泳池(水平)">
            <div class="ico diagraming-icons">&#xe7c9;</div>
          </div>
          <div class="lanebar_button" id="bar_pool_vertical" title="泳池(垂直)">
            <div class="ico diagraming-icons">&#xe7ca;</div>
          </div>
          <div class="lanebar_tit">泳池方向</div>
        </div>
        <div class="lanebar_small_devider"></div>
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
      <div class="gridbar">
        <div class="gridbar_box" style="float: left; margin: 5px 20px">
          <div id="bar_grid_row" class="spinner active" style="width: 60px; border-color: #63abf7"></div>
          <div class="gridbar_tit" style="padding-top: 6px">行</div>
        </div>
        <div class="gridbar_small_devider"></div>
        <div class="gridbar_box" style="float: left; margin: 5px 20px">
          <div id="bar_grid_column" class="spinner active" style="width: 60px; border-color: #63abf7"></div>
          <div class="gridbar_tit" style="padding-top: 6px">列</div>
        </div>
        <div class="gridbar_small_devider"></div>
        <div class="gridbar_box">
          <div class="gridbar_button" id="bar_column_before" title="左侧插入1列">
            <div class="ico diagraming-icons">&#xe7d3;</div>
          </div>
          <div class="gridbar_button" id="bar_column_after" title="右侧插入1列">
            <div class="ico diagraming-icons">&#xe7d4;</div>
          </div>
          <div class="gridbar_tit">插入列</div>
        </div>
        <div class="gridbar_small_devider"></div>
        <div class="gridbar_box">
          <div class="gridbar_button" id="bar_row_before" title="上方插入1行">
            <div class="ico diagraming-icons">&#xe7d6;</div>
          </div>
          <div class="gridbar_button" id="bar_row_after" title="下方插入1行">
            <div class="ico diagraming-icons">&#xe7d5;</div>
          </div>
          <div class="gridbar_tit">插入行</div>
        </div>
        <div class="gridbar_small_devider"></div>
        <div class="gridbar_box">
          <div class="gridbar_button" id="bar_del_column" title="删除选中列">
            <div class="ico diagraming-icons">&#xe7e5;</div>
          </div>
          <div class="gridbar_button" id="bar_del_row" title="删除选中行">
            <div class="ico diagraming-icons">&#xe7e6;</div>
          </div>
          <div class="gridbar_tit">删除</div>
        </div>
        <div class="gridbar_box">
          <div id="bar_grid_fill" title="" class="gridbar_button drop_button">
            <div class="ico diagraming-icons">&#xe738;</div>
            <div class="btn_color" style="background-color: rgb(255, 255, 255)"></div>
            <div class="ico ico_dropdown"></div>
          </div>
          <div class="gridbar_tit">填充</div>
        </div>
      </div>
    </div>
    <div id="designer">
      <div id="shape_panel" class="layout"></div>
      <div id="designer_viewport">
        <div class="layout_bar"></div>
        <div id="designer_layout" class="layout">
          <div id="canvas_container" style="background: #e1eaf7">
            <div id="designer_canvas">
              <canvas id="designer_grids" style="display: block"></canvas>
              <ul id="designer_contextmenu" class="menu list options_menu">
                <li ac="cut">
                  <div class="ico diagraming-icons">&#xe75a;</div>
                  剪切
                  <div class="extend">Ctrl+X</div>
                </li>
                <li ac="copy">
                  <div class="ico diagraming-icons">&#xe757;</div>
                  复制
                  <div class="extend">Ctrl+C</div>
                </li>
                <li ac="paste">
                  <div class="ico diagraming-icons">&#xe758;</div>
                  粘贴
                  <div class="extend">Ctrl+V</div>
                </li>
                <li ac="duplicate">
                  复用
                  <div class="extend">Ctrl+D</div>
                </li>
                <li ac="defaultStyle">
                  设置为默认样式
                  <div class="extend tip_text" click-btn="clearStyle">删除</div>
                </li>
                <li ac="replace">
                  <div class="ico theme"></div>
                  替换图形
                </li>
                <li ac="equation"><span class="eq-tip">VIP限免</span>LaTeX方程式</li>
                <li class="devider devi_clip"></li>
                <li ac="front">
                  <div class="ico diagraming-icons">&#xe751;</div>
                  置于顶层
                  <div class="extend">Ctrl+]</div>
                </li>
                <li ac="back">
                  <div class="ico diagraming-icons">&#xe752;</div>
                  置于底层
                  <div class="extend">Ctrl+[</div>
                </li>
                <li ac="lock">
                  <div class="ico diagraming-icons">&#xe753;</div>
                  锁定
                  <div class="extend">Ctrl+L</div>
                </li>
                <li ac="unlock">
                  <div class="ico diagraming-icons">&#xe754;</div>
                  解锁
                  <div class="extend">Ctrl+Shift+L</div>
                </li>
                <li ac="group">
                  组合
                  <div class="extend">Ctrl+G</div>
                </li>
                <li ac="ungroup">
                  取消组合
                  <div class="extend">Ctrl+Shift+G</div>
                </li>
                <li id="ctxmenu_align">
                  图形对齐
                  <div class="extend ex_arrow">►</div>
                  <ul style="right: -182px" class="menu list extend_menu">
                    <li style="width: 140px" ac="align_shape" al="left">
                      左对齐
                      <div class="extend">Alt+L</div>
                    </li>
                    <li style="width: 140px" ac="align_shape" al="center">
                      居中对齐
                      <div class="extend">Alt+C</div>
                    </li>
                    <li style="width: 140px" ac="align_shape" al="right">
                      右对齐
                      <div class="extend">Alt+R</div>
                    </li>
                    <li class="devider"></li>
                    <li ac="align_shape" al="top">顶端对齐</li>
                    <li ac="align_shape" al="middle">垂直居中对齐</li>
                    <li ac="align_shape" al="bottom">底端对齐</li>
                  </ul>
                </li>
                <li class="devider devi_shape"></li>
                <li ac="changelink">
                  <div class="ico ico_link"></div>
                  修改链接
                </li>
                <li ac="edit">
                  <div class="ico diagraming-icons">&#xe75f;</div>
                  编辑文本
                  <div class="extend">空格</div>
                </li>
                <li ac="delete">
                  <div class="ico diagraming-icons">&#xe759;</div>
                  删除
                  <div class="extend">Delete/Backspace</div>
                </li>
                <li class="devider devi_del"></li>
                <li ac="selectall">
                  全选
                  <div class="extend">Ctrl+A</div>
                </li>
                <li class="devider devi_selectall"></li>
                <li ac="drawline">
                  <div class="ico diagraming-icons">&#xe73b;</div>
                  创建连线
                  <div class="extend">L</div>
                </li>
              </ul>
            </div>
          </div>
          <div id="shape_img_container"></div>
          <div id="layout_block"></div>
        </div>
        <div id="shape_thumb" class="menu">
          <canvas width="160px"></canvas>
          <div></div>
        </div>
        <div v-show="showItem" id="showItem">
          <div class="showItem-box">
            <div class="showItem-close">
              <div class="showItem-close-right"><div>></div></div>
            </div>
            <div class="showItem-title">
              <div>工作内容</div>
            </div>
            <el-input
              style="margin-bottom: 15px; height: 139px"
              type="textarea"
              :rows="2"
              resize="none"
              placeholder="请输入内容"
              v-model="itemMessage.workContent"
            >
            </el-input>
          </div>
        </div>
        <div id="dock">
          <div class="dock_header"></div>
          <div class="dock_buttons">
            <div
              id="dock_btn_navigator"
              tit="dock_btn_navigator"
              title="导航"
              disableTitle="true"
              class="toolbar_button"
              onclick="Dock.showView('navigator', true)"
            >
              <div class="ico ico_dock_nav"></div>
            </div>
            <div
              id="dock_btn_graphic"
              tit="dock_btn_graphic"
              title="图形"
              disableTitle="true"
              class="toolbar_button"
              onclick="Dock.showView('graphic', true)"
            >
              <div class="ico ico_dock_styles"></div>
            </div>
            <div
              id="dock_btn_metric"
              tit="dock_btn_metric"
              title="度量"
              disableTitle="true"
              class="toolbar_button"
              onclick="Dock.showView('metric', true)"
            >
              <div class="ico ico_dock_metric"></div>
            </div>
            <div
              id="dock_btn_attribute"
              tit="dock_btn_attribute"
              title="数据属性"
              disableTitle="true"
              class="toolbar_button"
              onclick="Dock.showView('attribute', true)"
            >
              <div class="ico ico_dock_attribute"></div>
            </div>
            <div
              id="dock_btn_page"
              tit="dock_btn_page"
              title="页面设置"
              disableTitle="true"
              class="toolbar_button"
              onclick="Dock.showView('page', true)"
            >
              <div class="ico ico_dock_page"></div>
            </div>
            <div
              id="dock_btn_history"
              tit="dock_btn_history"
              title="历史版本"
              disableTitle="true"
              class="toolbar_button"
              onclick="Dock.showView('history', true)"
            >
              <div class="ico ico_history"></div>
            </div>
            <div
              id="dock_btn_comment"
              tit="dock_btn_comment"
              title="评论"
              disableTitle="true"
              class="toolbar_button"
              onclick="Dock.showView('comment', true)"
            >
              <div class="ico ico_comment"></div>
            </div>
          </div>
        </div>
        <div id="navigation_view" class="dock_view dock_view_navigator">
          <div class="dock_view_header">
            导航
            <div class="ico ico_dock_collapse"></div>
          </div>
          <div class="navigation_bounding">
            <div class="navigation_view_container">
              <canvas id="navigation_canvas" width="120px" height="160px"></canvas>
              <div id="navigation_eye"></div>
            </div>
          </div>
          <div class="dock_devider" style="margin: 0px 10px"></div>
          <div class="navigation_view_bar">
            缩放：
            <div id="dock_zoom" class="spinner active"></div>
            <div class="toolbar_button active" onclick="Dock.enterFullScreen()" title="全屏视图 (F11)">
              <div class="ico ico_fullscreen"></div>
            </div>
            <div class="toolbar_button active" onclick="Dock.enterPresentation()" title="演示视图 (F10)">
              <div class="ico ico_presentation"></div>
            </div>
          </div>
          <div id="fullscreen_tip" class="alert error">
            <div class="ico dlg_close" onclick="$('#fullscreen_tip').hide();"></div>
            <div class="t"></div>
            <div class="full_suggest">
              <span>我们推荐使用以下浏览器：</span>
              <a href="http://www.google.com/chrome" target="_blank"><span class="ico chrome"></span></a>
              <a href="http://www.firefox.com" target="_blank"><span class="ico firefox"></span></a>
            </div>
          </div>
        </div>
        <div class="dock_view dock_view_graphic">
          <div class="dock_view_header">
            图形
            <div class="ico ico_dock_collapse"></div>
          </div>
          <div class="dock_content">
            <div class="dock_content_title">连线</div>
            <div id="dock_line_color" class="picker_btn btn_inline"></div>
            <div
              id="dock_line_style"
              class="toolbar_button drop_button active btn_inline"
              style="margin: 0px 0px 0px 10px"
            >
              <div class="ico linestyle linesolid"></div>
              <div class="ico ico_dropdown"></div>
            </div>
            <div id="dock_line_width" class="spinner active btn_inline" style="width: 82px; margin-left: 10px"></div>
            <div style="clear: both"></div>
            <div class="dock_devider"></div>
            <div class="dock_content_title">填充样式</div>
            <div id="dock_fill_type" class="toolbar_button active">
              <div class="text_content"></div>
              <div class="ico ico_dropdown"></div>
            </div>
            <div class="fill_detail fill_detail_solid">
              <div id="fill_solid_btn" class="picker_btn"></div>
            </div>
            <div class="fill_detail fill_detail_gradient">
              <div id="fill_gradient_begin" c="255,255,255" class="picker_btn btn_inline"></div>
              <div id="gradient_swap" class="toolbar_button btn_normal btn_inline">
                <div class="ico gradient_swap"></div>
              </div>
              <div id="fill_gradient_end" c="255,255,255" class="picker_btn btn_inline"></div>
              <div
                id="gradient_type"
                class="toolbar_button active btn_normal btn_inline"
                style="width: 100px; margin: 0px 0px 0px 10px"
              >
                <div class="text_content"></div>
                <div class="ico ico_dropdown"></div>
              </div>
              <div style="clear: both"></div>
              <div id="gradient_type_linear" class="gradient_details">
                角度：
                <div id="gradient_angle" class="spinner active" style="width: 100px; display: inline-block"></div>
              </div>
              <div id="gradient_type_radial" class="gradient_details">
                半径：
                <div id="gradient_radius" class="spinner active" style="width: 100px; display: inline-block"></div>
              </div>
              <div style="clear: both"></div>
            </div>
            <div class="fill_detail fill_detail_image">
              <div id="fill_change_img" class="toolbar_button active" style="width: 95px">更改图片</div>
              <div style="height: 10px"></div>
              显示方式：
              <div id="fill_img_display" class="toolbar_button active" style="width: 100px; display: inline-block">
                <div class="text_content"></div>
                <div class="ico ico_dropdown"></div>
              </div>
            </div>
            <div class="dock_devider"></div>
            <div class="dock_content_title">透明度</div>
            <div id="spinner_opacity" class="spinner active" style="width: 90px"></div>
          </div>
        </div>
        <div class="dock_view dock_view_metric">
          <div class="dock_view_header">
            度量
            <div class="ico ico_dock_collapse"></div>
          </div>
          <div class="dock_content">
            <div class="dock_content_title">位置和大小</div>
            <div class="dock_label">X:</div>
            <div id="dock_metric_x" class="spinner active btn_inline" style="width: 65px"></div>
            <div class="dock_label">宽:</div>
            <div id="dock_metric_w" class="spinner active btn_inline" style="width: 65px"></div>
            <div style="clear: both; height: 10px"></div>
            <div class="dock_label">Y:</div>
            <div id="dock_metric_y" class="spinner active btn_inline" style="width: 65px"></div>
            <div class="dock_label">高:</div>
            <div id="dock_metric_h" class="spinner active btn_inline" style="width: 65px"></div>
            <div style="clear: both"></div>
            <div class="dock_devider"></div>
            <div class="dock_content_title">旋转方向</div>
            <div id="dock_metric_angle" class="spinner active" style="width: 95px; display: inline-block"></div>
          </div>
        </div>
        <div class="dock_view dock_view_page">
          <div class="dock_view_header">
            页面设置
            <div class="ico ico_dock_collapse"></div>
          </div>
          <div class="dock_content">
            <div class="dock_content_title">页面</div>
            <div class="dock_label" style="width: 80px">页面大小:</div>
            <div
              id="dock_page_size"
              class="toolbar_button active btn_inline"
              style="width: 110px; display: inline-block"
            >
              <div class="text_content"></div>
              <div class="ico ico_dropdown"></div>
            </div>
            <div style="height: 10px; clear: both"></div>
            <div class="dock_label" style="width: 80px">内边距:</div>
            <div
              id="dock_page_padding"
              class="toolbar_button active btn_inline"
              style="width: 110px; display: inline-block"
            >
              <div class="text_content"></div>
              <div class="ico ico_dropdown"></div>
            </div>
            <div style="height: 10px; clear: both"></div>
            <div class="dock_label" style="width: 80px">背景颜色:</div>
            <div id="dock_page_color" class="picker_btn btn_inline"></div>
            <div style="height: 10px; clear: both"></div>
            <div class="dock_label" style="width: 80px">页面方向:</div>
            <div class="dock_page_ori_list">
              <input type="radio" name="dock_page_ori" value="portrait" />竖向<br />
              <input type="radio" name="dock_page_ori" value="landscape" />横向
            </div>
            <div style="clear: both"></div>
            <div class="dock_devider"></div>
            <div class="dock_content_title">网格</div>
            <input id="dock_page_showgrid" type="checkbox" /><label for="dock_page_showgrid">显示网格</label>
            <div id="dock_gridsize_box" style="margin-top: 10px">
              <div class="dock_label">网格大小:</div>
              <div
                id="dock_page_gridsize"
                class="toolbar_button active btn_inline"
                style="width: 110px; display: inline-block"
              >
                <div class="text_content"></div>
                <div class="ico ico_dropdown"></div>
              </div>
              <div style="clear: both"></div>
            </div>
            <div style="height: 10px; clear: both"></div>
            <input id="dock_page_showPrintLine" type="checkbox" /><label for="dock_page_showPrintLine"
              >显示打印分隔线</label
            >
            <div class="dock_devider"></div>
            <div class="dock_content_title">跨线</div>
            <div class="dock_page_jumps_list">
              <input type="radio" name="dock_page_jumps" id="dock_page_jumps1" value="false" /><label
                for="dock_page_jumps1"
                >不显示</label
              >&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="radio" name="dock_page_jumps" id="dock_page_jumps2" value="true" /><label
                for="dock_page_jumps2"
                >显示</label
              >
            </div>
            <div class="dock_devider"></div>
            <div>
              <div class="dock_watermark_box" id="dock_watermark_box">
                <div class="dock_content_title">
                  水印
                  <span class="diagraming-icons dock-member-icon"
                    ><img class="vip" src="images/icon/po_vip.svg"
                  /></span>
                  <div id="reset-watermark">
                    <span class="diagraming-icons" original-title="清除">&#xe783;</span>
                  </div>
                  <a
                    href="/upgrade"
                    id="dock_topic_sytip"
                    class="uplpad_file_tip hide"
                    target="_blank"
                    style="font-size: 12px"
                    onclick="poCollect('访问升级页面',{'功能':'流程图-添加水印'});buried_point_fn('setTouchPlace','水印_vip限免');"
                    >VIP限免</a
                  >
                </div>
                <div class="dock_watermark_inputs">
                  <input
                    class="input_text"
                    id="watermark_input"
                    autocomplete="off"
                    type="text"
                    placeholder="水印最多支持15个字"
                  />
                  <div class="toolbar_button dock_watermark_sub active" id="watermark_input_sub">添加</div>
                </div>
                <div class="dock_watermark_list" id="dock_watermark_list">
                  <div class="dock_content_title">我的水印</div>
                  <ul class="dock_watermark_ullist" id="watermark_ullist"></ul>
                  <div class="dock_watermark_nothing hide" id="dock_watermark_nothing">暂无水印</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dock_view dock_view_attribute" style="width: 350px">
          <div class="dock_view_header">
            数据属性
            <div class="ico ico_dock_collapse"></div>
          </div>
          <div class="dock_content" style="padding: 5px 0px 5px">
            <div class="attr_add">
              <div
                id="attr_add_btn"
                class="toolbar_button active noover"
                style="width: 120px; display: inline-block"
                onclick="Dock.showAttrAdd()"
              >
                添加数据属性
              </div>
              <div class="attr_add_items">
                <div class="dock_label" style="width: 50px">名字:</div>
                <input id="attr_add_name" type="text" class="input_text" style="float: left; width: 260px" />
                <div style="height: 5px; clear: both"></div>
                <div class="dock_label" style="width: 50px">类型:</div>
                <select id="attr_add_type" class="input_select" style="float: left; width: 120px">
                  <option value="string">文本</option>
                  <option value="link">链接</option>
                  <option value="number">数值</option>
                  <option value="date">日期</option>
                  <option value="boolean">布尔</option>
                  <option value="list" style="display: none">列表</option>
                </select>
                <div style="height: 5px; clear: both"></div>
                <div class="dock_label" style="width: 50px">值:</div>
                <div id="attr_add_value_arera" style="float: left"></div>
                <div style="height: 5px; clear: both"></div>
                <div
                  class="toolbar_button active"
                  style="width: 70px; display: inline-block"
                  onclick="Dock.saveAttrAdd()"
                >
                  确定
                </div>
                <div
                  class="toolbar_button active"
                  style="width: 70px; display: inline-block"
                  onclick="Dock.cancelAttrAdd()"
                >
                  取消
                </div>
              </div>
              <div class="dock_devider"></div>
            </div>
            <ul class="attr_list"></ul>
          </div>
        </div>
        <div class="dock_view dock_view_history" style="width: 280px">
          <div class="dock_view_header">
            历史版本
            <div class="ico ico_dock_collapse"></div>
          </div>
          <div class="dock_content" style="padding: 0px">
            <div class="history_bar">
              <div class="area_history">
                <div
                  id="btn_history_add"
                  class="toolbar_button active"
                  style="padding: 0px 10px 0px 3px; margin-left: 7px"
                >
                  <div class="ico ico_plus" style="float: left"></div>
                  创建历史版本
                </div>
                <div class="switch-container" style="display: inline-block"></div>
                <div id="btn_history_restore" class="toolbar_button active disabled" title="恢复到此版本">
                  <div class="ico ico_restore"></div>
                </div>
              </div>
              <div id="area_history_add" class="area_history" style="margin-left: 7px">
                <textarea
                  id="history_remark"
                  class="input_text"
                  placeholder="填写注释..."
                  style="width: 236px; height: 36px; margin-bottom: 5px"
                ></textarea>
                <div
                  class="toolbar_button active"
                  style="width: 70px; display: inline-block"
                  onclick="Dock.addHistory()"
                >
                  确定
                </div>
                <div
                  class="toolbar_button active"
                  style="width: 70px; display: inline-block"
                  onclick="Dock.toggleAddHistory()"
                >
                  取消
                </div>
              </div>
            </div>
            <div class="switch-tip" style="padding: 0px; border-top: 0px"></div>
            <div id="history-none-tip" style="border-top: 1px solid #f8f8f8; padding: 10px 18px; display: none">
              <div style="font-size: 14px">暂时没有符合的版本记录</div>
              <div style="margin-top: 4px; color: #666">
                您可以创建历史版本，来纪录当前的作图状态，帮助以后进行恢复和查看
              </div>
            </div>
            <div id="history_container" style="min-height: 120px"></div>
          </div>
        </div>
        <div class="dock_view dock_view_comment" style="width: 300px">
          <div class="dock_view_header">
            评论
            <div class="ico ico_dock_collapse"></div>
          </div>
          <div class="dock_content" style="padding: 0px">
            <div id="comment_container" style="min-height: 120px"></div>
            <div class="comment_bar">
              <div>
                <textarea
                  id="txt_sub_comment"
                  class="input_text"
                  placeholder="发表评论"
                  style="width: 268px; height: 36px"
                ></textarea>
              </div>
              <div class="comment_control">
                <input type="checkbox" id="show_comment_ico" />
                <label for="show_comment_ico">显示评论图标</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div id="designer_footer">
      <div class="footer_content">
        <div class="left_box">
          <div class="designer_button" onclick="UI.showShapesManage()">更多图形</div>
        </div>
        <div class="content_box">
          <div class="footer_left">
            <div id="collaborators">
              <div class="colla-users-list"></div>
            </div>
            <div class="toolbar_button" onclick="UI.showAddColla()">
              <div class="ico useradd" style="float: left;"></div>
              &nbsp;<b>邀请协作者</b>
            </div>
          </div>
          <ul class="footer_right">
            <li><a href="/support" target="_blank">帮助中心</a></li>
            <li class="footer_fb" onclick="UI.showFeedBack()">提交反馈</li>
          </ul>
        </div>
      </div>
    </div> -->
    <div id="ui_container">
      <ul id="arrange_align_list" class="menu list" style="display: none">
        <li cate="align_shape" al="left" original-title="左对齐"><div class="ico diagraming-icons">&#xe749;</div></li>
        <li cate="align_shape" al="center" original-title="居中对齐">
          <div class="ico diagraming-icons">&#xe74b;</div>
        </li>
        <li cate="align_shape" al="right" original-title="右对齐"><div class="ico diagraming-icons">&#xe74f;</div></li>
        <li cate="align_shape" al="top" original-title="顶端对齐"><div class="ico diagraming-icons">&#xe74e;</div></li>
        <li cate="align_shape" al="middle" original-title="垂直居中对齐">
          <div class="ico diagraming-icons">&#xe74a;</div>
        </li>
        <li cate="align_shape" al="bottom" original-title="底端对齐">
          <div class="ico diagraming-icons">&#xe74c;</div>
        </li>
      </ul>
      <div id="color_picker" class="menu color_picker" style="display: none">
        <div class="transparent color_transparent">透明色</div>
        <div class="color_items">
          <div style="background-color: rgb(255, 205, 210)"></div>
          <div style="background-color: rgb(255, 224, 178)"></div>
          <div style="background-color: rgb(255, 249, 196)"></div>
          <div style="background-color: rgb(200, 230, 201)"></div>
          <div style="background-color: rgb(178, 235, 242)"></div>
          <div style="background-color: rgb(187, 222, 251)"></div>
          <div style="background-color: rgb(225, 190, 231)"></div>
          <div style="background-color: rgb(245, 245, 245)"></div>
          <div style="background-color: rgb(229, 115, 115)"></div>
          <div style="background-color: rgb(255, 183, 77)"></div>
          <div style="background-color: rgb(255, 241, 118)"></div>
          <div style="background-color: rgb(129, 199, 132)"></div>
          <div style="background-color: rgb(77, 208, 225)"></div>
          <div style="background-color: rgb(100, 181, 246)"></div>
          <div style="background-color: rgb(186, 104, 200)"></div>
          <div style="background-color: rgb(224, 224, 224)"></div>
          <div style="background-color: rgb(244, 67, 54)"></div>
          <div style="background-color: rgb(255, 152, 0)"></div>
          <div style="background-color: rgb(255, 235, 59)"></div>
          <div style="background-color: rgb(76, 175, 80)"></div>
          <div style="background-color: rgb(0, 188, 212)"></div>
          <div style="background-color: rgb(33, 150, 243)"></div>
          <div style="background-color: rgb(156, 39, 176)"></div>
          <div style="background-color: rgb(158, 158, 158)"></div>
          <div style="background-color: rgb(211, 47, 47)"></div>
          <div style="background-color: rgb(245, 124, 0)"></div>
          <div style="background-color: rgb(251, 192, 45)"></div>
          <div style="background-color: rgb(56, 142, 60)"></div>
          <div style="background-color: rgb(0, 151, 167)"></div>
          <div style="background-color: rgb(25, 118, 210)"></div>
          <div style="background-color: rgb(123, 31, 162)"></div>
          <div style="background-color: rgb(97, 97, 97)"></div>
          <div style="background-color: rgb(183, 28, 28)"></div>
          <div style="background-color: rgb(230, 81, 0, 1)"></div>
          <div style="background-color: rgb(245, 127, 23)"></div>
          <div style="background-color: rgb(27, 94, 32)"></div>
          <div style="background-color: rgb(0, 96, 100)"></div>
          <div style="background-color: rgb(13, 71, 161)"></div>
          <div style="background-color: rgb(74, 20, 140)"></div>
          <div style="background-color: rgb(33, 33, 33)"></div>
        </div>
        <div class="color_items" style="margin-top: 8px">
          <div style="background-color: rgb(255, 255, 255); border-color: rgba(238, 238, 238)"></div>
          <div style="background-color: rgb(0, 0, 0)"></div>
          <div style="background-color: rgb(255, 0, 0)"></div>
          <div style="background-color: rgb(255, 255, 0)"></div>
          <div style="background-color: rgb(0, 255, 0)"></div>
          <div style="background-color: rgb(0, 255, 255)"></div>
          <div style="background-color: rgb(0, 0, 255)"></div>
          <div style="background-color: rgb(255, 0, 255)"></div>
        </div>
        <div class="history">
          <div class="history_title">最近使用</div>
          <div class="color_items history_color">
            <div class="disabled"></div>
            <div class="disabled"></div>
            <div class="disabled"></div>
            <div class="disabled"></div>
            <div class="disabled"></div>
            <div class="disabled"></div>
            <div class="disabled"></div>
            <div class="disabled"></div>
          </div>
        </div>
        <div class="color_more">
          <div class="color_more_bg"></div>
          <span>更多颜色</span>
          <span class="icons">&#xed2b;</span>
          <div class="more_panel">
            <div class="color_panel">
              <div class="saturation_white">
                <div class="saturation_black"></div>
              </div>
              <div class="picker_pin"></div>
            </div>
            <div class="hue_horizontal">
              <div class="picker_pin"></div>
            </div>
            <div class="hex">
              <div class="input_box left">
                <span class="input_title">#</span><input class="input_hex" type="text" maxlength="6" />
              </div>
              <div class="color_show">
                <span class="color_show_now"></span>
                <span class="color_show_history"></span>
              </div>
            </div>
            <div class="rgb">
              <div class="input_box">
                <span class="input_title">R</span><input class="input_r" type="text" maxlength="3" />
              </div>
              <div class="input_box">
                <span class="input_title">G</span><input class="input_g" type="text" maxlength="3" />
              </div>
              <div class="input_box">
                <span class="input_title">B</span><input class="input_b" type="text" maxlength="3" />
              </div>
            </div>
          </div>
        </div>
        <div class="color_extend"></div>
      </div>
      <ul id="bar_list_file" class="menu list options_menu noico">
        <li ac="rename">重命名文件</li>
        <li class="devider"></li>
        <li ac="saveAs">克隆此文件</li>
        <li ac="export_file">
          下载为...
          <div class="extend ex_arrow">►</div>
          <ul id="export_file_menu" class="menu list extend_menu menu_ico">
            <li ac="export" type="image">
              <div class="ico icons">&#xe72b;</div>
              <span class="suffix">PNG图片文件（*.png）</span>
            </li>
            <li ac="export" type="jpg">
              <div class="ico icons">&#xe71e;</div>
              <span class="suffix">JPG图片文件（*.jpg）</span>
            </li>
            <li ac="export" type="pos">
              <div class="ico icons">&#xe71d;</div>
              <span class="suffix">ProcessOn文件（*.pos）</span>
            </li>
            <li ac="export" type="pdfHD">
              <div class="ico icons">&#xe727;</div>
              <span class="suffix">高清PDF文件（*.pdf）</span>
            </li>
            <li ac="export" type="svg">
              <div class="ico icons">&#xe728;</div>
              <span class="suffix">SVG文件（*.svg）</span>
            </li>
            <li ac="export" type="png">
              <div class="ico icons">&#xe724;</div>
              <img class="vip" src="images/icon/po_vip.svg" /><span class="suffix">高清PNG图片文件（*.png）</span>
            </li>
          </ul>
        </li>
        <li ac="print">
          打印
          <div class="extend">Ctrl+P</div>
        </li>
        <li class="devider"></li>
        <li ac="close">关闭</li>
      </ul>
      <ul id="bar_list_edit" class="menu list options_menu">
        <li ac="undo">
          <div class="ico diagraming-icons">&#xe72a;</div>
          撤销
          <div class="extend">Ctrl+Z</div>
        </li>
        <li ac="redo">
          <div class="ico diagraming-icons">&#xe72b;</div>
          恢复
          <div class="extend">Ctrl+Y</div>
        </li>
        <li class="devider"></li>
        <li ac="cut">
          <div class="ico diagraming-icons">&#xe75a;</div>
          剪切
          <div class="extend">Ctrl+X</div>
        </li>
        <li ac="copy">
          <div class="ico diagraming-icons">&#xe757;</div>
          复制
          <div class="extend">Ctrl+C</div>
        </li>
        <li ac="paste">
          <div class="ico diagraming-icons">&#xe758;</div>
          粘贴
          <div class="extend">Ctrl+V</div>
        </li>
        <li ac="duplicate">
          复用
          <div class="extend">Ctrl+D</div>
        </li>
        <li ac="brush">
          <div class="ico diagraming-icons">&#xe72c;</div>
          格式刷
          <div class="extend">Ctrl+Shift+B</div>
        </li>
        <li ac="beautify">
          <div class="ico diagraming-icons">&#xe789;</div>
          一键美化
        </li>
        <li ac="defaultStyle">
          设置为默认样式
          <div class="extend tip_text" click-btn="clearStyle">清除</div>
        </li>
        <li class="devider"></li>
        <li ac="selectall">
          全选
          <div class="extend">Ctrl+A</div>
        </li>
        <li ac="delete">
          <div class="ico diagraming-icons">&#xe759;</div>
          删除
          <div class="extend">Delete/Backspace</div>
        </li>
      </ul>
      <ul id="bar_list_view" class="menu list options_menu">
        <li ac="zoom" zoom="in">
          <div class="ico diagraming-icons">&#xe75b;</div>
          放大
          <div class="extend">Alt+(+)</div>
        </li>
        <li ac="zoom" zoom="out">
          <div class="ico diagraming-icons">&#xe75d;</div>
          缩小
          <div class="extend">Alt+(-)</div>
        </li>
        <li class="devider"></li>
        <li ac="zoom" zoom="0.5" class="static">50%</li>
        <li ac="zoom" zoom="0.75" class="static">75%</li>
        <li ac="zoom" zoom="1" class="static">100%</li>
        <li ac="zoom" zoom="1.5" class="static">150%</li>
        <li ac="zoom" zoom="2" class="static">200%</li>
        <li class="devider"></li>
        <li ac="zoom" zoom="1">重置缩放</li>
      </ul>
      <ul id="bar_list_insert" class="menu list options_menu">
        <li ac="insert" in="text">
          <div class="ico diagraming-icons">&#xe75f;</div>
          文本
          <div class="extend">T</div>
        </li>
        <li ac="insert" in="image">
          <div class="ico diagraming-icons">&#xe75e;</div>
          图片
          <div class="extend">I</div>
        </li>
        <li ac="insert" in="line">
          <div class="ico diagraming-icons">&#xe73b;</div>
          连线
          <div class="extend">L</div>
        </li>
        <li ac="insert" in="equation">
          <div class="ico icons">&#xe735;</div>
          LaTeX常用方程式
        </li>
      </ul>
      <ul id="bar_list_page" class="menu list options_menu">
        <li id="bar_page_color">
          <div class="ico diagraming-icons">&#xe738;</div>
          背景颜色
          <div class="extend ex_arrow">►</div>
        </li>
        <li>
          页面大小
          <div class="extend ex_arrow">►</div>
          <ul id="bar_list_pagesize" class="menu list extend_menu menu_ico">
            <li ac="set_page_size" w="1500" h="2100">A3(1500x2100)</li>
            <li ac="set_page_size" w="1050" h="1500">A4(1050x1500)</li>
            <li ac="set_page_size" w="750" h="1050">A5(750x1050)</li>
            <li class="devider"></li>
            <li class="menu_text" id="page_size_custom">自定义</li>
            <li class="menu_text" style="line-height: 30px">
              <span class="lbl">W:</span>
              <div id="page_size_w" class="spinner active" style="width: 75px"></div>
            </li>
            <li class="menu_text" style="line-height: 30px">
              <span class="lbl">H:</span>
              <div id="page_size_h" class="spinner active" style="width: 75px"></div>
            </li>
          </ul>
        </li>
        <li>
          页面方向
          <div class="extend ex_arrow">►</div>
          <ul id="bar_list_orientation" class="menu list extend_menu menu_ico">
            <li ac="set_page_orientation" ori="portrait">竖向</li>
            <li ac="set_page_orientation" ori="landscape">横向</li>
          </ul>
        </li>
        <li>
          <div class="ico ico_selected diagraming-icons">&#xe75c;</div>
          <div class="ico diagraming-icons">&#xe761;</div>
          内边距
          <div class="extend ex_arrow">►</div>
          <ul id="bar_list_padding" class="menu list extend_menu menu_ico">
            <li ac="set_page_padding" p="0">0px</li>
            <li ac="set_page_padding" p="20">20px</li>
            <li ac="set_page_padding" p="40">40px</li>
            <li ac="set_page_padding" p="60">60px</li>
            <li ac="set_page_padding" p="80">80px</li>
            <li ac="set_page_padding" p="100">100px</li>
          </ul>
        </li>
        <li class="devider"></li>
        <li ac="set_page_showgrid">
          <div class="ico ico_selected diagraming-icons">&#xe75c;</div>
          显示网格
        </li>
        <li>
          <div class="ico gridsize"></div>
          网格大小
          <div class="extend ex_arrow">►</div>
          <ul id="bar_list_gridsize" class="menu list extend_menu menu_ico">
            <li ac="set_page_gridsize" s="10">小</li>
            <li ac="set_page_gridsize" s="15">正常</li>
            <li ac="set_page_gridsize" s="20">大</li>
            <li ac="set_page_gridsize" s="30">很大</li>
          </ul>
        </li>
        <li ac="set_page_showPrintLine">
          <div class="ico ico_selected diagraming-icons">&#xe75c;</div>
          显示打印分隔线
        </li>
        <li class="devider"></li>
        <li ac="set_page_linejumps">
          <div class="ico ico_selected diagraming-icons">&#xe75c;</div>
          显示跨线
        </li>
      </ul>
      <ul id="bar_list_arrange" class="menu list options_menu">
        <li ac="front">
          <div class="ico diagraming-icons">&#xe751;</div>
          置于顶层
          <div class="extend">Ctrl+]</div>
        </li>
        <li ac="back">
          <div class="ico diagraming-icons">&#xe752;</div>
          置于底层
          <div class="extend">Ctrl+[</div>
        </li>
        <li ac="forward">
          上移一层
          <div class="extend">Ctrl+Shift+]</div>
        </li>
        <li ac="backward">
          下移一层
          <div class="extend">Ctrl+Shift+[</div>
        </li>
        <li class="devider"></li>
        <li id="menu_arrange_align">
          <div class="ico diagraming-icons">&#xe749;</div>
          图形对齐
          <div class="extend ex_arrow">►</div>
          <ul class="menu list extend_menu">
            <li ac="align_shape" al="left">
              <div class="ico diagraming-icons">&#xe749;</div>
              左对齐
              <div class="extend">Alt+L</div>
            </li>
            <li ac="align_shape" al="center">
              <div class="ico diagraming-icons">&#xe74b;</div>
              居中对齐
              <div class="extend">Alt+C</div>
            </li>
            <li ac="align_shape" al="right">
              <div class="ico diagraming-icons">&#xe74f;</div>
              右对齐
              <div class="extend">Alt+R</div>
            </li>
            <li class="devider"></li>
            <li ac="align_shape" al="top">
              <div class="ico diagraming-icons">&#xe74e;</div>
              顶端对齐
            </li>
            <li ac="align_shape" al="middle">
              <div class="ico diagraming-icons">&#xe74a;</div>
              垂直居中对齐
            </li>
            <li ac="align_shape" al="bottom">
              <div class="ico diagraming-icons">&#xe74c;</div>
              底端对齐
            </li>
          </ul>
        </li>
        <li id="bar_arrange_dist">
          图形分布
          <div class="extend ex_arrow">►</div>
          <ul class="menu list extend_menu">
            <li ac="distribute_shape" dis="h">
              <div class="ico diagraming-icons">&#xe74d;</div>
              水平平均分布
            </li>
            <li ac="distribute_shape" dis="v">
              <div class="ico diagraming-icons">&#xe750;</div>
              垂直平均分布
            </li>
          </ul>
        </li>
        <li id="bar_arrange_match">
          匹配大小
          <div class="extend ex_arrow">►</div>
          <ul class="menu list extend_menu">
            <li ac="match_size" w="auto" h="">宽度</li>
            <li ac="match_size" w="" h="auto">高度</li>
            <li ac="match_size" w="auto" h="auto">宽度和高度</li>
            <li ac="match_size" custom="true">自定义</li>
          </ul>
        </li>
        <li class="devider"></li>
        <li ac="lock">
          <div class="ico diagraming-icons">&#xe753;</div>
          锁定
          <div class="extend">Ctrl+L</div>
        </li>
        <li ac="unlock">
          <div class="ico diagraming-icons">&#xe754;</div>
          解锁
          <div class="extend">Ctrl+Shift+L</div>
        </li>
        <li class="devider"></li>
        <li ac="group">
          组合
          <div class="extend">Ctrl+G</div>
        </li>
        <li ac="ungroup">
          取消组合
          <div class="extend">Ctrl+Shift+G</div>
        </li>
      </ul>
      <ul id="bar_list_help" class="menu list options_menu noico">
        <li ac="ai_power">功能查找</li>
        <li ac="hotkey">快捷键列表</li>
        <li ac="getting_started">开始向导</li>
        <li ac="feedback">发送反馈</li>
      </ul>
      <ul id="font_list" class="menu list menu_ico" style="display: none">
        <li style="font-family: Arial">Arial</li>
        <li style="font-family: Verdana">Verdana</li>
        <li style="font-family: Georgia">Georgia</li>
        <li style="font-family: Times New Roman">Times New Roman</li>
        <li style="font-family: Courier New">Courier New</li>
        <li style="font-family: Impact">Impact</li>
        <li style="font-family: Comic Sans MS">Comic Sans MS</li>
        <li style="font-family: Tahoma">Tahoma</li>
        <li style="font-family: Garamond">Garamond</li>
        <li style="font-family: Lucida Console">Lucida Console</li>
        <li class="devider"></li>
        <li style="font-family: 宋体">宋体</li>
        <li style="font-family: 微软雅黑">微软雅黑</li>
        <li style="font-family: 黑体">黑体</li>
        <li style="font-family: 楷体">楷体</li>
        <li class="devider"></li>
        <li style="font-family: 'Alibaba PuHuiTi Regular'">Alibaba PuHuiTi Regular</li>
        <li style="font-family: 'Alibaba PuHuiTi Medium'">Alibaba PuHuiTi Medium</li>
        <li style="font-family: 'Alibaba PuHuiTi Bold'">Alibaba PuHuiTi Bold</li>
      </ul>
      <ul id="font_size_list" class="menu list" style="display: none">
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
        <li>14</li>
        <li>18</li>
        <li>24</li>
        <li>30</li>
        <li>36</li>
        <li>48</li>
        <li>60</li>
        <li>72</li>
      </ul>
      <ul id="font_align_list" class="menu list" style="display: none">
        <li cate="textAlign" al="left" original-title="左对齐"><div class="ico diagraming-icons">&#xe735;</div></li>
        <li cate="textAlign" al="center" original-title="居中对齐"><div class="ico diagraming-icons">&#xe733;</div></li>
        <li cate="textAlign" al="right" original-title="右对齐"><div class="ico diagraming-icons">&#xe736;</div></li>
        <li cate="vAlign" al="top" original-title="顶端对齐"><div class="ico diagraming-icons">&#xe730;</div></li>
        <li cate="vAlign" al="middle" original-title="垂直居中对齐">
          <div class="ico diagraming-icons">&#xe732;</div>
        </li>
        <li cate="vAlign" al="bottom" original-title="底端对齐"><div class="ico diagraming-icons">&#xe731;</div></li>
      </ul>
      <ul id="font_height_list" class="menu list menu_ico" style="display: none">
        <li>1.0</li>
        <li>1.25</li>
        <li>1.5</li>
        <li>2.0</li>
        <li>2.5</li>
        <li>3.0</li>
      </ul>
      <ul id="line_width_list" class="menu list menu_ico" style="display: none">
        <li>0px</li>
        <li>1px</li>
        <li>2px</li>
        <li>3px</li>
        <li>4px</li>
        <li>5px</li>
        <li>6px</li>
        <li>8px</li>
        <li>10px</li>
      </ul>
      <ul id="line_style_list" class="menu list menu_ico" style="display: none">
        <li line="solid"><div class="ico linestyle linesolid"></div></li>
        <li line="dashed"><div class="ico linestyle linedashed"></div></li>
        <li line="dot"><div class="ico linestyle linedot"></div></li>
        <li line="dashdot"><div class="ico linestyle linedashdot"></div></li>
      </ul>
      <ul id="line_type_list" class="menu list" style="display: none">
        <li tp="broken"><div type="broken" class="ico diagraming-icons">&#xe73d;</div></li>
        <li tp="curve"><div type="curve" class="ico diagraming-icons">&#xe73c;</div></li>
        <li tp="normal"><div type="normal" class="ico diagraming-icons">&#xe73b;</div></li>
      </ul>
      <ul id="beginarrow_list" class="menu list menu_ico" style="display: none">
        <li arrow="none">
          <div class="ico diagraming-icons">
            <svg class="icon-svg" aria-hidden="true"><use xlink:href="#iconwuduandian_huaban1_huaban1"></use></svg>
          </div>
        </li>
        <li arrow="solidArrow"><div class="ico diagraming-icons">&#xe73f;</div></li>
        <li arrow="dashedArrow"><div class="ico diagraming-icons">&#xe740;</div></li>
        <li arrow="normal"><div class="ico diagraming-icons">&#xe741;</div></li>
        <li arrow="solidDiamond"><div class="ico diagraming-icons">&#xe73e;</div></li>
        <li arrow="dashedDiamond"><div class="ico diagraming-icons">&#xe742;</div></li>
        <li arrow="solidCircle"><div class="ico diagraming-icons">&#xe745;</div></li>
        <li arrow="dashedCircle"><div class="ico diagraming-icons">&#xe743;</div></li>
        <li arrow="cross"><div class="ico diagraming-icons">&#xe746;</div></li>
        <li arrow="asynch1"><div class="ico diagraming-icons">&#xe744;</div></li>
        <li arrow="asynch2"><div class="ico diagraming-icons">&#xe747;</div></li>
      </ul>
      <ul id="endarrow_list" class="menu list menu_ico" style="display: none">
        <li arrow="none">
          <div class="ico diagraming-icons">
            <svg class="icon-svg" aria-hidden="true"><use xlink:href="#iconwuduandian_huaban1_huaban1-copy"></use></svg>
          </div>
        </li>
        <li arrow="solidArrow"><div class="ico diagraming-icons">&#xe76a;</div></li>
        <li arrow="dashedArrow"><div class="ico diagraming-icons">&#xe769;</div></li>
        <li arrow="normal"><div class="ico diagraming-icons">&#xe768;</div></li>
        <li arrow="solidDiamond"><div class="ico diagraming-icons">&#xe76b;</div></li>
        <li arrow="dashedDiamond"><div class="ico diagraming-icons">&#xe767;</div></li>
        <li arrow="solidCircle"><div class="ico diagraming-icons">&#xe765;</div></li>
        <li arrow="dashedCircle"><div class="ico diagraming-icons">&#xe766;</div></li>
        <li arrow="cross"><div class="ico diagraming-icons">&#xe76c;</div></li>
        <li arrow="asynch1"><div class="ico diagraming-icons">&#xe76d;</div></li>
        <li arrow="asynch2"><div class="ico diagraming-icons">&#xe764;</div></li>
      </ul>
      <div id="hotkey_list" class="dialog">
        <div class="dialog_header">快捷键列表</div>
        <div class="dialog_content">
          <div class="hotkey_content">
            <span class="hotkey_line hotkey_group">通用 </span>
            <span class="hotkey_line">
              <span class="hotkey">Space</span><span class="hotkey_desc">按住Space，通过鼠标可以对页面进行拖动 </span>
            </span>
            <span class="hotkey_line">
              <span class="hotkey">Ctrl</span
              ><span class="hotkey_desc">按住Ctrl，点击一个图形，将其添加到选择图形中，或者从中移除 </span>
            </span>
            <span class="hotkey_line">
              <span class="hotkey">Alt + (+) , Alt + (-)</span><span class="hotkey_desc">放大，缩小 </span>
            </span>
            <span class="hotkey_line">
              <span class="hotkey">Ctrl + A</span><span class="hotkey_desc">全部选中 </span>
            </span>
            <span class="hotkey_line">
              <span class="hotkey">Esc</span><span class="hotkey_desc">取消选中，并取消当先操作 </span>
            </span>
            <span class="hotkey_line"> <span class="hotkey">T</span><span class="hotkey_desc">插入文本 </span> </span>
            <span class="hotkey_line"> <span class="hotkey">I</span><span class="hotkey_desc">插入图片 </span> </span>
            <span class="hotkey_line"> <span class="hotkey">L</span><span class="hotkey_desc">插入连线 </span> </span>
            <span class="hotkey_line null_line">&nbsp;</span>
            <span class="hotkey_line hotkey_group">图形被选中时 </span>
            <span class="hotkey_line">
              <span class="hotkey">箭头 (←↑↓→) </span
              ><span class="hotkey_desc">将选中图形向左、向上、向下、向右移动 </span>
            </span>
            <span class="hotkey_line">
              <span class="hotkey">Shift + 箭头 (←↑↓→) </span><span class="hotkey_desc">每次微移一个像素 </span>
            </span>
            <span class="hotkey_line">
              <span class="hotkey">调整图形大小时按住Ctrl </span
              ><span class="hotkey_desc">调整图形大小，并且约束比例 </span>
            </span>
            <span class="hotkey_line">&nbsp;</span>
            <span class="hotkey_line">
              <span class="hotkey">Ctrl + Z</span><span class="hotkey_desc">撤销 </span>
            </span>
            <span class="hotkey_line">
              <span class="hotkey">Ctrl + Y</span><span class="hotkey_desc">恢复 </span>
            </span>
            <span class="hotkey_line">&nbsp;</span>
            <span class="hotkey_line">
              <span class="hotkey">Ctrl + X</span><span class="hotkey_desc">剪切 </span>
            </span>
            <span class="hotkey_line">
              <span class="hotkey">Ctrl + C</span><span class="hotkey_desc">复制 </span>
            </span>
            <span class="hotkey_line">
              <span class="hotkey">Ctrl + V</span><span class="hotkey_desc">粘贴 </span>
            </span>
            <span class="hotkey_line">
              <span class="hotkey">Ctrl + D</span><span class="hotkey_desc">复用 </span>
            </span>
            <span class="hotkey_line">
              <span class="hotkey">Ctrl + Shift + B</span><span class="hotkey_desc">格式刷 </span>
            </span>
            <span class="hotkey_line">
              <span class="hotkey">Delete, Backspace</span><span class="hotkey_desc">删除 </span>
            </span>
            <span class="hotkey_line">&nbsp;</span>
            <span class="hotkey_line">
              <span class="hotkey">Ctrl + ]</span><span class="hotkey_desc">将选中的图形置于顶层 </span>
            </span>
            <span class="hotkey_line">
              <span class="hotkey">Ctrl + [</span><span class="hotkey_desc">将选中的图形置于底层 </span>
            </span>
            <span class="hotkey_line">
              <span class="hotkey">Ctrl + Shift + ]</span><span class="hotkey_desc">将选中的图形上移一层 </span>
            </span>
            <span class="hotkey_line">
              <span class="hotkey">Ctrl + Shift + [</span><span class="hotkey_desc">将选中的图形下移一层 </span>
            </span>
            <span class="hotkey_line">&nbsp;</span>
            <span class="hotkey_line">
              <span class="hotkey">Ctrl + L</span><span class="hotkey_desc">锁定选中的图形 </span>
            </span>
            <span class="hotkey_line">
              <span class="hotkey">Ctrl + Shift + L</span><span class="hotkey_desc">将选中的图形解锁 </span>
            </span>
            <span class="hotkey_line">&nbsp;</span>
            <span class="hotkey_line">
              <span class="hotkey">Ctrl + G</span><span class="hotkey_desc">组合选中的图形 </span>
            </span>
            <span class="hotkey_line">
              <span class="hotkey">Ctrl + Shift + G</span><span class="hotkey_desc">将选中的图形取消组合 </span>
            </span>
            <span class="hotkey_line">&nbsp;</span>
            <span class="hotkey_line">
              <span class="hotkey">Alt + L</span><span class="hotkey_desc">多个图形居左对齐 </span>
            </span>
            <span class="hotkey_line">
              <span class="hotkey">Alt + C</span><span class="hotkey_desc">多个图形居中对齐 </span>
            </span>
            <span class="hotkey_line">
              <span class="hotkey">Alt + R</span><span class="hotkey_desc">多个图形居右对齐 </span>
            </span>
            <span class="hotkey_line">
              <span class="hotkey">Ctrl + E</span><span class="hotkey_desc">LaTeX方程式 </span>
            </span>
            <span class="hotkey_line null_line">&nbsp;</span>
            <span class="hotkey_line hotkey_group">编辑文本 </span>
            <span class="hotkey_line">
              <span class="hotkey">空格 </span><span class="hotkey_desc">编辑文本 </span>
            </span>
            <span class="hotkey_line">
              <span class="hotkey">Ctrl + B</span><span class="hotkey_desc">粗体 </span>
            </span>
            <span class="hotkey_line">
              <span class="hotkey">Ctrl + I</span><span class="hotkey_desc">斜体 </span>
            </span>
            <span class="hotkey_line">
              <span class="hotkey">Ctrl + U</span><span class="hotkey_desc">下划线 </span>
            </span>
            <span class="hotkey_line">
              <span class="hotkey">Ctrl + Enter</span><span class="hotkey_desc">保存文本编辑 </span>
            </span>
          </div>
        </div>
        <div class="designer_button normal hotkey_ok" onclick="$('#hotkey_list').dlg('close')">确定</div>
      </div>
      <div class="equation-list" style="display: none">
        <div style="padding: 16px">LaTeX常用方程式</div>
        <div class="eq-select">
          <input type="text" value="上标、下标及积分等" class="eq-input" disabled />
          <ul></ul>
        </div>
        <div id="eq-container" class="scroll">
          <div style="padding: 0 16px"></div>
        </div>
        <div style="padding: 16px 0 12px 16px; font-size: 12px; color: #000">
          更多方程式参见
          <a
            href="https://www.tw.wiiaa.top/baike-Help:%E6%95%B0%E5%AD%A6%E5%85%AC%E5%BC%8F"
            target="_blank"
            style="color: #4386f5"
            >帮助:数学公式</a
          >
        </div>
        <div class="ico dlg_close"></div>
      </div>
      <div id="send_feedback" class="dialog">
        <div class="dialog_header">发送反馈</div>
        <div class="dialog_content" style="padding: 20px 40px">
          <p style="margin-top: 0px">
            您可以把使用中遇到的问题、功能的建议、评论等发送给我们。<br />我们迫切希望得到您有价值的反馈，有您的反馈，我们会做的更好！<br /><br />请写下您的邮箱和反馈描述：
          </p>
          <span class="feedback_lebal" style="height: 33px; line-height: 33px">
            <span>邮箱：</span>
            <span class="feedback_error_email_format">邮箱不正确，请填写一个您常用的邮箱</span>
          </span>
          <input id="feedback_email" type="text" value="" class="txt" style="width: 490px; height: 24px" />
          <span class="feedback_lebal" style="height: 33px; line-height: 33px">
            <span>姓名：</span>
          </span>
          <input id="feedback_name" type="text" value="198715_PO" class="txt" style="width: 490px; height: 24px" />
          <span class="feedback_lebal" style="height: 33px; line-height: 33px">
            <span>反馈：</span>
            <span class="feedback_error_msg">请填写您的反馈信息</span>
          </span>
          <textarea id="feedback_message" class="txt" style="width: 490px; height: 93px"></textarea>
        </div>
        <div class="dialog_buttons" style="padding: 0px 40px 20px; position: relative">
          <span class="send_btn designer_button" onclick="UI.sendFeedBack(this)">发送</span>
          <!-- <div style="text-align: left">
            您可以直接加我们的qq群进行反馈 (方便、快捷)：<a
              style="position: absolute"
              target="_blank"
              href="//shang.qq.com/wpa/qunwpa?idkey=3b7e0a984134bab4f57ced05364e893f33535545d59f1413e4e372e08705ea1e"
              ><img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="ProcessOn 6群" title="ProcessOn"
            /></a>
          </div> -->
        </div>
      </div>
      <div id="link_dialog" class="dialog" style="min-width: 500px">
        <div class="dialog_header">插入链接</div>
        <div class="dialog_content" style="padding: 30px 20px; text-align: center">
          <b>链接到：</b
          ><input placeholder="processon.com" id="linkto_addr" type="text" class="input_text" style="width: 350px" />
        </div>
        <div class="dialog_buttons">
          <div class="designer_button" onclick="UI.setLink()">确定</div>
          &nbsp;
          <div class="designer_button normal" onclick="$('#link_dialog').dlg('close');">取消</div>
        </div>
      </div>
      <div id="saveas_dialog" class="dialog" style="min-width: 450px">
        <div class="dialog_header">克隆此文件</div>
        <div class="dialog_content" style="padding: 30px 20px; text-align: center">
          <form id="saveas_form" action="/diagraming/saveas" method="post">
            <input id="hid_saveas_id" type="hidden" name="id" />
            <b>标题：</b
            ><input
              name="title"
              id="saveas_title"
              type="text"
              class="input_text"
              style="width: 300px"
              onkeydown="if(event.keyCode == 13) return false;"
            />
          </form>
        </div>
        <div class="dialog_buttons">
          <div class="designer_button" onclick="UI.doSaveAs()" id="btn_dosaveas">确定</div>
          &nbsp;
          <div class="designer_button normal" onclick="$('#saveas_dialog').dlg('close');">取消</div>
        </div>
      </div>
      <div
        id="svg_dialog"
        style="width: 100%; height: 100%; position: fixed; top: 0; left: 0; visibility: hidden"
      ></div>
      <div class="menu mark_content mark1_content">
        <div class="dialog_header">开始</div>
        <div class="ico dlg_close" onclick="UI.closeGettingStart()"></div>
        <div class="_content">把您想使用的图形拖到右侧画布上，创建图形就是如此简单。</div>
        <div class="arr-icon left">
          <div class="arr-border"></div>
          <div class="inner-arr"></div>
        </div>
        <div class="mark_next"><span class="designer_button normal" onclick="UI.showStartStep(2)">下一步</span></div>
      </div>
      <div class="menu mark_content mark2_content">
        <div class="dialog_header">菜单栏</div>
        <div class="ico dlg_close" onclick="UI.closeGettingStart()"></div>
        <div class="_content">通过这些菜单，您可以调整和设置图形的属性、样式，也可以管理您的文件。</div>
        <div class="arr-icon top">
          <div class="arr-border"></div>
          <div class="inner-arr"></div>
        </div>
        <div class="mark_next"><span class="designer_button normal" onclick="UI.showStartStep(3)">下一步</span></div>
      </div>
      <div class="menu mark_content mark3_content">
        <div class="dialog_header">属性工具栏</div>
        <div class="ico dlg_close" onclick="UI.closeGettingStart()"></div>
        <div class="_content">对选中的文本、图形、连线进行个性化设置，让他们看起来更漂亮。</div>
        <div class="arr-icon top">
          <div class="arr-border"></div>
          <div class="inner-arr"></div>
        </div>
        <div class="mark_next"><span class="designer_button normal" onclick="UI.showStartStep(4)">下一步</span></div>
      </div>
      <div class="menu mark_content mark4_content">
        <div class="dialog_header">属性面板</div>
        <div class="ico dlg_close" onclick="UI.closeGettingStart()"></div>
        <div class="_content">这些面板让您的绘制过程更方便、简单，使用之后，您一定会喜欢。</div>
        <div class="arr-icon right">
          <div class="arr-border"></div>
          <div class="inner-arr"></div>
        </div>
        <div class="mark_next"><span class="designer_button normal" onclick="UI.closeGettingStart()">关闭</span></div>
      </div>
      <div class="menu mark_content markcreated_content">
        <div class="dialog_header">编辑图形</div>
        <div class="ico dlg_close" onclick="UI.closeGettingStart()"></div>
        <div class="_content">
          <p>在图形边缘的任何地方点击并拖动，您可以创建出一条漂亮的连线。（小圆点是推荐的连接点）</p>
          <p>通过小的矩形控制点，您可以改变图形大小。（按住CTRL键可约束比例）</p>
          <p>通过顶部的圆形控制点，对图形进行旋转。</p>
          <p>双击可以编辑文本。（CTRL+ENTER保存文本）</p>
        </div>
        <div class="arr-icon left">
          <div class="arr-border"></div>
          <div class="inner-arr"></div>
        </div>
        <div class="mark_next"><span class="designer_button normal" onclick="UI.closeGettingStart()">关闭</span></div>
      </div>
      <ul id="dock_fill_list" class="menu list menu_ico" style="display: none; width: 198px">
        <li ty="none">无</li>
        <li ty="solid">颜色</li>
        <li ty="gradient">渐变</li>
        <li ty="image">图片</li>
      </ul>
      <ul id="gradient_type_list" class="menu list menu_ico" style="display: none; z-index: 1">
        <li ty="linear" style="width: 60px">线性渐变</li>
        <li ty="radial" style="width: 60px">径向渐变</li>
      </ul>
      <ul id="img_display_list" class="menu list" style="display: none">
        <li ty="fill">填充</li>
        <li ty="fit">自适应</li>
        <li ty="stretch">按图形伸展</li>
        <li ty="original">原始尺寸</li>
        <li ty="tile">平铺</li>
      </ul>
      <ul id="page_size_list" class="menu list dock_page_menu menu_ico" style="display: none">
        <li ac="set_page_size" w="1500" h="2100">A3(1500x2100)</li>
        <li ac="set_page_size" w="1050" h="1500">A4(1050x1500)</li>
        <li ac="set_page_size" w="750" h="1050">A5(750x1050)</li>
        <li class="devider"></li>
        <li class="menu_text" id="dock_size_custom">自定义</li>
        <li class="menu_text" style="line-height: 30px">
          <span class="lbl">W:</span>
          <div id="dock_size_w" class="spinner active" style="width: 75px"></div>
        </li>
        <li class="menu_text" style="line-height: 30px">
          <span class="lbl">H:</span>
          <div id="dock_size_h" class="spinner active" style="width: 75px"></div>
        </li>
      </ul>
      <ul id="page_padding_list" class="menu list dock_page_menu menu_ico" style="display: none">
        <li p="0">0px</li>
        <li p="20">20px</li>
        <li p="40">40px</li>
        <li p="60">60px</li>
        <li p="80">80px</li>
        <li p="100">100px</li>
      </ul>
      <ul id="page_gridsize_list" class="menu list dock_page_menu menu_ico" style="display: none">
        <li s="10">小</li>
        <li s="15">正常</li>
        <li s="20">大</li>
        <li s="30">很大</li>
      </ul>
      <ul id="attr_display_list" class="menu list dock_page_menu menu_ico" style="display: none">
        <li ty="none">无</li>
        <li ty="text">文本</li>
        <li ty="icon">图标</li>
      </ul>
      <ul id="attr_icon_list" class="menu list dock_page_menu" style="display: none">
        <li></li>
      </ul>
      <ul id="attr_location_h_list" class="menu list attr_location_menu dock_page_menu" style="display: none">
        <li loc="mostleft">
          <div><span style="left: -5px"></span></div>
          最左边
        </li>
        <li loc="leftedge">
          <div><span style="left: -3px"></span></div>
          左边缘
        </li>
        <li loc="left">
          <div><span style="left: 0px"></span></div>
          左边
        </li>
        <li loc="center">
          <div><span style="left: 3px"></span></div>
          中间
        </li>
        <li loc="right">
          <div><span style="left: 6px"></span></div>
          右边
        </li>
        <li loc="rightedge">
          <div><span style="left: 9px"></span></div>
          右边缘
        </li>
        <li loc="mostright">
          <div><span style="left: 11px"></span></div>
          最右边
        </li>
      </ul>
      <ul id="attr_location_v_list" class="menu list attr_location_menu dock_page_menu" style="display: none">
        <li loc="mosttop">
          <div><span style="top: -5px"></span></div>
          最上边
        </li>
        <li loc="topedge">
          <div><span style="top: -3px"></span></div>
          上边缘
        </li>
        <li loc="top">
          <div><span style="top: 0px"></span></div>
          顶部
        </li>
        <li loc="middle">
          <div><span style="top: 3px"></span></div>
          中间
        </li>
        <li loc="bottom">
          <div><span style="top: 6px"></span></div>
          底部
        </li>
        <li loc="bottomedge">
          <div><span style="top: 9px"></span></div>
          下边缘
        </li>
        <li loc="mostbottom">
          <div><span style="top: 11px"></span></div>
          最下边
        </li>
      </ul>
      <div id="colla_dialog" class="dialog">
        <div class="dialog_header">分享与协作</div>
        <div class="dialog_content" style="padding: 20px 20px 0px 20px; width: 494px">
          <div style="padding: 4px 0px"><strong>权限列表： </strong></div>
          <div class="role_list"></div>
          <div class="new_invitation_container" style="margin-bottom: 10px">
            <div style="padding: 4px 0px">
              <strong>新邀请： </strong>
              <span id="add_prompt1" style="margin-left: 100px"
                ><span class="badge">1</span>输入受邀请人姓名或者邮箱。</span
              >
              <span id="add_prompt2" style="margin-left: 100px"
                ><span class="badge">2</span>从以下用户列表中选择一个用户发起邀请。</span
              >
              <span id="add_prompt3" class="_fail alert" style="margin-left: 150px">已经被邀请！</span>
              <span id="add_prompt4" class="alert success" style="margin-left: 150px">发送成功。</span>
            </div>
            <div class="add_new_invit" style="margin-bottom: 15px">
              <input id="input_add_colla" type="text" class="txt" placeholder="输入受邀请人姓名或者邮箱。" />
              <input id="add_userid" type="hidden" value="" />
              <input id="add_type" type="hidden" value="" />
              <div class="select_add_role">
                <select id="invit_role">
                  <option value="editor" selected="selected">编辑者</option>
                  <option value="viewer">浏览者</option>
                </select>
                <div style="clear: both"></div>
              </div>
              <div class="suggest_bot_tip">
                <span class="left">
                  <strong>常用联系人</strong>
                  ：
                </span>
                <span class="right">
                  <strong>我的小组成员</strong>
                  ：
                </span>
              </div>
              <div id="colla_suggest_box"></div>
            </div>
            <div class="add_new_button" style="text-align: right">
              <span class="designer_button normal" onclick="UI.doAddCollaboration()">发送邀请 </span>
            </div>
          </div>
        </div>
      </div>
      <div id="pubpo_win" title="发布和公开到ProcessOn" class="dialog-win dialog" style="width: 718px; z-index: 3">
        <div class="pubpo-content"></div>
      </div>
      <div id="share_win" title="分享" class="dialog-win dialog" style="width: 700px; z-index: 3">
        <div class="dialog-win-left">
          <ul>
            <li tit="viewlink" class="active"><a>生成浏览链接</a></li>
            <li tit="emb"><a>嵌入到其他站点</a></li>
            <li tit="image"><a>生成在线图片</a></li>
          </ul>
        </div>
        <div class="dialog-win-right"></div>
      </div>
      <div id="image_dialog" class="dialog">
        <div class="dialog_header">选择图片</div>
        <div class="dialog_content" style="padding: 0px">
          <ul class="image_sources">
            <li ty="upload" class="active">我的图片</li>
            <li ty="url">网络图片</li>
            <li ty="search">搜索图片</li>
          </ul>
          <div class="image_content">
            <div id="image_select_upload" class="image_list">
              <form id="frm_upload_image" action="/user_image/upload" method="post" enctype="multipart/form-data">
                <div id="btn_img_upload" class="toolbar_button active">
                  <div class="ico"></div>
                  上传图片
                  <input id="input_upload_image" name="image" type="file" />
                </div>
                <span id="upload_img_res"></span>
                <div style="clear: both"></div>
              </form>
              <div id="user_image_items" class="image_items"></div>
            </div>
            <div id="image_select_url" class="image_list" style="display: none">
              粘贴一个图片地址：<input id="input_img_url" type="text" class="input_text" style="width: 380px" />
              <div id="img_url_area"></div>
            </div>
            <div id="image_select_search" class="image_list" style="display: none">
              <input id="input_img_search" type="text" class="input_text" style="width: 380px" />
              <div id="btn_img_search" class="toolbar_button active" style="display: inline-block; width: 70px">
                搜索
              </div>
              <div style="padding: 15px 0px 0px">在上面输入搜索关键字，建议使用英文单词搜索。</div>
              <div id="google_image_items" class="image_items"></div>
            </div>
            <div class="image_btns">
              <div id="set_image_submit" class="designer_button">确定</div>
              <div id="set_image_cancel" class="designer_button normal">取消</div>
              <span id="set_image_text"></span>
            </div>
          </div>
          <div style="clear: both"></div>
        </div>
      </div>
      <div id="chattingbox">
        <div class="dock_view_header">
          聊天
          <span class="chatting_icon chatting_close" onclick="CLB.closeChatWin()"></span>
        </div>
        <div id="chatting_content">
          <ul id="chat_messages"></ul>
          <div class="dock_devider" style="margin-top: 0px"></div>
          <div class="chatting_bottom">
            <textarea id="chatting_edit" class="txt" style="width: 228px"></textarea>
            <input type="button" class="designer_button" value="发送" onclick="CLB.sendChatMsg()" />
          </div>
        </div>
      </div>
      <div id="disconnected" class="dialog">
        <div class="dialog_content" style="padding: 40px">您已经和服务器断开连接，请刷新重试。</div>
        <div class="dialog_buttons">
          <a class="designer_button" href="/diagraming/62874ea8513b7190af124543">重试</a>&nbsp;
          <a class="designer_button normal" href="/diagraming/back?id=62874ea8513b7190af124543">关闭</a>
        </div>
      </div>
      <div id="shapes_dialog" class="dialog" style="width: 400px">
        <div class="dialog_header">图形管理</div>
        <div class="dialog_content" style="padding: 0px; max-height: 372px; overflow: auto">
          <ul id="shape_manage_list">
            <li>
              <div><input type="checkbox" value="basic" />基础图形</div>
            </li>
            <li>
              <div><input type="checkbox" value="flow" />Flowchart 流程图</div>
            </li>
            <li>
              <div><input type="checkbox" value="bpmn" />BPMN</div>
            </li>
            <li>
              <div><input type="checkbox" value="evc" />EVC 企业价值链</div>
            </li>
            <li>
              <div><input type="checkbox" value="epc" />EPC 事件过程链</div>
            </li>
            <li>
              <div><input type="checkbox" value="lane" />泳池/泳道</div>
            </li>
            <li>
              <div><input type="checkbox" value="grid" />表格</div>
            </li>
            <li>
              <div><input type="checkbox" value="er" />实体关系图 (E-R图)</div>
            </li>
            <li>
              <div>
                <input
                  type="checkbox"
                  class="cate_parent"
                  value="uml_common,uml_usecase,uml_sequence,uml_class,uml_stateactivity,uml_deployment,uml_component"
                />UML图
              </div>
            </li>
            <li class="child">
              <div><input type="checkbox" value="uml_common" />UML 通用</div>
            </li>
            <li class="child">
              <div><input type="checkbox" value="uml_usecase" />UML 用例图</div>
            </li>
            <li class="child">
              <div><input type="checkbox" value="uml_sequence" />UML 时序图</div>
            </li>
            <li class="child">
              <div><input type="checkbox" value="uml_class" />UML 类图</div>
            </li>
            <li class="child">
              <div><input type="checkbox" value="uml_stateactivity" />UML 状态图/活动图</div>
            </li>
            <li class="child">
              <div><input type="checkbox" value="uml_deployment" />UML 部署图</div>
            </li>
            <li class="child">
              <div><input type="checkbox" value="uml_component" />UML 组件图</div>
            </li>
            <li>
              <div><input type="checkbox" class="cate_parent" value="ui,ui_input" />UI 界面原型图</div>
            </li>
            <li class="child">
              <div><input type="checkbox" value="ui" />UI 界面元素</div>
            </li>
            <li class="child">
              <div><input type="checkbox" value="ui_input" />UI 输入控件</div>
            </li>
            <li>
              <div>
                <input type="checkbox" class="cate_parent" value="ios_devices,ios_elements,ios_controls,ios_icons" />iOS
                界面原型图
              </div>
            </li>
            <li class="child">
              <div><input type="checkbox" value="ios_devices" />iOS 设备</div>
            </li>
            <li class="child">
              <div><input type="checkbox" value="ios_elements" />iOS 元素</div>
            </li>
            <li class="child">
              <div><input type="checkbox" value="ios_controls" />iOS 控件</div>
            </li>
            <li class="child">
              <div><input type="checkbox" value="ios_icons" />iOS 图标</div>
            </li>
            <li>
              <div>
                <input
                  type="checkbox"
                  class="cate_parent"
                  value="andriod_devices,andriod_elements,andriod_controls,andriod_icons"
                />Android界面原型图
              </div>
            </li>
            <li class="child">
              <div><input type="checkbox" value="andriod_devices" />Android设备</div>
            </li>
            <li class="child">
              <div><input type="checkbox" value="andriod_elements" />Android控件</div>
            </li>
            <li class="child">
              <div><input type="checkbox" value="andriod_controls" />Android 表单</div>
            </li>
            <li class="child">
              <div><input type="checkbox" value="andriod_icons" />Android图标</div>
            </li>
            <li>
              <div><input type="checkbox" value="org" />ORG 组织结构图</div>
            </li>
            <li>
              <div><input type="checkbox" value="venn" />维恩图</div>
            </li>
            <li>
              <div><input type="checkbox" value="weizhu_bm" />魏朱商业模式</div>
            </li>
            <li class="disable">
              <div>
                <input
                  type="checkbox"
                  disabled
                  class="cate_parent"
                  value="network,network_aliyun,network_tencentcloud,network_aws2019,network_aws,network_cisco,network_azure"
                />网络拓扑图
              </div>
            </li>
            <li class="child">
              <div><input type="checkbox" value="network" />Network</div>
            </li>
            <li class="child">
              <div><input type="checkbox" value="network_aliyun" />阿里云</div>
            </li>
            <li class="child">
              <div><input type="checkbox" value="network_tencentcloud" />腾讯云</div>
            </li>
            <li class="child">
              <div><input type="checkbox" value="network_aws2019" />AWS2019</div>
            </li>
            <li class="child">
              <div><input type="checkbox" value="network_aws" />AWS</div>
            </li>
            <li class="child">
              <div><input type="checkbox" value="network_cisco" />Cisco</div>
            </li>
            <li class="child">
              <div><input type="checkbox" value="network_azure" />Azure</div>
            </li>
          </ul>
        </div>
        <div class="dialog_buttons" style="padding: 20px">
          <span class="designer_button" onclick="UI.saveShapesManage()">确定</span>&nbsp;
          <span class="designer_button normal" onclick="$('#shapes_dialog').dlg('close')">取消</span>
        </div>
      </div>
      <ul id="user_menu" class="menu list" style="z-index: 1; display: none; width: 160px">
        <li style="padding: 4px 16px">
          <div class="user" onmousedown="UI.showUserMenu(event)" style="display: flex">
            <!-- <img src="http://user-photo.ks3-cn-beijing.ksyuncs.com/62874ea5513b7190af12453d.png" />&nbsp; -->
            <a style="font-size: 14px; color: #222" href="/u/profile" target="_blank">198715_PO</a>
          </div>
        </li>
        <li class="devider"></li>
        <li>
          <a style="font-size: 14px; color: #222; display: block" href="/upgrade?pos=6_1" target="_blank">升级</a>
        </li>
        <li>
          <a style="font-size: 14px; color: #222; display: block" href="/setting?f=flow" target="_blank">邀请好友</a>
        </li>
        <li ac="dia">我的文件</li>
        <li class="devider"></li>
        <li ac="out">退出</li>
      </ul>
      <div id="themes" class="menu" style="display: none"></div>
      <div id="svg_exporter" style="display: none; position: fixed; z-index: -10"></div>
      <ul id="export_file" class="menu list options_menu" style="margin-top: 10px">
        <li ac="export" type="image">
          <div class="ico icons">&#xe72b;</div>
          <span class="suffix">PNG图片文件（*.png）</span>
        </li>
        <li ac="export" type="jpg">
          <div class="ico icons">&#xe71e;</div>
          <span class="suffix">JPG图片文件（*.jpg）</span>
        </li>
        <li ac="export" type="pos">
          <div class="ico icons">&#xe71d;</div>
          <span class="suffix">ProcessOn文件（*.pos）</span>
        </li>
        <li ac="export" type="pdfHD">
          <div class="ico icons">&#xe727;</div>
          <span class="suffix">高清PDF文件（*.pdf）</span>
        </li>
        <li ac="export" type="svg">
          <div class="ico icons">&#xe728;</div>
          <span class="suffix">SVG文件（*.svg）</span>
        </li>
        <li ac="export" type="png">
          <div class="ico icons">&#xe724;</div>
          <img class="vip" src="images/icon/po_vip.svg" /><span class="suffix">高清PNG图片文件（*.png）</span>
        </li>
        <div style="dispaly: none">
          <iframe name="export_iframe" style="display: none"></iframe>
          <form id="export_form" action="" target="export_iframe" method="post">
            <input id="export_type" type="hidden" name="type" />
            <input id="export_definition" type="hidden" name="definition" />
            <input id="export_title" type="hidden" name="title" />
            <input id="export_width" type="hidden" name="width" />
            <input id="export_height" type="hidden" name="height" />
            <input type="hidden" name="chartId" value="62874ea8513b7190af124543" />
            <input type="hidden" name="ignore" value="definition" />
          </form>
        </div>
      </ul>
    </div>
    <div>
      <input id="signup_ticket" type="hidden" />
      <input id="randstr" type="hidden" />
      <span
        style="display: none"
        id="TencentCaptcha"
        data-appid="2046103261"
        data-cbfn="callback_public"
        class="pro-btn default pub-btn"
        >点击验证</span
      >
    </div>
    <div id="myshape_dialog" class="dialog">
      <div class="dialog_header">我的图形</div>
      <div class="dialog_content myshape_wrap">
        <div class="no_myshape">
          <div class="diagraming-icons">&#xe68f;</div>
          <p class="p1">svg 、 png 、 jpg, svg 、 png 、 jpg, 不超出200k</p>
          <p>你可以导入自定义的图标或者图形</p>
        </div>
      </div>
      <div class="dialog_buttons" style="padding-top: 15px; border-top: 1px solid #e5e5e5">
        <form id="frm_import_myshape" action="/user_image/upload" method="post" enctype="multipart/form-data">
          <input type="file" id="import_myshape_input" name="image" accept=".svg,.png,.jpg" style="display: none" />
          <input type="hidden" value="false" name="isSaveAs" style="display: none" />
        </form>
        <div class="designer_button fl" id="import_myshape">导入</div>
        &nbsp;
        <p class="fl" style="line-height: 34px; margin: 0 10px; color: #7f7f7f">
          目前支持导入的文件类型：&nbsp;svg&nbsp;&nbsp;png&nbsp;&nbsp;jpg
        </p>
        <div class="designer_button normal" onclick="$('#myshape_dialog').dlg('close');">取消</div>
      </div>
    </div>
    <div id="teamcategory_dialog" title="移动至" class="dialog-win dialog" style="width: 500px; padding-bottom: 0">
      <div class="line" style="margin: 0px 0px 10px -24px"></div>
      <span style="color: #666">选择您要移动的组件库</span>
      <div class="search-btn-group">
        <input class="search-input" id="search-team-category" type="text" placeholder="搜索组件库" />
        <span id="search-category-icons" class="icons search-icons">&#xe6a0;</span>
      </div>
      <div id="scroll_category">
        <div class="member-row category-row-nav">
          <ul id="team_category_list"></ul>
        </div>
      </div>
      <div class="team-category-footer">
        <span class="pro-btn default okbtn">确定</span>
        <span class="pro-btn cancel-button close">取消</span>
      </div>
    </div>
    <div id="addcategory_dialog" title="新建分类" class="dialog-win dialog" style="width: 366px; padding-bottom: 0">
      <div>
        <span class="addCategory-name">名称:</span>
        <input class="category-input" id="name-team-category" type="text" value="未命名分类" placeholder="" />
      </div>
      <div class="add-category-footer">
        <span class="pro-btn default okbtn">确定</span>
        <span class="pro-btn cancel-button close">取消</span>
      </div>
    </div>
    <div id="team_shape_dialog" class="team_shape_loading">
      <div class="team_shape_title">未知</div>
      <span class="team_shape_content"></span>
    </div>
    <form
      id="team_shape_form"
      method="POST"
      action="https://api.processon.com/openapi/diagrams"
      target="iframe_team_shape"
      accept-charset="UTF-8"
      style="position: absolute; bottom: -100px"
    >
      <input type="hidden" name="appkey" value="c02e8181d18eb969a95d8faf5d8b7079" />
      <input type="hidden" name="chartid" value="0000000" />
      <input type="hidden" name="category" value="flow" />
      <input id="team_shape_form_title" type="hidden" name="title" value="未命名文件" />
      <input id="team_shape_form_def" type="hidden" name="def" value="" />
      <input type="hidden" name="hidebtn" value="false" />
      <input type="hidden" name="callbackurl" value="http://www.aads.com" />
      <input type="submit" value="Submit" />
    </form>
    <!-- <span class="icons" style="z-index: -1;">&#xe672;</span> -->
    <div class="showContent" v-if="showTask && showTaskMenu">
      <div class="show-item" :style="!manageshow[1] ? 'width: 170px' : ''">
        <div class="show-item-heard">
          <span>工作内容</span>
          <img
            @click="manageShow(1)"
            :style="!manageshow[1] ? '' : 'transform: rotate(180deg)'"
            src="@/static/task/itempoint.png"
          />
        </div>
        <div v-if="manageshow[1]" :style="manageshow[1] ? '' : 'height:0;padding:0'" class="show-item-main1">
          <template v-if="itemMessage.workContent != ''">{{ itemMessage.workContent }}</template>
          <template v-else>
            <div class="emptyBox">
              <img src="@/static/task/listdefault.png" style="height: 100px; width: auto" />
              <span>暂无数据</span>
            </div>
          </template>
        </div>
      </div>
      <div class="show-item" :style="!manageshow[2] ? 'width: 170px' : ''">
        <div class="show-item-heard">
          <span>计划用时</span>
          <img
            @click="manageShow(2)"
            :style="!manageshow[2] ? '' : 'transform: rotate(180deg)'"
            src="@/static/task/itempoint.png"
          />
        </div>
        <div v-if="manageshow[2]" class="show-item-main2" :style="manageshow[2] ? '' : 'height:0;padding:0'">
          <template v-if="itemMessage.time">
            <span>{{ itemMessage.time }}</span>
            <span>{{ itemMessage.timeUnit }}</span>
          </template>
          <template v-else>
            <div class="emptyBox">
              <span>暂无数据</span>
            </div>
          </template>
        </div>
      </div>
      <div class="show-item" :style="!manageshow[3] ? 'width: 170px' : ''">
        <div class="show-item-heard">
          <span>工作文档</span>
          <img
            @click="manageShow(3)"
            :style="!manageshow[3] ? '' : 'transform: rotate(180deg)'"
            src="@/static/task/itempoint.png"
          />
          <div class="lookAll" @click="lookMoreWork" v-if="itemMessage.workFireList.length > 5 && manageshow[3]">
            查看更多
          </div>
        </div>
        <div class="show-item-main3" v-if="manageshow[3]" :style="manageshow[3] ? '' : 'height:0;padding:0'">
          <template v-if="itemMessage.workFireList.length > 0">
            <div
              class="show-item-main3-item"
              @click="openShowFire(item)"
              v-for="(item, index) in itemMessage.workFireList"
              :key="index"
            >
              <div class="show-item-main3-item-top">
                <span>{{ index + 1 }}.{{ item.name }}</span>
                <span style="color: #0d61cf">{{ item.create_user }}</span>
              </div>
              <!-- <div class="show-item-main3-item-bottom">
                (来自子任务XXXX)
              </div> -->
            </div>
          </template>
          <template v-else>
            <div class="emptyBox">
              <img src="@/static/task/listdefault.png" style="height: 100px; width: auto" />
              <span>暂无数据</span>
            </div>
          </template>
        </div>
      </div>
      <div class="show-item" :style="!manageshow[4] ? 'width: 170px' : ''">
        <div class="show-item-heard">
          <span>参考知识</span>
          <img
            @click="manageShow(4)"
            :style="!manageshow[4] ? '' : 'transform: rotate(180deg)'"
            src="@/static/task/itempoint.png"
          />
          <div class="lookAll" @click="lookMoreWork" v-if="itemMessage.knowFireList.length > 5 && manageshow[4]">
            查看更多
          </div>
        </div>
        <div class="show-item-main4" v-if="manageshow[4]" :style="manageshow[4] ? '' : 'height:0;padding:0'">
          <template v-if="itemMessage.knowFireList.length > 0">
            <div
              class="show-item-main4-item"
              @click="openShowFire(item)"
              v-for="(item, index) in itemMessage.knowFireList"
              :key="index"
            >
              <span>{{ index + 1 }}.{{ item.name }}</span>
              <div class="show-item-main4-itemdetail">
                <span style="font-size: 14px; color: #49525f"></span>
                <span style="color: #0d61cf; font-size: 16px">{{ item.create_user }}</span>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="emptyBox">
              <img src="@/static/task/listdefault.png" style="height: 100px; width: auto" />
              <span>暂无数据</span>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="showContent" v-else-if="!showTask && showTaskMenu">
      <div class="show-item" :style="!manageshow[1] ? 'width: 170px' : ''">
        <div class="show-item-heard">
          <span>工作内容</span>
          <img
            @click="manageShow(1)"
            :style="!manageshow[1] ? '' : 'transform: rotate(180deg)'"
            src="@/static/task/itempoint.png"
          />
        </div>
        <div  v-if="manageshow[1]" :style="manageshow[1] ? '' : 'height:0;padding:0'" class="show-item-main1">
          <template v-if="flowMessage.workContent != ''">{{ flowMessage.workContent }}</template>
          <template v-else>
            <div class="emptyBox">
              <img src="@/static/task/listdefault.png" style="height: 100px; width: auto" />
              <span>暂无数据</span>
            </div>
          </template>
        </div>
      </div>
      <div class="show-item" :style="!manageshow[2] ? 'width: 170px' : ''">
        <div class="show-item-heard">
          <span>计划用时</span>
          <img
            @click="manageShow(2)"
            :style="!manageshow[2] ? '' : 'transform: rotate(180deg)'"
            src="@/static/task/itempoint.png"
          />
        </div>
        <div v-if="manageshow[2]" class="show-item-main2" :style="manageshow[2] ? '' : 'height:0;padding:0'">
          <template v-if="flowMessage.time">
            <span>{{ flowMessage.time }}</span>
            <span>{{ flowMessage.timeUnit }}</span>
          </template>
          <template v-else>
            <div class="emptyBox">
              <span>暂无数据</span>
            </div>
          </template>
        </div>
      </div>
      <div class="show-item" :style="!manageshow[3] ? 'width: 170px' : ''">
        <div class="show-item-heard">
          <span>工作文档</span>
          <img
            @click="manageShow(3)"
            :style="!manageshow[3] ? '' : 'transform: rotate(180deg)'"
            src="@/static/task/itempoint.png"
          />
          <div
            class="lookAll"
            @click="lookMoreWork"
            v-if="flowMessage.workFireList && flowMessage.workFireList.length > 5 && manageshow[3]"
          >
            查看更多
          </div>
        </div>
        <div v-if="manageshow[3]" class="show-item-main3" :style="manageshow[3] ? '' : 'height:0;padding:0'">
          <template v-if="flowMessage.workFireList.length > 0">
            <div
              class="show-item-main3-item"
              @click="openShowFire(item)"
              v-for="(item, index) in flowMessage.workFireList"
              :key="index"
            >
              <div class="show-item-main3-item-top">
                <span>{{ index + 1 }}.{{ item.fileName }}</span>
                <span style="color: #0d61cf">{{ item.createUser }}</span>
              </div>
              <!-- <div class="show-item-main3-item-bottom">
                (来自子任务XXXX)
              </div> -->
            </div>
          </template>
          <template v-else>
            <div class="emptyBox">
              <img src="@/static/task/listdefault.png" style="height: 100px; width: auto" />
              <span>暂无数据</span>
            </div>
          </template>
        </div>
      </div>
      <div class="show-item" :style="!manageshow[4] ? 'width: 170px' : ''">
        <div class="show-item-heard">
          <span>参考知识</span>
          <img
            @click="manageShow(4)"
            :style="!manageshow[4] ? '' : 'transform: rotate(180deg)'"
            src="@/static/task/itempoint.png"
          />
          <div class="lookAll" @click="lookMoreWork" v-if="flowMessage.knowFireList.length > 5 && manageshow[4]">
            查看更多
          </div>
        </div>
        <div v-if="manageshow[4]" class="show-item-main4" :style="manageshow[4] ? '' : 'height:0;padding:0'">
          <template v-if="flowMessage.knowFireList.length > 0">
            <div
              class="show-item-main4-item"
              @click="openShowFire(item)"
              v-for="(item, index) in flowMessage.knowFireList"
              :key="index"
            >
              <span>{{ index + 1 }}.{{ item.fileName }}</span>
              <div class="show-item-main4-itemdetail">
                <span style="font-size: 14px; color: #49525f"></span>
                <span style="color: #0d61cf; font-size: 16px">{{ item.createUser }}</span>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="emptyBox">
              <img src="@/static/task/listdefault.png" style="height: 100px; width: auto" />
              <span>暂无数据</span>
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- <div class="onerootinfo" style="right: 220px" @click="exportInfo">导出页面数据</div>
    <div class="onerootinfo" @click="importInfo">导入页面数据</div>
    <div class="onerootinfo allinfo" @click="lockingInfo">锁定</div> -->
  </div>
</template>
<script>
import { onDiagramMessage } from '@/utils/utils';
import { scripts } from '@/utils/public';
import Bus from '@/utils/bus';

let info = null;

export default {
  data() {
    return {
      scripts: scripts,
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
      showTask: false,
      showTaskMenu: true,
      taskTop: 0,
      taskLeft: 0,
      taskHeight: 0,
      taskWidth: 0,
      itemWidth: 0,
      selectTaskStatus: 1,
      manageshow: [1, true, true, true, true],
      itemId: '',
    };
  },
  mounted() {
    onDiagramMessage();

    for (var i = 0; i < this.scripts.length; i++) {
      let nav = document.createElement('script');
      nav.type = 'text/javascript';
      nav.defer = true;
      nav.async = false;
      nav.class = 'javascript';
      nav.src = this.scripts[i] + '?t=' + new Date().getTime();
      document.body.appendChild(nav);
    }
    Bus.$on('home3FlowQueryMsg', (event) => {
      this.IfDesignerNone(event);

      if (event.data.type === 'toFullScreen') {
        this.showTaskMenu = event.data.close;
      }
    });
    window.parent.postMessage({ type: 'toGetInfo' }, '*');
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
    controlls(event) {
      if (event.data.name == 'toshowItemTask') {
        this.showTask = true;
        let showTaskItem = JSON.parse(event.data.item);
        this.itemId = showTaskItem.id;
        if (showTaskItem.category !== 'lane') {
          let info = showTaskItem;
          if (info.itemMessage) {
            let bl = false;
            Object.values(info.itemMessage).forEach((item) => {
              if (item) bl = true;
            });
            if (bl) this.itemMessage = info.itemMessage;
          } else
            info.itemMessage = {
              workContent: '',
              time: '',
              timeUnit: '',
              workFireList: [],
              knowFireList: [],
              cost: [],
              CostList: [],
            };
          this.toSetShow(this.itemMessage);
        } else {
          this.showTask = false;
          this.itemId = '';
        }
      } else if (event.data.name == 'toCloseItemTask') {
        this.showTask = false;
        this.itemId = '';
        this.toSetShow(this.flowMessage);
      } else if (event.data.type == 'watchData') {
        // console.log(JSON.parse(event.data.iframeMessage), 'fggdhs');
        this.flowMessage = JSON.parse(event.data.iframeMessage).flowMessage;
        this.flowMessage.workFireList = event.data.workFile || [];
        this.flowMessage.knowFireList = event.data.referenceFile || [];
        this.toSetShow(this.flowMessage);
        Designer.open(JSON.parse(event.data.iframeMessage));
        Designer.initialize.canvasSizeAuto();
        this.lockingInfo();
        document.getElementById('designer_layout').scrollTop = 0;
        document.getElementById('designer_layout').scrollLeft = 0;
      } else if (event.data.type == 'getFlow') {
        let flow = this.toGetMapInfo();
        if (flow) window.parent.postMessage({ iframeMessage: JSON.stringify(flow), type: 'toSubmit' }, '*');
      }
    },
    toSetShow(message) {
      if (message.workContent === '') {
        this.manageshow[1] = false;
      } else {
        this.manageshow[1] = true;
      }
      if (message.time === '') {
        this.manageshow[2] = false;
      } else {
        this.manageshow[2] = true;
      }
      if (message.workFireList && message.workFireList.length === 0) {
        this.manageshow[3] = false;
      } else {
        this.manageshow[3] = true;
      }
      if (message.knowFireList && message.knowFireList.length === 0) {
        this.manageshow[4] = false;
      } else {
        this.manageshow[4] = true;
      }
    },
    //测试获取数据
    toGetMapInfo() {
      let oldDdata = Utils.copy(Model.define);
      console.log(oldDdata, 'ghgjhjhjhj888');
      let mapData = Object.values(oldDdata.elements);
      console.log(mapData, 111);
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
        //节点信息转换格式
        if (mapData[i].name == 'terminator') {
          //开始节点
          if (toFlow.startEvent.id) {
            this.$message.error('流程无法有多个开始节点!');
            return;
          }
          toFlow.startEvent = {
            id: mapData[i].id,
            name: mapData[i]?.textBlock?.[0]?.text.replace(/<[^>]+>/g, '') || '',
          };
        } else if (mapData[i].name == 'terminator2') {
          //结束节点
          toFlow.endEvent.push({
            id: mapData[i].id,
            name: mapData[i]?.textBlock?.[0]?.text.replace(/<[^>]+>/g, '') || '',
          });
        } else if (mapData[i].name == 'decision') {
          //判断节点
          toFlow.exclusiveGateway.push({
            id: mapData[i].id,
            name: mapData[i]?.textBlock?.[0]?.text.replace(/<[^>]+>/g, '') || '',
          });
        } else if (mapData[i].name == 'linker') {
          //连线
          toFlow.sequenceFlow.push({
            id: mapData[i].id,
            start: mapData[i].from.id,
            end: mapData[i].to.id,
            name: mapData[i]?.text.replace(/<[^>]+>/g, '') || '',
            conditionExpression: mapData[i]?.text.replace(/<[^>]+>/g, '') || '',
          });
        } else if (mapData[i].category !== 'lane') {
          //其他所有节点(排除泳池泳道)
          toFlow.userTask.push({
            id: mapData[i].id,
            // userId: "hczy",
            name: mapData[i]?.textBlock?.[0]?.text.replace(/<[^>]+>/g, '') || '',
          });
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
          if (mapData[i].itemMessage.time) {
            planTime.push({
              time_type: mapData[i].itemMessage.timeUnit,
              time_cost: mapData[i].itemMessage.time,
              processNodeId: mapData[i].id,
            });
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
      if (!toFlow.startEvent.id) {
        for (let i = 0, length = toFlow.userTask.length; i < length; i++) {
          let j = 0;
          for (let l = toFlow.sequenceFlow.length; j < l; j++) {
            if (toFlow.sequenceFlow[j].end === toFlow.userTask[i].id) {
              break;
            }
          }
          if (j === toFlow.sequenceFlow.length) {
            toFlow.startEvent = {
              id: 'qnmdsjbgdsb',
              name: '',
            };
            toFlow.sequenceFlow.push({
              id: 'hczy' + (Math.random() * 100000000000000000).toString(),
              start: 'qnmdsjbgdsb',
              end: toFlow.userTask[i].id,
              name: '',
              conditionExpression: '',
            });
          }
        }
      }

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
            name: '',
          });
          toFlow.sequenceFlow.push({
            id: 'hczy' + (Math.random() * 100000000000000000).toString(),
            start: toFlow.userTask[i].id,
            end: endId,
            name: '',
            conditionExpression: '',
          });
        }
      }

      if (toFlow.userTask.length < 2) {
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
      }

      for (let i = 0, length = toFlow.exclusiveGateway.length; i < length; i++) {
        for (let j = 0, l = toFlow.sequenceFlow.length; j < l; j++) {
          if (
            toFlow.exclusiveGateway[i].id === toFlow.sequenceFlow[j].start &&
            toFlow.sequenceFlow[j].conditionExpression === ''
          ) {
            this.$message.error('判断节点缺少判断条件');
            return;
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
    lookMoreWork() {
      window.parent.postMessage({ iframeMessage: this.itemId || '', type: 'toLookMore' }, '*');
    },
    openShowFire(item) {
      window.parent.postMessage({ iframeMessage: item || '', type: 'toLookFire' }, '*');
    },
    manageShow(index) {
      this.$set(this.manageshow, index, !this.manageshow[index]);
    },
    //锁定页面数据
    lockingInfo() {
      let oldDdata = Utils.copy(Model.define);
      let mapData = Object.values(oldDdata.elements);
      let b = mapData.map((item) => {
        return item.id;
      });
      if (b.length == 0) {
        return;
      }
      var d = [];
      for (var c = 0; c < b.length; c++) {
        var a = Model.getShapeById(b[c]);
        a.locked = true;
        d.push(a);
      }
      Utils.unselect();
      // Utils.selectShape(b);
      Model.updateMulti(d);
    },
    //导入页面数据
    importInfo() {
      this.$axios.get('/json/testImportInfo2.json', {}).then((response) => {
        console.log(response);
        this.todoInfo(response.data);
        Designer.open(response.data);
        Designer.initialize.canvasSizeAuto();
      });
    },

    todoInfo(data) {
      console.log(data, 'gfsdgfsg');
      const info = Object.values(data.elements);
      const messageInfo = info.filter((item) => {
        return item.itemMessage != undefined;
      });
      this.flowMessage = data.flowMessage;
      console.log(messageInfo, 'messageInfo');
    },

    //导出页面数据
    exportInfo() {
      let data = Utils.copy(Model.define);
      console.log(JSON.stringify(data), 'exportInfo');
    },
  },
  beforeDestroy() {
    Bus.$off('home3FlowQueryMsg');
  },
};
</script>

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

/* 屏蔽操作 */
#shape_panel {
  display: none;
}
#designer_viewport {
  margin-left: 0;
}
#designer_header {
  display: none;
  height: 0;
}
#designer,
#designer_viewport {
  height: 100%;
}
#designer_viewport >>> .shape_anchor {
  display: none !important;
}
#designer_viewport >>> .shape_locker {
  display: none !important;
}

.showTask {
  width: 550px;
  height: 110px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0px 1px 5px 0px rgba(0, 65, 154, 0.25);
  border-radius: 4px;
  position: absolute;
}
#designer_canvas {
  position: relative;
}
.taskDetail {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
}
.taskDeatil-main-itemImg {
  display: flex;
  align-items: center;
}

#designer_canvas {
  background: #e1eaf7 !important;
  box-shadow: none;
}
.lanebar {
  background-color: #d1e1f8 !important;
  border-radius: 0 0 5px 5px;
}
.el-dropdown-link {
  display: flex;
  align-items: center;
  font-size: 16px;
}
.el-dropdown-link img {
  margin-left: 12px;
}

.showContent {
  width: 450px;
  position: absolute;
  top: 10px;
  right: 18px;
  display: flex;
  -moz-columns: inherit;
  columns: inherit;
  flex-direction: column;
  align-items: flex-end;
  max-height: calc(100% - 27px);
  overflow: auto;
  scrollbar-width: none;
}
.show-item {
  width: 100%;
  margin-bottom: 12px;
  background: #e8f0fc;
  border-radius: 6px;
  transition: all 0.5s;
}
.show-item-heard {
  height: 44px;
  background: #ffffff;
  box-shadow: 0px 2px 2px 0px rgba(0, 53, 137, 0.16);
  border-radius: 6px 6px 0px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 21px 0 23px;
  font-size: 18px;
  color: #12315c;
  font-family: 'Alibaba PuHuiTi Medium';
  position: relative;
}
.show-item-heard img {
  cursor: pointer;
}
.lookAll {
  width: 80px;
  height: 30px;
  background: #eaeff5;
  border-radius: 6px;
  position: absolute;
  top: 6px;
  right: 50px;
  text-align: center;
  line-height: 30px;
  font-weight: 400;
  color: #548fdb;
  font-size: 16px;
  cursor: pointer;
}
.show-item-main1 {
  height: 150px;
  padding: 16px 20px;
  color: #586880;
  line-height: 24px;
  font-size: 16px;
  overflow: hidden auto;
  transition: all 0.5s;
}
.show-item-main2 {
  height: 45px;
  padding: 0 25px;
  color: #586880;
  line-height: 24px;
  font-size: 16px;
  overflow: hidden auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.5s;
}
.show-item-main3 {
  height: 250px;
  padding: 23px 20px 24px 24px;
  color: #586880;
  line-height: 24px;
  font-size: 16px;
  overflow: hidden auto;
  transition: all 0.5s;
}
.show-item-main3-item {
  height: 45px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}
.show-item-main3-item-top {
  display: flex;
  justify-content: space-between;
  color: #49525f;
  font-size: 16px;
  font-weight: 400;
}
.show-item-main3-item-bottom {
  font-size: 14px;
  color: #49525f;
}
.show-item-main4 {
  height: 190px;
  padding: 20px 20px 20px 24px;
  color: #586880;
  line-height: 24px;
  font-size: 16px;
  overflow: hidden auto;
  transition: all 0.5s;
}
.show-item-main4-item {
  height: 45px;
  width: 100%;
  display: flex;
  color: #49525f;
}
.show-item-main4-item > span {
  width: 60%;
}
.show-item-main4-itemdetail {
  width: 40%;
  display: flex;
  justify-content: space-between;
}

.options_menu {
  height: 0;
  overflow: hidden;
  padding: 0;
  border: none;
}

.emptyBox {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.emptyBox span {
  color: #afc9e8;
}

.show-item-heard img {
  transition: all 0.5s;
}

#canvas_container {
  padding: 20px 250px 20px 20px !important;
}
#designer_layout {
  background: #e1eaf7 !important;
}
</style>

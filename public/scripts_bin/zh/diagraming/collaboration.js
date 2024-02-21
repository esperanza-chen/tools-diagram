window.PoNetwork = {
  preStatus: 'online',
  offlineCallback: null,
  onlineCallback: null,
  onlineVal: 'online',
  offlineVal: 'offline',
  intervalTime: 20000,
  networkTimer: null,
  imgExpireLoadTime: 5000,
  imgTimeoutTimer: null,
  imgTimeoutTimer2: null,
  init: function (a) {
    if (!a) {
      a = {};
    }
    PoNetwork.offlineHandlePub = a.offlineHandle;
    PoNetwork.onlineHandlePub = a.onlineHandle;
    if (a.onlineChange) {
      PoNetwork.onlineChangePub = a.onlineChange;
    }
    window.addEventListener('offline', PoNetwork.offlineFc, false);
    window.addEventListener('online', PoNetwork.onlineFc, false);
    if (PoNetwork.networkTimer) {
      clearInterval(PoNetwork.networkTimer);
    }
    PoNetwork.networkTimer = setInterval(function () {
      PoNetwork.test();
    }, PoNetwork.intervalTime);
    Object.defineProperty(PoNetwork, 'status', {
      get: function () {
        return this.preStatus;
      },
      set: function (b) {
        if (b == 'offline' && this.preStatus == 'online') {
          console.log('offline set');
          this.preStatus = b;
          PoNetwork.offlineChange();
        }
        if (b == 'online' && this.preStatus == 'offline') {
          console.log('online set');
          this.preStatus = b;
          PoNetwork.onlineChange();
        }
      },
    });
  },
  onlineChange: function () {
    if (this.onlineChangePub) {
      this.onlineChangePub();
    }
  },
  offlineChange: function () {},
  offlineHandle: function () {
    if (typeof offlineMask == 'undefined') {
      offlineMask = false;
    }
    if (!offlineMask) {
      PoNetwork.openDialog();
    }
    offlineMask = true;
    if (PoNetwork.offlineHandlePub) {
      PoNetwork.offlineHandlePub();
    }
    if (this.offlineCallback) {
      this.offlineCallback();
    }
  },
  onlineHandle: function () {
    if (typeof offlineMask == 'undefined') {
      offlineMask = false;
    }
    PoNetwork.closeDialog();
    offlineMask = false;
    if (PoNetwork.onlineCallback) {
      console.log('onlineCallback');
      PoNetwork.onlineCallback();
    }
    if (PoNetwork.onlineHandlePub) {
      PoNetwork.onlineHandlePub();
    }
  },
  clearNetworkTimer: function () {
    clearInterval(PoNetwork.netWorkTimer);
  },
  test: function (b) {
    if (b == null) {
      b = {};
    }
    PoNetwork.onlineCallback = b.onlineCallback || null;
    PoNetwork.offlineCallback = b.offlineCallback || null;
    PoNetwork.saveTrigger = b.saveTrigger || null;
    if (navigator.onLine == false) {
      PoNetwork.offlineFc();
    } else {
      return;
      var a = new Image();
      a.src = 'https://ks3-cn-beijing.ksyun.com/mind-files/netest.jpg?_u=' + new Date().getTime();
      PoNetwork.imgTimeoutTimer = setTimeout(function () {
        PoNetwork.testAgain();
        a = null;
      }, PoNetwork.imgExpireLoadTime);
      a.onload = function () {
        clearTimeout(PoNetwork.imgTimeoutTimer);
        clearTimeout(PoNetwork.imgTimeoutTimer2);
        PoNetwork.onlineFc();
        a = null;
      };
    }
  },
  offlineFc: function () {
    PoNetwork.status = 'offline';
    PoNetwork.offlineHandle();
  },
  onlineFc: function () {
    PoNetwork.status = 'online';
    PoNetwork.onlineHandle();
  },
  testAgain: function (c) {
    return;
    var b = this;
    var a = new Image();
    a.src = 'https://nettest.processon.com/assets/netest.jpg?_u=' + new Date().getTime();
    PoNetwork.imgTimeoutTimer2 = setTimeout(function () {
      b.offlineFc();
      a = null;
    }, PoNetwork.imgExpireLoadTime);
    a.onload = function () {
      clearTimeout(PoNetwork.imgTimeoutTimer2);
      b.onlineFc();
      a = null;
    };
  },
  openDialog: function (a) {
    // var b = this;
    // if ($.warnTip) {
    //   $.warnTip({
    //     content: a || '与服务器连接断开，请先检查本地网络。',
    //     closable: false,
    //     tipIcon: '&#xe672;',
    //     data: 'network',
    //   });
    // } else {
    //   console.log('请检查您的网络情况!');
    // }
    // if (!this.offlineTimer) {
    //   this.offlineTimer = setTimeout(function () {
    //     b.turnToReadOnly();
    //   }, 60000);
    // }
  },
  closeDialog: function () {
    this.offlineTimer && clearTimeout(this.offlineTimer);
    this.offlineTimer = null;
    if ($.warnTip) {
      $.warnTip('close', 'network');
    } else {
      console.log('关闭网络异常提示');
    }
  },
  offlineTimer: null,
  turnToReadOnly: function () {
    return;
    mind.opts.readonly = true;
    PoNetwork.readonlyDlg();
  },
  turnToEdit: function () {
    return;
    mind.opts.readonly = false;
    var a = $('.confirm-con');
    if (a.length > 0 && a.find('.confirm-hd').length > 0 && a.find('.confirm-hd').text().indexOf('云空间') > -1) {
      return;
    }
    $.confirm('close');
  },
  readonlyDlg: function () {
    return;
    var b = this;
    var a = {
      title: '提示',
      content: '与服务器连接断开，为避免编辑后内容丢失已切换为只读模式（不可编辑），请先检查本地网络。',
      okbtn: '我知道了',
      onConfirm: function () {},
      cancelbtn: null,
      onCancel: null,
      onClose: function () {
        if (mind.opts.readonly) {
          b.openDialog('与服务器连接断开，为避免编辑后内容丢失不可再编辑，请先检查本地网络。');
        }
      },
    };
    $.confirm(a);
  },
};
window.CLB = {
  clientId: null,
  collaClient: null,
  collaItv: null,
  collaUsers: null,
  collaUserCount: 1,
  collaUserClient: {},
  collaPollTimeSingle: 8000,
  collaPollTime: 3000,
  baseUrl: window.location.host.indexOf('processon.com') >= 0 ? 'https://cb.processon.com/' : '/',
  isOffLine: false,
  saving: false,
  versionSaveTime: 180000,
  versionNow: 0,
  version: 0,
  isSaveVersion: false,
  errorVersionStart: 0,
  errorSave: 0,
  prePoSaveStatus: 'success',
  checkMsgUnsavedTime: 3000,
  sendServerErrorStatus: false,
  sending: false,
  mess: [],
  tempMess: [],
  init: function () {
    var d = Math.random();
    var b = d + new Date().getTime();
    this.clientId = b.toString(16).replace('.', '');
    var c = this,
      a = '';
    window.onbeforeunload = function (e) {
      if (typeof poWebSocket != 'undefined' && poWebSocket && poWebSocket.readyState == 1) {
        console.log('onbeforeunload');
        poWebSocket.close(1000);
      }
    };
    window.setInterval(function () {
      if (c.isSaveVersion) {
        CLB.saveVersion();
      }
    }, CLB.versionSaveTime);
    document.addEventListener('visibilitychange', function () {
      // console.log(document.hidden);
      if (
        !document.hidden &&
        typeof poWebSocket != 'undefined' &&
        poWebSocket &&
        poWebSocket.readyState != 1 &&
        typeof CLB != 'undefined'
      ) {
        CLB.socketReconnect('dir');
      }
      PoNetwork.test();
    });
    if (!CLB.poSaveStatus) {
      Object.defineProperty(CLB, 'poSaveStatus', {
        get: function () {
          return this.prePoSaveStatus;
        },
        set: function (e) {
          if (e == 'success' && this.prePoSaveStatus == 'error') {
            CLB.serverRestartHandle();
          }
          this.prePoSaveStatus = e;
        },
      });
    }
  },
  send: function (d) {
    var e = this;
    this.version++;
    this.isSaveVersion = true;
    if (d.action == 'command') {
      this.version = this.version + d.messages.length - 1;
    }
    // console.log('version' + this.version,d);
    if (chartId == null || chartId == '') {
      e.isOffLine = true;
      if (UI && UI.zhuge) {
        zhuge.track('chartid为空', {
          触发位置: '流程图-msg'
        });
      }
      return;
    }
    var f = Utils.copy(d);
    $('#saving_tip').text('正在保存...');
    if (this.sending) {
      if (!$.isEmptyObject(f)) {
        this.tempMess = this.tempMess.concat(f);
      }
      return;
    }
    if (typeof savePartnerUnsaved != 'undefined') {
      clearTimeout(savePartnerUnsaved);
    }
    if (!$.isEmptyObject(f)) {
      e.mess = e.tempMess.concat(f);
    } else {
      e.mess = e.tempMess;
    }
    e.tempMess = [];
    var c = JSON.stringify(this.mess);
    e.sending = true;
    var b = e.collaUk;
    var a = e.collaClient;
  },
  sendErrorCount: 0,
  initVersion: function () {
    var b = Model.define || {},
      a = b.version || 0,
      e = JSON.parse(localStorage.getItem('def_' + chartId) || '{}'),
      c = e.version || 0,
      d = localStorage.getItem('def_' + chartId + '_v') || 0;
    if (a) {
      CLB.version = a;
    }
    if (a && c - a > 2) {
      Model.define = e;
      CLB.version = e.version;
      console.log('初始化当前文件版本号');
      this.saveOnline('initVersion');
      setTimeout(function () {
        Designer.open(Utils.copy(Model.define));
        Designer.initialize.canvasSizeAuto();
      }, 1000);
    }
  },
  initVersionCallback: function () {
    var b = this;
    if (typeof poWebSocket != 'undefined' && poWebSocket && poWebSocket.readyState == 1) {
      var c = {
        type: '_s@deliver',
        content: {
          client: b.userInfo.client,
          source: 'flow',
          msg: [],
          type: 'fe_all_update',
          version: b.version
        },
      };
      try {
        poWebSocket.send(JSON.stringify(c));
      } catch (a) {}
    }
  },
  directErrorHandle: function () {
    var a = this;
    a.judgeCollaStatus(function (b) {
      if (b != 'colla') {
        console.log('!colla指令出错但是服务正常时 ');
        a.saveOnline('initVersion');
      } else {
        a.getYunVersion(function (c) {
          if (c && c - a.version > 1) {
            a.saveVersion(null, function (d) {
              if (d == 'success') {
                location.reload();
              }
            });
          } else {
            console.log('指令出错但是服务正常时getYunVersion ');
            a.saveOnline('initVersion_colla');
          }
        });
      }
    });
  },
  serverRestartHandle: function (b) {
    var a = this;
    if (a.version - a.versionNow > 0) {
      a.getYunVersion(function (c) {
        if (c && c - a.version > 2) {
          a.dlgWarnAndReload();
        }
        if (c && c - a.version < 0) {
          console.log('serverRestartHandle');
          a.saveOnline('initVersion');
        }
      });
    } else {
      a.judgeCollaStatus(function (c) {
        if (c == 'colla') {
          a.getYunVersion(function (d) {
            if (d && d - a.version > 2) {
              a.dlgWarnAndReload();
            }
          });
        }
      });
    }
  },
  dlgWarnAndReload: function () {
    var a = this;
    if (PoNetwork.status == 'offline') {
      return;
    }
    a.stopCollaDlg('yunVersionLarge');
    if (typeof reload20s != 'undefined' && reload20s) {
      window.clearTimeout(reload20s);
    }
    reload20s = setTimeout(function () {
      location.reload();
    }, 5000);
  },
  clearDlgWarnAndReload: function () {
    var a = $('#stop-colla-dlg');
    if (a.length > 0 && a.css('display') == 'block') {
      a.dialog('close');
    }
    if (typeof reload20s != 'undefined' && reload20s) {
      window.clearTimeout(reload20s);
      reload20s = null;
    }
  },
  judgeCollaStatus: function (c) {
    var b = this;
    var a = b.collaUserClient || {};
    if (Object.keys(a).length > 1) {
      if (c) {
        c('colla');
      }
    } else {
      b.cooperatingSend(function (d) {
        if (d > 1) {
          if (c) {
            c('colla');
          }
        } else {
          if (c) {
            c('self');
          }
        }
      }, 'dir');
    }
  },
  getYunVersion: function (c) {
    // var b = { userId: userId, chartId: chartId },
    //   a = '/diagraming/get_def_version';
    // $.ajax({
    //   url: a,
    //   data: b,
    //   cache: false,
    //   type: 'post',
    //   success: function (d) {
    //     if (!d.version) {
    //       return;
    //     }
    //     if (c) {
    //       c(d.version);
    //     }
    //     return d.version;
    //   },
    //   error: function () { },
    // });
  },
  saveVersion: function (c, f) {
    var e = userName;
    var a = $.extend(Model.define, {
      comments: Model.comments
    });
    var b = JSON.stringify(a),
      d = '自动存储';
    if (c != null && c != '') {
      d = c;
    }
    // $.ajax({
    //   url: '/diagraming/add_version',
    //   data: { chartId: chartId, userId: userId, fullName: e, def: b, remark: d, ignore: 'def' },
    //   type: 'post',
    //   success: function (g) {
    //     CLB.isSaveVersion = false;
    //     if (f) {
    //       f('success');
    //     }
    //     Dock.loadHistorys(true);
    //     $('#history_remark').val('');
    //     $('#btn_history_clear').button('disable');
    //   },
    // });
  },
  saveLocal_: function () {
    var a = Utils.copy($.extend(Model.define, {
      comments: Model.comments
    }));
    if (this.version > 1) {
      a.version = this.version;
    }
    var b = JSON.stringify(a);
    if (b == '') {
      return;
    }
    localStorage.setItem('def_' + chartId, b);
    setTimeout(function () {
      $('#saving_tip').html("<span>已保存到本地<a title='保存到线上' onclick='CLB.saveOnline()'>保存</a></span>");
    }, 100);
  },
  getLocalVersion: function () {
    if (!chartId) {
      return 0;
    }
    var a = localStorage.getItem('def_' + chartId) || {};
    return a.version || 0;
  },
  removeLocalDef: function () {
    if (!chartId) {
      return;
    }
    localStorage.removeItem('def_' + chartId);
  },
  saveOnline: function (e) {
    // return;
    var b = this;
    console.log(Model.define)
    var a = Utils.copy($.extend(Model.define, {
      comments: Model.comments
    }));

    console.log('实时保存', a);
    if (b.saving) {
      return;
    }
    b.saving = true;
    // var a = Utils.copy($.extend(Model.define, { comments: Model.comments }));
    if (this.version > 1) {
      a.version = this.version;
    }
    var d = JSON.stringify(a);
    if (d == null || $.trim(d) == '') {
      Util.loading({
        content: '未发现本地数据，请编辑一个图形后，再次尝试',
        show: 3000,
        model: false
      });
      return;
    }
    b.version++;
    var c = Object.keys(Model.define.elements).length;
    return;
  },
  sendDirectly: function (b, e) {
    var d = {
      userId: userId,
      subject: chartId
    };
    var c = $.extend(d, b);
    var a = JSON.stringify(c);
  },
  onMessage: function (c) {
    var b = this;
    console.log(c);
    for (var a = 0; a < c.length; a++) {
      var e = c[a];
      var d = e.action;
      if (e.client == b.userInfo.client) {
        continue;
      }
      CLB.version++;
      if (d == 'changeTitle') {
        $('.diagram_title').text(e.title);
      } else {
        if (d == 'chat') {
          this.appendChatMsg(e.name, e.message, true);
        } else {
          if (d == 'changeSchema') {
            if (e.categories == '') {
              Designer.setSchema([]);
            } else {
              Designer.setSchema(e.categories.split(','));
            }
          } else {
            if (d == 'command') {
              MessageSource.receive(e.messages);
              CLB.version = CLB.version + e.messages.length - 1;
            } else {
              if (d == 'addHistory') {
                Dock.loadHistorys();
              }
            }
          }
        }
      }
    }
  },
  findLocal: function () {
    var a = false;
    return a;
  },
  deviceIdentify: function () {
    if (navigator.userAgent.indexOf('Yun/') > 0 || typeof window.cefQuery == 'undefined') {
      return 'poyun';
    }
    if (navigator.userAgent.indexOf('Mac OS') > 0) {
      return 'po_mac';
    }
    return 'poclient';
  },
  collaUk: null,
  collaUsers: {},
  collaUserClient: {},
  webSocketUrl: websocketUrl,
  baseUrl: window.location.host.indexOf('processon.com') >= 0 ? 'https://cb.processon.com/' : '/',
  userInfo: {
    defaultPort: window.location.origin + '/assets/images/user-port-default.png'
  },
  heartCheck: {
    heartRate: 10000,
    timer: null,
    serverTimer: null,
    reset: function () {
      clearTimeout(this.timer);
      clearTimeout(this.serverTimer);
      return this;
    },
    start: function () {
      var a = this;
      this.timer = setTimeout(function () {
        a.timer && clearTimeout(a.timer);
        a.serverTimer && clearTimeout(a.serverTimer);
        var b = {
          type: 'PING'
        };
        poWebSocket.send(JSON.stringify(b));
        a.serverTimer = setTimeout(function () {
          a.reset();
          CLB.stopCollaDlg('collaClose');
        }, a.heartRate);
      }, this.heartRate);
    },
  },
  collaStart: function () {
    var a = this;
    this.deviceType = this.deviceIdentify();
    a.userInfo.client = new Date().valueOf() + Utils.newId();
    if (typeof poWebSocket != 'undefined' && poWebSocket && poWebSocket.readyState == 1) {
      return;
    }
    if (typeof poWebSocket != 'undefined' && poWebSocket) {
      poWebSocket.close(1000);
    }
    poWebSocket = null;
    this.createWebsocket();
  },
  createWebsocket: function () {
    return;
    var a = this;
    if (!window.WebSocket) {
      console.log('不支持websocket');
      poCollect('不支持websocket', {
        device: deviceType
      });
      $.showTip('当前浏览器不支持WebSocket，请选择其他浏览器(Chrome, FireFox, Safari)');
      return;
    }
    if (typeof poWebSocket != 'undefined' && poWebSocket && poWebSocket.readyState != 1) {
      poWebSocket.close(1000);
      poWebSocket = null;
    }
    if (!userId) {
      return;
    }
    var c = userName ? userName.replace(/&amp;/g, '&') : '访客';
    client = this.userInfo.client;
    try {
      poWebSocket = new WebSocket(
        a.webSocketUrl +
        '?chartId=' +
        chartId +
        '&userId=' +
        userId +
        '&clientId=' +
        client +
        '&userName=' +
        encodeURIComponent(c) +
        '&role=1',
      );
      a.collaEventInit();
    } catch (b) {
      console.log('catch' + b);
      a.socketReconnect();
    }
  },
  reconnecting: false,
  reconnectTimer: null,
  reconnectCount: 0,
  reconnectTimerSpace: 10000,
  socketReconnect: function (c) {
    var a = this;
    if (this.reconnecting) {
      return;
    }
    this.reconnecting = true;
    if (PoNetwork.status == 'offline') {
      a.reconnecting = false;
      return;
    }
    if (c != 'dir') {
      this.reconnectCount += 1;
    }
    if (this.reconnectCount > 10) {
      a.reconnecting = false;
      this.collaServerError();
      return;
    }
    this.reconnectTimer && (clearTimeout(a.reconnectTimer), (a.reconnecting = false));
    var b = this.reconnectTimerSpace * this.reconnectCount;
    if (c == 'dir') {
      b = 100;
    }
    this.reconnectTimer = setTimeout(function () {
      console.log('重连中...');
      a.reconnecting = false;
      a.createWebsocket();
    }, b);
  },
  collaEventInit: function () {
    var a = this;
    poWebSocket.onopen = function () {
      a.reconnecting = false;
      a.reconnectCount = 1;
      poWebSocket.send(JSON.stringify({
        type: 'ONLINE_USER'
      }));
      a.closeCollaElseDlg();
      a.clearDlgWarnAndReload();
      if (typeof getCollaCountTimer != 'undefined' && getCollaCountTimer) {
        clearInterval(getCollaCountTimer);
      }
    };
    poWebSocket.onmessage = function (c) {
      console.log('socket msg');
      var g = JSON.parse(c.data);
      var d = g.type;
      switch (d) {
        case 'pong':
          a.clearDlgWarnAndReload('colla');
          break;
        case 'ONLINE_USER':
          var h = g.clients;
          console.log(h);
          if (h == null) {
            return;
          }
          a.collaUserCount = h.length;
          a.renderUsers(h);
          break;
        case 'JOIN_IN':
          a.collaUserCount += 1;
          a.renderUsers(g.content, 'join');
          break;
        case 'LEAVE_OUT':
          a.collaUserCount -= 1;
          a.renderUsers(g.content, 'leave');
          break;
        case '_s@deliver':
          var b = g.content,
            f = b.msg;
          if (b.type == 'fe_all_update') {
            if (b.version - a.version > 4) {
              if (a.poSaveStatus != 'success') {
                a.saveVersion(null, function (j) {
                  if (j == 'success') {
                    a.dlgWarnAndReload();
                  }
                });
              } else {
                a.dlgWarnAndReload();
              }
            }
            return;
          }
          a.onMessage(f);
          var e = f[0].messages[0];
          var i = null;
          if (e.action == 'update') {
            i = (e.content.updates[0] || {}).id;
          } else {
            i = e.content[0].id;
          }
          a.showUserOp(i, b.client);
          break;
      }
      a.heartCheck.reset();
      a.heartCheck.start();
    };
    poWebSocket.onerror = function (b) {
      console.log('socket error');
      console.log(b.code);
      a.heartCheck.reset();
      if (Utils.isSafari()) {
        PoNetwork.test({
          onlineCallback: function () {
            setTimeout(function () {
              a.stopCollaDlg('collaClose');
            }, 500);
          },
        });
      } else {
        setTimeout(function () {
          a.stopCollaDlg('collaClose');
        }, 500);
      }
    };
    poWebSocket.onclose = function (b) {
      console.log('socket onclose');
      console.log(b.code);
      a.heartCheck.reset();
      if (Utils.isSafari()) {
        PoNetwork.test({
          onlineCallback: function () {
            setTimeout(function () {
              a.stopCollaDlg('collaClose');
            }, 2000);
          },
        });
      } else {
        setTimeout(function () {
          a.stopCollaDlg('collaClose');
        }, 2000);
      }
    };
  },
  manageOnlineUsers: function (b) {
    CLB.collaUsers = b;
    CLB.collaUserCount = b.length;
    $('#collaborators').empty();
    $('#collaborators').children().attr('class', '');
    for (var e = 0; e < b.length; e++) {
      var a = b[e];
      var d = decodeURIComponent(a.userName);
      d = d.replace(/</g, '&lte;').replace(/>/g, '&gte;').replace(/'/g, '').replace(/“/g, '');
      CLB.collaUserClient[a.clientId] = a;
      if ($('#chat_user_' + a.userId).length == 0) {
        var c = 'https://accounts.processon.com/photo/' + a.userId + '.png';
        $('#collaborators').append(
          "<a href='/u/profile/" +
          a.userId +
          "' target='_blank' ><img id='chat_user_" +
          a.userId +
          "' src='" +
          c +
          "' title='" +
          d +
          "' title_pos='top'/></a>",
        );
      }
      $('#chat_user_' + a.userId).attr('class', 'online');
    }
    $('#collaborators').children('img[class!=online]').remove();
  },
  renderUsers: function (g, d) {
    if (Object.prototype.toString.call(g) === '[object Object]') {
      g.avatar = decodeURIComponent(g.avatar);
    }
    var e = this;
    var a = $('#collaborators');
    if (d == null && g instanceof Array) {
      e.collaUsers = {};
      e.collaUserClient = {};
      g.forEach(function (j, h) {
        j.avatar = decodeURIComponent(j.avatar);
        if (e.collaUserClient[j.clientId] == null) {
          e.collaUserClient[j.clientId] = j;
        }
        if (e.collaUsers[j.userId] == null) {
          e.collaUsers[j.userId] = j;
          e.collaUserClient[j.clientId] = j;
        }
      });
      e.resetUserPic.call(e, a, d, g);
      if (g.length > 1) {
        a.show();
      } else {
        if (g.length <= 1) {
          if (a.length > 0) {
            a.hide();
          }
          return;
        }
      }
    }
    if (d == 'join') {
      e.collaUserClient[g.clientId] = g;
      if (e.collaUsers[g.userId] == null) {
        e.collaUsers[g.userId] = g;
      }
      a.show();
      e.resetUserPic.call(e, a, d, g);
    }
    if (d == 'leave') {
      var f = 0;
      for (var c in e.collaUserClient) {
        var b = e.collaUserClient[c];
        if (b.userId == g.userId) {
          f++;
        }
      }
      if (e.collaUserClient[g.clientId]) {
        delete e.collaUserClient[g.clientId];
      }
      if (e.collaUsers[g.userId] && f > 0 && f < 2) {
        delete e.collaUsers[g.userId];
        e.resetUserPic.call(e, a, d, g);
      }
      if (Object.keys(e.collaUserClient).length <= 1) {
        if (a.length > 0) {
          a.hide();
        }
      }
    }
  },
  resetUserPic: function (b, f, a) {
    var e = this;
    var l = 30,
      m = b.find('.colla-users-list'),
      c = m.children(),
      j = [],
      g = [];
    for (var k in e.collaUsers) {
      j.unshift(e.collaUsers[k]);
    }
    if (f == null) {
      if (c.length < 1) {
        for (var d = 0; d < l; d++) {
          g.push(
            "<div uid='' ind='" +
            (l - d - 1) +
            "' style='left:" +
            d * 8 +
            "px; display: none;' class='colla-user' title_pos='top' disableTitle title=''><a><img src='" +
            e.userInfo.defaultPort +
            "' /></a></div>",
          );
        }
        m.html(g.join(''));
        h(j, l);
      }
    } else {
      h(j, l);
    }
    $('#colla-users-con,#colla_user_gather')
      .off('mouseover')
      .on('mouseover', function () {
        if (typeof hideCollaList != 'undefined') {
          clearTimeout(hideCollaList);
        }
        var i = $('header').outerWidth(),
          o = $('#colla-users-con').offset().left,
          p = $('#colla-users-con').outerWidth(),
          n = i - (o + p) - 43;
        $('#colla_user_gather').css('right', n).show();
      });
    $('#colla-users-con,#colla_user_gather')
      .off('mouseout')
      .on('mouseout', function (i) {
        hideCollaList = setTimeout(function () {
          $('#colla_user_gather').hide();
        }, 500);
      });

    function h(o, i) {
      var n = b.find('[uid]');
      n.each(function (p, q) {
        $(q).css({
          display: p < o.length ? 'block' : 'none'
        });
      });
      o.forEach(function (s, r) {
        var t = $('.colla-user[ind=' + (i - r - 1) + ']'),
          p = t.find('img');
        t.attr({
          uid: s.userId,
          title: decodeURIComponent(s.userName)
        });
        var q = 'https://accounts.processon.com/photo/' + s.userId + '.png';
        p.attr('src', q);
      });
    }
  },
  collaDecode: function (b) {
    if (b) {
      try {
        return decodeURI(b);
      } catch (a) {
        return b;
      }
    }
  },
  collaMemberList: function (n, l) {
    return;
    var j = this;
    var f = $('#colla_user_gather');
    if (f.length == 0) {
      f = $("<div id='colla_user_gather' style='display:none' class='colla_box'><div>").appendTo($('body'));
      f.html(
        "<div class='colla_owner'></div><div class='colla_list'><h6>文档协作中</h6><ul class='colla_oneself'></ul><ul class='colla_temp'></ul></div>",
      );
    }
    var c = n,
      d = f.find('.colla_temp');
    try {
      var i = 0,
        b = '';
      for (var o in j.collaUsers) {
        if (o == creatorId) {
          i++;
        }
      }
      if (i == 0) {
        b = "<span class='owner_offline'>离线</span>";
      }
      j.creatorCount++;
    } catch (k) {
      console.log('error');
    }
    if (l == null && c instanceof Array) {
      var h = [];
      c.forEach(function (q, p) {
        if (m(q, true)) {
          h.unshift(m(q, true));
        }
      });
      d.html(h.join(''));
    } else {
      if (l == 'join') {
        if ($('li[uid=' + c.userId + ']').length < 1) {
          d.prepend(m(c));
        }
      } else {
        if (l == 'leave') {
          var g = 0;
          for (var o in j.collaUserClient) {
            var a = j.collaUserClient[o];
            if (a.userId == c.userId) {
              g++;
            }
          }
          if (g > 0) {
            return;
          }
          if ($('li[uid=' + c.userId + ']').length) {
            $('li[uid=' + c.userId + ']').remove();
          }
        }
      }
    }

    function m(r, q) {
      var p = CLB.getUrlParams('user_id');
      if (p == r.userId && q) {
        $('.colla_oneself').html(
          "<li uid='" +
          r.userId +
          "'><img src='" +
          (r.avatar || j.userInfo.defaultPort) +
          "' /><span class='owner_name'>" +
          CLB.collaDecode(r.userName) +
          '</span><label>（我）</label></li>',
        );
        return false;
      }
      var s =
        "<li uid='" +
        r.userId +
        "'><img src='" +
        (r.avatar || j.userInfo.defaultPort) +
        "' /><span class='owner_name'>" +
        CLB.collaDecode(r.userName) +
        '</span></li>';
      return s;
    }
  },
  stm: null,
  showCollaTip: function (d, a, m) {
    var l = this,
      f = '',
      j = '',
      e = [];
    var k = m == 'leave' ? '离开' : '加入';
    for (var h = 0; h < a.length; h++) {
      var c = a[h];
      var g = l.collaUsers[c];
      if (m == 'join') {
        var b = '/photo/' + g.userId + '.png';
        if (window.location.host.indexOf('processon.com') >= 0) {
          b = 'https://accounts.processon.com/photo/' + g.userId + '.png';
        }
        if (e.indexOf(g.userId) < 0) {
          j =
            "<div uid='" +
            c +
            "' class='colla-user' title_pos='top' title='" +
            g.name +
            "'><a target='_blank' href='/u/" +
            g.uname +
            "/profile'><img src='" +
            b +
            "'/></a></div>";
          d.append(j);
          e.push(g.userId);
        }
      } else {
        d.find('[uid=' + c + ']').remove();
      }
      if (g == null || g.client == l.collaClient) {
        continue;
      }
      if (f != '') {
        f += ',';
      }
      f += g.name;
    }
    if (f != '') {}
  },
  poll: function () {
    return;
  },
  stop: function (a) {
    return;
  },
  renderOff: function (a) {
    var c = this;
    if ($('#stop_listen_tip').length) {
      return;
    }
    var b =
      '<div id="stop_listen_tip"><div style="font-size:17px;margin-top:40px;color:#999;font-size:16px;">温馨提示</div><div style="font-size:16px;margin-top:58px;color:#666;">由于您长时间未编辑图形<br><br>系统已自动为您存储历史版本并暂停了作图</div><div style="color:#666;font-size:16px;margin-top:40px;">点击 <a style="color:#63abf7;cursor:pointer" onclick="location.reload();">恢复</a></div></div>';
    if (c.isOffLine) {
      b =
        '<div id="stop_listen_tip"><div style="font-size:17px;margin-top:40px;color:#999;font-size:16px;">温馨提示</div><div style="font-size:16px;margin-top:58px;color:#666;">多人协作时，为了防止丢失图形，禁止使用离线模式</div><div style="font-size:16px;margin-top:8px;color:#666;">请确保网络恢复后刷新页面</div><div style="color:#666;font-size:16px;margin-top:40px;">点击 <a style="color:#63abf7;cursor:pointer" onclick="location.reload();">刷新页面</a></div></div>';
    } else {
      if (a) {
        b =
          '<div id="stop_listen_tip"><div style="font-size:17px;margin-top:40px;color:#999;font-size:16px;">温馨提示</div><div style="font-size:16px;margin-top:58px;color:#666;">协作服务器连接断开，多人协作状态下无法进行编辑操作</div><div style="font-size:16px;margin-top:8px;color:#666;">请刷新页面后操作</div><div style="color:#666;font-size:16px;margin-top:40px;">点击 <a style="color:#63abf7;cursor:pointer" onclick="location.reload();">刷新页面</a></div></div>';
      }
    }
    $(b).appendTo('body').show();
    $.mask();
  },
  userOpCount: {},
  showUserOp: function (g, a) {
    var c = CLB.collaUserClient[a];
    if (c == null) {
      return;
    }
    if (!g) {
      return;
    }
    var f = $('#' + g);
    if (f.length > 0) {
      var e = f.offset();
      var b = $('.colla-user-tip-con[uk=' + a + ']');
      if (b.length == 0) {
        var d = '/photo/' + c.userId + '.png';
        if (window.location.host.indexOf('processon.com') >= 0) {
          d = 'https://accounts.processon.com/photo/' + c.userId + '.png';
        }
        b = $(
          "<div uk='" +
          a +
          "' class='colla-user-tip-con'><img src='" +
          d +
          "'/> <span>" +
          decodeURIComponent(c.userName) +
          '</span>正在编辑此图形</div>',
        ).appendTo('body');
        if (CLB.userOpCount[a] != null) {
          window.clearTimeout(CLB.userOpCount[a]);
        }
        CLB.userOpCount[a] = setTimeout(function () {
          b.fadeOut().remove();
        }, 2000);
      }
      b.css({
        left: e.left + f.outerWidth() + 12,
        top: e.top + f.outerHeight() / 2 - b.outerHeight() / 2
      }).show();
    }
  },
  stop: function (c) {
    var a = that.collaClient,
      b = that.collaUk;
    poWebSocket.close(1000);
  },
  cooperatingSending: false,
  cooperatingSendErrorCount: 0,
  cooperatingSendErrorTime: null,
  cooperatingSend: function (e, d) {
    var c = this,
      b = 1;
    if (typeof PoNetwork != 'undefined' && PoNetwork.status == 'offline') {
      if (e) {
        e(b);
      }
      return;
    }
    var a = new Date().getTime();
    if (c.cooperatingSendErrorCount > 4 && a - c.cooperatingSendErrorTime < 180000 && !d) {
      if (e) {
        e(b);
      }
      return;
    }
    if (c.cooperatingSending) {
      if (e) {
        e(b);
      }
      return;
    }
    c.cooperatingSending = true;
  },
  collaClose: 0,
  stopCollaDlg: function (d) {
    var c = this;
    if (d == 'collaClose') {
      this.collaClose = 1;
    } else {
      this.collaClose = 0;
    }
    if (PoNetwork.status == 'offline') {
      return;
    }
    if (typeof getCollaCountTimer != 'undefined' && getCollaCountTimer) {
      clearInterval(getCollaCountTimer);
    }
    if (Object.keys(c.collaUserClient).length < 2 && d != 'yunVersionLarge' && d != 'collaClose') {
      c.socketReconnect('dir');
      getCollaCountTimer = setInterval(function () {
        c.cooperatingSend(function (e) {
          if (e > 1) {
            c.stopCollaDlg('dir');
          }
        });
      }, 20000);
      return;
    }
    if (Object.keys(c.collaUserClient).length < 2 && d != 'yunVersionLarge' && d != 'dir') {
      return;
    }
    var b = $('#stop-colla-dlg');
    if (b.length == 0) {
      var a =
        '<div id="stop-colla-dlg" class="dialog dialog-box" style="width: 400px;min-height: 0px;padding: 10px;z-index:3;"><h3 style="padding:3px 18px;margin-bottom:16px;">协作提示</h3><div style="padding:0px 18px;"><div style="font-size:14px;">检测到文档有更新版本，文档可能多人或多端协作编辑。</div></div><div style="margin-top:20px;" class="dialog_buttons"><span style="margin-right: 20px; color:#63abf7;cursor:pointer" onclick="location.reload();" class="mind-button"><span id="stop-colla-dlg-timer"></span>同步最新</span></div></div>';
      b = $(a).appendTo($('body'));
    }
    if (b.css('display') == 'block') {
      return;
    }
    b.dialog({
      closable: false
    });
    this.closeCollaElseDlg('stop');
    if (d != 'yunVersionLarge') {
      poCollect('协作断开', {
        page: 'flow-editor',
        chartId: chartId
      });
    }
  },
  closeCollaElseDlg: function (d) {
    var b = {
      stop: '#stop-colla-dlg',
      server: '#colla-servererror-'
    };
    for (var a in b) {
      if (d == a) {
        continue;
      }
      var c = $(b[a]);
      if (c.length > 0) {
        c.dialog('close');
      }
    }
  },
  collaServerError: function () {
    poCollect('协作服务异常', {
      page: 'flow-editor',
      chartId: chartId
    });
    var b = $('#colla-server-error');
    if (b.length == 0) {
      var a =
        '<div id="colla-server-error" class="dialog dialog-box" style="width: 400px;min-height: 0px;z-index:3;"><h3 style="padding:3px 18px;margin-bottom:16px;">协作异常</h3><div style="padding:0px 18px;margin-bottom:12px;"><div style="font-size:14px;">当前多人协作未成功连接，请确保网络通畅的情况，稍后重试。</div></div><div style="margin-top:20px;" class="dialog_buttons"><span style="margin-right: 20px; color:#63abf7;cursor:pointer" onclick="location.reload();" class="mind-button">刷新重试</span></div></div>';
      b = $(a).appendTo($('body'));
    }
    b.dialog();
    this.closeCollaElseDlg('server');
  },
  setConfig: function (b, a, c) {},
  filterIllegalWord: function (a) {
    return a.replace(/[(\ )(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\\)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)]+/g, '');
  },
};
$(function () {
  if (chartId == '' || userId == '') {
    return;
  }
  CLB.init();
  setTimeout(function () {
    CLB.initVersion();
  }, 1000);
  CLB.collaStart();
});

PoNetwork.init({
  offlineHandle: function () {},
  onlineChange: function () {
    if (typeof CLB != 'undefined') {
      CLB.serverRestartHandle();
      if (typeof poWebSocket != 'undefined' && poWebSocket && poWebSocket.readyState != 1) {
        console.log('onlineChange-socketReconnect');
        CLB.socketReconnect('dir');
      }
      if (typeof poWebSocket != 'undefined' && poWebSocket && poWebSocket.readyState == 1) {
        CLB.clearDlgWarnAndReload();
      }
    }
  },
});
var postWpsErrorMsg = {
  SecretGroupLocked: '私密文件夹已经锁定',
  fileNameConflict: '文件名冲突',
  userNotLogin: '用户尚未登录',
  fileNameEmpty: '文件名不能为空, ',
  SecretGroupPermissionDenied: '私密文件夹操作权限不足',
  permissionDenied: '您的操作权限不足',
  InvalidArgument: '无效的参数',
  SpaceFull: '流程图自动保存至云文档，占用WPS云空间。WPS云空间不足导致保存失败，您可开通会员或整理云文档获取更多可用的云空间。',
  userDeptSpaceFull: 'WPS企业云空间不足导致保存失败，您可开通会员或整理云文档获取更多可用的云空间。',
  userSpaceFull: '云空间不足导致保存失败，您可开通会员或整理云文档获取更多可用的云空间。',
  fileNameLengthExceed: '文件名需控制在100个字符以内，请修改文件名。',
  illegalFname: '文件名不能包含*等特殊字符，请修改文件名。',
  notGroupMember: '您已不是该团队成员',
  fileNotUploaded: '文件未上传',
  fileNotExists: '文件(夹)不存在',
};
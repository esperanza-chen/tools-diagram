const sxyddSwimmingFun = function (arg) {
  return {
    name: arg.name,
    title: arg.title,
    category: arg.category,
    property: arg.property,
    attribute: {
      container: false,
      rotatable: false,
      linkable: false,
    },
    props: {
      w: 500,
      h: 500
    },
    lineStyle: {
      color: '225, 234, 247',
    },
    fillStyle: {
      color: '225, 234, 247',
    },
    anchors: [],
    resizeDir: ['l', 'b', 'r'],
    path: [{
        fillStyle: {
          type: 'none'
        },
        lineStyle: {
          lineStyle: 'solid'
        },
        actions: {
          ref: 'rectangle'
        }
      },
      {
        lineStyle: {
          lineStyle: 'solid'
        },
        actions: [{
            action: 'move',
            x: 0,
            y: 0
          },
          {
            action: 'line',
            x: 'w',
            y: 0
          },
          {
            action: 'line',
            x: 'w',
            y: 30
          },
          {
            action: 'line',
            x: 0,
            y: 30
          },
          {
            action: 'close'
          },
        ],
      },
    ],
    drawIcon: function (a, b) {
      b = a - 10;
      return [{
          fillStyle: {
            type: 'none'
          },
          actions: [{
              action: 'move',
              x: 0,
              y: 4
            },
            {
              action: 'line',
              x: a,
              y: 4
            },
            {
              action: 'line',
              x: a,
              y: b + 4
            },
            {
              action: 'line',
              x: 0,
              y: b + 4
            },
            {
              action: 'close'
            },
          ],
        },
        {
          fillStyle: {
            color: arg.style.titleColor[0]
          },
          actions: [{
              action: 'move',
              x: 0,
              y: 0
            },
            {
              action: 'line',
              x: a / 2,
              y: 0
            },
            {
              action: 'line',
              x: a / 2,
              y: 6
            },
            {
              action: 'line',
              x: 0,
              y: 6
            },
            {
              action: 'close'
            },
          ],
        },
        {
          fillStyle: {
            color: arg.style.titleColor[1]
          },
          actions: [{
              action: 'move',
              x: a / 2,
              y: 0
            },
            {
              action: 'line',
              x: a,
              y: 0
            },
            {
              action: 'line',
              x: a,
              y: 6
            },
            {
              action: 'line',
              x: a / 2,
              y: 6
            },
            {
              action: 'close'
            },
          ],
        },
        {
          fillStyle: {
            color: arg.style.titleColor[2]
          },
          actions: [{
              action: 'move',
              x: 0,
              y: 6
            },
            {
              action: 'line',
              x: 6,
              y: 6
            },
            {
              action: 'line',
              x: 6,
              y: (b + 4) / 2
            },
            {
              action: 'line',
              x: 0,
              y: (b + 4) / 2
            },
            {
              action: 'close'
            },
          ],
        },
        {
          fillStyle: {
            color: arg.style.titleColor[3]
          },
          actions: [{
              action: 'move',
              x: 0,
              y: b / 2 + 2
            },
            {
              action: 'line',
              x: 6,
              y: b / 2 + 2
            },
            {
              action: 'line',
              x: 6,
              y: b + 4
            },
            {
              action: 'line',
              x: 0,
              y: b + 4
            },
            {
              action: 'close'
            },
          ],
        },
        {
          fillStyle: {
            color: arg.style.titleColor[3]
          },
          actions: [{
              action: 'move',
              x: a / 2,
              y: 0
            },
            {
              action: 'line',
              x: a / 2,
              y: b + 4
            },
            {
              action: 'close'
            },
          ],
        },
        {
          fillStyle: {
            color: arg.style.titleColor[3]
          },
          actions: [{
              action: 'move',
              x: 0,
              y: (b + 4) / 2
            },
            {
              action: 'line',
              x: a,
              y: (b + 4) / 2
            },
            {
              action: 'close'
            },
          ],
        },
      ];
    },
    // =====
    onCreated: function (f, k) {
      var f = f || getPool(this, 'standardImage');
      if (f == null) {
        f = Model.create('displayNone', this.props.x, this.props.y - 40);
        f.children = [this.id];
        f.property = arg.property
        console.log(f)
        Model.add(f);
      }

      this.parent = f.id;
      const dataJSONBefore = Utils.copy(Model.define);
      const props = dataJSONBefore.elements[this.parent].props;

      let ele = getEle(props, arg)
      const dataJSON = Utils.copy(Model.define);

      // 去掉其他相关东西
      let c = {
        page: dataJSON.page,
        elements: dataJSON.elements,
        version: 0,
      };

      // 塞入双向泳道
      for (var i = 0; i < ele.length; i++) {
        c.elements[ele[i].id] = ele[i];
      }

      MessageSource.undoStack.push([{
        action: "create",
        content: ele
      }])

      Designer.open(c);
      Designer.initialize.canvasSizeAuto();

      setTimeout(() => {
        let shapeDom = document.getElementById("shape_text_edit")
        shapeDom.setAttribute('style', 'display:none');
      })
      setInterval(() => {
        let thisIdDom = document.getElementById(this.id)
        if (thisIdDom) {
          Model.define.elements[this.id].props.w = 0
          Model.define.elements[this.id].props.h = 0
          Model.define.elements[this.id].props.x = -1000
          thisIdDom.setAttribute('style', 'display:none');
        }
      }, 200);
    },
  }
}

const getEle = (props, arg) => {
  const num = "_" + new Date().getTime().toString();
  const swimming1 = "czyda_swimming" + num
  const swimming2 = "czydb_swimming" + num
  const swimming3 = "fgfc_swimming" + num
  const swimming4 = "sxydd_swimming" + num
  const swimming5 = "sxyde_swimming" + num
  return [{
      "id": "sxydparent" + num,
      "name": "verticalPool",
      "title": "泳池(垂直)",
      "category": "lane",
      "property": 'double',
      "group": "",
      "groupName": null,
      "locked": false,
      "link": "",
      "children": [swimming1, swimming2, swimming3, swimming4, swimming5],
      "parent": "",
      "resizeDir": ["l", "b", "r"],
      "attribute": {
        "container": true,
        "visible": true,
        "rotatable": false,
        "linkable": false,
        "collapsable": false,
        "collapsed": false,
        "markerOffset": 5
      },
      "dataAttributes": [],
      "props": {
        "x": props.x,
        "y": props.y,
        "w": 500,
        "h": 540,
        "zindex": -1,
        "angle": 0
      },
      "shapeStyle": {
        "alpha": 1
      },
      "lineStyle": {},
      "fillStyle": {
        "color": "198,218,249"
      },
      "theme": {},
      "path": [{
          "fillStyle": {
            "type": "none"
          },
          "lineStyle": {
            "lineStyle": "solid"
          },
          "actions": [{
              "action": "move",
              "x": "0",
              "y": "0"
            },
            {
              "action": "line",
              "x": "w",
              "y": "0"
            },
            {
              "action": "line",
              "x": "w",
              "y": "h"
            },
            {
              "action": "line",
              "x": "0",
              "y": "h"
            },
            {
              "action": "close"
            }
          ]
        },
        {
          "lineStyle": {
            "lineStyle": "solid"
          },
          "actions": [{
              "action": "move",
              "x": 0,
              "y": 0
            },
            {
              "action": "line",
              "x": "w",
              "y": 0
            },
            {
              "action": "line",
              "x": "w",
              "y": 40
            },
            {
              "action": "line",
              "x": 0,
              "y": 40
            },
            {
              "action": "close"
            }
          ]
        }
      ],
      "fontStyle": {
        "size": 16
      },
      "textBlock": [{
        "position": {
          "x": 10,
          "y": 0,
          "w": "w-20",
          "h": 40
        },
        "text": "​"
      }],
      "anchors": [],
      "itemMessage": {
        "workContent": "",
        "time": "",
        "timeUnit": "",
        "workFireList": [],
        "knowFireList": [],
        "cost": [],
        "CostList": []
      }
    },
    {
      "id": swimming1,
      "name": "verticalLane",
      "title": "泳道(垂直)",
      "category": "lane",
      "group": "",
      "groupName": null,
      "locked": false,
      "link": "",
      "children": [],
      "parent": "sxydparent" + num,
      "resizeDir": ["l", "b", "r"],
      "attribute": {
        "container": true,
        "visible": true,
        "rotatable": false,
        "linkable": false,
        "collapsable": false,
        "collapsed": false,
        "markerOffset": 5
      },
      "dataAttributes": [],
      "props": {
        "x": props.x,
        "y": props.y + 40,
        "w": 250,
        "h": 500,
        "zindex": -1,
        "angle": 0
      },
      "shapeStyle": {
        "alpha": 1
      },
      "lineStyle": {},
      "fillStyle": {
        "color": arg.style.titleColor[0]
      },
      "theme": {},
      "path": [{
          "fillStyle": {
            "type": "none"
          },
          "lineStyle": {
            "lineStyle": "solid"
          },
          "actions": [{
              "action": "move",
              "x": "0",
              "y": "0"
            },
            {
              "action": "line",
              "x": "w",
              "y": "0"
            },
            {
              "action": "line",
              "x": "w",
              "y": "h"
            },
            {
              "action": "line",
              "x": "0",
              "y": "h"
            },
            {
              "action": "close"
            }
          ]
        },
        {
          "lineStyle": {
            "lineStyle": "solid"
          },
          "actions": [{
              "action": "move",
              "x": 0,
              "y": 0
            },
            {
              "action": "line",
              "x": "w",
              "y": 0
            },
            {
              "action": "line",
              "x": "w",
              "y": 30
            },
            {
              "action": "line",
              "x": 0,
              "y": 30
            },
            {
              "action": "close"
            }
          ]
        }
      ],
      "fontStyle": {},
      "textBlock": [{
        "position": {
          "x": 30,
          "y": 0,
          "w": "w-30",
          "h": 30
        },
        "text": "&ZeroWidthSpace;"
      }],
      "anchors": []
    }, {
      "id": swimming2,
      "name": "verticalLane",
      "title": "泳道(垂直)",
      "category": "lane",
      "group": "",
      "groupName": null,
      "locked": false,
      "link": "",
      "children": [],
      "parent": "sxydparent" + num,
      "resizeDir": ["l", "b", "r"],
      "attribute": {
        "container": true,
        "visible": true,
        "rotatable": false,
        "linkable": false,
        "collapsable": false,
        "collapsed": false,
        "markerOffset": 5
      },
      "dataAttributes": [],
      "props": {
        "x": props.x + 250,
        "y": props.y + 40,
        "w": 250,
        "h": 500,
        "zindex": -1,
        "angle": 0
      },
      "shapeStyle": {
        "alpha": 1
      },
      "lineStyle": {},
      "fillStyle": {
        "color": arg.style.titleColor[1]
      },
      "theme": {},
      "path": [{
        "fillStyle": {
          "type": "none"
        },
        "lineStyle": {
          "lineStyle": "solid"
        },
        "actions": [{
          "action": "move",
          "x": "0",
          "y": "0"
        }, {
          "action": "line",
          "x": "w",
          "y": "0"
        }, {
          "action": "line",
          "x": "w",
          "y": "h"
        }, {
          "action": "line",
          "x": "0",
          "y": "h"
        }, {
          "action": "close"
        }]
      }, {
        "lineStyle": {
          "lineStyle": "solid"
        },
        "actions": [{
          "action": "move",
          "x": 0,
          "y": 0
        }, {
          "action": "line",
          "x": "w",
          "y": 0
        }, {
          "action": "line",
          "x": "w",
          "y": 30
        }, {
          "action": "line",
          "x": 0,
          "y": 30
        }, {
          "action": "close"
        }]
      }],
      "fontStyle": {},
      "textBlock": [{
        "position": {
          "x": 0,
          "y": 0,
          "w": "w-0",
          "h": 30
        },
        "text": "&ZeroWidthSpace;"
      }],
      "anchors": []
    }, {
      "id": swimming3,
      "name": "verticalSeparatorBar",
      "title": "水平分隔条",
      "category": "lane",
      "group": "",
      "groupName": null,
      "locked": false,
      "link": "",
      "children": [],
      "parent": "sxydparent" + num,
      "resizeDir": [],
      "attribute": {
        "container": false,
        "visible": false,
        "rotatable": false,
        "linkable": false,
        "collapsable": false,
        "collapsed": false,
        "markerOffset": 5
      },
      "dataAttributes": [],
      "props": {
        "x": props.x,
        "y": props.y + 40,
        "w": 0,
        "h": 500,
        "zindex": 0,
        "angle": 0
      },
      "shapeStyle": {
        "alpha": 1
      },
      "lineStyle": {},
      "fillStyle": {
        "color": arg.style.titleColor[1]
      },
      "theme": {},
      "path": [{
        "lineStyle": {
          "lineStyle": "solid"
        },
        "actions": [{
          "action": "move",
          "x": "0",
          "y": "0"
        }, {
          "action": "line",
          "x": "w",
          "y": "0"
        }, {
          "action": "line",
          "x": "w",
          "y": "h"
        }, {
          "action": "line",
          "x": "0",
          "y": "h"
        }, {
          "action": "close"
        }]
      }],
      "fontStyle": {},
      "textBlock": [],
      "anchors": []
    }, {
      "id": swimming4,
      "name": "horizontalSeparator",
      "title": "分隔符<br>需拖动到泳池泳道上",
      "category": "lane",
      "group": "",
      "groupName": null,
      "locked": false,
      "link": "",
      "children": [],
      "parent": "sxydparent" + num,
      "resizeDir": ["b"],
      "attribute": {
        "container": false,
        "visible": true,
        "rotatable": false,
        "linkable": false,
        "collapsable": false,
        "collapsed": false,
        "markerOffset": 5
      },
      "dataAttributes": [],
      "props": {
        "x": props.x,
        "y": props.y + 40,
        "w": 500,
        "h": 250,
        "zindex": 1,
        "angle": 0
      },
      "shapeStyle": {
        "alpha": 1
      },
      "lineStyle": {},
      "fillStyle": {
        "color": arg.style.titleColor[2]
      },
      "theme": {},
      "path": [{
        "fillStyle": {
          "type": "none"
        },
        "lineStyle": {
          "lineStyle": "solid"
        },
        "actions": [{
          "action": "move",
          "x": 0,
          "y": "h"
        }, {
          "action": "line",
          "x": "w",
          "y": "h"
        }]
      }, {
        "actions": [{
          "action": "move",
          "x": 0,
          "y": 0
        }, {
          "action": "line",
          "x": 28,
          "y": 0
        }, {
          "action": "line",
          "x": 28,
          "y": "h"
        }, {
          "action": "line",
          "x": 0,
          "y": "h"
        }, {
          "action": "close"
        }]
      }],
      "fontStyle": {
        // "orientation": "horizontal",
        "textAlign": "center"
      },
      "textBlock": [{
        "position": {
          "x": 0,
          "y": 5,
          "w": 28,
          "h": "h-10"
        },
        "text": "&ZeroWidthSpace;"
      }],
      "anchors": []
    }, {
      "id": swimming5,
      "name": "horizontalSeparator",
      "title": "分隔符<br>需拖动到泳池泳道上",
      "category": "lane",
      "group": "",
      "groupName": null,
      "locked": false,
      "link": "",
      "children": [],
      "parent": "sxydparent" + num,
      "resizeDir": ["b"],
      "attribute": {
        "container": false,
        "visible": true,
        "rotatable": false,
        "linkable": false,
        "collapsable": false,
        "collapsed": false,
        "markerOffset": 5
      },
      "dataAttributes": [],
      "props": {
        "x": props.x,
        "y": props.y + 290,
        "w": 500,
        "h": 250,
        "zindex": 2,
        "angle": 0
      },
      "shapeStyle": {
        "alpha": 1
      },
      "lineStyle": {},
      "fillStyle": {
        "color": arg.style.titleColor[3]
      },
      "theme": {},
      "path": [{
        "fillStyle": {
          "type": "none"
        },
        "lineStyle": {
          "lineStyle": "solid"
        },
        "actions": [{
          "action": "move",
          "x": 0,
          "y": "h"
        }, {
          "action": "line",
          "x": "w",
          "y": "h"
        }]
      }, {
        "actions": [{
          "action": "move",
          "x": 0,
          "y": 0
        }, {
          "action": "line",
          "x": 28,
          "y": 0
        }, {
          "action": "line",
          "x": 28,
          "y": "h"
        }, {
          "action": "line",
          "x": 0,
          "y": "h"
        }, {
          "action": "close"
        }]
      }],
      "fontStyle": {
        // "orientation": "horizontal",
        "textAlign": "center"
      },
      "textBlock": [{
        "position": {
          "x": 0,
          "y": 5,
          "w": 28,
          "h": "h-10"
        },
        "text": "​"
      }],
      "anchors": [],
      "itemMessage": {
        "workContent": "",
        "time": "",
        "timeUnit": "",
        "workFireList": [],
        "knowFireList": [],
        "cost": [],
        "CostList": []
      }
    }
  ]
}

const sxyddSwimmingFun1 = sxyddSwimmingFun({
  name: 'verticalPool2',
  title: '双泳道',
  category: 'lane',
  property: "double",
  style: {
    // titleColor: ["212,227,250"]
    titleColor: ["225,234,247", "225,234,247", "225,234,247", "225,234,247", "225,234,247"]
  }
})
Schema.addShape(sxyddSwimmingFun1);

const sxyddSwimmingFun2 = sxyddSwimmingFun({
  name: 'verticalPool3',
  title: '模板',
  category: 'lane',
  property: "double",
  style: {
    width: 30,
    // titleColor: ["212,227,250"]
    titleColor: ["183,214,246", "183,214,246", "183,214,246", "183,214,246", "183,214,246"]
  }
})
Schema.addShape(sxyddSwimmingFun2);

const sxyddSwimmingFun3 = sxyddSwimmingFun({
  name: 'verticalPool4',
  title: '模板',
  category: 'lane',
  property: "double",
  style: {
    width: 30,
    // titleColor: ["212,227,250"]
    titleColor: ["183,214,246", "183,214,246", "255,197,196", "250,211,155", "183,214,246"]
  }
})
Schema.addShape(sxyddSwimmingFun3);

const sxyddSwimmingFun4 = sxyddSwimmingFun({
  name: 'verticalPool5',
  title: '模板',
  category: 'lane',
  property: "double",
  style: {
    width: 30,
    titleColor: ["255,249,196", "204,234,202", "183,214,246", "183,214,246", "183,214,246"]
  }
})
Schema.addShape(sxyddSwimmingFun4);

const sxyddSwimmingFun5 = sxyddSwimmingFun({
  name: 'verticalPool6',
  title: '模板',
  category: 'lane',
  property: "double",
  style: {
    width: 30,
    titleColor: ["255,249,196", "183,214,246", "255,197,196", "250,211,155", "183,214,246"]
  }
})
Schema.addShape(sxyddSwimmingFun5);
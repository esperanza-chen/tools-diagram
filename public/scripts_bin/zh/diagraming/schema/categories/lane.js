// const babelConfig = require("babel.config");
Schema.addCategory({
  name: 'lane',
  text: '泳池/泳道'
});

function getPool(a, d) {
  for (var b = Model.orderList.length - 1; b >= 0; b--) {
    var e = Model.orderList[b].id;
    var c = Model.getShapeById(e);
    if (c.name == d) {
      if (Utils.rectCross(c.props, a.props)) {
        return c;
      }
    }
  }
  return null;
}

function getVerticalPoolWidth(c) {
  var a = 0;
  for (var b = 0; b < c.children.length; b++) {
    var d = c.children[b];
    var e = Model.getShapeById(d);
    if (e.name != 'horizontalSeparator') {
      a += e.props.w;
    }
  }
  return a;
}

function getHorizontalPoolHeight(c) {
  var a = 0;
  for (var b = 0; b < c.children.length; b++) {
    var d = c.children[b];
    var e = Model.getShapeById(d);
    if (e.name != 'horizontalSeparator') {
      a += e.props.w;
    }
  }
  return a;
}

function getChild(c, a) {
  for (var b = 0; b < c.children.length; b++) {
    var d = c.children[b];
    var e = Model.getShapeById(d);
    console.log(d, e, 45)
    if (e.name == a) {
      return e;
    }
  }
  return null;
}
Schema.addShape({
  name: 'horizontalPool',
  title: '双道',
  category: 'lane',
  attribute: {
    rotatable: false,
    linkable: false,
    container: true
  },
  fillStyle: {
    color: "198,218,249"
  },
  children: [],
  props: {
    w: 640,
    h: 200
  },
  fontStyle: {
    size: 16,
    orientation: 'horizontal'
  },
  textBlock: [{
    position: {
      x: 0,
      y: 10,
      w: 40,
      h: 'h-20'
    },
    text: '&ZeroWidthSpace;'
  }],
  anchors: [],
  resizeDir: ['t', 'r', 'b'],
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
          x: 40,
          y: 0
        },
        {
          action: 'line',
          x: 40,
          y: 'h'
        },
        {
          action: 'line',
          x: 0,
          y: 'h'
        },
        {
          action: 'close'
        },
      ],
    },
  ],
  drawIcon: function (a, b) {
    b += 8;
    var c = -4;
    return [{
        fillStyle: {
          type: 'none'
        },
        actions: [{
            action: 'move',
            x: 0,
            y: c
          },
          {
            action: 'line',
            x: a,
            y: c
          },
          {
            action: 'line',
            x: a,
            y: b
          },
          {
            action: 'line',
            x: 0,
            y: b
          },
          {
            action: 'close'
          },
        ],
      },
      {
        actions: [{
            action: 'move',
            x: 0,
            y: c
          },
          {
            action: 'line',
            x: 4,
            y: c
          },
          {
            action: 'line',
            x: 4,
            y: b
          },
          {
            action: 'line',
            x: 0,
            y: b
          },
          {
            action: 'close'
          },
        ],
      },
      {
        actions: [{
            action: 'move',
            x: 4,
            y: (c + b) / 2
          },
          {
            action: 'line',
            x: a,
            y: (c + b) / 2
          },
        ],
      },
    ];
  },
});
Schema.addShape({
  name: 'horizontalLane',
  title: '单道',
  category: 'lane',
  attribute: {
    container: true,
    rotatable: false,
    linkable: false
  },
  props: {
    w: 600,
    h: 200
  },
  fontStyle: {
    orientation: 'horizontal'
  },
  textBlock: [{
    position: {
      x: 0,
      y: 10,
      w: 30,
      h: 'h-20'
    },
    text: '&ZeroWidthSpace;'
  }],
  fillStyle: {
    color: '212,227,250'
  },
  anchors: [],
  resizeDir: ['t', 'b', 'r'],
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
          x: 30,
          y: 0
        },
        {
          action: 'line',
          x: 30,
          y: 'h'
        },
        {
          action: 'line',
          x: 0,
          y: 'h'
        },
        {
          action: 'close'
        },
      ],
    },
  ],
  drawIcon: function (a, b) {
    b += 3;
    return [{
        fillStyle: {
          type: 'none'
        },
        lineStyle: {
          lineStyle: 'solid'
        },
        actions: [{
            action: 'move',
            x: 0,
            y: -1
          },
          {
            action: 'line',
            x: a,
            y: -1
          },
          {
            action: 'line',
            x: a,
            y: b
          },
          {
            action: 'line',
            x: 0,
            y: b
          },
          {
            action: 'close'
          },
        ],
      },
      {
        lineStyle: {
          lineStyle: 'solid'
        },
        actions: [{
            action: 'move',
            x: 0,
            y: -1
          },
          {
            action: 'line',
            x: 4,
            y: -1
          },
          {
            action: 'line',
            x: 4,
            y: b
          },
          {
            action: 'line',
            x: 0,
            y: b
          },
          {
            action: 'close'
          },
        ],
      },
    ];
  },
  onCreated: function (f, k) {
    var f = f || getPool(this, 'horizontalPool');
    if (f == null) {
      f = Model.create('horizontalPool', this.props.x - 40, this.props.y);
      f.children = [this.id];
      Model.add(f);
    } else {
      if (!f.children) {
        f.children = [];
      }
      var h = [f];
      var g = f.props.y;
      var c = 0;
      var j = 0;
      var a = null;
      for (var e = 0; e < f.children.length; e++) {
        var d = f.children[e];
        var b = Model.getShapeById(d);
        if (b.name == 'horizontalLane') {
          g += b.props.h;
          if (a == null) {
            a = b;
          }
          if (b.props.y > a.props.y) {
            a = b;
          }
          c++;
        } else {
          if (b.name == 'horizontalSeparatorBar') {
            g += b.props.h;
            j++;
          }
        }
      }
      if (a) {
        this.fillStyle = a.fillStyle;
        this.fontStyle = a.fontStyle;
        this.props.h = a.props.h;
        this.lineStyle = a.lineStyle;
      }
      this.props.y = g;
      this.props.x = f.props.x + 40;
      this.props.w = f.props.w - 40;
      if (c == 0) {
        if (j == 0) {
          this.props.h = f.props.h;
        } else {
          this.props.h = f.props.h - 20;
        }
      }
      Designer.painter.renderShape(this);
      f.props.h = this.props.y + this.props.h - f.props.y;
      for (var e = 0; e < f.children.length; e++) {
        var d = f.children[e];
        var b = Model.getShapeById(d);
        if (b.name == 'verticalSeparator') {
          b.props.h = f.props.h;
          Designer.painter.renderShape(b);
          h.push(b);
        }
      }
      f.children.push(this.id);
      if (!k) {
        Model.updateMulti(h);
      }
    }
    Designer.painter.renderShape(f);
    this.parent = f.id;
  },
});
Schema.addShape({
  name: 'verticalPool',
  title: '双道',
  category: 'lane',
  attribute: {
    rotatable: false,
    linkable: false,
    container: true
  },
  fillStyle: {
    color: "198,218,249"
  },
  children: [],
  props: {
    w: 250,
    h: 540
  },
  fontStyle: {
    size: 16
  },
  textBlock: [{
    position: {
      x: 10,
      y: 0,
      w: 'w-20',
      h: 40
    },
    text: '&ZeroWidthSpace;'
  }],
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
          y: 40
        },
        {
          action: 'line',
          x: 0,
          y: 40
        },
        {
          action: 'close'
        },
      ],
    },
  ],
  drawIcon: function (b, c) {
    b += 8;
    var a = -4;
    return [{
        fillStyle: {
          type: 'none'
        },
        actions: [{
            action: 'move',
            x: a,
            y: 0
          },
          {
            action: 'line',
            x: b,
            y: 0
          },
          {
            action: 'line',
            x: b,
            y: c
          },
          {
            action: 'line',
            x: a,
            y: c
          },
          {
            action: 'close'
          },
        ],
      },
      {
        actions: [{
            action: 'move',
            x: a,
            y: 0
          },
          {
            action: 'line',
            x: b,
            y: 0
          },
          {
            action: 'line',
            x: b,
            y: 4
          },
          {
            action: 'line',
            x: a,
            y: 4
          },
          {
            action: 'close'
          },
        ],
      },
      {
        actions: [{
            action: 'move',
            x: (a + b) / 2,
            y: 4
          },
          {
            action: 'line',
            x: (a + b) / 2,
            y: c
          },
        ],
      },
    ];
  },
});
Schema.addShape({
  name: 'verticalLane',
  title: '单道',
  category: 'lane',
  attribute: {
    container: true,
    rotatable: false,
    linkable: false
  },
  props: {
    w: 250,
    h: 500
  },
  textBlock: [{
    position: {
      x: 10,
      y: 0,
      w: 'w-20',
      h: 30
    },
    text: '&ZeroWidthSpace;'
  }],
  fillStyle: {
    color: '212,227,250'
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
    return [{
        fillStyle: {
          type: 'none'
        },
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
            x: a,
            y: 0
          },
          {
            action: 'line',
            x: a,
            y: b
          },
          {
            action: 'line',
            x: 0,
            y: b
          },
          {
            action: 'close'
          },
        ],
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
            x: a,
            y: 0
          },
          {
            action: 'line',
            x: a,
            y: 4
          },
          {
            action: 'line',
            x: 0,
            y: 4
          },
          {
            action: 'close'
          },
        ],
      },
    ];
  },
  onCreated: function (f, k) {
    var f = f || getPool(this, 'verticalPool');
    if (f == null) {
      f = Model.create('verticalPool', this.props.x, this.props.y - 40);
      f.children = [this.id];
      Model.add(f);
    } else {
      if (!f.children) {
        f.children = [];
      }
      var h = [f];
      var g = f.props.x;
      var c = 0;
      var j = 0;
      var a = null;
      for (var e = 0; e < f.children.length; e++) {
        var d = f.children[e];
        var b = Model.getShapeById(d);
        if (b.name == 'verticalLane') {
          g += b.props.w;
          if (a == null) {
            a = b;
          }
          if (b.props.x > a.props.x) {
            a = b;
          }
          c++;
        } else {
          if (b.name == 'verticalSeparatorBar') {
            g += b.props.w;
            j++;
          }
        }
      }
      if (a) {
        this.fillStyle = a.fillStyle;
        this.fontStyle = a.fontStyle;
        this.props.w = a.props.w;
        this.lineStyle = a.lineStyle;
      }
      this.props.x = g;
      this.props.y = f.props.y + 40;
      this.props.h = f.props.h - 40;
      if (c == 0) {
        if (j == 0) {
          this.props.w = f.props.w;
        } else {
          this.props.w = f.props.w - 20;
        }
      }
      Designer.painter.renderShape(this);
      f.props.w = this.props.x + this.props.w - f.props.x;
      for (var e = 0; e < f.children.length; e++) {
        var d = f.children[e];
        var b = Model.getShapeById(d);
        if (b.name == 'horizontalSeparator') {
          b.props.w = f.props.w;
          Designer.painter.renderShape(b);
          h.push(b);
        }
      }
      f.children.push(this.id);
      if (!k) {
        Model.updateMulti(h);
      }
    }
    Designer.painter.renderShape(f);
    this.parent = f.id;
  },
});

// Schema.addShape({
//   name: 'verticalSeparatorBar',
//   title: '水平分隔条',
//   category: 'lane',
//   attribute: {
//     rotatable: false,
//     linkable: false,
//     visible: false
//   },
//   fillStyle: {
//     color: '212,227,250'
//   },
//   props: {
//     w: 20,
//     h: 500
//   },
//   anchors: [],
//   resizeDir: [],
//   textBlock: [],
//   path: [{
//     lineStyle: {
//       lineStyle: 'solid'
//     },
//     actions: {
//       ref: 'rectangle'
//     }
//   }],
// });

// Schema.addShape({
//   name: 'horizontalSeparator',
//   title: '分隔符<br>需拖动到泳池泳道上',
//   category: 'lane',
//   attribute: {
//     rotatable: false,
//     linkable: false
//   },
//   props: {
//     w: 300,
//     h: 0
//   },
//   fontStyle: {
//     orientation: 'horizontal',
//     textAlign: 'center'
//   },
//   textBlock: [{
//     position: {
//       x: 0,
//       y: 5,
//       w: 20,
//       h: 'h-10'
//     },
//     text: '&ZeroWidthSpace;'
//   }],
//   fillStyle: {
//     color: '212,227,250'
//   },
//   anchors: [],
//   resizeDir: ['b'],
//   path: [{
//       fillStyle: {
//         type: 'none'
//       },
//       lineStyle: {
//         lineStyle: 'solid'
//       },
//       actions: [{
//           action: 'move',
//           x: 0,
//           y: 'h'
//         },
//         {
//           action: 'line',
//           x: 'w',
//           y: 'h'
//         },
//       ],
//     },
//     {
//       actions: [{
//           action: 'move',
//           x: 0,
//           y: 0
//         },
//         {
//           action: 'line',
//           x: 20,
//           y: 0
//         },
//         {
//           action: 'line',
//           x: 20,
//           y: 'h'
//         },
//         {
//           action: 'line',
//           x: 0,
//           y: 'h'
//         },
//         {
//           action: 'close'
//         },
//       ],
//     },
//   ],
//   drawIcon: function (a, b) {
//     return [{
//       fillStyle: {
//         type: 'none'
//       },
//       lineStyle: {
//         lineStyle: 'solid'
//       },
//       actions: [{
//           action: 'move',
//           x: 0,
//           y: 0
//         },
//         {
//           action: 'line',
//           x: a,
//           y: 0
//         },
//       ],
//     }, ];
//   },
//   onCreated: function () {
//     var h = getPool(this, 'verticalPool');
//     if (h == null) {
//       return false;
//     }
//     var k = getChild(h, 'verticalSeparatorBar');
//     if (k == null) {
//       k = Model.create('verticalSeparatorBar', h.props.x - 20, h.props.y + 40);
//       k.props.h = h.props.h - 40;
//       k.parent = h.id;
//       Model.add(k);
//       Designer.painter.renderShape(k);
//       h.props.x -= k.props.w;
//       h.props.w += k.props.w;
//       h.children.push(k.id);
//       Designer.painter.renderShape(h);
//     }
//     var a = this.props.y + this.props.h;
//     var j = h.props.y + 40;
//     var g = null;
//     for (var f = 0; f < h.children.length; f++) {
//       var e = h.children[f];
//       var c = Model.getShapeById(e);
//       if (c.name != 'horizontalSeparator') {
//         continue;
//       }
//       var d = c.props.y + c.props.h;
//       if (d <= a) {
//         j += c.props.h;
//       } else {
//         if (g == null || c.props.y < g.props.y) {
//           g = c;
//         }
//       }
//     }
//     this.props.x = h.props.x;
//     this.props.w = h.props.w;
//     this.props.h = a - j;
//     this.props.y = j;
//     h.children.push(this.id);
//     this.parent = h.id;
//     if (a > h.props.y + h.props.h) {
//       this.props.h = h.props.y + h.props.h - j;
//     }
//     Designer.painter.renderShape(this);
//     if (g != null) {
//       g.props.y += this.props.h;
//       g.props.h -= this.props.h;
//       Designer.painter.renderShape(g);
//       Model.updateMulti([h, g]);
//     } else {
//       var b = Model.create('horizontalSeparator', this.props.x, a);
//       b.props.w = this.props.w;
//       b.props.h = h.props.y + h.props.h - a;
//       b.parent = h.id;
//       // console.log(b, '=========')
//       Model.add(b);
//       Designer.painter.renderShape(b);
//       h.children.push(b.id);
//       Designer.painter.renderShape(h);
//       Model.update(h);
//     }
//     this.props.zindex = Model.maxZIndex + 1;
//   },
// });
// Schema.addShape({

//   name: 'horizontalSeparatorBar',
//   title: '垂直分隔条',
//   category: 'lane',
//   attribute: {
//     rotatable: false,
//     linkable: false,
//     visible: false
//   },
//   props: {
//     w: 600,
//     h: 20
//   },
//   anchors: [],
//   resizeDir: [],
//   textBlock: [],
//   fillStyle: {
//     color: '212,227,250'
//   },
//   path: [{
//     lineStyle: {
//       lineStyle: 'solid'
//     },
//     actions: {
//       ref: 'rectangle'
//     }
//   }],
// });
// Schema.addShape({
//   name: 'verticalSeparator',
//   title: '分隔符(垂直)<br>需拖动到泳池泳道上',
//   category: 'lane',
//   attribute: {
//     rotatable: false,
//     linkable: false
//   },
//   props: {
//     w: 0,
//     h: 300
//   },
//   fontStyle: {
//     textAlign: 'center'
//   },
//   textBlock: [{
//     position: {
//       x: 5,
//       y: 0,
//       w: 'w-10',
//       h: 40
//     },
//     text: '&ZeroWidthSpace;'
//   }],
//   fillStyle: {
//     color: '212,227,250'
//   },
//   anchors: [],
//   resizeDir: ['r'],
//   path: [{
//       fillStyle: {
//         type: 'none'
//       },
//       lineStyle: {
//         lineStyle: 'solid'
//       },
//       actions: [{
//           action: 'move',
//           x: 'w',
//           y: 0
//         },
//         {
//           action: 'line',
//           x: 'w',
//           y: 'h'
//         },
//       ],
//     },
//     {
//       actions: [{
//           action: 'move',
//           x: 0,
//           y: 0
//         },
//         {
//           action: 'line',
//           x: 'w',
//           y: 0
//         },
//         {
//           action: 'line',
//           x: 'w',
//           y: 40
//         },
//         {
//           action: 'line',
//           x: 0,
//           y: 40
//         },
//         {
//           action: 'close'
//         },
//       ],
//     },
//   ],
//   drawIcon: function (a, b) {
//     return [{
//       fillStyle: {
//         type: 'none'
//       },
//       lineStyle: {
//         lineStyle: 'solid'
//       },
//       actions: [{
//           action: 'move',
//           x: 0,
//           y: 0
//         },
//         {
//           action: 'line',
//           x: 0,
//           y: b
//         },
//       ],
//     }, ];
//   },
//   onCreated: function () {
//     var f = getPool(this, 'horizontalPool');
//     if (f == null) {
//       return false;
//     }
//     var h = getChild(f, 'horizontalSeparatorBar');
//     if (h == null) {
//       h = Model.create('horizontalSeparatorBar', f.props.x + 40, f.props.y - 20);
//       f.props.y -= h.props.h;
//       f.props.h += h.props.h;
//       f.children.push(h.id);
//       Designer.painter.renderShape(f);
//       h.props.w = f.props.w - 40;
//       h.parent = f.id;
//       Model.add(h);
//       Designer.painter.renderShape(h);
//     }
//     var k = this.props.x + this.props.w;
//     var j = f.props.x + 40;
//     var e = null;
//     for (var d = 0; d < f.children.length; d++) {
//       var c = f.children[d];
//       var b = Model.getShapeById(c);
//       if (b.name != 'verticalSeparator') {
//         continue;
//       }
//       var g = b.props.x + b.props.w;
//       if (g <= k) {
//         j += b.props.w;
//       } else {
//         if (e == null || b.props.x < e.props.x) {
//           e = b;
//         }
//       }
//     }
//     this.props.x = j;
//     this.props.w = k - j;
//     this.props.y = f.props.y;
//     this.props.h = f.props.h;
//     if (k > f.props.x + f.props.w) {
//       this.props.w = f.props.x + f.props.w - j;
//     }
//     Designer.painter.renderShape(this);
//     f.children.push(this.id);
//     this.parent = f.id;
//     if (e != null) {
//       e.props.x += this.props.w;
//       e.props.w -= this.props.w;
//       Designer.painter.renderShape(e);
//       Model.updateMulti([f, e]);
//     } else {
//       var a = Model.create('verticalSeparator', k, this.props.y);
//       a.props.w = f.props.x + f.props.w - k;
//       a.props.h = this.props.h;
//       a.parent = f.id;
//       Model.add(a);
//       Designer.painter.renderShape(a);
//       f.children.push(a.id);
//       Designer.painter.renderShape(f);
//       Model.update(f);
//     }
//     this.props.zindex = Model.maxZIndex + 1;
//   },
// });





// Designer.setLaneNum(2,this.parent);
// document.getElementsByClassName("spinner_up")[1].click();
// document.getElementsByClassName("spinner_down")[1].click();
// document.getElementsByClassName("spinner_down")[1].click();
// document.getElementsByClassName("spinner_down")[1].click();
// document.getElementsByClassName("spinner_up")[1].click();
// document.getElementsByClassName("spinner_up")[1].click();
// console.log(this.id)
// // 拿到整个页面的JSON数据

// console.log(dataJSON,'dataJSONdataJSON')
// const props = dataJSON.elements[this.parent].props;
// const num = "_" + new Date().getTime().toString();
// dataJSON.elements[this.parent].children.push("wjcdesxyda"+num);
// dataJSON.elements["wjcdesxyda"+num] = {"id":"wjcdesxyda"+num,"name":"horizontalSeparator","title":"分隔符<br>需拖动到泳池泳道上","category":"lane","group":"","groupName":null,"locked":false,"link":"","children":[],"parent":this.parent,"resizeDir":["b"],"attribute":{"container":false,"visible":true,"rotatable":false,"linkable":false,"collapsable":false,"collapsed":false,"markerOffset":5},"dataAttributes":[],"props":{"x":props.x,"y":props.y+40,"w":500,"h":250,"zindex":2,"angle":0},"shapeStyle":{"alpha":1},"lineStyle":{},"fillStyle":{"color":"212,227,250"},"theme":{},"path":[{"fillStyle":{"type":"none"},"lineStyle":{"lineStyle":"solid"},"actions":[{"action":"move","x":0,"y":"h"},{"action":"line","x":"w","y":"h"}]},{"actions":[{"action":"move","x":0,"y":0},{"action":"line","x":20,"y":0},{"action":"line","x":20,"y":"h"},{"action":"line","x":0,"y":"h"},{"action":"close"}]}],"fontStyle":{"orientation":"horizontal","textAlign":"center"},"textBlock":[{"position":{"x":0,"y":5,"w":20,"h":"h-10"},"text":'&ZeroWidthSpace;'}],"anchors":[],"itemMessage":{"workContent":"","time":"","timeUnit":"","workFireList":[],"knowFireList":[],"cost":[],"CostList":[]}};
// dataJSON.elements[this.parent].children.push("wjcdesxydb"+num);
// dataJSON.elements["wjcdesxydb"+num] = {"id":"wjcdesxydb"+num,"name":"horizontalSeparator","title":"分隔符<br>需拖动到泳池泳道上","category":"lane","group":"","groupName":null,"locked":false,"link":"","children":[],"parent":this.parent,"resizeDir":["b"],"attribute":{"container":false,"visible":true,"rotatable":false,"linkable":false,"collapsable":false,"collapsed":false,"markerOffset":5},"dataAttributes":[],"props":{"x":props.x,"y":props.y+290,"w":500,"h":250,"zindex":2,"angle":0},"shapeStyle":{"alpha":1},"lineStyle":{},"fillStyle":{"color":"212,227,250"},"theme":{},"path":[{"fillStyle":{"type":"none"},"lineStyle":{"lineStyle":"solid"},"actions":[{"action":"move","x":0,"y":"h"},{"action":"line","x":"w","y":"h"}]},{"actions":[{"action":"move","x":0,"y":0},{"action":"line","x":20,"y":0},{"action":"line","x":20,"y":"h"},{"action":"line","x":0,"y":"h"},{"action":"close"}]}],"fontStyle":{"orientation":"horizontal","textAlign":"center"},"textBlock":[{"position":{"x":0,"y":5,"w":20,"h":"h-10"},"text":'&ZeroWidthSpace;'}],"anchors":[],"itemMessage":{"workContent":"","time":"","timeUnit":"","workFireList":[],"knowFireList":[],"cost":[],"CostList":[]}};
// // dataJSON.elements[this.parent].children.push("wjcdeydzxc"+num);
// // dataJSON.elements["wjcdesxydc"+num] = {"id":"wjcdeydzxc"+num,"name":"verticalSeparatorBar","title":"水平分隔条","category":"lane","group":"","groupName":null,"locked":false,"link":"","children":[],"parent":this.parent,"resizeDir":[],"attribute":{"container":false,"visible":false,"rotatable":false,"linkable":false,"collapsable":false,"collapsed":false,"markerOffset":5},"dataAttributes":[],"props":{"x":props.x,"y":props.y+40,"w":0,"h":500,"zindex":0,"angle":0},"shapeStyle":{"alpha":1},"lineStyle":{},"fillStyle":{},"theme":{},"path":[{"lineStyle":{"lineStyle":"solid"},"actions":[{"action":"move","x":"0","y":"0"},{"action":"line","x":"w","y":"0"},{"action":"line","x":"w","y":"h"},{"action":"line","x":"0","y":"h"},{"action":"close"}]}],"fontStyle":{},"textBlock":[],"anchors":[]};
// Designer.open(dataJSON);
// Designer.initialize.initCanvas();

// Schema.addShape({
//   name: 'twoWayLane',
//   title: '双向泳道',
//   category: 'lane',
//   attribute: { container: true, rotatable: false, linkable: false },
//   props: { w: 500, h: 500 },
//   fontStyle: { textAlign: 'center' },
//   textBlock: [{ position: { x: 0, y: 30, w: 30, h: 'h/2-30' }},{ position: { x: 0, y: 'h/2-30', w: 30, h: 'h-30' }}],
//   anchors: [],
//   resizeDir: ['t', 'b', 'r'],
//   path: [
//     { fillStyle: { type: 'none' }, lineStyle: { lineStyle: 'solid' }, actions: { ref: 'rectangle' } },
//     {
//       lineStyle: { lineStyle: 'solid' },
//       actions: [
//         { action: 'move', x: 0, y: 'h/2' },
//         { action: 'line', x: 30, y: 'h/2' },  
//         { action: 'line', x: 30, y: 'h' },
//         { action: 'line', x: 0, y: 'h' },
//         { action: 'close' },
//       ],
//     },
//     {
//       lineStyle: { lineStyle: 'solid' },
//       actions: [
//         { action: 'move', x: 30, y: 0 },
//         { action: 'line', x: 'w/2', y: 0 },
//         { action: 'line', x: 'w/2', y: 30 },
//         { action: 'line', x: 30, y: 30 },
//         { action: 'close' },
//       ],
//     },
//     {
//       lineStyle: { lineStyle: 'solid' },
//       actions: [
//         { action: 'move', x: 'w/2', y: 0 },
//         { action: 'line', x: 'w', y: 0 },
//         { action: 'line', x: 'w', y: 30 },
//         { action: 'line', x: 'w/2', y: 30 },
//         { action: 'close' },
//       ],
//     },
//     {
//       lineStyle: { lineStyle: 'solid' },
//       actions: [
//         { action: 'move', x: 'w/2', y: 0 },
//         { action: 'line', x: 'w/2', y: 'h' },
//         { action: 'close' },
//       ],
//     },
//     {
//       lineStyle: { lineStyle: 'solid' },
//       actions: [
//         { action: 'move', x: 0, y: 'h/2' },
//         { action: 'line', x: 'w', y: 'h/2' },
//         { action: 'close' },
//       ],
//     },
//     {
//       lineStyle: { lineStyle: 'solid' },
//       actions: [
//         { action: 'move', x: 0, y: 30 },
//         { action: 'line', x: 30, y: 30 },  
//         { action: 'line', x: 30, y: 'h/2' },
//         { action: 'line', x: 0, y: 'h/2' },
//         { action: 'close' },
//       ],
//     },
//   ],
//   drawIcon: function (a, b) {
//     b = a - 10;
//     return [
//       {
//         fillStyle: { type: 'none' },
//         actions: [
//           { action: 'move', x: 0, y: 4 },
//           { action: 'line', x: a, y: 4 },
//           { action: 'line', x: a, y: b+4},
//           { action: 'line', x: 0, y: b+4},
//           { action: 'close' },
//         ],
//       },
//       {
//         actions: [
//           { action: 'move', x: 0, y: 0 },
//           { action: 'line', x: a, y: 0 },
//           { action: 'line', x: a, y: 4 },
//           { action: 'line', x: 0, y: 4 },
//           { action: 'close' },
//         ],
//       },
//       {
//         actions: [
//           { action: 'move', x: 0, y: 4 },
//           { action: 'line', x: 4, y: 4 },
//           { action: 'line', x: 4, y: b+4 },
//           { action: 'line', x: 0, y: b+4 },
//           { action: 'close' },
//         ],
//       },
//       {
//         actions: [
//           { action: 'move', x: a/2, y: 0 },
//           { action: 'line', x: a/2, y: b+4 },
//           { action: 'close' },
//         ],
//       },
//       {
//         actions: [
//           { action: 'move', x: 0, y: (b + 4)/2 },
//           { action: 'line', x: a, y: (b + 4)/2 },
//           { action: 'close' },
//         ],
//       },
//     ];
//   },
//   onCreated: function (f, k) {
//     var f = f || getPool(this, 'verticalPoolDouble');
//     if (f == null) {
//       f = Model.create('verticalPoolDouble', this.props.x, this.props.y - 40);
//       f.children = [this.id];
//       Model.add(f);
//     } else {
//       if (!f.children) {
//         f.children = [];
//       }
//       var h = [f];
//       var g = f.props.x;
//       var c = 0;
//       var j = 0;
//       var a = null;
//       for (var e = 0; e < f.children.length; e++) {
//         var d = f.children[e];
//         var b = Model.getShapeById(d);
//         if (b.name == 'verticalLane') {
//           g += b.props.w;
//           if (a == null) {
//             a = b;
//           }
//           if (b.props.x > a.props.x) {
//             a = b;
//           }
//           c++;
//         } else {
//           if (b.name == 'verticalSeparatorBar') {
//             g += b.props.w;
//             j++;
//           }
//         }
//       }
//       if (a) {
//         this.fillStyle = a.fillStyle;
//         this.fontStyle = a.fontStyle;
//         this.props.w = a.props.w;
//         this.lineStyle = a.lineStyle;
//       }
//       this.props.x = g;
//       this.props.y = f.props.y + 40;
//       this.props.h = f.props.h - 40;
//       if (c == 0) {
//         if (j == 0) {
//           this.props.w = f.props.w;
//         } else {
//           this.props.w = f.props.w - 20;
//         }
//       }
//       Designer.painter.renderShape(this);
//       f.props.w = this.props.x + this.props.w - f.props.x;
//       for (var e = 0; e < f.children.length; e++) {
//         var d = f.children[e];
//         var b = Model.getShapeById(d);
//         if (b.name == 'horizontalSeparator') {
//           b.props.w = f.props.w;
//           Designer.painter.renderShape(b);
//           h.push(b);
//         }
//       }
//       f.children.push(this.id);
//       if (!k) {
//         Model.updateMulti(h);
//       }
//     }
//     Designer.painter.renderShape(f);
//     this.parent = f.id;
//   },
// });

// Schema.addShape({
//   name: 'verticalPoolDouble',
//   title: '泳池(双向)',
//   category: 'lane',
//   attribute: { rotatable: false, linkable: false, container: true },
//   children: [],
//   props: { w: 500, h: 540 },
//   fontStyle: { size: 16 },
//   textBlock: [{ position: { x: 10, y: 0, w: 'w-20', h: 40 } }],
//   anchors: [],
//   resizeDir: ['l', 'b', 'r'],
//   path: [
//     { fillStyle: { type: 'none' }, lineStyle: { lineStyle: 'solid' }, actions: { ref: 'rectangle' } },
//     {
//       lineStyle: { lineStyle: 'solid' },
//       actions: [
//         { action: 'move', x: 0, y: 0 },
//         { action: 'line', x: 'w', y: 0 },
//         { action: 'line', x: 'w', y: 40 },
//         { action: 'line', x: 0, y: 40 },
//         { action: 'close' },
//       ],
//     },
//   ],
//   drawIcon: function (b, c) {
//     //b += 8;
//     var a = -4;
//     return [
//       {
//         fillStyle: { type: 'none' },
//         actions: [
//           { action: 'move', x: a, y: 0 },
//           { action: 'line', x: b, y: 0 },
//           { action: 'line', x: b, y: c },
//           { action: 'line', x: a, y: c },
//           { action: 'close' },
//         ],
//       },
//       {
//         actions: [
//           { action: 'move', x: a, y: 0 },
//           { action: 'line', x: b, y: 0 },
//           { action: 'line', x: b, y: 4 },
//           { action: 'line', x: a, y: 4 },
//           { action: 'close' },
//         ],
//       },
//       // {
//       //   actions: [
//       //     { action: 'move', x: (a + b) / 2, y: 4 },
//       //     { action: 'line', x: (a + b) / 2, y: c },
//       //   ],
//       // },
//     ];
//   },
// });
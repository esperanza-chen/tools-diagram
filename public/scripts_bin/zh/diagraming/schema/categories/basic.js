Schema.addCategory({
  name: 'basic',
  text: '基础图形',
  dataAttributes: [{
      name: '序号',
      type: 'number',
      value: '',
      category: 'default'
    },
    {
      name: '名称',
      type: 'string',
      value: '',
      category: 'default'
    },
    {
      name: '所有者',
      type: 'string',
      value: '',
      category: 'default'
    },
    {
      name: '连接',
      type: 'link',
      value: '',
      category: 'default'
    },
    {
      name: '便笺',
      type: 'string',
      value: '',
      category: 'default'
    },
  ],
});
Schema.addShape({
  name: 'predefinedProcess',
  title: '子流程',
  category: 'basic',
  props: {
    w: 100,
    h: 70
  },
  textBlock: [{
    position: {
      x: 'Math.min(w/6,20)',
      y: '0',
      w: 'w-Math.min(w/6,20)*2',
      h: 'h'
    }
  }],
  path: [{
    actions: [{
        action: 'move',
        x: '0',
        y: '0'
      },
      {
        action: 'line',
        x: 'w',
        y: '0'
      },
      {
        action: 'line',
        x: 'w',
        y: 'h'
      },
      {
        action: 'line',
        x: '0',
        y: 'h'
      },
      {
        action: 'line',
        x: '0',
        y: '0'
      },
      {
        action: 'close'
      },
      {
        action: 'move',
        x: 'Math.min(w/6,20)',
        y: '0'
      },
      {
        action: 'line',
        x: 'Math.min(w/6,20)',
        y: 'h'
      },
      {
        action: 'move',
        x: 'w- Math.min(w/6,20)',
        y: '0'
      },
      {
        action: 'line',
        x: 'w- Math.min(w/6,20)',
        y: 'h'
      },
    ],
  }, ],
});

Schema.addShape({
  name: 'data',
  title: '数据',
  category: 'basic',
  props: {
    w: 100,
    h: 70
  },
  anchors: [{
      x: 'w*0.5',
      y: '0'
    },
    {
      x: 'w-Math.min(h/3,w/3)/2',
      y: 'h*0.5'
    },
    {
      x: 'w*0.5',
      y: 'h'
    },
    {
      x: 'Math.min(h/3,w/3)/2',
      y: 'h*0.5'
    },
  ],
  textBlock: [{
    position: {
      x: 'w*0.15',
      y: '0',
      w: 'w*0.7',
      h: 'h'
    }
  }],
  path: [{
    actions: [{
        action: 'move',
        x: 'Math.min(h/3,w/3)',
        y: '0'
      },
      {
        action: 'line',
        x: 'w',
        y: '0'
      },
      {
        action: 'line',
        x: 'w-Math.min(h/3,w/3)',
        y: 'h'
      },
      {
        action: 'line',
        x: '0',
        y: 'h'
      },
      {
        action: 'line',
        x: 'Math.min(h/3,w/3)',
        y: '0'
      },
      {
        action: 'close'
      },
    ],
  }, ],
});
Schema.addShape({
  name: 'internalStorage',
  title: '内部存储',
  category: 'basic',
  props: {
    w: 100,
    h: 70
  },
  textBlock: [{
    position: {
      x: 'Math.min(w/6,20)',
      y: 'Math.min(h/5,20)',
      w: 'w - Math.min(w/6,20)',
      h: 'h- Math.min(h/5,20)'
    }
  }, ],
  path: [{
    actions: [{
        action: 'move',
        x: '0',
        y: '0'
      },
      {
        action: 'line',
        x: 'w',
        y: '0'
      },
      {
        action: 'line',
        x: 'w',
        y: 'h'
      },
      {
        action: 'line',
        x: '0',
        y: 'h'
      },
      {
        action: 'line',
        x: '0',
        y: '0'
      },
      {
        action: 'close'
      },
      {
        action: 'move',
        x: 'Math.min(w/6,20)',
        y: '0'
      },
      {
        action: 'line',
        x: 'Math.min(w/6,20)',
        y: 'h'
      },
      {
        action: 'move',
        x: '0',
        y: 'Math.min(h/5,20)'
      },
      {
        action: 'line',
        x: 'w',
        y: 'Math.min(h/5,20)'
      },
    ],
  }, ],
});


Schema.addShape({
  name: 'storedData',
  title: '外部',
  category: 'basic',
  props: {
    w: 100,
    h: 70
  },
  anchors: [{
      x: 'w*0.5',
      y: '0'
    },
    {
      x: 'w-Math.min(w/8,h/8)',
      y: 'h*0.5'
    },
    {
      x: 'w*0.5',
      y: 'h'
    },
    {
      x: '0',
      y: 'h*0.5'
    },
  ],
  textBlock: [{
    position: {
      x: 'w*0.1',
      y: '0',
      w: 'w*0.75',
      h: 'h'
    }
  }],
  path: [{
    actions: [{
        action: 'move',
        x: 'w/6',
        y: '0'
      },
      {
        action: 'line',
        x: 'w',
        y: '0'
      },
      {
        action: 'curve',
        x1: 'w-w/6',
        y1: '0',
        x2: 'w-w/6',
        y2: 'h',
        x: 'w',
        y: 'h'
      },
      {
        action: 'line',
        x: 'w/6',
        y: 'h'
      },
      {
        action: 'curve',
        x1: '-w/17',
        y1: 'h',
        x2: '-w/17',
        y2: '0',
        x: 'w/7',
        y: '0'
      },
      {
        action: 'close'
      },
    ],
  }, ],
});

Schema.addShape({
  name: 'sequentialData',
  title: '队列',
  category: 'basic',
  props: {
    w: 70,
    h: 70
  },
  path: [{
    actions: [{
        action: 'move',
        x: 'w/2',
        y: 'h'
      },
      {
        action: 'curve',
        x1: 'w/2-w*2/3',
        y1: 'h',
        x2: 'w/2-w*2/3',
        y2: '0',
        x: 'w/2',
        y: '0'
      },
      {
        action: 'curve',
        x1: 'w/2+w*2/3',
        y1: '0',
        x2: 'w/2+w*2/3',
        y2: 'h',
        x: 'w/2',
        y: 'h'
      },
      {
        action: 'line',
        x: 'w',
        y: 'h'
      },
      {
        action: 'close'
      },
    ],
  }, ],
});
Schema.addShape({
  name: 'directData',
  title: '数据库',
  category: 'basic',
  props: {
    w: 100,
    h: 70
  },
  textBlock: [{
    position: {
      x: '0',
      y: '0',
      w: 'w*0.8',
      h: 'h'
    }
  }],
  path: [{
    actions: [{
        action: 'move',
        x: 'w*0.15',
        y: '0'
      },
      {
        action: 'line',
        x: 'w-h/6',
        y: '0'
      },
      {
        action: 'curve',
        x1: 'w+h/22',
        y1: '0',
        x2: 'w+h/22',
        y2: 'h',
        x: 'w-h/6',
        y: 'h'
      },
      {
        action: 'line',
        x: 'w*0.15',
        y: 'h'
      },
      {
        action: 'curve',
        x1: '-w*0.05',
        y1: 'h',
        x2: '-w*0.05',
        y2: '0',
        x: 'w*0.15',
        y: '0'
      },
      {
        action: 'close'
      },
      {
        action: 'move',
        x: 'w-h/6',
        y: '0'
      },
      {
        action: 'curve',
        x1: 'w-h/8*3',
        y1: '0',
        x2: 'w-h/8*3',
        y2: 'h',
        x: 'w-h/6',
        y: 'h'
      },
      {
        action: 'curve',
        x1: 'w-h/8*3',
        y1: 'h',
        x2: 'w-h/8*3',
        y2: '0',
        x: 'w-h/6',
        y: '0'
      },
    ],
  }, ],
});

Schema.addShape({
  name: 'manualInput',
  title: '输入',
  category: 'basic',
  props: {
    w: 100,
    h: 70
  },
  anchors: [{
      x: '0',
      y: 'h*0.5'
    },
    {
      x: 'w*0.5',
      y: 'Math.min(h/2,w/6)/2'
    },
    {
      x: 'w',
      y: 'h*0.5'
    },
    {
      x: 'w*0.5',
      y: 'h'
    },
  ],
  textBlock: [{
    position: {
      x: '0',
      y: 'h*0.1',
      w: 'w',
      h: 'h*0.9'
    }
  }],
  path: [{
    actions: [{
        action: 'move',
        x: '0',
        y: 'Math.min(h/2,w/6)'
      },
      {
        action: 'line',
        x: 'w',
        y: '0'
      },
      {
        action: 'line',
        x: 'w',
        y: 'h'
      },
      {
        action: 'line',
        x: '0',
        y: 'h'
      },
      {
        action: 'line',
        x: '0',
        y: 'Math.min(h/2,w/6)'
      },
      {
        action: 'close'
      },
    ],
  }, ],
});


Schema.addShape({
  name: 'card',
  title: '卡片',
  category: 'basic',
  props: {
    w: 100,
    h: 70
  },
  path: [{
    actions: [{
        action: 'move',
        x: '0',
        y: 'Math.min(h/2,w/4)'
      },
      {
        action: 'line',
        x: 'Math.min(h/2,w/4)',
        y: '0'
      },
      {
        action: 'line',
        x: 'w',
        y: '0'
      },
      {
        action: 'line',
        x: 'w',
        y: 'h'
      },
      {
        action: 'line',
        x: '0',
        y: 'h'
      },
      {
        action: 'line',
        x: '0',
        y: 'Math.min(h/2,w/4)'
      },
      {
        action: 'close'
      },
    ],
  }, ],
});
Schema.addShape({
  name: 'paperTape',
  title: '条带',
  category: 'basic',
  props: {
    w: 100,
    h: 70
  },
  textBlock: [{
    position: {
      x: '0',
      y: 'h*0.1',
      w: 'w',
      h: 'h*0.8'
    }
  }],
  anchors: [{
      x: 'w*0.5',
      y: 'Math.min(Math.min(w,h)/8,w/12)'
    },
    {
      x: 'w',
      y: 'h*0.5'
    },
    {
      x: 'w*0.5',
      y: 'h-Math.min(Math.min(w,h)/8,w/12)'
    },
    {
      x: '0',
      y: 'h*0.5'
    },
  ],
  path: [{
    actions: [{
        action: 'move',
        x: '0',
        y: 'Math.min(Math.min(w,h)/8,w/12)'
      },
      {
        action: 'quadraticCurve',
        x1: 'w*0.25',
        y1: '3*Math.min(Math.min(w,h)/8,w/12)',
        x: 'w*0.5',
        y: 'Math.min(Math.min(w,h)/8,w/12)',
      },
      {
        action: 'quadraticCurve',
        x1: 'w*0.75',
        y1: '-Math.min(Math.min(w,h)/8,w/12)',
        x: 'w',
        y: 'Math.min(Math.min(w,h)/8,w/12)',
      },
      {
        action: 'line',
        x: 'w',
        y: 'h-Math.min(Math.min(w,h)/8,w/12)'
      },
      {
        action: 'quadraticCurve',
        x1: 'w*0.75',
        y1: 'h-3*Math.min(Math.min(w,h)/8,w/12)',
        x: 'w*0.5',
        y: 'h-Math.min(Math.min(w,h)/8,w/12)',
      },
      {
        action: 'quadraticCurve',
        x1: 'w*0.25',
        y1: 'h+Math.min(Math.min(w,h)/8,w/12)',
        x: '0',
        y: 'h-Math.min(Math.min(w,h)/8,w/12)',
      },
      {
        action: 'line',
        x: '0',
        y: 'Math.min(Math.min(w,h)/8,w/12)'
      },
      {
        action: 'close'
      },
    ],
  }, ],
});
Schema.addShape({
  name: 'display',
  title: '展示',
  category: 'basic',
  props: {
    w: 100,
    h: 70
  },
  path: [{
    actions: [{
        action: 'move',
        x: 'w-w/6',
        y: '0'
      },
      {
        action: 'line',
        x: 'w/6',
        y: '0'
      },
      {
        action: 'line',
        x: '0',
        y: 'h/2'
      },
      {
        action: 'line',
        x: 'w/6',
        y: 'h'
      },
      {
        action: 'line',
        x: 'w-w/6',
        y: 'h'
      },
      {
        action: 'quadraticCurve',
        x1: 'w',
        y1: 'h',
        x: 'w',
        y: 'h*0.5'
      },
      {
        action: 'quadraticCurve',
        x1: 'w',
        y1: '0',
        x: 'w-w/6',
        y: '0'
      },
      {
        action: 'close'
      },
    ],
  }, ],
});


Schema.addShape({
  name: 'manualOperation',
  title: '人工操作',
  category: 'basic',
  props: {
    w: 100,
    h: 70
  },
  textBlock: [{
    position: {
      x: 'w*0.1',
      y: '0',
      w: 'w*0.8',
      h: 'h'
    }
  }],
  anchors: [{
      x: 'w*0.5',
      y: '0'
    },
    {
      x: 'w-Math.min(h/2,w/6)/2',
      y: 'h*0.5'
    },
    {
      x: 'w*0.5',
      y: 'h'
    },
    {
      x: 'Math.min(h/2,w/6)/2',
      y: 'h*0.5'
    },
  ],
  path: [{
    actions: [{
        action: 'move',
        x: '0',
        y: '0'
      },
      {
        action: 'line',
        x: 'w',
        y: '0'
      },
      {
        action: 'line',
        x: 'w-Math.min(h/2,w/6)',
        y: 'h'
      },
      {
        action: 'line',
        x: 'Math.min(h/2,w/6)',
        y: 'h'
      },
      {
        action: 'line',
        x: '0',
        y: '0'
      },
      {
        action: 'close'
      },
    ],
  }, ],
});
Schema.addShape({
  name: 'preparation',
  title: '预备',
  category: 'basic',
  props: {
    w: 100,
    h: 70
  },
  path: [{
    actions: [{
        action: 'move',
        x: '0',
        y: 'h*0.5'
      },
      {
        action: 'line',
        x: 'Math.min(h/2,w/6)',
        y: '0'
      },
      {
        action: 'line',
        x: 'w-Math.min(h/2,w/6)',
        y: '0'
      },
      {
        action: 'line',
        x: 'w',
        y: 'h/2'
      },
      {
        action: 'line',
        x: 'w-Math.min(h/2,w/6)',
        y: 'h'
      },
      {
        action: 'line',
        x: 'Math.min(h/2,w/6)',
        y: 'h'
      },
      {
        action: 'line',
        x: '0',
        y: 'h/2'
      },
      {
        action: 'close'
      },
    ],
  }, ],
});
Schema.addShape({
  name: 'parallelMode',
  title: '条带',
  category: 'basic',
  props: {
    w: 100,
    h: 70
  },
  anchors: [{
      x: 'w*0.5',
      y: '0'
    },
    {
      x: 'w*0.5',
      y: '0'
    },
    {
      x: 'w*0.5',
      y: 'h'
    },
    {
      x: 'w*0.5',
      y: 'h'
    },
  ],
  path: [{
      actions: [{
          action: 'move',
          x: '0',
          y: '0'
        },
        {
          action: 'line',
          x: 'w',
          y: '0'
        },
        {
          action: 'line',
          x: '0',
          y: '0'
        },
        {
          action: 'move',
          x: '0',
          y: 'h'
        },
        {
          action: 'line',
          x: 'w',
          y: 'h'
        },
        {
          action: 'line',
          x: '0',
          y: 'h'
        },
        {
          action: 'close'
        },
      ],
    },
    {
      fillStyle: {
        type: 'none'
      },
      lineStyle: {
        lineWidth: 0
      },
      actions: [{
          action: 'move',
          x: '0',
          y: '0'
        },
        {
          action: 'line',
          x: 'w',
          y: '0'
        },
        {
          action: 'line',
          x: 'w',
          y: 'h'
        },
        {
          action: 'line',
          x: '0',
          y: 'h'
        },
        {
          action: 'line',
          x: '0',
          y: '0'
        },
        {
          action: 'close'
        },
      ],
    },
  ],
});
Schema.addShape({
  name: 'loopLimit',
  title: '展示',
  category: 'basic',
  props: {
    w: 100,
    h: 70
  },
  path: [{
    actions: [{
        action: 'move',
        x: '0',
        y: 'Math.min(h/2,w/6)'
      },
      {
        action: 'line',
        x: 'Math.min(h/2,w/6)',
        y: '0'
      },
      {
        action: 'line',
        x: 'w-Math.min(h/2,w/6)',
        y: '0'
      },
      {
        action: 'line',
        x: 'w',
        y: 'Math.min(h/2,w/6)'
      },
      {
        action: 'line',
        x: 'w',
        y: 'h'
      },
      {
        action: 'line',
        x: '0',
        y: 'h'
      },
      {
        action: 'line',
        x: '0',
        y: 'Math.min(h/2,w/6)'
      },
      {
        action: 'close'
      },
    ],
  }, ],
});
Schema.addShape({
  name: 'onPageReference',
  title: '页面引用',
  category: 'basic',
  props: {
    w: 70,
    h: 70
  },
  path: [{
    actions: {
      ref: 'round'
    }
  }],
});
// Schema.addShape({
//   name: 'text',
//   title: '文本',
//   category: 'basic',
//   props: { w: 120, h: 40 },
//   textBlock: [{ position: { x: 0, y: 0, w: 'w', h: 'h' }, text: '文本' }],
//   path: [{ lineStyle: { lineWidth: 0 }, fillStyle: { type: 'none' }, actions: { ref: 'rectangle' } }],
//   drawIcon: function (b, c) {
//     var a = 0;
//     var e = -10;
//     var d = 5;
//     c = c + 20;
//     b = b - 10;
//     return [
//       {
//         lineStyle: { lineWidth: 2 },
//         fillStyle: { type: 'solid', color: '50, 50, 50' },
//         actions: [
//           { action: 'move', x: d + a, y: e },
//           { action: 'line', x: d + b, y: e },
//           { action: 'line', x: d + b, y: e + c * 0.2 },
//           { action: 'line', x: d + b * 0.9, y: e + c * 0.12 },
//           { action: 'line', x: d + b * 0.55, y: e + c * 0.12 },
//           { action: 'line', x: d + b * 0.55, y: e + c * 0.85 },
//           { action: 'line', x: d + b * 0.63, y: e + c },
//           { action: 'line', x: d + b * 0.37, y: e + c },
//           { action: 'line', x: d + b * 0.45, y: e + c * 0.85 },
//           { action: 'line', x: d + b * 0.45, y: e + c * 0.12 },
//           { action: 'line', x: d + b * 0.1, y: e + c * 0.12 },
//           { action: 'line', x: d, y: e + c * 0.2 },
//           { action: 'close' },
//         ],
//       },
//     ];
//   },
// });
// Schema.addShape({
//   name: 'note',
//   title: '备注',
//   category: 'basic',
//   props: { w: 80, h: 100 },
//   textBlock: [{ position: { x: 10, y: 10, w: 'w-20', h: 'h-20' } }],
//   fillStyle: { color: '255, 255, 170' },
//   lineStyle: { lineWidth: 0 },
//   path: [
//     {
//       actions: [
//         { action: 'move', x: '0', y: '0' },
//         { action: 'line', x: 'w-16', y: '0' },
//         { action: 'line', x: 'w', y: '16' },
//         { action: 'line', x: 'w', y: 'h' },
//         { action: 'line', x: '0', y: 'h' },
//         { action: 'line', x: '0', y: '0' },
//         { action: 'close' },
//       ],
//     },
//     {
//       fillStyle: { type: 'solid', color: 'r-50,g-50,b-50' },
//       actions: [
//         { action: 'move', x: 'w-16', y: '0' },
//         { action: 'line', x: 'w-16', y: '16' },
//         { action: 'line', x: 'w', y: '16' },
//         { action: 'close' },
//       ],
//     },
//     {
//       fillStyle: { type: 'none' },
//       actions: [
//         { action: 'move', x: '0', y: '0' },
//         { action: 'line', x: 'w-16', y: '0' },
//         { action: 'line', x: 'w', y: '16' },
//         { action: 'line', x: 'w', y: 'h' },
//         { action: 'line', x: '0', y: 'h' },
//         { action: 'line', x: '0', y: '0' },
//         { action: 'close' },
//       ],
//     },
//   ],
//   drawIcon: function (a, b) {
//     return [
//       {
//         actions: [
//           { action: 'move', x: 0, y: 0 },
//           { action: 'line', x: a * 0.6, y: 0 },
//           { action: 'line', x: a, y: b * 0.24 },
//           { action: 'line', x: a, y: b },
//           { action: 'line', x: 0, y: b },
//           { action: 'line', x: 0, y: 0 },
//           { action: 'close' },
//         ],
//       },
//       {
//         lineStyle: { lineWidth: 0 },
//         fillStyle: { type: 'solid', color: '205, 205, 120' },
//         actions: [
//           { action: 'move', x: a * 0.6, y: 0 },
//           { action: 'line', x: a * 0.6, y: b * 0.24 },
//           { action: 'line', x: a * 0.93, y: b * 0.24 },
//         ],
//       },
//     ];
//   },
// });
// Schema.addShape({
//   name: 'linker_shape_solid',
//   title: '直线',
//   category: 'basic',
//   attribute: { linkable: false },
//   props: { w: 100, h: 100 },
//   textBlock: [],
//   fillStyle: { color: '0, 0, 0' },
//   lineStyle: { lineWidth: 2 },
//   path: [
//     { actions: [{ action: 'move', x: '4', y: 'h-4' }, { action: 'line', x: 'w-6', y: '6' }, { action: 'close' }] },
//     {
//       lineStyle: { lineWidth: 0 },
//       actions: [
//         { action: 'move', x: 'w-4', y: '4' },
//         { action: 'line', x: 'w-20', y: '12' },
//         { action: 'line', x: 'w-12', y: '20' },
//         { action: 'close' },
//       ],
//     },
//   ],
//   element: {
//     name: 'linker',
//     boxPos: { x: 0, y: 0, w: 160, h: 0 },
//     props: { x: 0, y: 0, w: 160, h: 0 },
//     dataAttributes: [],
//     from: { x: 0, y: 0 },
//     to: { x: 160, y: 0 },
//     group: '',
//     id: '',
//     lineStyle: {},
//     linkerType: 'broken',
//     locked: false,
//     points: [
//       { x: 80, y: 0 },
//       { x: 80, y: 0 },
//     ],
//     text: '',
//   },
// });
// Schema.addShape({
//   name: 'image',
//   title: 'Image',
//   attribute: { linkable: false, visible: false },
//   category: 'basic',
//   textBlock: [],
//   props: { w: 98, h: 72 },
//   path: [{ actions: { ref: 'rectangle' } }],
// });
// Schema.addShape({
//   name: 'round',
//   title: '圆形',
//   category: 'basic',
//   props: { w: 70, h: 70 },
//   path: [{ actions: { ref: 'round' } }],
// });
// Schema.addShape({
//   name: 'rectangle',
//   title: '矩形',
//   category: 'basic',
//   props: { w: 100, h: 70 },
//   path: [{ actions: { ref: 'rectangle' } }],
// });
// Schema.addShape({
//   name: 'roundRectangle',
//   title: '圆角矩形',
//   category: 'basic',
//   props: { w: 100, h: 70 },
//   path: [{ actions: { ref: 'roundRectangle' } }],
// });
// Schema.addShape({
//   name: 'triangle',
//   title: '三角形',
//   category: 'basic',
//   props: { w: 80, h: 70 },
//   textBlock: [{ position: { x: '10', y: 'h*0.25', w: 'w-20', h: 'h*0.75' } }],
//   anchors: [
//     { x: 'w/2', y: '0' },
//     { x: 'w/2', y: 'h' },
//     { x: 'w*0.25', y: 'h/2' },
//     { x: 'w*0.75', y: 'h/2' },
//   ],
//   path: [
//     {
//       actions: [
//         { action: 'move', x: 'w/2', y: '0' },
//         { action: 'line', x: 'w', y: 'h' },
//         { action: 'line', x: '0', y: 'h' },
//         { action: 'close' },
//       ],
//     },
//   ],
// });
// Schema.addShape({
//   name: 'rightTriangle',
//   title: '',
//   category: 'basic',
//   props: { w: 80, h: 60 },
//   textBlock: [{ position: { x: '2', y: 'h*0.25', w: 'w/2', h: 'h*0.75' } }],
//   anchors: [
//     { x: 'w/2', y: 'h' },
//     { x: '0', y: 'h/2' },
//     { x: 'w*0.5', y: 'h/2' },
//   ],
//   path: [
//     {
//       actions: [
//         { action: 'move', x: '0', y: 'h' },
//         { action: 'line', x: '0', y: '0' },
//         { action: 'line', x: 'w', y: 'h' },
//         { action: 'close' },
//       ],
//     },
//   ],
// });
// Schema.addShape({
//   name: 'diamond',
//   title: '菱形',
//   category: 'basic',
//   props: { w: 120, h: 80 },
//   textBlock: [{ position: { x: '10', y: 'h*0.13', w: 'w-20', h: 'h*0.75' } }],
//   anchors: [
//     { x: '0', y: 'h/2' },
//     { x: 'w/2', y: '0' },
//     { x: 'w', y: 'h/2' },
//     { x: 'w/2', y: 'h' },
//   ],
//   path: [
//     {
//       actions: [
//         { action: 'move', x: '0', y: 'h/2' },
//         { action: 'line', x: 'w/2', y: '0' },
//         { action: 'line', x: 'w', y: 'h/2' },
//         { action: 'line', x: 'w/2', y: 'h' },
//         { action: 'close' },
//       ],
//     },
//   ],
// });
// Schema.addShape({
//   name: 'polygon',
//   title: '五边形',
//   category: 'basic',
//   props: { w: 74, h: 70 },
//   textBlock: [{ position: { x: '10', y: 'h*0.15', w: 'w-20', h: 'h*0.85' } }],
//   anchors: [
//     { x: 'w/2', y: '0' },
//     { x: 'w/2', y: 'h' },
//     { x: '0', y: 'h*0.39' },
//     { x: 'w', y: 'h*0.39' },
//   ],
//   path: [
//     {
//       actions: [
//         { action: 'move', x: 'w/2', y: '0' },
//         { action: 'line', x: '0', y: 'h*0.39' },
//         { action: 'line', x: 'w*0.18', y: 'h' },
//         { action: 'line', x: 'w*0.82', y: 'h' },
//         { action: 'line', x: 'w', y: 'h*0.39' },
//         { action: 'close' },
//       ],
//     },
//   ],
// });
// Schema.addShape({
//   name: 'hexagon',
//   title: '六边形',
//   category: 'basic',
//   props: { w: 84, h: 70 },
//   path: [
//     {
//       actions: [
//         { action: 'move', x: 'Math.min(w,h)*0.21', y: '0' },
//         { action: 'line', x: 'w-Math.min(w,h)*0.21', y: '0' },
//         { action: 'line', x: 'w', y: 'h * 0.5' },
//         { action: 'line', x: 'w-Math.min(w,h)*0.21', y: 'h' },
//         { action: 'line', x: 'Math.min(w,h)*0.21', y: 'h' },
//         { action: 'line', x: '0', y: 'h * 0.5' },
//         { action: 'line', x: 'Math.min(w,h)*0.21', y: '0' },
//         { action: 'close' },
//       ],
//     },
//   ],
// });
// Schema.addShape({
//   name: 'octagon',
//   title: '八边形',
//   category: 'basic',
//   props: { w: 70, h: 70 },
//   textBlock: [{ position: { x: '10', y: '10', w: 'w-20', h: 'h-20' } }],
//   path: [
//     {
//       actions: [
//         { action: 'move', x: 'Math.min(w,h)*0.29', y: '0' },
//         { action: 'line', x: 'w-Math.min(w,h)*0.29', y: '0' },
//         { action: 'line', x: 'w', y: 'h*0.29' },
//         { action: 'line', x: 'w', y: 'h*0.71' },
//         { action: 'line', x: 'w-Math.min(w,h)*0.29', y: 'h' },
//         { action: 'line', x: 'Math.min(w,h)*0.29', y: 'h' },
//         { action: 'line', x: '0', y: 'h*0.71' },
//         { action: 'line', x: '0', y: 'h*0.29' },
//         { action: 'close' },
//       ],
//     },
//   ],
// });
// Schema.addShape({
//   name: 'pentagon',
//   title: '五角星',
//   category: 'basic',
//   props: { w: 70, h: 70 },
//   textBlock: [{ position: { x: 'w*0.15', y: 'h*0.20', w: 'w*0.70', h: 'h*0.65' } }],
//   anchors: [
//     { x: 'w*0.5', y: '0' },
//     { x: '0', y: 'h*0.38' },
//     { x: 'w*0.5', y: 'h*0.76' },
//     { x: 'w', y: 'h*0.38' },
//   ],
//   path: [
//     {
//       actions: [
//         { action: 'move', x: 'w*0.62', y: 'h*0.38' },
//         { action: 'line', x: 'w*0.5', y: '0' },
//         { action: 'line', x: 'w*0.38', y: 'h*0.38' },
//         { action: 'line', x: '0', y: 'h*0.38' },
//         { action: 'line', x: 'w*0.3', y: 'h*0.62' },
//         { action: 'line', x: 'w*0.18', y: 'h' },
//         { action: 'line', x: 'w*0.5', y: 'h*0.76' },
//         { action: 'line', x: 'w*0.82', y: 'h' },
//         { action: 'line', x: 'w*0.7', y: 'h*0.62' },
//         { action: 'line', x: 'w', y: 'h*0.38' },
//         { action: 'close' },
//       ],
//     },
//   ],
// });
// Schema.addShape({
//   name: 'sector',
//   title: '',
//   category: 'basic',
//   props: { w: 80, h: 80 },
//   anchors: [
//     { x: '0', y: '0.134*h' },
//     { x: 'w/2', y: '0' },
//     { x: 'w', y: '0.134*h' },
//     { x: 'w/2', y: 'h' },
//   ],
//   path: [
//     {
//       actions: [
//         { action: 'move', x: 'w/2', y: 'h' },
//         { action: 'line', x: '0', y: '0.134*h' },
//         { action: 'quadraticCurve', x1: 'w/2', y1: '-0.134*h', x: 'w', y: 'h*0.134' },
//         { action: 'close' },
//       ],
//     },
//   ],
// });
// Schema.addShape({
//   name: 'sector2',
//   title: '',
//   category: 'basic',
//   props: { w: 80, h: 45 },
//   anchors: [
//     { x: '0', y: '0.238*h' },
//     { x: 'w/2', y: '0' },
//     { x: 'w', y: '0.238*h' },
//     { x: 'w/2', y: 'h' },
//   ],
//   path: [
//     {
//       actions: [
//         { action: 'move', x: 'w*0.25', y: 'h' },
//         { action: 'line', x: '0', y: '0.238*h' },
//         { action: 'quadraticCurve', x1: 'w/2', y1: '-0.238*h', x: 'w', y: 'h*0.238' },
//         { action: 'line', x: 'w*0.75', y: 'h' },
//         { action: 'quadraticCurve', x1: 'w/2', y1: '0.8*h', x: 'w*0.25', y: 'h' },
//         { action: 'close' },
//       ],
//     },
//   ],
// });
// Schema.addShape({
//   name: 'cross',
//   title: '十字形',
//   category: 'basic',
//   props: { w: 70, h: 70 },
//   textBlock: [{ position: { x: '0', y: 'h*0.5-Math.min(w,h)/8', w: 'w', h: 'Math.min(w,h)*2/8' } }],
//   path: [
//     {
//       actions: [
//         { action: 'move', x: 'w*0.5-Math.min(w,h)/8', y: '0' },
//         { action: 'line', x: 'w*0.5+Math.min(w,h)/8', y: '0' },
//         { action: 'line', x: 'w*0.5+Math.min(w,h)/8', y: 'h*0.5-Math.min(w,h)/8' },
//         { action: 'line', x: 'w', y: 'h*0.5-Math.min(w,h)/8' },
//         { action: 'line', x: 'w', y: 'h*0.5+Math.min(w,h)/8' },
//         { action: 'line', x: 'w*0.5+Math.min(w,h)/8', y: 'h*0.5+Math.min(w,h)/8' },
//         { action: 'line', x: 'w*0.5+Math.min(w,h)/8', y: 'h' },
//         { action: 'line', x: 'w*0.5-Math.min(w,h)/8', y: 'h' },
//         { action: 'line', x: 'w*0.5-Math.min(w,h)/8', y: 'h*0.5+Math.min(w,h)/8' },
//         { action: 'line', x: '0', y: 'h*0.5+Math.min(w,h)/8' },
//         { action: 'line', x: '0', y: 'h*0.5-Math.min(w,h)/8' },
//         { action: 'line', x: 'w*0.5-Math.min(w,h)/8', y: 'h*0.5-Math.min(w,h)/8' },
//         { action: 'close' },
//       ],
//     },
//   ],
// });
// Schema.addShape({
//   name: 'cloud',
//   title: '云',
//   category: 'basic',
//   props: { w: 90, h: 70 },
//   textBlock: [{ position: { x: 10, y: 10, w: 'w-20', h: 'h-20' } }],
//   anchors: [
//     { x: '0', y: 'h*0.5' },
//     { x: 'w*0.19', y: 'h*0.9' },
//     { x: 'w*0.57', y: 'h' },
//     { x: 'w*0.962', y: 'h*0.8' },
//     { x: 'w*0.9543', y: 'h*0.23' },
//     { x: 'w*0.6', y: 'h*0.01' },
//     { x: 'w*0.17', y: 'h*0.09' },
//   ],
//   path: [
//     {
//       actions: [
//         { action: 'move', x: '0.12*w', y: '0.7*h' },
//         { action: 'curve', x1: '-0.1*w', y1: '0.5*h', x2: '0.04*w', y2: '0.35*h', x: '0.09*w', y: '0.3*h' },
//         { action: 'curve', x1: '0.07*w', y1: '0.05*h', x2: '0.32*w', y2: '0.0*h', x: '0.42*w', y: '0.1*h' },
//         { action: 'curve', x1: '0.50*w', y1: '-0.05*h', x2: '0.75*w', y2: '0.0*h', x: '0.75*w', y: '0.15*h' },
//         { action: 'curve', x1: '0.95*w', y1: '0.1*h', x2: '1.03*w', y2: '0.3*h', x: '0.95*w', y: '0.55*h' },
//         { action: 'curve', x1: '1.02*w', y1: '0.75*h', x2: '0.95*w', y2: '1.0*h', x: '0.72*w', y: '0.9*h' },
//         { action: 'curve', x1: '0.67*w', y1: '1.03*h', x2: '0.47*w', y2: '1.03*h', x: '0.42*w', y: '0.9*h' },
//         { action: 'curve', x1: '0.32*w', y1: '1.0*h', x2: '0.12*w', y2: '0.95*h', x: '0.12*w', y: '0.7*h' },
//         { action: 'close' },
//       ],
//     },
//   ],
// });
// Schema.addShape({
//   name: 'comment',
//   title: '',
//   category: 'basic',
//   props: { w: 90, h: 70 },
//   anchors: [
//     { x: 'w', y: 'h*0.5' },
//     { x: '0', y: 'h*0.5' },
//   ],
//   path: [
//     {
//       actions: [
//         { action: 'move', x: '0', y: 'h/2' },
//         { action: 'curve', x1: '0', y1: '-h/6', x2: 'w', y2: '-h/6', x: 'w', y: 'h/2' },
//         { action: 'quadraticCurve', x1: 'w*0.98', y1: 'h*0.98', x: 'w/2', y: 'h' },
//         { action: 'quadraticCurve', x1: 'w/3', y1: 'h', x: 'w/6', y: 'h*0.9' },
//         { action: 'line', x: '0', y: 'h' },
//         { action: 'line', x: 'w*0.117', y: 'h*0.857' },
//         { action: 'quadraticCurve', x1: '0', y1: '0.7*h', x: '0', y: 'h/2' },
//       ],
//     },
//   ],
// });
// Schema.addShape({
//   name: 'braces',
//   title: '大括号',
//   category: 'basic',
//   attribute: { linkable: false },
//   props: { w: 200, h: 140 },
//   fillStyle: { type: 'none' },
//   anchors: [
//     { x: 'w', y: 'h*0.5' },
//     { x: '0', y: 'h*0.5' },
//   ],
//   path: [
//     {
//       fillStyle: { type: 'none' },
//       actions: [
//         { action: 'move', x: 'Math.min(w*0.2,18)', y: '0' },
//         { action: 'quadraticCurve', x1: 'Math.min(w*0.1,9)', y1: '0', x: 'Math.min(w*0.1,9)', y: 'Math.min(h*0.1,9)' },
//         { action: 'line', x: 'Math.min(w*0.1,9)', y: 'h*0.5-Math.min(h*0.1,9)' },
//         { action: 'quadraticCurve', x1: 'Math.min(w*0.1,9)', y1: 'h*0.5', x: '0', y: 'h*0.5' },
//         {
//           action: 'quadraticCurve',
//           x1: 'Math.min(w*0.1,9)',
//           y1: 'h*0.5',
//           x: 'Math.min(w*0.1,9)',
//           y: 'h*0.5+Math.min(h*0.1,9)',
//         },
//         { action: 'line', x: 'Math.min(w*0.1,9)', y: 'h-Math.min(h*0.1,9)' },
//         { action: 'quadraticCurve', x1: 'Math.min(w*0.1,9)', y1: 'h', x: 'Math.min(w*0.2,18)', y: 'h' },
//       ],
//     },
//     {
//       fillStyle: { type: 'none' },
//       actions: [
//         { action: 'move', x: 'w-Math.min(w*0.2,18)', y: 'h' },
//         {
//           action: 'quadraticCurve',
//           x1: 'w-Math.min(w*0.1,9)',
//           y1: 'h',
//           x: 'w-Math.min(w*0.1,9)',
//           y: 'h-Math.min(h*0.1,9)',
//         },
//         { action: 'line', x: 'w-Math.min(w*0.1,9)', y: 'h*0.5+Math.min(h*0.1,9)' },
//         { action: 'quadraticCurve', x1: 'w-Math.min(w*0.1,9)', y1: 'h*0.5', x: 'w', y: 'h*0.5' },
//         {
//           action: 'quadraticCurve',
//           x1: 'w-Math.min(w*0.1,9)',
//           y1: 'h*0.5',
//           x: 'w-Math.min(w*0.1,9)',
//           y: 'h*0.5-Math.min(h*0.1,9)',
//         },
//         { action: 'line', x: 'w-Math.min(w*0.1,9)', y: 'Math.min(h*0.1,9)' },
//         { action: 'quadraticCurve', x1: 'w-Math.min(w*0.1,9)', y1: '0', x: 'w-Math.min(w*0.2,18)', y: '0' },
//       ],
//     },
//     { lineStyle: { lineWidth: 0 }, fillStyle: { type: 'none' }, actions: { ref: 'rectangle' } },
//   ],
// });
// Schema.addShape({
//   name: 'parentheses',
//   title: '中括号',
//   category: 'basic',
//   attribute: { linkable: false },
//   props: { w: 200, h: 140 },
//   fillStyle: { type: 'none' },
//   anchors: [
//     { x: 'w', y: 'h*0.5' },
//     { x: '0', y: 'h*0.5' },
//   ],
//   path: [
//     {
//       actions: [
//         { action: 'move', x: 'Math.min(w*0.1,18)', y: '0' },
//         { action: 'line', x: '0', y: 'Math.min(h*0.1,15)' },
//         { action: 'line', x: '0', y: 'h-Math.min(h*0.1,15)' },
//         { action: 'line', x: 'Math.min(w*0.1,18)', y: 'h' },
//         { action: 'move', x: 'w-Math.min(w*0.1,18)', y: 'h' },
//         { action: 'line', x: 'w', y: 'h-Math.min(h*0.1,15)' },
//         { action: 'line', x: 'w', y: 'Math.min(h*0.1,15)' },
//         { action: 'line', x: 'w-Math.min(w*0.1,18)', y: '0' },
//       ],
//     },
//     { lineStyle: { lineWidth: 0 }, fillStyle: { type: 'none' }, actions: { ref: 'rectangle' } },
//   ],
// });
// Schema.addShape({
//   name: 'rightBrace',
//   title: '备注',
//   category: 'basic',
//   attribute: { linkable: false },
//   props: { w: 100, h: 140 },
//   fontStyle: { textAlign: 'left' },
//   fillStyle: { type: 'none' },
//   textBlock: [{ position: { x: '27', y: '0', w: 'w-27', h: 'h' } }],
//   anchors: [],
//   path: [
//     {
//       actions: [
//         { action: 'move', x: '0', y: 'h' },
//         {
//           action: 'quadraticCurve',
//           x1: 'Math.min(w*0.1,9)',
//           y1: 'h',
//           x: 'Math.min(w*0.1,9)',
//           y: 'h-Math.min(h*0.1,9)',
//         },
//         { action: 'line', x: 'Math.min(w*0.1,9)', y: 'h*0.5+Math.min(h*0.1,9)' },
//         { action: 'quadraticCurve', x1: 'Math.min(w*0.1,9)', y1: 'h*0.5', x: '22', y: 'h*0.5' },
//         {
//           action: 'quadraticCurve',
//           x1: 'Math.min(w*0.1,9)',
//           y1: 'h*0.5',
//           x: 'Math.min(w*0.1,9)',
//           y: 'h*0.5-Math.min(h*0.1,9)',
//         },
//         { action: 'line', x: 'Math.min(w*0.1,9)', y: 'Math.min(h*0.1,9)' },
//         { action: 'quadraticCurve', x1: 'Math.min(w*0.1,9)', y1: '0', x: '0', y: '0' },
//       ],
//     },
//     { lineStyle: { lineWidth: 0 }, fillStyle: { type: 'none' }, actions: { ref: 'rectangle' } },
//   ],
//   drawIcon: function (b, c) {
//     var a = 10;
//     return [
//       {
//         actions: [
//           { action: 'move', x: a + 0, y: c },
//           {
//             action: 'quadraticCurve',
//             x1: a + Math.min(b * 0.1, 9),
//             y1: c,
//             x: a + Math.min(b * 0.1, 9),
//             y: c - Math.min(c * 0.1, 9),
//           },
//           { action: 'line', x: a + Math.min(b * 0.1, 9), y: c * 0.5 + Math.min(c * 0.1, 9) },
//           { action: 'quadraticCurve', x1: a + Math.min(b * 0.1, 9), y1: c * 0.5, x: a + b * 0.2, y: c * 0.5 },
//           {
//             action: 'quadraticCurve',
//             x1: a + Math.min(b * 0.1, 9),
//             y1: c * 0.5,
//             x: a + Math.min(b * 0.1, 9),
//             y: c * 0.5 - Math.min(c * 0.1, 9),
//           },
//           { action: 'line', x: a + Math.min(b * 0.1, 9), y: Math.min(c * 0.1, 9) },
//           { action: 'quadraticCurve', x1: a + Math.min(b * 0.1, 9), y1: 0, x: a + 0, y: 0 },
//         ],
//       },
//     ];
//   },
// });
// Schema.addShape({
//   name: 'leftBrace',
//   title: '备注',
//   category: 'basic',
//   attribute: { linkable: false },
//   props: { w: 100, h: 140 },
//   fontStyle: { textAlign: 'right' },
//   fillStyle: { type: 'none' },
//   textBlock: [{ position: { x: '0', y: '0', w: 'w-27', h: 'h' } }],
//   anchors: [],
//   path: [
//     {
//       actions: [
//         { action: 'move', x: 'w', y: '0' },
//         {
//           action: 'quadraticCurve',
//           x1: 'w-Math.min(w*0.1,9)',
//           y1: '0',
//           x: 'w-Math.min(w*0.1,9)',
//           y: 'Math.min(h*0.1,9)',
//         },
//         { action: 'line', x: 'w-Math.min(w*0.1,9)', y: 'h*0.5-Math.min(h*0.1,9)' },
//         { action: 'quadraticCurve', x1: 'w-Math.min(w*0.1,9)', y1: 'h*0.5', x: 'w-22', y: 'h*0.5' },
//         {
//           action: 'quadraticCurve',
//           x1: 'w-Math.min(w*0.1,9)',
//           y1: 'h*0.5',
//           x: 'w-Math.min(w*0.1,9)',
//           y: 'h*0.5+Math.min(h*0.1,9)',
//         },
//         { action: 'line', x: 'w-Math.min(w*0.1,9)', y: 'h-Math.min(h*0.1,9)' },
//         { action: 'quadraticCurve', x1: 'w-Math.min(w*0.1,9)', y1: 'h', x: 'w', y: 'h' },
//       ],
//     },
//     { lineStyle: { lineWidth: 0 }, fillStyle: { type: 'none' }, actions: { ref: 'rectangle' } },
//   ],
//   drawIcon: function (b, c) {
//     var a = 12;
//     return [
//       {
//         actions: [
//           { action: 'move', x: b - a, y: 0 },
//           {
//             action: 'quadraticCurve',
//             x1: b - Math.min(b * 0.1, 9) - a,
//             y1: 0,
//             x: b - Math.min(b * 0.1, 9) - a,
//             y: Math.min(c * 0.1, 9),
//           },
//           { action: 'line', x: b - Math.min(b * 0.1, 9) - a, y: c * 0.5 - Math.min(c * 0.1, 9) },
//           { action: 'quadraticCurve', x1: b - Math.min(b * 0.1, 9) - a, y1: c * 0.5, x: b - b * 0.2 - a, y: c * 0.5 },
//           {
//             action: 'quadraticCurve',
//             x1: b - Math.min(b * 0.1, 9) - a,
//             y1: c * 0.5,
//             x: b - Math.min(b * 0.1, 9) - a,
//             y: c * 0.5 + Math.min(c * 0.1, 9),
//           },
//           { action: 'line', x: b - Math.min(b * 0.1, 9) - a, y: c - Math.min(c * 0.1, 9) },
//           { action: 'quadraticCurve', x1: b - Math.min(b * 0.1, 9) - a, y1: c, x: b - a, y: c },
//         ],
//       },
//     ];
//   },
// });
// Schema.addShape({
//   name: 'apqc',
//   title: 'APQC',
//   category: 'basic',
//   props: { w: 200, h: 150 },
//   path: [
//     {
//       actions: [
//         { action: 'move', x: '0', y: 'h/8' },
//         { action: 'quadraticCurve', x1: 'w*0.5', y1: '-h/8', x: 'w', y: 'h/8' },
//         { action: 'line', x: 'w', y: 'h' },
//         { action: 'line', x: '0', y: 'h' },
//         { action: 'line', x: '0', y: 'h/8' },
//         { action: 'close' },
//       ],
//     },
//   ],
// });
// Schema.addShape({
//   name: 'teardrop',
//   title: '水滴',
//   category: 'basic',
//   props: { w: 70, h: 70 },
//   path: [
//     {
//       actions: [
//         { action: 'move', x: 'w', y: '0' },
//         { action: 'line', x: 'w', y: 'h/2' },
//         { action: 'curve', x1: 'w', y1: 'h+h/6', x2: '0', y2: 'h+h/6', x: '0', y: 'h*0.5' },
//         { action: 'quadraticCurve', x1: '0', y1: '0', x: 'w/2', y: '0' },
//         { action: 'line', x: 'w/2', y: '0' },
//         { action: 'line', x: 'w', y: '0' },
//         { action: 'close' },
//       ],
//     },
//   ],
// });
// Schema.addShape({
//   name: 'singleLeftArrow',
//   title: '左箭头',
//   category: 'basic',
//   props: { w: 90, h: 60 },
//   anchors: [
//     { x: 'w', y: 'h*0.5' },
//     { x: '0', y: 'h*0.5' },
//   ],
//   textBlock: [{ position: { x: '0', y: 'h*0.33', w: 'w', h: 'h*0.34' } }],
//   path: [
//     {
//       actions: [
//         { action: 'move', x: '0', y: 'h/2' },
//         { action: 'line', x: 'Math.min(0.5*h,0.45*w)', y: '0' },
//         { action: 'line', x: 'Math.min(0.5*h,0.45*w)', y: 'h*0.33' },
//         { action: 'line', x: 'w', y: 'h*0.33' },
//         { action: 'line', x: 'w', y: 'h*0.67' },
//         { action: 'line', x: 'Math.min(0.5*h,0.45*w)', y: 'h*0.67' },
//         { action: 'line', x: 'Math.min(0.5*h,0.45*w)', y: 'h' },
//         { action: 'line', x: '0', y: 'h/2' },
//         { action: 'close' },
//       ],
//     },
//   ],
// });
// Schema.addShape({
//   name: 'singleRightArrow',
//   title: '右箭头',
//   category: 'basic',
//   props: { w: 90, h: 60 },
//   anchors: [
//     { x: 'w', y: 'h*0.5' },
//     { x: '0', y: 'h*0.5' },
//   ],
//   textBlock: [{ position: { x: '0', y: 'h*0.33', w: 'w', h: 'h*0.34' } }],
//   path: [
//     {
//       actions: [
//         { action: 'move', x: '0', y: 'h*0.33' },
//         { action: 'line', x: 'w-Math.min(h*0.5,w*0.45)', y: 'h*0.33' },
//         { action: 'line', x: 'w-Math.min(h*0.5,w*0.45)', y: '0' },
//         { action: 'line', x: 'w', y: 'h*0.5' },
//         { action: 'line', x: 'w-Math.min(h*0.5,w*0.45)', y: 'h' },
//         { action: 'line', x: 'w-Math.min(h*0.5,w*0.45)', y: 'h*0.67' },
//         { action: 'line', x: '0', y: 'h*0.67' },
//         { action: 'line', x: '0', y: 'h*0.33' },
//         { action: 'close' },
//       ],
//     },
//   ],
// });
// Schema.addShape({
//   name: 'doubleHorizontalArrow',
//   title: '左右箭头',
//   category: 'basic',
//   props: { w: 90, h: 60 },
//   anchors: [
//     { x: 'w', y: 'h*0.5' },
//     { x: '0', y: 'h*0.5' },
//   ],
//   textBlock: [{ position: { x: '0', y: 'h*0.33', w: 'w', h: 'h*0.34' } }],
//   path: [
//     {
//       actions: [
//         { action: 'move', x: '0', y: 'h*0.5' },
//         { action: 'line', x: 'Math.min(h*0.5,w*0.45)', y: '0' },
//         { action: 'line', x: 'Math.min(h*0.5,w*0.45)', y: 'h*0.33' },
//         { action: 'line', x: 'w-Math.min(h*0.5,w*0.45)', y: 'h*0.33' },
//         { action: 'line', x: 'w-Math.min(h*0.5,w*0.45)', y: '0' },
//         { action: 'line', x: 'w', y: 'h*0.5' },
//         { action: 'line', x: 'w-Math.min(h*0.5,w*0.45)', y: 'h' },
//         { action: 'line', x: 'w-Math.min(h*0.5,w*0.45)', y: 'h*0.67' },
//         { action: 'line', x: 'Math.min(h*0.5,w*0.45)', y: 'h*0.67' },
//         { action: 'line', x: 'Math.min(h*0.5,w*0.45)', y: 'h' },
//         { action: 'line', x: '0', y: 'h*0.5' },
//         { action: 'close' },
//       ],
//     },
//   ],
// });
// Schema.addShape({
//   name: 'singleUpArrow',
//   title: '上箭头',
//   category: 'basic',
//   props: { w: 60, h: 90 },
//   anchors: [
//     { x: 'w*0.5', y: '0' },
//     { x: 'w*0.5', y: 'h' },
//   ],
//   textBlock: [{ position: { x: '-w*0.2', y: 'h*0.43', w: 'w*1.4', h: 'h*0.24' } }],
//   path: [
//     {
//       actions: [
//         { action: 'move', x: 'w*0.5', y: '0' },
//         { action: 'line', x: 'w', y: 'Math.min(w*0.5,h*0.45)' },
//         { action: 'line', x: 'w*0.67', y: 'Math.min(w*0.5,h*0.45)' },
//         { action: 'line', x: 'w*0.67', y: 'h' },
//         { action: 'line', x: 'w*0.33', y: 'h' },
//         { action: 'line', x: 'w*0.33', y: 'Math.min(w*0.5,h*0.45)' },
//         { action: 'line', x: '0', y: 'Math.min(w*0.5,h*0.45)' },
//         { action: 'line', x: 'w*0.5', y: '0' },
//         { action: 'close' },
//       ],
//     },
//   ],
// });
// Schema.addShape({
//   name: 'singleDownArrow',
//   title: '下箭头',
//   category: 'basic',
//   props: { w: 60, h: 90 },
//   anchors: [
//     { x: 'w*0.5', y: '0' },
//     { x: 'w*0.5', y: 'h' },
//   ],
//   textBlock: [{ position: { x: '-w*0.2', y: 'h*0.33', w: 'w*1.4', h: 'h*0.24' } }],
//   path: [
//     {
//       actions: [
//         { action: 'move', x: 'w*0.33', y: '0' },
//         { action: 'line', x: 'w*0.67', y: '0' },
//         { action: 'line', x: 'w*0.67', y: 'h-Math.min(w*0.5,h*0.45)' },
//         { action: 'line', x: 'w', y: 'h-Math.min(w*0.5,h*0.45)' },
//         { action: 'line', x: 'w*0.5', y: 'h' },
//         { action: 'line', x: '0', y: 'h-Math.min(w*0.5,h*0.45)' },
//         { action: 'line', x: 'w*0.33', y: 'h-Math.min(w*0.5,h*0.45)' },
//         { action: 'line', x: 'w*0.33', y: '0' },
//         { action: 'close' },
//       ],
//     },
//   ],
// });
// Schema.addShape({
//   name: 'doubleVerticalArrow',
//   title: '上下箭头',
//   category: 'basic',
//   props: { w: 60, h: 90 },
//   anchors: [
//     { x: 'w*0.5', y: '0' },
//     { x: 'w*0.5', y: 'h' },
//   ],
//   textBlock: [{ position: { x: '-w*0.2', y: 'h*0.38', w: 'w*1.4', h: 'h*0.24' } }],
//   path: [
//     {
//       actions: [
//         { action: 'move', x: 'w*0.5', y: '0' },
//         { action: 'line', x: 'w', y: 'Math.min(w*0.5,h*0.45)' },
//         { action: 'line', x: 'w*0.67', y: 'Math.min(w*0.5,h*0.45)' },
//         { action: 'line', x: 'w*0.67', y: 'h-Math.min(w*0.5,h*0.45)' },
//         { action: 'line', x: 'w', y: 'h-Math.min(w*0.5,h*0.45)' },
//         { action: 'line', x: 'w*0.5', y: 'h' },
//         { action: 'line', x: '0', y: 'h-Math.min(w*0.5,h*0.45)' },
//         { action: 'line', x: 'w*0.33', y: 'h-Math.min(w*0.5,h*0.45)' },
//         { action: 'line', x: 'w*0.33', y: 'Math.min(w*0.5,h*0.45)' },
//         { action: 'line', x: '0', y: 'Math.min(w*0.5,h*0.45)' },
//         { action: 'line', x: 'w*0.5', y: '0' },
//         { action: 'close' },
//       ],
//     },
//   ],
// });
// Schema.addShape({
//   name: 'backArrow',
//   title: '左返回箭头',
//   category: 'basic',
//   props: { w: 70, h: 70 },
//   anchors: [
//     { x: 'w-Math.min(w*0.12,20)', y: 'h*0.5' },
//     { x: '0', y: 'h*0.5' },
//   ],
//   textBlock: [{ position: { x: '0', y: '0', w: 'w-10', h: 'h' } }],
//   path: [
//     {
//       actions: [
//         { action: 'move', x: '0', y: 'Math.min(Math.min(w,h)*0.4,80)' },
//         { action: 'quadraticCurve', x1: '0', y1: '0', x: 'Math.min(Math.min(w,h)*0.4,80)', y: '0' },
//         { action: 'line', x: 'w-Math.min(w*0.12,20)-Math.min(Math.min(w,h)*0.4,80)', y: '0' },
//         {
//           action: 'quadraticCurve',
//           x1: 'w-Math.min(w*0.12,20)',
//           y1: '0',
//           x: 'w-Math.min(w*0.12,20)',
//           y: 'Math.min(Math.min(w,h)*0.4,80)',
//         },
//         { action: 'line', x: 'w-Math.min(w*0.12,20)', y: 'h-h*0.1-Math.min(h*0.1,50)' },
//         { action: 'line', x: 'w', y: 'h-h*0.1-Math.min(h*0.1,50)' },
//         { action: 'line', x: 'w-Math.min(w*0.12,20)-Math.min(Math.min(h,w)*0.25,50)/2', y: 'h' },
//         {
//           action: 'line',
//           x: 'w-Math.min(w*0.12,20)*2 - Math.min(Math.min(h,w)*0.25,50)',
//           y: 'h-h*0.1-Math.min(h*0.1,50)',
//         },
//         {
//           action: 'line',
//           x: 'w-Math.min(w*0.12,20) - Math.min(Math.min(h,w)*0.25,50)',
//           y: 'h-h*0.1-Math.min(h*0.1,50)',
//         },
//         {
//           action: 'line',
//           x: 'w-Math.min(w*0.12,20) - Math.min(Math.min(h,w)*0.25,50)',
//           y: 'Math.min(Math.min(h,w)*0.4,80)',
//         },
//         {
//           action: 'quadraticCurve',
//           x1: 'w-Math.min(w*0.12,20)-Math.min(Math.min(h,w)*0.25,50)',
//           y1: 'Math.min(Math.min(h,w)*0.25,50)',
//           x: 'w-Math.min(w*0.12,20)-Math.min(Math.min(h,w)*0.25,50)-Math.min(w*0.15,30)',
//           y: 'Math.min(Math.min(h,w)*0.25,50)',
//         },
//         {
//           action: 'line',
//           x: 'Math.min(Math.min(h,w)*0.25,50)+Math.min(w*0.15,30)',
//           y: 'Math.min(Math.min(h,w)*0.25,50)',
//         },
//         {
//           action: 'quadraticCurve',
//           x1: 'Math.min(Math.min(h,w)*0.25,50)',
//           y1: 'Math.min(Math.min(h,w)*0.25,50)',
//           x: 'Math.min(Math.min(h,w)*0.25,50)',
//           y: 'Math.min(Math.min(h,w)*0.4,80)',
//         },
//         { action: 'line', x: 'Math.min(Math.min(h,w)*0.25,50)', y: 'h' },
//         { action: 'line', x: '0', y: 'h' },
//         { action: 'line', x: '0', y: 'Math.min(Math.min(h,w)*0.4,80)' },
//         { action: 'close' },
//       ],
//     },
//     { lineStyle: { lineWidth: 0 }, fillStyle: { type: 'none' }, actions: { ref: 'rectangle' } },
//   ],
// });
// Schema.addShape({
//   name: 'rightBackArrow',
//   title: '右返回箭头',
//   category: 'basic',
//   props: { w: 70, h: 70 },
//   anchors: [
//     { x: 'Math.min(w*0.12,20)', y: 'h*0.5' },
//     { x: 'w', y: 'h*0.5' },
//   ],
//   textBlock: [{ position: { x: '10', y: '0', w: 'w-10', h: 'h' } }],
//   path: [
//     {
//       actions: [
//         { action: 'move', x: 'w', y: 'Math.min(Math.min(w,h)*0.4,80)' },
//         { action: 'quadraticCurve', x1: 'w', y1: '0', x: 'w-Math.min(Math.min(w,h)*0.4,80)', y: '0' },
//         { action: 'line', x: 'Math.min(w*0.12,20)+Math.min(Math.min(w,h)*0.4,80)', y: '0' },
//         {
//           action: 'quadraticCurve',
//           x1: 'Math.min(w*0.12,20)',
//           y1: '0',
//           x: 'Math.min(w*0.12,20)',
//           y: 'Math.min(Math.min(w,h)*0.4,80)',
//         },
//         { action: 'line', x: 'Math.min(w*0.12,20)', y: 'h-h*0.1-Math.min(h*0.1,50)' },
//         { action: 'line', x: '0', y: 'h-h*0.1-Math.min(h*0.1,50)' },
//         { action: 'line', x: 'Math.min(w*0.12,20)+Math.min(Math.min(h,w)*0.25,50)/2', y: 'h' },
//         { action: 'line', x: 'Math.min(Math.min(h,w)*0.25,50)+Math.min(w*0.12,20)*2', y: 'h-h*0.1-Math.min(h*0.1,50)' },
//         { action: 'line', x: 'Math.min(Math.min(h,w)*0.25,50)+Math.min(w*0.12,20)', y: 'h-h*0.1-Math.min(h*0.1,50)' },
//         {
//           action: 'line',
//           x: 'Math.min(Math.min(h,w)*0.25,50)+Math.min(w*0.12,20)',
//           y: 'Math.min(Math.min(h,w)*0.4,80)',
//         },
//         {
//           action: 'quadraticCurve',
//           x1: 'Math.min(Math.min(h,w)*0.25,50)+Math.min(w*0.12,20)',
//           y1: 'Math.min(Math.min(h,w)*0.25,50)',
//           x: 'Math.min(Math.min(h,w)*0.25,50)+Math.min(w*0.12,20)+Math.min(w*0.15,30)',
//           y: 'Math.min(Math.min(h,w)*0.25,50)',
//         },
//         {
//           action: 'line',
//           x: 'w-Math.min(Math.min(h,w)*0.25,50)-Math.min(w*0.15,30)',
//           y: 'Math.min(Math.min(h,w)*0.25,50)',
//         },
//         {
//           action: 'quadraticCurve',
//           x1: 'w-Math.min(Math.min(h,w)*0.25,50)',
//           y1: 'Math.min(Math.min(h,w)*0.25,50)',
//           x: 'w-Math.min(Math.min(h,w)*0.25,50)',
//           y: 'Math.min(Math.min(h,w)*0.4,80)',
//         },
//         { action: 'line', x: 'w-Math.min(Math.min(h,w)*0.25,50)', y: 'h' },
//         { action: 'line', x: 'w', y: 'h' },
//         { action: 'line', x: 'w', y: 'Math.min(Math.min(h,w)*0.4,80)' },
//         { action: 'close' },
//       ],
//     },
//     { lineStyle: { lineWidth: 0 }, fillStyle: { type: 'none' }, actions: { ref: 'rectangle' } },
//   ],
// });
// Schema.addShape({
//   name: 'corner',
//   title: '拐角',
//   category: 'basic',
//   props: { w: 70, h: 70 },
//   anchors: [
//     { x: 'w*0.5', y: '0' },
//     { x: 'w*0.5', y: '0' },
//     { x: '0', y: 'h*0.5' },
//     { x: '0', y: 'h*0.5' },
//   ],
//   path: [
//     {
//       actions: [
//         { action: 'move', x: '0', y: '0' },
//         { action: 'line', x: 'w', y: '0' },
//         { action: 'line', x: 'w-Math.min(w/6,30)', y: 'Math.min(h/6,30)' },
//         { action: 'line', x: 'Math.min(w/6,30)', y: 'Math.min(h/6,30)' },
//         { action: 'line', x: 'Math.min(w/6,30)', y: 'h-Math.min(h/6,30)' },
//         { action: 'line', x: '0', y: 'h' },
//         { action: 'line', x: '0', y: '0' },
//         { action: 'close' },
//       ],
//     },
//     { lineStyle: { lineWidth: 0 }, fillStyle: { type: 'none' }, actions: { ref: 'rectangle' } },
//   ],
// });
// Schema.addShape({
//   name: 'basic_container',
//   title: '容器',
//   category: 'basic',
//   attribute: { container: true },
//   children: [],
//   props: { w: 360, h: 240, zindex: 1 },
//   textBlock: [{ position: { x: '5', y: '2', w: 'w-10', h: 'h*(1/7)-2' }, text: 'Container' }],
//   path: [{ actions: { ref: 'roundRectangle' } }],
// });
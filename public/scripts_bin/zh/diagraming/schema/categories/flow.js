Schema.addCategory({
  name: 'flow',
  text: '基本图形',
  dataAttributes: [
    { name: '序号', type: 'number', value: '', category: 'default' },
    { name: '名称', type: 'string', value: '', category: 'default' },
    { name: '所有者', type: 'string', value: '', category: 'default' },
    { name: '连接', type: 'link', value: '', category: 'default' },
    { name: '便笺', type: 'string', value: '', category: 'default' },
    { name: '成本', type: 'number', value: '', category: 'default' },
    { name: '时间', type: 'number', value: '', category: 'default' },
    { name: '部门', type: 'string', value: '', category: 'default' },
    { name: '输入', type: 'string', value: '', category: 'default' },
    { name: '输出', type: 'string', value: '', category: 'default' },
    { name: '风险', type: 'string', value: '', category: 'default' },
    { name: '备注', type: 'string', value: '', category: 'default' },
  ],
});
Schema.addShape({
  name: 'process',
  title: '流程',
  category: 'flow',
  props: { w: 100, h: 70 },
  path: [{ actions: { ref: 'rectangle' } }],
});
Schema.addShape({
  name: 'decision',
  title: '判定',
  category: 'flow',
  props: { w: 90, h: 70 },
  path: [
    {
      actions: [
        { action: 'move', x: '0', y: 'h/2' },
        { action: 'line', x: 'w/2', y: '0' },
        { action: 'line', x: 'w', y: 'h/2' },
        { action: 'line', x: 'w/2', y: 'h' },
        { action: 'line', x: '0', y: 'h/2' },
        { action: 'close' },
      ],
    },
  ],
});
Schema.addShape({
  name: 'terminator',
  title: '开始',
  category: 'flow',
  props: { w: 100, h: 50 },
  textBlock: [{ position: { x: 'w*0.1', y: '0', w: 'w*0.75', h: 'h' },text:'开始' }],
  path: [
    {
      actions: [
        { action: 'move', x: 'Math.min(w,h)/3', y: '0' },
        { action: 'line', x: 'w-Math.min(w,h)/3', y: '0' },
        {
          action: 'curve',
          x1: 'w+Math.min(w,h)/3/3',
          y1: '0',
          x2: 'w+Math.min(w,h)/3/3',
          y2: 'h',
          x: 'w-Math.min(w,h)/3',
          y: 'h',
        },
        { action: 'line', x: 'Math.min(w,h)/3', y: 'h' },
        {
          action: 'curve',
          x1: '-Math.min(w,h)/3/3',
          y1: 'h',
          x2: '-Math.min(w,h)/3/3',
          y2: '0',
          x: 'Math.min(w,h)/3',
          y: '0',
        },
        { action: 'close' },
      ],
    },
  ],
});
Schema.addShape({
  name: 'terminator2',
  title: '结束',
  category: 'flow',
  props: { w: 100, h: 50 },
  textBlock: [{ position: { x: 'w*0.1', y: '0', w: 'w*0.75', h: 'h' },text:'结束' }],
  path: [
    {
      actions: [
        { action: 'move', x: 'Math.min(w,h)/3', y: '0' },
        { action: 'line', x: 'w-Math.min(w,h)/3', y: '0' },
        {
          action: 'curve',
          x1: 'w+Math.min(w,h)/3/3',
          y1: '0',
          x2: 'w+Math.min(w,h)/3/3',
          y2: 'h',
          x: 'w-Math.min(w,h)/3',
          y: 'h',
        },
        { action: 'line', x: 'Math.min(w,h)/3', y: 'h' },
        {
          action: 'curve',
          x1: '-Math.min(w,h)/3/3',
          y1: 'h',
          x2: '-Math.min(w,h)/3/3',
          y2: '0',
          x: 'Math.min(w,h)/3',
          y: '0',
        },
        { action: 'close' },
      ],
    },
  ],
});
Schema.addShape({
  name: 'document',
  title: '文档',
  category: 'flow',
  props: { w: 100, h: 70 },
  anchors: [
    { x: 'w*0.5', y: '0' },
    { x: 'w', y: 'h*0.5' },
    { x: 'w*0.5', y: 'h-Math.min(h/8,w/12)' },
    { x: '0', y: 'h*0.5' },
  ],
  textBlock: [{ position: { x: '0', y: '0', w: 'w', h: 'h*0.9' } }],
  path: [
    {
      actions: [
        { action: 'move', x: '0', y: 'h-Math.min(h/8,w/12)' },
        { action: 'line', x: '0', y: '0' },
        { action: 'line', x: 'w', y: '0' },
        { action: 'line', x: 'w', y: 'h-Math.min(h/8,w/12)' },
        { action: 'quadraticCurve', x1: 'w*0.75', y1: 'h-3*Math.min(h/8,w/12)', x: 'w*0.5', y: 'h-Math.min(h/8,w/12)' },
        { action: 'quadraticCurve', x1: 'w*0.25', y1: 'h+Math.min(h/8,w/12)', x: '0', y: 'h-Math.min(h/8,w/12)' },
        { action: 'close' },
      ],
    },
  ],
});







// Schema.addShape({
//   name: 'offPageReference',
//   title: '跨页引用',
//   category: 'flow',
//   props: { w: 70, h: 60 },
//   textBlock: [{ position: { x: '0', y: '0', w: 'w', h: 'h-Math.min(h,w)/3' } }],
//   path: [
//     {
//       actions: [
//         { action: 'move', x: '0', y: '0' },
//         { action: 'line', x: 'w', y: '0' },
//         { action: 'line', x: 'w', y: 'h-Math.min(h,w)/3' },
//         { action: 'line', x: 'w*0.5', y: 'h' },
//         { action: 'line', x: '0', y: 'h-Math.min(h,w)/3' },
//         { action: 'line', x: '0', y: '0' },
//         { action: 'close' },
//       ],
//     },
//   ],
// });
// Schema.addShape({
//   name: 'annotation',
//   title: '注释',
//   category: 'flow',
//   props: { w: 100, h: 70 },
//   anchors: [
//     { x: '0', y: 'h*0.5' },
//     { x: '0', y: 'h*0.5' },
//     { x: '0', y: 'h*0.5' },
//     { x: '0', y: 'h*0.5' },
//   ],
//   path: [
//     {
//       fillStyle: { type: 'none' },
//       actions: [
//         { action: 'move', x: 'Math.min(w/6, 20)', y: '0' },
//         { action: 'line', x: '0', y: '0' },
//         { action: 'line', x: '0', y: 'h' },
//         { action: 'line', x: 'Math.min(w/6, 20)', y: 'h' },
//       ],
//     },
//     {
//       fillStyle: { type: 'none' },
//       lineStyle: { lineWidth: 0 },
//       actions: [
//         { action: 'move', x: '0', y: '0' },
//         { action: 'line', x: 'w', y: '0' },
//         { action: 'line', x: 'w', y: 'h' },
//         { action: 'line', x: '0', y: 'h' },
//         { action: 'close' },
//       ],
//     },
//   ],
// });

Schema.addShape({
  name: 'process1',
  title: '流程',
  category: 'flow',
  props: { w: 100, h: 70 },
  path: [{ actions: { ref: 'rectangle' } }],
  lineStyle: {lineColor: "92,127,164"},
  fillStyle:{color:"183,214,246"},
  // fontStyle: { textAlign: 'center',color: "25,92,120" },
  // textBlock: [{ position: { x: 0, y: 0, w: 100, h: 70 },text:'文字' }],
});
Schema.addShape({
  name: 'process2',
  title: '流程',
  category: 'flow',
  props: { w: 100, h: 70 },
  path: [{ actions: { ref: 'rectangle' } }],
  lineStyle: {lineColor: "92,127,164"},
  fillStyle:{color:"255,197,196"},
});
Schema.addShape({
  name: 'process3',
  title: '流程',
  category: 'flow',
  props: { w: 100, h: 70 },
  path: [{ actions: { ref: 'rectangle' } }],
  lineStyle: {lineColor: "92,127,164"},
  fillStyle:{color:"255,249,196"},
});
Schema.addShape({
  name: 'process4',
  title: '流程',
  category: 'flow',
  props: { w: 100, h: 70 },
  path: [{ actions: { ref: 'rectangle' } }],
  lineStyle: {lineColor: "92,127,164"},
  fillStyle:{color:"204,234,202"},
});
Schema.addShape({
  name: 'process5',
  title: '流程',
  category: 'flow',
  props: { w: 100, h: 70 },
  path: [{ actions: { ref: 'rectangle' } }],
  lineStyle: {lineColor: "255,255,255"},
  fillStyle:{color:"102,137,173"},
});

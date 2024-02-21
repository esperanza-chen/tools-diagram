### 文件描述

home1CreateEdit.vue  流程页面新建和编辑
home2TaskQuery.vue   任务详情内的流程查看
home3FlowQuery.vue   流程列表上点击查看流程
home4CreateFlowTask.vue 创建有流程任务的查看页面

### 任务流程创建基本逻辑

1 没有拖放开始节点时 会补充一个隐藏的开始节点。

2 没有拖放开始节点时 如果拖放了判断节点会补充一个开始节点和一个普通节点。

3 开始节点不会占用整体流程节点的数量。

4 结束节点可能会有多个，如果没有以结束节点结束，需要补结束节点给后端。

5 判断节点必须要打条件，如果没有条件会提示。

6 双向泳道的添加和删除需要看一下。

### 流程工具和任务流程网页信息传递

iframe跨域数据传递

//传递数据到子页面

window.onload = function() {

document.getElementById('child').contentWindow.postMessage("主页面消息", "http://10.0.0.159:8080")

}

//接受子页面传递过来的数据

window.addEventListener('message', function(event) {

document.getElementById('message').innerHTML = "收到" + event.origin + "消息：" + event.data;

if (event.data.name == 'toShowItem') { // 选中图形

}

}, false);

### 撤回问题

目录 tools-diagram/public/scripts_bin/zh/diagraming/designer.core.js

window.MessageSource 函数控制所有撤回前进相关方法

### 画布相关增删改查

相关文件 tools-diagram/public/scripts_bin/zh/diagraming/designer.core.js

window.Model 函数控制所有画布相关的增删改查

### 新建图形之双向泳道

相关文件 tools-diagram/public/scripts_bin/zh/diagraming/schema/categories/lane.js

在相关文件内使用以下方法新增可拖动的双向泳道

```

Schema.addShape({

    name // 名称

    title // 中文名称

    drawIcon // 创建可拖动的按钮

    onCreated // 拖动到画布后使用这个方法新建图形

})

```

### 接触到的任务流程 api

##### 创建新图形时生成id

```
var d = Utils.newId();
```

##### 数据深拷贝

```
var d = Utils.copy(e);
```


##### 撤回

```
// 更新动作
{
    action: "update",
    content: {
    shapes: [],
    updates: []
    }
}

// 创建图形动作
{
    action: "create",
    content: [dataJSON.elements['wjcdesxydd' + num], dataJSON.elements]
}

MessageSource.undo();
```

#####  获取画布上所有绘制图形的 JSON

```
const dataJSON = Utils.copy(Model.define);
```


#####  重新建立一个新的画布

```
let c = {
    page: dataJSON.page,
    elements: dataJSON.elements,
    version: 0,
};
```

新的图形 ele = [json] (这个需要手动拖放图形成初始图形，并获取初始图形json)

#####  插入新图形到新建的画布

```
for (var i = 0; i < ele.length; i++) {
  c.elements[ele[i].id] = ele[i];
}
```

#####  重绘画布

```
    Designer.open(c);
    Designer.initialize.canvasSizeAuto();
```

#####  干掉拖放之后的虚线

```
  document.getElementById("shape_text_edit").setAttribute('style', 'display:none');
  document.getElementById(this.id).setAttribute('style', 'display:none');
```

##### 选中图形json

```
Utils.getSelected()

function getSelected() {
    var a = [];
    for (var b = 0; b < this.selectIds.length; b++) {
        var d = this.selectIds[b];
        if (!Utils.isLocked(d)) {
        var c = Model.getShapeById(d); // 通过id获取图形
        a.push(c);
        }
    }
    return a;
}
```

##### 删除父节点内的子节点id和子节点

```
var l = Model.getShapeById(j.parent);
if (l) {
    Utils.removeFromArray(l.children, j.id);
    if (n.indexOf(j.parent) < 0) {
        n.push(j.parent);
        e.push(l);
    }
}
```

### 所有可拖放图形

console.log(Schema.shapes)

### 图形

Designer.op.removeShape(); // 删除选中图形
Designer.selectAll() // 选中所有图形

选中所有图形函数 tools-diagram\public\scripts_bin\zh\diagraming\designer.methods.js
var a = Model.define.elements;
var b = [];
for (var c in a) {
    b.push(c);
}
Utils.selectShape(b);

Designer.unlockShapes() // 解锁所有图形
Designer.lockShapes() // 锁定所有图形
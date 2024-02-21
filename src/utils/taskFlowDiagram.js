// 节点置灰
// 置灰 makeLine(event.data.childTaskDtos)
const makeNodeGray = (childTaskDtos) => {
    if (childTaskDtos) {
        setTimeout(() => {
            let mark = false;
            const dataJSON = Utils.copy(Model.define);
            childTaskDtos.forEach((item) => {
                if (dataJSON.elements[item.processTaskId] && item.taskState === '3') {
                    dataJSON.elements[item.processTaskId].fillStyle.color = '190,196,204';
                    dataJSON.elements[item.processTaskId].lineStyle.lineColor = '161,167,179';
                    mark = true;
                }
            });

            if (mark) {
                Designer.open(dataJSON);
                Designer.initialize.initCanvas();
            } else {
                makeNodeGray();
            }
        }, 1000);
    }
}

export default {
    makeNodeGray
}
class Store {
    editNodes = [];
    userTree = [];
    userTreeLeaf = [];
    constructor() {
        setInterval(() => {
            console.log(this.editNodes)
        }, 5000)
    }
    getEditNode(processTaskId) {
        const isSame = this.editNodes.findIndex((item) => item.processTaskId === processTaskId);
        return this.editNodes[isSame];
    }

    // 通过ids获取人员信息
    getPersonByIds(ids) {
        return this.userTree.filter((item) => {
            return ids.includes(item.id);
        });
    }
    setCacheByEdit(processTaskId, currentItem) {
        const executePerson = currentItem.executePerson ? this.changeValue(currentItem.executePerson) : []
        const helpPerson = currentItem.helpPerson ? this.changeValue(currentItem.helpPerson) : []
        const permissionItem = currentItem.permissionItem ? this.changeValue(currentItem.permissionItem) : []
        const personInfo = this.getPersonByIds([...executePerson, ...helpPerson, ...permissionItem]);

        const isSame = this.editNodes.findIndex((item) => item.processTaskId === processTaskId);

        console.log([...executePerson, ...helpPerson, ...permissionItem])

        if (isSame !== -1) {
            this.editNodes[isSame] = currentItem

            console.log(this.editNodes[isSame], 'jjjjjjjjjjj')
        }
        if (isSame === -1) {
            this.editNodes.push(currentItem)
        }

        return {
            personInfo: personInfo.slice(0, 5) || [],
            otherInfo: personInfo.length > 5 ? personInfo.slice(5) : [],
            timeValue: [currentItem.startTime, currentItem.endTime]
        }
    }
    /**
     * 设置新增编辑数据缓存
     * @param {*} processTaskId 流程id
     * @param {*} timeVal 传入需要替换掉的时间
     * @param {*} currentItem 传入需要替换掉的时间
     * @param {*} edit 传入需要替换掉的时间
     * @returns 
     */
    setCacheByNewAdd(processTaskId, timeVal, currentItem) {
        const isSame = this.editNodes.findIndex((item) => item.processTaskId === processTaskId);
        let result = {
            personInfo: [],
            otherInfo: [],
            timeValue: []
        }

        if (isSame !== -1) { // 存在缓存
            // 新建的时候有缓存的值使用缓存的值,没有就新增
            const Item = this.editNodes[isSame];
            result = this.hasCache(isSame, timeVal, Item);
        } else { // 不存在缓存
            result = this.hasNotCache(currentItem);
        }

        return result
    }

    // 新增数据存在缓存
    hasCache(isSame, timeVal, currentItem) {
        const executePerson = currentItem.executePerson ? this.changeValue(currentItem.executePerson) : []
        const helpPerson = currentItem.helpPerson ? this.changeValue(currentItem.helpPerson) : []
        const permissionItem = currentItem.permissionItem ? this.changeValue(currentItem.permissionItem) : []
        const personInfo = this.getPersonByIds([...executePerson, ...helpPerson, ...permissionItem]);

        if (!timeVal) {
            this.editNodes[isSame].startTime = currentItem.startTime;
            this.editNodes[isSame].endTime = currentItem.endTime;
            this.timeValue = [currentItem.startTime, currentItem.endTime];
        } else {
            this.editNodes[isSame].startTime = timeVal[0];
            this.editNodes[isSame].endTime = timeVal[1];
            this.timeValue = timeVal;
        }
        return {
            personInfo: personInfo.slice(0, 5) || [],
            otherInfo: personInfo.length > 5 ? personInfo.slice(5) : [],
            timeValue: [this.editNodes[isSame].startTime, this.editNodes[isSame].endTime]
        }
    }
    // 新增数据没有缓存时
    hasNotCache(processInfo) {
        const timeValue = [processInfo.startTime, processInfo.endTime];
        this.editNodes = [
            ...this.editNodes,
            {
                processTaskId: processInfo.processTaskId,
                startTime: processInfo.startTime,
                endTime: processInfo.endTime,
                ext: processInfo,
                executePerson: [],
                helpPerson: [],
                permissionItem: [],
            },
        ];
        return {
            personInfo: [],
            otherInfo: [],
            timeValue: timeValue
        }
    }
    // 判断是 ['id'] 或 [{id:'id'}] 全部转换为 ['id']
    changeValue(arr) {
        if (arr && typeof arr[0] === 'object') {
            return arr.map((item) => item.userId || item.id);
        } else if (arr && typeof arr[0] === 'string') {
            return arr;
        }
        return []
    }
}

export default new Store();
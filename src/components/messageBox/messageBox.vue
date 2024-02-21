<template>
    <el-dialog 
    class="messageBoxDialig"
    ref="messageBoxDialig"
    :title="title"
    :visible.sync="switchShow"
    :width="width"
    :append-to-body="true"
    :before-close="cancel"
    :close-on-click-modal="false"
    >
        <div class="box-main">
            <div class="message-box-main">
                <slot name='message-main'></slot>
            </div>
            <div slot="footer" class="message-box-button">
                <el-button class="btnCancel" @click="cancel">取 消</el-button>
                <el-button class="btnSure" type="primary" @click="sure">确 定</el-button>
            </div>
        </div>
    </el-dialog>
    
</template>

<script>
export default {
    name:"",
    props:{
        switchShow:{
            type:Boolean,
            default:false,
        },
        width:{
            type:[Number,String],
            default:"30%",
        },
        height:{
            type:[Number,String],
            default:"30%",
        },
        title:{
            type:String,
            default:"提示语",
        },
    },
    data(){
        return {}
    },
    created(){
        
    },
    mounted(){
        this.setHeight()
    },
    methods:{
        cancel(){
            this.$emit('cancel')
        },
        sure(){
            this.$emit('sure')
        },
        setHeight(){
            this.$refs.messageBoxDialig.$el.firstChild.style.height = this.height
        }
    },
}
</script>

<style scoped>
.messageBoxDialig >>>.el-dialog{
    border-radius: 12px;
    box-shadow: 0px 4px 10px 0px rgba(0,52,130,0.24);
}
/* 弹窗 */
.message-box-main{
  width: 100%;
  height: calc(100% - 70px);
  flex:4
}

.message-box-button{
  width: 100%;
  display: flex;
  justify-content: center;
}
.messageBoxDialig >>> .el-dialog__header{
    background-color: rgba(183,208,245,0.2);
    border-bottom: 1px solid #B7D0F5;
    border-radius: 12px 12px 0 0;
}
.messageBoxDialig >>> .el-dialog__body{
    width: 100%;
    height: calc(100% - 56px);
    padding: 0;
}
.box-main{
    width: 100%;
    height: 100%;
    position: relative;
    font-size: 16px;
}
.message-box-button{
    position:absolute;
    left: 50%;
    bottom: 30px;
    transform:translateX(-50%);
}
.btnCancel{
    width: 100px;
    height: 40px;
    background-color: #fff;
    border: 1px solid #1E5DB4;
    border-radius: 6px;
    margin-right: 20px;
}
.btnSure{
    width: 100px;
    height: 40px;
    background-color: #1E5DB4;
    border-radius: 6px;
}
</style>
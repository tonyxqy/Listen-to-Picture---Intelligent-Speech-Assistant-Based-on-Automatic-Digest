// 引用猫鼬模块
const number = require('joi/lib/types/number');
const mongoose = require('mongoose');
// 创建数据模板
const textSchema = new mongoose.Schema({
    title:{
        type:String,
        require:[true,'请填写演讲内容主题'],
        minlength:2,
        maxlength:20
    },
    author: {
        type:String,
    },
    presenter: {
        type:String,
    },
    startTime: {
		type: Date,
		default: Date.now
	},
	endTime: {
		type: Date,
		default: Date.now
	},
    cover:{
        type:String,
        default:null
    },
    content:{
        type:String
    },
    TaskId:{
        type:Number
    }
});
// 根据模板创建实例
const AudioText = mongoose.model('audioText',textSchema);
// 模块导出
module.exports = {
   AudioText:AudioText
}
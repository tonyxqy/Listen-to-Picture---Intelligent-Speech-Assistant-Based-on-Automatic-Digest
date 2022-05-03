const path = require('path');
const tencentcloud = require("tencentcloud-sdk-nodejs")
const fs = require('fs');
const formidable = require('formidable');
const { AudioText } = require('../../model/audioText');
const AsrClient = tencentcloud.asr.v20190614.Client;

const clientConfig = {
  credential: {
    secretKey: 'colTu5ze9RJw3sVKwLuFJcgWMvHbggQs',
    secretId: 'AKID1rTGvKGOXR4S4UbfR0JK5aqpa6qNCNJ2',
  },
  region: "",
  profile: {
    httpProfile: {
      endpoint: "asr.tencentcloudapi.com",
    },
  },
};
module.exports = (req,res)=>{
    const form = new formidable.IncomingForm();
	// 2.配置上传文件的存放位置
	form.uploadDir = path.join(__dirname, '../', '../','public', 'upload');
	// 3.保留上传文件的后缀
	form.keepExtensions = true;
	// 4.解析表单
	form.parse(req, async(err, fields, files) => {
		var textid;
		let Dir = path.join(__dirname, '../','../','public', files.cover.path.split('public')[1]);
		var data = fs.readFileSync(Dir);
		console.log(data.toString());
		const client = new AsrClient(clientConfig);
		const params = {
			"EngineModelType": "8k_zh",
			"ChannelNum": 2,
			"ResTextFormat": 2,
			"SourceType": 1,
			"Data": data.toString('base64')
		};
		client.CreateRecTask(params).then(
		(data) => {
			console.log(data);
			textid = data.Data.TaskId;
			AudioText.create({
				title:fields.title,
				author:fields.author,
				presenter:fields.presenter,
				startTime:fields.startTime,
				endTime:fields.endTime,
				cover:files.cover.path.split('public')[1],
				content:fields.content,
				TaskId:textid
			});
			client.DescribeTaskStatus(data.Data).then(
				(data) => {
				console.log(data);
				},
				(err) => {
				console.error("error", err);
				}
			);
		},
		(err) => {
			console.error("error", err);
		}
		);
		
		res.redirect('/admin/Text');
	})
}
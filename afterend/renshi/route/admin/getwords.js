const path = require('path');
const tencentcloud = require("tencentcloud-sdk-nodejs")
const fs = require('fs');
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
    let Dir = path.join(
        __dirname,
        "../",
        "../",
        "public",
        "article",
        req.body.id + ".mp3"
      );
      let Dir2 = path.join(
        __dirname,
        "../",
        "../",
        "public",
        "article",
        req.body.id + ".wav"
      );
      try { var data = fs.readFileSync(Dir);} catch (e) { var data = fs.readFileSync(Dir2);}
      // var data = fs.readFileSync(Dir);
      const client = new AsrClient(clientConfig);
      const params = {
          "EngineModelType": "8k_zh",
          "ChannelNum": 1,
          "ResTextFormat": 2,
          "SourceType": 1,
          "Data": data.toString('base64')
      };
      client.CreateRecTask(params).then(
		(data) => {
			textid = data.Data.TaskId;
            res.send(data.Data)
            console.log(data.Data);
			client.DescribeTaskStatus(data.Data).then(
				(data) => {
				console.log(data);
                // res.send(textid)
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
}
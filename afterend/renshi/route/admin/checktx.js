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
      const client = new AsrClient(clientConfig);
      const params = req.body
      const id = req.query.id;
      let Dir = path.join(
        __dirname,
        "../",
        "../",
        "public",
        "article",
        req.query.id + ".txt"
      );
      client.DescribeTaskStatus(params).then(
        (data) => {
        console.log(data);
        if(data.Data.Status===0)
            res.send(true)
        else {
            var str = data.Data.Result 
            var txt = str.replace(/\[\.+\]/,"");
            fs.writeFile(Dir, txt, function(error) {
                // 数据写入失败时的回调函数
                if(error) {
                    console.log('文件写入数据失败...');
                    return;
                }
                res.send(false)
                console.log('文件写入数据成功...')
              })
            }
        },
        (err) => {
        console.error("error", err);
        }
    );
}
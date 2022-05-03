const path = require("path");
const fs = require("fs");

module.exports = (req, res) => {
  let Dir = path.join(
    __dirname,
    "../",
    "../",
    "public",
    "article",
    req.body.id + ".txt"
  );
  var exec = require("child_process").exec;
  // var content1 = path.join(__dirname, Dir);
  exec(
    `python ./TextGrapher-master/text_grapher.py ${Dir}`,
    function (error, stdout, stderr) {
      if (stdout.length > 1) {
        console.log(stdout);
        let place = path.join(
            __dirname,
            "../",
            "../",
            "orgpic",
            stdout.substring(9)
          );
          // console.log(place);
        // res.writeHead(200, { "Content-Type": "text/html" });
        res.render(place.trim())
        // fs.readFile(place.trim(), function (err, data) {
        //   if (err) {
        //     throw err;
        //   }
        //   res.end(data);
        // });
      } else {
        console.log("you don't offer args");
      }
      if (error) {
        console.info("stderr : " + stderr);
      }
    }
  );
};

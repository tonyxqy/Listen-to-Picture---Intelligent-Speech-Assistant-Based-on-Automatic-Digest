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
    `python ./Textling/duplicate.py ${Dir}`,
    function (error, stdout, stderr) {
      if (stdout.length > 1) {
        console.log(stdout);
      } else {
        console.log("you don't offer args");
      }
      if (error) {
        console.info("stderr : " + stderr);
      }
    }
  );
};

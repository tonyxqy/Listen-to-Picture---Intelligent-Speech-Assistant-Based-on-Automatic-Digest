const path = require("path");
const fs = require("fs");

module.exports = (req, res) => {
  console.log(req.body.id);
  let Dir = path.join(
    __dirname,
    "../",
    "../",
    "public",
    "article",
    req.body.id + ".txt"
  );

  fs.readFile(Dir, "utf-8", (err, data) => {
    if (err) throw err;
    // console.log(data);
  res.send(data)
  });
};

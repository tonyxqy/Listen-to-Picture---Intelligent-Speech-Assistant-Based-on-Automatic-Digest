const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
module.exports = (req,res)=>{
    const form = new formidable.IncomingForm();
	// 2.配置上传文件的存放位置
	form.uploadDir = path.join(__dirname, '../', '../','public', 'article');
	// 3.保留上传文件的后缀
	form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err) return next(err)
        let username = fields.name //用户名 用于修改用户头像路径
        let oldPath = files.file.path //获取文件路径 ~/public/images/<随机生成的文件名>.<扩展名>
        let imgname = files.file.name //前台上传时的文件名 也就是文件原本的名字
        let userImgname = imgname.replace(/[^.]+/, username) //把扩展名前的文件名给替换掉
        let newPath = path.join(path.dirname(oldPath), userImgname) 
        // console.log(fields) //Object 表单数据
        // console.log(files) //上传文件用files.<name>访问
        res.json({ code: 1, message: 'upload success' })
        fs.rename(oldPath, newPath, (err) => {
            if(err) return next(err)
            })
      })
}
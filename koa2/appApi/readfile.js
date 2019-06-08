const mongoose = require("mongoose")
const Router = require('koa-router');
const multer = require('koa-multer');
const path = require('path');
const fs = require('fs'); // 引入fs模块

let router = new Router();

let storage = multer.diskStorage({
    destination: path.resolve('upload'),
    filename: (ctx, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname)
    }
});

let upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), async ctx => {
    console.log(ctx)
    if (ctx.req.file) {
        ctx.body = {
            code: 200,
            data: {
                image:'http://' + ctx.request.host +"/"+ ctx.req.file.filename,
                file:ctx.req.file,
            }
        };
    } else {
        ctx.body = {
            code: 0,
            massage: '上传失败',
        }
    }
});


router.get('/readfile', async (ctx, next) => {
    fs.readFile('./goods.json', 'utf-8', (err, data) => {
        if (!err) {
            const i = 0
            const Goods = mongoose.model('Good')
            const newData = JSON.parse(data).data
            newData.map((value, index) => {
                let newGoods = new Goods(value)

                newGoods.save().then((res) => {
                    console.log("数据导入成功！")
                    i++
                    if (newData.length == i) {
                        ctx.body = {
                            code: 200,
                            massage: '数据导入成功！'
                        }
                    }
                }, (err) => {
                    console.log("数据导入失败！****************************************************************")
                    ctx.body = {
                        code: 500,
                        massage: '数据导入失败！'
                    }
                })
            })

        } else {
            ctx.body = {
                code: 500,
                massage: '数据导入失败！'
            }
        }
    });

});

module.exports = router
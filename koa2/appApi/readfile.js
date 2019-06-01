const mongoose = require("mongoose")
const Router = require('koa-router');
const multer = require('koa-multer');
const path = require('path');

let router = new Router();
const fs = require('fs'); // 引入fs模块
let storage = multer.diskStorage({
    destination: path.resolve('upload'),
    filename: (ctx, file, cb) => {
        cb(null, file.originalname);
    }
});

let upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), async ctx => {
    console.log(ctx)
    if (ctx.req.file) {
        ctx.body = 'upload success';
    } else {
        ctx.body = 'upload error';
    }
});


router.get('/readfile', async (ctx, next) => {
    console.log("xxx")
    fs.readFile('./goods.json', 'utf-8', (err, data) => {
        if (!err) {
            const i = 0
            const Goods = mongoose.model('Good')
            const newData = JSON.parse(data).data
            newData.map((value, index) => {
                let newGoods = new Goods(value)

                newGoods.save().then((res) => {
                    console.log("数据导入成功！")

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
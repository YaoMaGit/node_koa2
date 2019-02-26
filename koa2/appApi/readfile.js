const mongoose = require("mongoose")
const Router = require('koa-router');

let router = new Router();
const fs = require('fs'); // 引入fs模块

router.post('/readfile', (ctx, next) => {
    fs.readFile('./goods.json', 'utf-8',(err, data) =>{
        if (!err) {
            const i = 0
            const Goods = mongoose.model('Good')
            const newData = JSON.parse(data).data
            newData.map((value, index) => {
                let newGoods = new Goods(value)

                 newGoods.save().then((res) => {
                    console.log("数据导入成功！")
                    
                    if(newData.length==i){
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
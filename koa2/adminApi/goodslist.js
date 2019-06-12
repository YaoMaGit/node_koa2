const mongoose = require("mongoose")
const Router = require('koa-router');

let router = new Router();

router.get('/goodslist', async(ctx, next) => {
    let page = ctx.query.page
    const Good = mongoose.model('Good')
    await Good.find().skip((page==1?page=0:page)*10).limit(10).exec().then(async (result) => {
        console.log(result)
        ctx.body = {
            code: 200,
            data: result
        }
    }).catch((error) => {
        console.log(error)
        ctx.body = {
            code: 500,
            massage: error
        }
    })

});
 
router.post('/addgoods',async(ctx, next)=>{
    const Good = mongoose.model('Good')
    console.log(ctx)

    let Goods = new Good(ctx.request.query)

    await Goods.save().then((result) => {
        console.log('提交成功')
        ctx.body = {
            code: 200,
            data: '提交成功'
        }
    }).catch((error) => {
        console.log(error)
        ctx.body = {
            code: 500,
            massage: error
        }
    })
})
module.exports = router
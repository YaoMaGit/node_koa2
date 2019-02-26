const mongoose = require("mongoose")
const Router = require('koa-router');

let router = new Router();

router.get('/goodslist', (ctx, next) => {

    let page = ctx.request.body.params.page
    const Good = mongoose.model('Good')
    await User.findOne({ page: page }).exec().then(async (result) => {
        console.log(result)
        if (result) {
            let newUser = new Good()
            await newUser.comparePassword(password,result.password)
            .then((isMatch)=>{
                ctx.body = {
                    code: 200,
                    massage: isMatch
                }
            }).catch((error)=>{
                ctx.body = {
                    code: 200,
                    massage: error
                }
            })
        } else {
            ctx.body = {
                code: 200,
                massage: '用户不存在！'
            }
        }
    }).catch((error) => {
        console.log(error)
        ctx.body = {
            code: 500,
            massage: error
        }
    })

});

module.exports = router
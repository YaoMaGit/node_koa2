const Router = require('koa-router');
const mongoose = require("mongoose");

let router = new Router();


router.get('/send', async (ctx, next) => {
    let telephone = ctx.request.body.params.telephone
    
    ctx.body = {
        code: 200,
        data: {
            sms:Math.random()*900000|0+100000,
        }
    }
});

module.exports = router
const Router = require('koa-router');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

let router = new Router();


router.get('/', async (ctx, next) => {
    ctx.body = "user路由";
})

router.post('/login', async (ctx, next) => {
    let username = ctx.request.body.username
    let password = ctx.request.body.password
    const User = mongoose.model('User')
    await User.findOne({ username: username }).exec().then(async (result) => {
        console.log(result)
        if (result) {
            let newUser = new User()
            await newUser.comparePassword(password, result.password)
                .then(async (isMatch) => {

                    // let secretOrPrivateKey="suiyi" // 这是加密的key（密钥） 
                    // let token = jwt.sign(ctx.request.body, secretOrPrivateKey, {
                    //     // expiresIn: 60*60*1  // 1小时过期
                    // });
                    // ctx.request.body.token=Date.now()
                    // let oneUser = new User(ctx.request.body)
                    // await oneUser.save().then((res) => {
                    //     console.log("插入成功！！")
                    ctx.body = {
                        code: 200,
                        massage: '登录成功！',
                        success: isMatch,
                        data: isMatch,
                    }
                    // }, (err) => {
                    //     console.log("插入失败！！")
                    //     console.log(err)
                    //     ctx.body = {
                    //         code: 500,
                    //         massage: '登录失败！',
                    //         data:err
                    //     }
                    // })


                }).catch((error) => {
                    console.log('错误' + error)
                    ctx.body = {
                        code: 500,
                        massage: error
                    }
                })
        } else {
            ctx.body = {
                code: 500,
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


router.post('/register', async (ctx, next) => {
    const User = mongoose.model('User')
    let oneUser = new User(ctx.request.body)
    await oneUser.save().then((res) => {
        ctx.body = {
            code: 200,
            massage: '注册成功！',
            data: res,
        }
    }, (err) => {
        console.log("插入失败！！")
        console.log(err)
        ctx.body = {
            code: 500,
            massage: '注册失败！',
            data: err
        }
    })

});
module.exports = router
const Router = require('koa-router');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JwtUtil = require('../common/jwt');

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


                    if (isMatch) {
                        // 登陆成功，添加token验证
                        let _id = result._id.toString();
                        console.log(_id)
                        // 将用户id传入并生成token
                        let jwt = new JwtUtil(_id);
                        let token = jwt.generateToken();
                        // 将 token 返回给客户端
                        ctx.body = {
                            code: 200,
                            massage: '登录成功！',
                            success: isMatch,
                            data: {
                                token: token,
                                result:result,
                            },
                        }
                    } else {
                        ctx.body = {
                            code: 200,
                            massage: '用户名密码错误！',
                            success: isMatch,
                            data: isMatch,
                        }
                    }



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
const Router = require('koa-router');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

let router = new Router();


router.get('/', function (ctx, next) {
    ctx.body = "user路由";
})

router.post('/login', async (ctx, next) => {
    let telephone = ctx.request.body.telephone
    let password = ctx.request.body.password
    const User = mongoose.model('User')
    await User.findOne({ telephone: telephone }).exec().then(async (result) => {
        console.log(result)
        if (result) {
            
            let newUser = new User()
            await newUser.comparePassword(password,result.password)
            .then(async (isMatch)=>{
                
                let secretOrPrivateKey="suiyi" // 这是加密的key（密钥） 
                let token = jwt.sign(ctx.request.body, secretOrPrivateKey, {
                    // expiresIn: 60*60*1  // 1小时过期
                });
                ctx.request.body.token=Date.now()
                let oneUser = new User(ctx.request.body)
                await oneUser.save().then((res) => {
                    console.log("插入成功！！")
                    ctx.body = {
                        code: 200,
                        data:{
                            token:token,
                            massage: isMatch,
                        }
                        
                    }
                }, (err) => {
                    console.log("插入失败！！")
                    console.log(err)
                    ctx.body = {
                        code: 500,
                        massage: '登录失败！'
                    }
                })


            }).catch((error)=>{
                console.log('错误'+error)
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
    console.log(ctx.request)
    let oneUser = new User(ctx.request.body)
    await oneUser.save().then((res) => {
        console.log("插入成功！！")
        ctx.body = {
            code: 200,
            massage: '注册成功！'
        }
    }, (err) => {
        console.log("插入失败！！")
        console.log(err)
        ctx.body = {
            code: 500,
            massage: '注册失败！'
        }
    })

});
module.exports = router
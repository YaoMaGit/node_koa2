const Koa = require('koa');
const app = new Koa();
const { connect, initSchemas } = require('./database/init.js');
const mongoose = require("mongoose");
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const Router = require("koa-router");
let user = require('./adminApi/user.js');
let home = require('./adminApi/home.js');
let sms = require('./adminApi/sms.js')
let readfile = require('./adminApi/readfile.js');
let goodslist = require('./adminApi/goodslist.js');
let articleList = require('./adminApi/articleList.js');
let JwtUtil = require('./common/jwt.js');

const path = require('path')
const static = require('koa-static');
app.use(static(
    path.join(__dirname, './upload')
));

(async () => {
    await connect()
    initSchemas()
})()


//装载路由
let router = new Router();
router.use('/user', user.routes())
router.use('/home', home.routes())
router.use('/sms', sms.routes())
router.use('/read', readfile.routes())
router.use('/goods', goodslist.routes())
router.use('/article', articleList.routes())


//定义允许直接访问的url
const allowUrl = ['/user/login', '/user/register']
app.use(cors())
//拦截
app.use(async (ctx,next) => {
    if (allowUrl.indexOf(ctx.originalUrl) > -1) {
        await next()
    } else {
        let token = ctx.header.authorization;
        let jwt = new JwtUtil(token);
        let result = jwt.verifyToken();
        console.log('登陆拦截>>'+result)
        if (result == 'err') {
            return ctx.body = {
                code: 403,
                massage: '登录已过期,请重新登录',
                success: result,
            }
        } else {
             await next()
        }
        
    }
})

app.use(bodyParser({
    formLimit: '10mb'
}))

app.use(router.routes())
app.use(router.allowedMethods());
app.listen(3000, () => {
    console.log('starting at port 3000');
});
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

app.use(bodyParser({
    formLimit: '10mb'
}))
app.use(cors())
app.use(router.routes())
app.use(router.allowedMethods());
app.listen(3000, () => {
    console.log('starting at port 3000');
});
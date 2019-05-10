const Koa = require('koa');
const app = new Koa();
const { connect, initSchemas } = require('./database/init.js');
const mongoose = require("mongoose");
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const Router = require("koa-router");
let user = require('./appApi/user.js');
let home = require('./appApi/home.js');
let sms= require('./appApi/sms.js')
let readfile = require('./appApi/readfile.js');
let goodslist = require('./appApi/goodslist.js');

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
router.use('/goods',goodslist.routes())


app.use(bodyParser())
app.use(cors())
app.use(router.routes())
app.use(router.allowedMethods());
app.listen(3000, () => {
    console.log('starting at port 3000');
});
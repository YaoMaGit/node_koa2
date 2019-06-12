const Router = require('koa-router');

const router = new Router();


router.get('/', async (ctx, next)=> {
    ctx.body = "我是首页";
})
router.get('/register', async(ctx, next) => {
        ctx.body = "注册用户"
    });
module.exports=router
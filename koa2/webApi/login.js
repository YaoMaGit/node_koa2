const Router = require('koa-router');

const router = new Router();


router.post('/login', async (ctx, next)=> {
    ctx.body = "登陆";
})
router.get('/register', async(ctx, next) => {
        ctx.body = "注册用户"
    });
module.exports=router
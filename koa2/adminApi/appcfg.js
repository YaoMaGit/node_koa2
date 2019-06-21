const mongoose = require("mongoose")
const Router = require('koa-router');

let router = new Router();
//全部 文章总量 浏览量  用户量 留言量 分类文章量  
router.get('/appcfg', async (cxt) => {
    try {
        const Article = mongoose.model('Article')

        let res1 = await Article.find().count()
        const User = mongoose.model('User')

        let res2 = await User.find().count()
        if (res1 && res2) {
            cxt.body = {
                code: 200,
                data: {
                    articleCount: res1,
                    userCount: res2,
                }
            }
        } else {
            cxt.body = {
                code: 500,
                massage: 'error',
                data: 'err'
            }
        }
    } catch (err) {
        cxt.body = {
            code: 500,
            massage: 'error',
            data: err
        }
    }
})

module.exports = router
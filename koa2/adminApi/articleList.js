const mongoose = require("mongoose")
const Router = require('koa-router');


let router = new Router();

router.get('/artcleList', async (ctx, next) => {
    let page = ctx.query.page
    const Articles = mongoose.model('Article')
    await Articles.find().skip((page == 1 ? page = 0 : page) * 10).limit(10).exec().then(async (result) => {
        console.log(result)
        ctx.body = {
            code: 200,
            massage: '查询成功',
            data: result
        }
    }).catch((error) => {
        console.log(error)
        ctx.body = {
            code: 500,
            massage: error
        }
    })

});

router.post('/addArticleList', async (ctx, next) => {
    const Article = mongoose.model('Article')
    await Article.find().sort({ articleId: -1 }).skip(0).limit(1).then(async (res) => {
        let articleId = res[0].articleId + 1
        let props = {
            status: ctx.request.body.status,
            createAt: new Date().getTime(),
            // updateAt: new Date().getTime(),
            articleId: articleId,
            title: ctx.request.body.title,
            author: ctx.request.body.author,
            type: ctx.request.body.type,
            image: ctx.request.body.image,
            top: ctx.request.body.top,
            desc: ctx.request.body.desc,
            content: ctx.request.body.content
        }

        let Articles = new Article(props)

        await Articles.save().then((result) => {
            ctx.body = {
                code: 200,
                massage: '提交成功',
                data: result
            }
        }).catch((error) => {
            ctx.body = {
                code: 500,
                massage: '提交失败',
                data: error,
            }
        })
    })

})
router.get('/ArticleTypeList', async (ctx, next) => {
    let page = ctx.query.page
    console.log(ctx.query.page)
    const ArticleTypes = mongoose.model('ArticleType')
    await ArticleTypes.find().skip((page == 1 ? page = 0 : page) * 5).limit(10).exec().then(async (result) => {
        console.log(result)
        ctx.body = {
            code: 200,
            massage: '查询成功',
            data: result
        }
    }).catch((error) => {
        console.log(error)
        ctx.body = {
            code: 500,
            massage: error
        }
    })

});
router.post('/addArticleType', async (ctx, next) => {
    const ArticleTypes = mongoose.model('ArticleType')
    await ArticleTypes.find().sort({ type: -1 }).skip(0).limit(1).then(async (res) => {
        console.log(ctx.request.body.title)

        let type = res[0].type + 1
        let props = {
            type: type,
            title: ctx.request.body.title,
            image: ctx.request.body.image,
            status: ctx.request.body.status,
            top: ctx.request.body.top,
            createAt: new Date().getTime(),
        }

        let ArticleType = new ArticleTypes(props)

        await ArticleType.save().then((result) => {
            ctx.body = {
                code: 200,
                massage: '提交成功',
                data: result
            }
        }).catch((error) => {
            ctx.body = {
                code: 500,
                massage: '提交失败',
                data: error,
            }
        })
    })

})

router.post('/updateArticleType', async (ctx, next) => {
    const ArticleTypes = mongoose.model('ArticleType')
    await ArticleTypes.update(
        { type: ctx.request.body.type },
        {
            $set: {
                title: ctx.request.body.title,
                image: ctx.request.body.image,
                status: ctx.request.body.status,
                top: ctx.request.body.top,
                updateAt: new Date().getTime()
            }
        }
    ).then((result) => {
        if(result.ok&&result.n){
            ctx.body = {
                code: 200,
                massage: '修改成功',
                data: '修改'+result.n+'条'
            }
        }else{
            ctx.body = {
                code: 500,
                massage: '修改失败',
                data: '修改'+result.n+'条'
            }
        }

    }).catch((error) => {
        ctx.body = {
            code: 500,
            massage: '提交失败',
            data: error,
        }
    })

})


router.get('/delArticleType', async (ctx, next) => {
    let type = ctx.query.type
    console.log(ctx.query)
    const ArticleTypes = mongoose.model('ArticleType')
    await ArticleTypes.remove({ type: type }).then(async (result) => {
        console.log(result)
        ctx.body = {
            code: 200,
            massage: '查询成功',
            data: result
        }
    }).catch((error) => {
        console.log(error)
        ctx.body = {
            code: 500,
            massage: error
        }
    })

});


module.exports = router
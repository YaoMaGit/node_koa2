const mongoose = require("mongoose")
const Router = require('koa-router');


let router = new Router();

router.get('/artcleList', async (ctx, next) => {
    let page = Number(ctx.query.page)
    let pageSize = Number(ctx.query.pageSize)
    let title = ctx.query.title
    let type = ctx.query.type == 0 ? { "$ne": null } : ctx.query.type

    const Articles = mongoose.model('Article')
    await Articles.find({ $and: [{ title: { $regex: title } }, { type: type }] }).skip((page - 1) * pageSize).limit(pageSize).exec().then(async (result) => {
        await Articles.find().count().then((total) => {
            ctx.body = {
                code: 200,
                massage: '查询成功',
                data: result,
                totalPage: {
                    total: total,//总数
                    pageNum: Math.ceil(total / pageSize),//总页数
                    page: page,//第几页
                    nextPage: page - 1,
                    lastPage: Math.ceil(total / pageSize),
                    pageSize: pageSize,//每页数量
                }
            }
        })
    }).catch((error) => {
        console.log(error)
        ctx.body = {
            code: 500,
            massage: error
        }
    })

});

router.post('/addArticleList', async (ctx, next) => {
    try {
        const Article = mongoose.model('Article')
        const ArticleTypes = mongoose.model('ArticleType')

        let res = await Article.find().sort({ articleId: -1 }).skip(0).limit(1)
        if (res) {
            let articleId;
            if (res.length == 0) {
                articleId = 1
            } else {
                articleId = res[0].articleId + 1
            }
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

            let res2 = await Articles.save()
            let res3 = await ArticleTypes.update({ type: ctx.request.body.type },
                {
                    $inc: {
                        number: +1,
                        updateAt: new Date().getTime()
                    }
                })
            if (res2 && res3) {
                ctx.body = {
                    code: 200,
                    massage: '提交成功',
                    data: res2
                }
            } else {
                ctx.body = {
                    code: 500,
                    massage: '提交失败',
                    data: error,
                }
            }

        } else {
            ctx.body = {
                code: 500,
                massage: '提交失败',
                data:'提交失败',
            }
        }
    } catch{
        ctx.body = {
            code: 500,
            massage: '提交失败',
            data: error,
        }
    }



})

router.post('/updateArticleList', async (ctx, next) => {
    const Article = mongoose.model('Article')
    await Article.update({ articleId: ctx.request.body.articleId }, {
        $set: {
            status: ctx.request.body.status,
            updateAt: new Date().getTime(),
            title: ctx.request.body.title,
            author: ctx.request.body.author,
            type: ctx.request.body.type,
            image: ctx.request.body.image,
            top: ctx.request.body.top,
            desc: ctx.request.body.desc,
            content: ctx.request.body.content
        }
    }).then((result) => {
        if (result.ok && result.n) {
            ctx.body = {
                code: 200,
                massage: '修改成功',
                data: '修改' + result.n + '条'
            }
        } else {
            ctx.body = {
                code: 500,
                massage: '修改失败',
                data: '修改' + result.n + '条'
            }
        }

    })

})

router.get('/delArticleList', async (ctx, next) => {
    const Article = mongoose.model('Article')
    await Article.remove({ articleId: ctx.query.articleId }).then(async (result) => {
        ctx.body = {
            code: 200,
            massage: '删除成功',
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

router.get('/ArticleTypeList', async (ctx, next) => {
    let page = Number(ctx.query.page)
    let pageSize = Number(ctx.query.pageSize)
    console.log(ctx.query.pageSize)
    const ArticleTypes = mongoose.model('ArticleType')

    await ArticleTypes.find().skip((page - 1) * pageSize).limit(pageSize).exec().then(async (result) => {
        await ArticleTypes.find().count().then((total) => {
            ctx.body = {
                code: 200,
                massage: '查询成功',
                data: result,
                totalPage: {
                    total: total,//总数
                    pageNum: Math.ceil(total / pageSize),//总页数
                    page: page,//第几页
                    nextPage: page - 1,
                    lastPage: Math.ceil(total / pageSize),
                    pageSize: pageSize,//每页数量
                }
            }
        })
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
        console.log(res)
        let type = res.length==0?1:res[0].type + 1
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
        if (result.ok && result.n) {
            ctx.body = {
                code: 200,
                massage: '修改成功',
                data: '修改' + result.n + '条'
            }
        } else {
            ctx.body = {
                code: 500,
                massage: '修改失败',
                data: '修改' + result.n + '条'
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
    const ArticleTypes = mongoose.model('ArticleType')
    await ArticleTypes.remove({ type: type }).then(async (result) => {
        ctx.body = {
            code: 200,
            massage: '删除成功',
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
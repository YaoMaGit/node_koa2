const mongoose = require("mongoose")
const Router = require('koa-router');

let router = new Router();
//提交日志
router.post('/recordPublish', async (cxt) => {
    try {
        const Record = mongoose.model('WorkRecord')
        let props = {
            todayRecord: JSON.parse(cxt.request.body.todayRecord),
            tmrowRecord: JSON.parse(cxt.request.body.tmrowRecord),
        }
        let WorkRecord = new Record(props)

        let res = await WorkRecord.save()
        if (res) {
            cxt.body = {
                code: 200,
                massage: '提交成功',
                data: res
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

//日志列表
router.get('/recordList', async (cxt) => {
    console.log(cxt.query)
    try {
        let page = Number(cxt.query.page)
        let pageSize = Number(cxt.query.pageSize)
        let startTime = new Date(cxt.query.startTime)
        let endTime = new Date(cxt.query.endTime)
        console.log(endTime)

        let obj={}
        if(cxt.query.startTime!=""){
            obj={
                where: {
                    createTime: {
                        $between: [startTime, endTime]
                    }
                }
            }
        }

        const Record = mongoose.model('WorkRecord')
        let res = await Record.find(obj).skip((page - 1) * pageSize).limit(pageSize)
        if (res) {
            cxt.body = {
                code: 200,
                massage: '提交成功',
                data: res,
                totalPage: {
                    total: res.length,//总数
                    pageNum: Math.ceil(res.length / pageSize),//总页数
                    page: page,//第几页
                    nextPage: page - 1,
                    lastPage: Math.ceil(res.length / pageSize),
                    pageSize: pageSize,//每页数量
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


router.get('/delRecord', async (ctx, next) => {
    const WorkRecord = mongoose.model('WorkRecord')
    console.log(ctx.query._id)
    await WorkRecord.remove({ _id: ctx.query._id }).then(async (result) => {
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
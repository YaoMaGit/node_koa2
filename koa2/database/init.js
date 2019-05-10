const mongoose = require("mongoose")
const db = 'mongodb://localhost:27017/shop'
const glob = require('glob')
const { resolve } = require('path')

exports.initSchemas = () => {
    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
}
exports.connect = () => {

    mongoose.connect(db,{useNewUrlParser:true,useCreateIndex: true})
    let maxConnectTimes = 0
    // 监听
    return new Promise((resolve, reject) => {
        mongoose.connection.on('disconnected', () => {
            console.log("数据库断开")

            if (maxConnectTimes <= 3) {
                maxConnectTimes++
                mongoose.connect(db)
            } else {
                reject()
                throw new Error("*************数据库Error")
            }
        })

        mongoose.connection.on('error', (err) => {
            console.log("数据库错误")
            if (maxConnectTimes <= 3) {
                maxConnectTimes++
                mongoose.connect(db)
            } else {
                reject(err)
                throw new Error("数据库Error")
            }
        })
        //链接打开
        mongoose.connection.once('open', () => {
            console.log("数据库 connect成功")
            resolve()
        })

    })


}


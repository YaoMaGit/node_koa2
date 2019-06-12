const mongoose = require("mongoose")
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const ArticleType = new Schema({
    type: {//类型
        type: Number, default: 0
    },
    title: {//标题
        type: String
    }, 
    number:{//量
        type: Number, default: 0
    }, 
    image: {//封面
        type: String
    },
    top: {//是否置顶
        type: Number, default: 0
    },
    status: {//是否开启
        type: Number, default: 1
    },
    createAt: {
        type: Number,
    },
    updateAt: {
        type: Number,
    },
})
mongoose.model('ArticleType', ArticleType)
const mongoose = require("mongoose")
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Article = new Schema({
    articleId: {//文章id
       type: Number
    },
    title: {//文章标题
        type: String
    },
    author: {//作者
        type: String
    },
    type: {//类型
        type: Number
    },
    clickNum:{//点击量
        type: Number, default: 0
    }, 
    commentNum:{//评论量
        type: Number, default: 0
    }, 
    like: {//点赞
        type: Number, default: 0
    },
    image: {//文章图片封面
        type: String
    },
    top: {//是否置顶
        type: Number, default: 0
    },
    status: {//是否开启
        type: Number, default: 1
    },
    desc: {//文章说明
        type: String
    },
    content: {//文章内容html
        type: String
    },
    createAt: {
        type: Number,
    },
    updateAt: {
        type: Number,
    },
})
mongoose.model('Article', Article)
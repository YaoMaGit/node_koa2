const mongoose = require("mongoose")
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const goodsSchema  = new Schema({
    id: {
        unique:false, type: String
    },
    coupon_price: {
        type: String 
    },
    create_time: {
        type: String
    },
    goods_category_id: {
        type: String 
    },
    image: {
        type: String
    },
    introduce: {
        type: String
    },
    is_tmall: {
        type: String 
    },
    is_video: {
        type: String 
    },
    origin_id: {
        type: String
    },
    origin_price: {
        type: String 
    },
    quan_link: {
        type: String
    },
    quan_price: {
        type: String 
    },
    quan_time: {
        type: String
    },
    sales_num: {
        type: String 
    },
    sub_title: {
        type: String
    },
    title: {
        type: String
    },
    tkrates: {
        type: String 
    },
    videoid: {
        type: String 
    },
    video_link: {
        type: String
    },
    fan_price: {
        type: String 
    },
    tui_score: {
        type: String 
    },
    shengji_price: {
        type: String 
    },
    is_collect: {
        type: String 
    },
})

// goodsSchema .pre('save', function (next) {

// })
goodsSchema .methods = {

}
mongoose.model('Good', goodsSchema)
const mongoose = require("mongoose")
const Router = require('koa-router');
const svgCaptcha = require('svg-captcha');


let router = new Router();

router.get('/getCaptcha',async (cxt)=>{
    try{
        let codeConfig = {
            size: 4, // 验证码长度
            width:80,
            height:30,
            fontSize: 36,
            ignoreChars: '0oO1ilI', // 验证码字符中排除 0o1i
            noise: 2, // 干扰线条的数量
            color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
            background: '#eee' // 验证码图片背景颜色
        }
        let captcha = svgCaptcha.create(codeConfig);
    
        cxt.body={
            code: 200,
            data:captcha
        }
    }catch(err){
        cxt.body={
            code: 500,
            massage:'error',
            data:err
        }
    }
})

module.exports = router
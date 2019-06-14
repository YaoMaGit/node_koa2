const mongoose = require("mongoose")
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const bcrypt = require('bcrypt')
const SALT_WORK  = 10
const userSchema = new Schema({
    UserId: {
        type: ObjectId
    },
    username:{
        unique:true, type:String
    },
    userName: {
        type: String
    },
    token:{
        type:String
    },
    password: String,
    createAt: {
        type: Date, default: Date.now()
    },
    lastLoginAt: {
        type: Date, default: Date.now()
    }
})

userSchema.pre('save',function (next) {
    bcrypt.genSalt(SALT_WORK,(err,salt)=>{
        if(err) return next(err)
        bcrypt.hash(this.password,salt,(err,hash)=>{
            if(err) return next(err)
            this.password =hash
            next()
        })
    })
})
userSchema.methods={
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password, (err, isMatch)=>{
                if(!err) resolve(isMatch)
                else reject(err)
              });
        })
    }
}
mongoose.model('User',userSchema)
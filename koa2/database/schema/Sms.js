const mongoose = require("mongoose")
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const smsSchema = new Schema({
    telephone: {
        type: Number
    },
    sms: {
        type: Number
    },
    password: String,
    createAt: {
        type: Date, default: Date.now()
    },
    
    lastLoginAt: {
        type: Date, default: Date.now()
    }
})

smsSchema.pre('save',function (next) {
    bcrypt.genSalt(SALT_WORK,(err,salt)=>{
        if(err) return next(err)
        bcrypt.hash(this.password,salt,(err,hash)=>{
            if(err) return next(err)
            this.password =hash
            next()
        })
    })
})
smsSchema.methods={
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password, (err, isMatch)=>{
                if(!err) resolve(isMatch)
                else reject(err)
              });
        })
    },
    findSameUser:(_userName,userName)=>{

    }
}
mongoose.model('Sms',smsSchema)
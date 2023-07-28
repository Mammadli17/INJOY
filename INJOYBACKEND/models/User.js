const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    userid:String,
    email:String,
    password:String,
    FullName:String,
    profilepicture: String,
    code:String,
    codeCounter: {
        type:Number,
        default:3
    },
    codeExpire: Date, 
    isActive:{
        type:Boolean,
        default:false
    }
})
const User = new mongoose.model('User', userSchema);


module.exports = {
    User
}
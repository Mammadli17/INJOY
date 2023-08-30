const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    userid:String,
    email:String,
    password:String,
    FullName:String,
    profilepicture: String,
    bio:String,
    story:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Story'
    }],
    code:String,
    codeCounter: {
        type:Number,
        default:3
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
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
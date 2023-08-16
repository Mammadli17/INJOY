const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" } ,
    auth: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message:String,
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = {
    Comment
};

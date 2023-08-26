const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    image: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Postun sahibi olan kullanıcı referansı
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
    Date: { type: Date, default: Date.now }
});

const Post = mongoose.model("Post", postSchema);

module.exports = {
    Post
};

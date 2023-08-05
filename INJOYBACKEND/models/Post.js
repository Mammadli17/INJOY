const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    image: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Postun sahibi olan kullanıcı referansı
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
    // Diğer post özelliklerini buraya ekleyebilirsiniz.
});

const Post = mongoose.model("Post", postSchema);

module.exports = {
    Post
};

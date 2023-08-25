const mongoose = require("mongoose");
const followSchema = new mongoose.Schema({
    follower: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
    followed: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const Follow = mongoose.model("Follow", followSchema);

module.exports = {
    Follow
};

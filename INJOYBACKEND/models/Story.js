const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
    image: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const Story = mongoose.model("Story", storySchema);

module.exports = {
    Story
};

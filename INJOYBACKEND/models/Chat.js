const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    messages: [{
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now },
        isRead: { type: Boolean, default: false },
        content : String
    }],
});

const Chat = mongoose.model('Chat', chatSchema)



module.exports = {
    Chat
};

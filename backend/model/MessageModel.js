const mongodb = require("mongoose");
const MessageModel = new mongodb.Schema({
    roomId: {
        required: true,
        type: String
    },
    senderId: {
        required: true,
        type: String
    },
    senderName: {
        required: true,
        type: String
    },
    message:{
        required: true,
        type: String
    }
},{ timestamps: true});

module.exports = mongodb.model('Message',MessageModel);
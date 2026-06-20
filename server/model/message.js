const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    conversationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Conversation',
        required:true
    },
    senderId:{
        type:String,
        enum:['visitor','ai'],
        required:true
    },
    content:{
        type:String,
        required:true,
        trim:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model('Message', MessageSchema);
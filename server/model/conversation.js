const mongoose = require('mongoose');


const ConversationSchema = new mongoose.Schema({
    visitorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Visitor',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Conversation', ConversationSchema);
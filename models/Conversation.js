const mongoose = require('mongoose');

var ConversationSchema = new mongoose.Schema({
 conversationId : {type : String, unique: true, required : true},
 users : [String]
})

module.exports = mongoose.model('Conversation', ConversationSchema );

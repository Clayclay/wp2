const mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
    sender : String,
    receiver : String,
    text : String,
    chatId : String, // ancien conversation
    read: { type:   Date}
}, {
    timestamps: true
})

module.exports = mongoose.model('Message', MessageSchema );
const mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
 sender : String,
 receiver : String,
 text : String,
 user: String,
 conversation : String
}, {
    timestamps: true
})

module.exports = mongoose.model('Message', MessageSchema );
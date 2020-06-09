const mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
 sender : String,
 receiver : String,
 message : String,
}, {
    timestamps: true
})

module.exports = mongoose.model('Message', MessageSchema );
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    roomid  : {type : String},
    sender : { type : mongoose.Schema.Types.ObjectId},
    text :  {type : String},
    read    : { type: Boolean},
    delivered : {type:Boolean}
    }, {
    timestamps: true
     }
  )

const RoomSchema = new mongoose.Schema({
    roomid : {type : String, unique: true, required : true},
    users : [{ type : mongoose.Schema.Types.ObjectId, required: true}],
    messages: [MessageSchema]
})

module.exports = mongoose.model('Message', MessageSchema );

module.exports = mongoose.model('Room', RoomSchema );

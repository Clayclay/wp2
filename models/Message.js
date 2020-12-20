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
  
const UserRoomSchema = new mongoose.Schema({
   _id: { type : mongoose.Schema.Types.ObjectId, required: true,unique:true},
   online: { type: Date }  
})

const RoomSchema = new mongoose.Schema({
    roomid : {type : String, unique: true, required : true},
    users : [UserRoomSchema],
    messages: [MessageSchema]
})

module.exports = mongoose.model('Message', MessageSchema );
module.exports = mongoose.model('UserRoom', UserRoomSchema );
module.exports = mongoose.model('Room', RoomSchema );

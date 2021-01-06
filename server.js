// /index.js
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
//const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

//EXPRESS
const app = require('express')();

//CORS
var cors = require('cors');

//MODELS ROUTES

const Message = require('./models/Message');
const Lang = require('./models/Lang');
const Room = require('./models/Message');
const User = require('./models/User');

//IO
const http = require('http');

//PORT
const PORT = process.env.PORT || 5000;

//MIDDLEWARE
const withAuth = require('./middleware.js');
/* ---- */

require('dotenv').config()
//SECURITY
//Dotenv is a module that loads environment variables from a .env

//IMPORT MODELS

mongoose.Promise = global.Promise;
mongoose.set('bufferCommands', false);
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

const connect = mongoose.connect(process.env.MONGODB_URI, options).catch(err => console.log(err.reason));

app.use(bodyParser.json());

app.use(cookieParser());




//USE CORS
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));

//IMPORT ROUTES
require('./routes/Routes')(app);
/*---*/


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  //const path = require('path');
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.use(express.static(path.join(__dirname, 'public')));
 


//SOCKET.IO 

const server = http.createServer(app);
const io = require("socket.io").listen(server);


const users = {};

io.on('connection', (socket) => {

  socket.on('login',(data)=> {
    // Qd on est connecté a l'app
    users[socket.id]=data.userId; 
    console.log("users",users)

        //Save Statut in DB
        connect.then(async db  =>  {
            const  user  = await User.findByIdAndUpdate(  data.userId, {online: true}, {  new:true  }  );
                });
      
  })
  socket.on( 'join', ({roomId,sender} ) =>{
//console.log('important',roomId);
    //socket.emit('message', {sender: 'admin', text: `${sender}, Welcome to the room${roomId}` });
    //join to subscribe the socket to a given channel
    socket.join(roomId);

  });

  socket.on('sendMessage' ,( sender,receiver,textMsg,roomId,callback )=>{
    io.to(roomId).emit('message', {sender,receiver,text: textMsg,roomId } );

    connect.then(async db  =>  {
      const id=roomId;
      const newMessage = {sender: sender , receiver: receiver, text: textMsg , roomid:id };
      const room = await Room.findOne({roomid:id});
      // ensuite j'add le message
      room.messages.push(newMessage);
      console.log("room",room)
       room.save();
    });
    callback();
  });


  socket.on( 'leave', ({roomId,sender} ) =>{
    if (roomId) {socket.leave(roomId)} 
    console.log(sender,"leave room",roomId)
    
    connect.then(async db  =>  {
      const id=roomId;
      const room = await Room.findOne({roomid:id});
      const roomUser=room.users.id(sender);
      roomUser.set({online:Date.now()})
      console.log("room",room)
       room.save();
    });

  });

  socket.on('logout',(data) =>{
    //Delete Statut in DB
    connect.then(async db  =>  {
        const  user  = await User.findByIdAndUpdate(  data.userId, {online: false}, {  new:true  }  );
            });
  });

  socket.on('disconnect', (data) => {

    connect.then( async  db => {
      const  user  = await User.findByIdAndUpdate(  data.userId, {online: false}, {  new:true  }  );
    } )
    
    console.log(users[socket.id],'user disconnected');
    //remove saved socket from users
    delete users[socket.id]
  
  });
});
/*
io.on('connection', socket => {
  socket.on( 'join', ({name, room}, callback) =>{
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);
    // for error handling
    socket.join(user.room);
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    callback();
  });
  socket.on('sendMessage',(message,ConversationId, idReceiver, idSender, callback) => {
    const user = getUser(socket.id); 
    io.to(user.room).emit('message', { user: user.name, text: message});
    callback();

     //save chat to the database
     connect.then(db  =>  {
console.log("connected correctly to the server");
      const  saveMessage  =  new Message({ text: message,user: user.name, users: [idSender,idReceiver],conversationId: ConversationId,sender: idSender , receiver: idReceiver });
      saveMessage.save();
      });

  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);  
  })
});

*/

//PORT

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});

//MULTER
//const multer = = require('../server.js');
const multer = require('multer');
const { db } = require('./models/User');




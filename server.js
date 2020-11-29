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
const User = require('./models/User');


//IO
const http = require('http');
const { addUser, removeUser, getUser, getUsersInRoom } = require ('./users');


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
  origin: 'http://localhost:3000'
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
  console.log(socket.id,'socket user connected');
  //const chatID = socket.handshake.query.chatID
  

  socket.on('login',(data)=> {
    console.log(data.userId, "connected")
    //saving UserId to object
    users[socket.id]=data.userId;
    //{ '1ObEbgQBUtOF0HJ9AAAF': '5e807386a2330e3774c3d44d' }
    console.log(users)
  })

  socket.on('sendMessage' ,( sender,receiver,textMsg,/*callback */ )=>{
    io.emit('sendMessage', sender,receiver,textMsg,/*callback*/  );
  console.log('sendMessage',textMsg,sender,receiver) 
    //callback();
  })

  socket.on('disconnect', () => {
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
// /index.js
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
//EXPRESS
const app = require('express')();

//CORS
var cors = require('cors');

//MODELS ROUTES
const User = require('./models/User');
const Message = require('./models/Message');

//IO
const http = require('http');
const { addUser, removeUser, getUser, getUsersInRoom } = require ('./users');


//PORT
const PORT = process.env.PORT || 5000;

//MIDDLEWARE
const withAuth = require('./middleware.js');
/* ---- */

//

//IMPORT MODELS

const uri = "mongodb+srv://Clayclay:ezmcpol@worldpalcluster-bccal.mongodb.net/api?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;
mongoose.set('bufferCommands', false);
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

 const connect = mongoose.connect(uri, options).catch(err => console.log(err.reason));


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
//STATIC ROUTE
app.use(express.static(path.join(__dirname, 'public')));
//SOCKET.IO 


const server = http.createServer(app);
const io = require("socket.io").listen(server);

io.on('connection', socket => {
 

  socket.on( 'join', ({name, room}, callback) =>{

    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);
    // for error handling

    socket.join(user.room);


    socket.emit('message', {user: 'admin', text: `${user.name}, Welcome to the room ` });
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name},has joined!` });
    // msg to everyone that someone joined 
    // emit from back end to front end
    
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});

    callback();
  });

  //(!=) expect to back end  so we wait here from front end
  socket.on('sendMessage',(message,{idReceiver,idSender}, callback) => {
    const user = getUser(socket.id);
  
    
    console.log(idSender); 
    console.log(idReceiver);
   // io.to(receiverId).emit('privateMessage', { user: user.name, text: message});

    io.to(user.room).emit('message', { user: user.name, text: message});

     callback();
    //save chat to the database
    connect.then(db  =>  {
      console.log("connected correctly to the server");
  
      const  chatmessage  =  new Message({ message: message, sender: idSender , receiver: idReceiver });
      chatmessage.save();
      });
       
  });
/*
  //Someone is typing
  socket.on("typing", data => {
    socket.broadcast.emit("notifyTyping", {
      user: data.user,
      message: data.message
    });
  });

  //when soemone stops typing
  socket.on("stopTyping", () => {
    socket.broadcast.emit("notifyStopTyping");
  });
   //broadcast message to everyone in port:5000 except yourself.
   socket.broadcast.emit("received", { message: msg });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    // msg for user who left
    if(user){
      io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left.`})
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })*/
});

//PORT

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});



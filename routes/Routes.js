const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const secret = 'jesuislaplusbelle';

// Import our User schema
const User = require('../models/User');
const Message = require('../models/Message');

const SendRefreshToken = require('../SendRefreshToken');

//MIDDLEWARE
/* sont des fonctions qui peuvent accéder à l’objet
Request (req), l’objet response (res) 
route = Chemin  auquel la fonction middleware s'applique 
CONTROLLER + ROUTE*/

const withAuth = require('../middleware');
/*important middleware pour proteger les routes*/

//const connection = require('../server');

//MULTER
const multer = require('multer');

// Set Storage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
const upload = multer({ storage: storage })

const path = require('path');
module.exports = (app) => {

  //
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', '/index.html'));
  });
  
  app.get('/api/home', function(req, res) {
    res.send('Welcome');  
  });
  
  app.get('/api/secret', withAuth, function(req, res) {
    res.send('The password is potato');
  });
//WITH AUTH MIDDLEWARE POUR PROTEGER LA ROUTE

// POST route to have all user list
app.get('/api/users', async (req, res) => {
  let users = await User.find();
  return res.status(200).send(users);
});

// POST route to register a user
app.post('/api/user', function(req, res,next) {
   const { email,password,nickname,age,city,description,languages,gender,avatar } = req.body;
   const user = new User(req.body);
    
  user.save(function(err) {
    if (err) {
      res.status(500)
      .json({error:"Error registering new user please try again."});
        console.log(err);
      }     
      else {
      res.status(200).json({ ok: true, user });
    }
  });
});


app.get(`/api/user/:id`, async (req, res) => {
  const {id} = req.params;
  let user = await User.findByIdAndUpdate(id, req.body);
  return res.status(202)
  .send(  user  )
});



app.get(`/api/messages`, async (req, res ) => { 
  const receiver = req.query.receiver;
  const sender = req.query.sender;
    let messages = await Message.find({receiver,sender});
   return res.status(202).send(messages);
});


app.put(`/api/user/:id`, async (req, res, next) => {  
 const {id} = req.params;
 let user = await User.findByIdAndUpdate(id,req.body );
    return res.status(202).send({  
    error: false, 
    user   
  });
});

app.put('/api/upload/user/:id', upload.single('file'),async function(req, res, next) {
  const file = req.file;
  const {id} = req.params;
  console.log(file.filename)
  
const user = await User.findByIdAndUpdate(id,{avatar: file.filename});
 if (!file) {
   const error = new Error('Please upload a file')
   error.httpStatusCode = 400

   
   return next(error)
 }else{
  return res.status(202)
   .send(    user     );
 }
});

app.delete(`/api/user/:id`, async (req, res) => {
  const {id} = req.params;
  let user = await User.findByIdAndDelete(id);
  return res.status(202).send(  user  )
});


app.get('/api/logout', function(req, res) {
  SendRefreshToken(res, "");
  res.send( { message: 'Successfully logged out' } );
});

app.post('/api/authenticate', function(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
        error: 'Internal error please try again'
      });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect email or password'
        });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
          })
          ;
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
            SendRefreshToken(res, token);
            res.json( user );
            
        }
      });
    }
  });
});

app.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});


}
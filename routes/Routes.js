const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const secret = 'jesuislaplusbelle';

// Import our User schema
const User = require('../models/User');

//MULTER
const multer = require('../middleware/multer-config');


const SendRefreshToken = require('../SendRefreshToken');

                        //MIDDLEWARE
// sont des fonctions qui peuvent accéder à l’objet
 //Request (req), l’objet response (res) 

 //MIDDLEWARE
const withAuth = require('../middleware');
//important middleware pour proteger les routes
/* ---- */

                        // CONTROLLER + ROUTE
//route = Chemin  auquel la fonction middleware s'applique



module.exports = (app) => {

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
app.post('/api/user',multer, function(req, res,next) {
  const { email,password,nickname,age,city,description,languages,avatar } = req.body;
  const user = new User({ email,password,nickname,age,city,description,languages,avatar });
  user.save(function(err) {
    if (err) {
      res.status(500)
        .send("Error registering new user please try again.");
        console.log(err);
        // pour voir ce qui ne va pas
      } else {
      res.status(200).json({ ok: true, user });
    }
  });
});

//status : le code HTTP renvoyé par le serveur
//data : la charge retournée par le serveur . Par défaut, Axios attend JSON

app.get(`/api/user/:id`, async (req, res) => {
  const {id} = req.params;
  let user = await User.findByIdAndUpdate(id, req.body);
  return res.status(202)
  .send(  user  )
});

app.put(`/api/user/:id`, async (req, res) => {  
 const {id} = req.params;
   let user = await User.findByIdAndUpdate(id,req.body);
   return res.status(202)
   .send({  
    error: false, 
    user
  });
});

//Fonctionne
app.delete(`/api/user/:id`, async (req, res) => {
  const {id} = req.params;
  let user = await User.findByIdAndDelete(id);
  return res.status(202)
  .send(  user  )
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
          });
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
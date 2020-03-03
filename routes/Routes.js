const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const secret = 'jesuislaplusbelle';

// Import our User schema
const User = require('../models/User');

const SendRefreshToken = require('../SendRefreshToken');

                        //MIDDLEWARE
// sont des fonctions qui peuvent accéder à l’objet
 //Request (req), l’objet response (res) 

 //MIDDLEWARE
const withAuth = require('../middleware');
/* ---- */

                        // CONTROLLER + ROUTE
//route = Chemin  auquel la fonction middleware s'applique



module.exports = (app) => {

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  

  app.get('/api/home', function(req, res) {
    res.send('Welcome!');
  });
  
 
  app.get('/api/secret', withAuth, function(req, res) {
    res.send('The password is potato');
  });
//WITH AUTH MIDDLEWARE POUR PROTEGER LA ROUTE


// POST route to register a user
app.post('/api/register', function(req, res) {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save(function(err) {
    if (err) {
      res.status(500)
        .send("Error registering new user please try again.");
    } else {
      res.status(200).json({ ok: true });
    }
  });
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
            res.json({ ok: true });
            
        }
      });
    }
  });
});

app.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});

}

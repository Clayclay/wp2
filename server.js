const secret = 'jesuislaplusbelle';


// /index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


//import the models and routes files  :
require('./models/Profile');
require('./models/User');



const mongo_uri = 'mongodb://localhost/react-auth';
mongoose.connect(mongo_uri, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});



// IMPORT MODELS

const app = express();

mongoose.Promise = global.Promise;

mongoose.set('bufferCommands', false);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};


//MIDDLEWARE
const uri = "mongodb+srv://Clayclay:ezmcpol@worldpalcluster-bccal.mongodb.net/api?retryWrites=true&w=majority";

mongoose.connect(uri, options).catch(err => console.log(err.reason));

app.use(bodyParser.json());

//IMPORT ROUTES
//Router Middleware


require('./routes/Routes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}

 
//PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});


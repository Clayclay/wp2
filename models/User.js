// User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//var childSchema = new mongoose.Schema({ name: 'string' });
const AlbumsSchema = new mongoose.Schema({
  title: {type:String},
  description: {type: String},
  image: [{name: String }]
})

const UserSchema = new mongoose.Schema({
  nickname:  { type: String,  required: true  }, 
  email: { type: String, required: true, unique: true,dropDups: true },
  password: { type: String, required: true },
  registeredAt: { type: Date, default: Date.now()},      
  age: {type: Number},
  gender: {type: String},
  city: {type: String}, 
  description: {type: String},
  languages : [String],
  avatar: {  type: String },
  albums: [AlbumsSchema ],
  

  
 // Single subdocument
 //child: childSchema,

 // Array of subdocuments
 //children: [ childSchema ]

 // Array of subdocuments mongoose help -->
 //children: [{name: String }]
  


});

UserSchema.pre('save', function(next) {
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified('password')) {
    // Saving reference to this because of changing scopes
    const document = this;

    bcrypt.hash(document.password, saltRounds,
      function(err, hashedPassword) {
      if (err) {
        next(err);
      }
      else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});


UserSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same) {
      if (err) {
        callback(err);
      } else {
        callback(err, same);
      }
    });
  }

module.exports = mongoose.model('User', UserSchema);
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const ImageSchema = new mongoose.Schema({
  filename : { type: String}
}, {
  timestamps: true
})

const AlbumSchema = new mongoose.Schema({
  title: {    type: String },
  description: {  type: String    },
  images: [ ImageSchema  ]
}, {
  timestamps: true
})


const UserSchema = new mongoose.Schema({
  albums:  [AlbumSchema] ,
  friends: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
},
  languages : { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Lang'
},
  nickname:  { type: String,  required: true  }, 
  email: { type: String, required: true, unique: true,dropDups: true },
  password: { type: String, required: true },
  registeredAt: { type: Date, default: Date.now()},      
  age: {  type: Number  },
  gender: { type: String  },
  city: { type: String  }, 
  description: {  type: String  },
  avatar: {  type: String },

  //unreadMessages: [],
     
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




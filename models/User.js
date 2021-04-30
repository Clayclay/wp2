const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const ImageSchema = new mongoose.Schema({
  filename : { type: String},
  featured: { type: Boolean }
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

const LanguagesSchema = new mongoose.Schema({
   langid: {type :  mongoose.Schema.Types.ObjectId  }, 
    lvl: {  type: Number  },
    nativName : {type : String},
    langue: {type : String },
    iso:{type : String} ,
})


const UserSchema = new mongoose.Schema({
  albums:  [AlbumSchema] ,
  friends: [{ type : mongoose.Schema.Types.ObjectId, required: true, unique: true}],
   friendsby:[{ type : mongoose.Schema.Types.ObjectId, required: true, unique: true}],
  blocked: [{ type : mongoose.Schema.Types.ObjectId, required: true, unique: true}],
  blockedby: [{ type : mongoose.Schema.Types.ObjectId, required: true, unique: true}],
  languages : [LanguagesSchema],
  nickname:  { type: String,  required: true  }, 
  email: { type: String, required: true, unique: true,dropDups: true },
  password: { type: String  },
  //select false will hide it when retrieve user object
  passwordReset : {type:String, select:false},
  registeredAt: { type: Date, default: Date.now()},      
  age: {  type: Number  },
  gender: { type: String },
  city: 
    {
      country:{type : String},
      geonameid:{  type: Number  },
      name:{type : String},
      subcountry:{type : String},
    
    }
  , 
  description: {  type: String  },
  avatar: {  type: String },

  //chatid : {type : String, unique: true, required : true},

  online : {type: Boolean}
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




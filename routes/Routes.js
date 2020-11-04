const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET ;

// Import our User schema
const User = require("../models/User");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const Lang = require("../models/Lang");

const SendRefreshToken = require("../SendRefreshToken");
const nodemailer = require('nodemailer');

//MIDDLEWARE
/* sont des fonctions qui peuvent accéder à l’objet
Request (req), l’objet response (res) 
route = Chemin  auquel la fonction middleware s'applique 
CONTROLLER + ROUTE*/

const withAuth = require("../middleware");
/*important middleware pour proteger les routes*/

//const connection = require('../server');

//MULTER
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = function (req, file, cb) {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

var avatarUpload = multer({
  dest: "./client/public/uploads/avatar/",
  fileFilter: fileFilter,
});
var albumUpload = multer({
  dest: "./client/public/uploads/album/",
  fileFilter: fileFilter,
});
const upload = multer({ storage: storage });

const path = require("path");


module.exports = (app) => {
  //
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "/index.html"));
  });

  app.get("/api/home", function (req, res) {
    res.send("Welcome");
  });
  //A Corriger pour lancer l'app
  app.get("/api/secret", withAuth, function (req, res) {
    res.send("The password is potato");
  });
  //WITH AUTH MIDDLEWARE POUR PROTEGER LA ROUTE

  // POST route to have all user list
  app.get("/api/users", async (req, res) => {
    // CURSOR To loop through
    let users = await User.find();
    return res.status(200).send(users);
  });
  
  app.get("/api/users/:id", async (req, res) => {
    // Users list without the main user
    const  {  id  } = req.params;


    const user = await User.findByIdAndUpdate(  id );
   
    console.log(user.blocked, user.blockedby)

    let users = await User.find({_id:{$ne: id} });
    return res.status(200).send(users);
    
  });

////////////////////---- USER ----///////////////////
  app.post('/api/user', function (req, res, next) {
    const {
      email,
      password,
      nickname,
      age,
      city,
      description,
      //languages,
      gender,
      avatar,
    } = req.body;
    const user = new User(req.body);
    user.save(function (err) {
      if (err) {
        res
          .status(500)
          .json({ error: "Error registering new user please try again." });
        console.log(err);
      } else {
        res.status(200).json({ ok: true, user });
      }
    });
  });

  app.get(`/api/user/:id`, async (req, res) => {
    const { id } = req.params;
    let user = await User.findById( id  );
    return res.status(202).send(user);
  });

  app.put(`/api/user/:id`, async (req, res) => {
    const { id } = req.params;
    console.log(req.body)
    const user = await User.findByIdAndUpdate( 
       id, req.body, {  new:true  } );
    return res.status(202).send({
      error: false,
      user,
    })
    
    ;
  });

  /////////////////////////---FORGOT PSWD -----///////////////////////
app.get("/api/emailcheck/:email", async (req,res)=> {
  const   Email  = req.params.email;
  //if user existe
  let user = await User.findOne({email: Email} , 
    function (err,user){
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal error please try again",
      });
    } else if (!user) {
      res.status(401).json({
        error: "Incorrect email ",
      });
    }else{

      var payload = {      
        email: Email
      };
      // current password hash from the database, and combine it
      // with the user's created date to make a very unique secret key!

      var secret = user.password + '-' + user.registeredAt.getTime();

      var token = jwt.sign({payload}, secret, { expiresIn: 60 * 60 });

      user.update({ passwordReset: token })

      // TODO: Send email containing link to reset password. for the instance =

      /*let transporter = nodemailer.createTransport(transport[, defaults]) =>
        transporter = an object that is able to send mail
        transport = transport configuration object, connection url or a transport plugin instance
        defaults = object defines default values for mail options
      */

      let transporter = nodemailer.createTransport ({  
        service : 'gmail',
        secure: false, // use SSL
        port: 25, // port for secure SMTP
        auth: {
          user: process.env.EMAIL_ADRESS,
          pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false
      }
      });

      const mailOptions = {
        from: 'wordpal2020@gmail.com',
        to: Email,
        subject:  'Link to reset Password'  ,
        text: 'You are receiving this because someone have requested the reset of the password for your account.\n\n'+
        'Please click and paste the following code in your browser to complete the process without one hour of receiving it.\n\n'+
        'Code : '+ token+'\n\n'+
        'If you did not request this, please ignore this email and your password will remain unchanged.\n',
      }

      transporter.sendMail(mailOptions, (err, response)=> {
        if (err){
          console.log('err',err);
        }
        else{
          console.log('res', response);
          res.statut(200).json('recovery email sent');
        }
      })
      console.log("code ="+token); 
     }
   }); return res.status(200).send(user);
   
  });

  app.get('/api/resetpassword/:id/:token', function(req, res) {

    const  Id  = req.params.id;
    const Token  = req.params.token;

    const user = User.findOne({_id:Id} , 
      function (err,user){
      if (err) {
        console.error(err);
        res.status(500).json({
          error: "Internal error please try again",
        });
      } else if (!user) {
        res.status(401).json({
          error: "Incorrect token",
        });
      }else{   
    //code = 'user.id+'/'+token 
    //  Decrypt one-time-use token using the user's
        var secret = user.password + '-' + user.registeredAt.getTime();
        var payload = jwt.verify(Token, secret);

       const code = Id+'/'+Token;
       console.log("code",code)
        return res.status(202).send({code})
      }
      });

  });

  app.put('/api/resetpassword/:id/:token', async function(req, res) {
    const  Id  = req.params.id;
    const Token  = req.params.token;

    const user = await User.findOne( 
      { _id:Id },
       function (err,user){
        if (err) {
          console.error(err);
          res.status(500).json({
            error: "Internal error please try again",
          });
        } else if (!user) {
          res.status(401).json({
            error: "Incorrect token",
          });
        }else{ 

          var secret = user.password + '-' + user.registeredAt.getTime();
          var payload = jwt.verify(Token, secret);
        }
    });

    console.log(req.body.password)
    user.password= req.body.password;

    await user.save(
      function (err) {
        if (err) {
          res
            .status(500)
            .json({ error: "Error registering new user please try again." });
          console.log(err);
        } else {
          res.status(200).json({ ok: true, user });
        }
      });
 

//Delete the reset token in the backend after successful password change
  });

  ////////////////////---- AVATAR ----///////////////////

  app.put("/api/avatar/user/:id", avatarUpload.single("avatar"), async function (req, res, next) {
      const avatar = req.file;
      const { id } = req.params;
      const user = await User.findByIdAndUpdate(
        id, { avatar: avatar.filename },  { new:true  } );
      if (!avatar) {
        const error = new Error("Please upload a file");
        error.httpStatusCode = 400;
        return next(error);
      } else {
        return res.status(202).send(user);
      }
    }
  );


  app.delete(`/api/user/:id`, async (req, res) => {
    const { id } = req.params;
    let user = await User.findByIdAndDelete(id);
    return res.status(202).send(user);
  });
 
  ////////////////////---- MESSAGES----///////////////////

  app.get(`/api/messages`, async (req, res) => {
    const id = req.query.convId;
    let messages = await Message.find({ conversation: id });
    return res.status(202).send(messages);
  });
  // route for Mailbox
  app.get(`/api/messages/:id`, async (req, res) => {
    const { id } = req.params;
    console.log("id",id)
    let messages = await Message.find({ conversationId: id }, function (
      err,
      docs
    ) {
      // docs is an array of partially-`init`d documents
      // defaults are still applied and will be "populated"
    }).limit(1);

    return res.status(202).send(messages);
  });

  ////////////////////---- CONVERSATION ----///////////////////


  app.post(`/api/conversation`, async (req, res) => {
    const { conversationId, users } = req.body;
    let conversation = new Conversation(req.body);
     //console.log("users",users)
    conversation.save(function (err) {
      if (err) {
        res
          .status(500)
          .send({ error: "Error opening new conversation please try again." });
        console.log(err);
      } else {
        res.status(200).send(conversation);
        // console.log(conversation)
      }
    });
  });

  app.get(`/api/conversations`, async (req, res) => {
    const { users } = req.body;
    let conversation = await Conversation.find(req.body);
    return res.status(202).send(conversation);
  });

  app.get(`/api/conversation/:id`, async (req, res) => {
    const { id } = req.params;
    let conversation = await Conversation.find({ users: id });
    return res.status(202).send(conversation);
  });

  app.get("/api/logout", function (req, res) {
    SendRefreshToken(res, "");
    res.send({ message: "Successfully logged out" });
  });

  app.post("/api/authenticate", function (req, res) {
    const { email, password } = req.body;
    User.findOne({ email }, function (err, user) {
      if (err) {
        console.error(err);
        res.status(500).json({
          error: "Internal error please try again",
        });
      } else if (!user) {
        res.status(401).json({
          error: "Incorrect email or password",
        });
      } else {
        user.isCorrectPassword(password, function (err, same) {
          if (err) {
            res.status(500).json({
              error: "Internal error please try again",
            });
          } else if (!same) {
            res.status(401).json({
              error: "Incorrect email or password",
            });
          } else {
            // Issue token
            const payload = { email };
            const token = jwt.sign(payload, secret, {
              expiresIn: "1h",
            });
            SendRefreshToken(res, token);
            res.status(200).json({ ok: true, user });
          }
        });
      }
    });
  });

   ////////////////////---- TOKEN ----///////////////////
  app.get("/checkToken", withAuth, function (req, res) {
    res.sendStatus(200);
  });


  ////////////////////---- ALBUMS ----///////////////////


  app.post(`/api/user/:id/albums`, async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const newAlbum = { title, description };

    const user = await User.findByIdAndUpdate(
      id, {new:true} 
    );
    user.albums.push(newAlbum);
    user.save(function (err) {
      if (err) {
        res
          .status(500)
          .json({ error: "Error registering new user please try again." });
        console.log(err);
      } else {
        res.status(200).json({ ok: true, user });
      }
    });
  });

  app.get(`/api/user/:id/albums/:albumid/del`, async (req, res) => {
    const { id,albumid } = req.params;
    const user = await User.findByIdAndUpdate(   id, { new:true  }   );
    user.albums.pull(albumid);
    user.save(function (err) {
      if (err) {
        res
          .status(500)
          .json({ error: "Error deleting album please try again." });
        console.log(err);
      } else {
        res.status(200).json({ ok: true, user });
      }
    });
  });
  
  app.post(`/api/user/:id/album/:albumid/`, albumUpload.array("file", 12), async (req, res, next) => {
  const Files = req.files;
//console.log('Files', Files)
  const { id, albumid } = req.params;
//console.log("Id",id,"Album Id",albumid)
   const user = await User.findByIdAndUpdate(
      id, {new:true}  );
//console.log("user",user)
    const album = user.albums.id( albumid );
//console.log("album",album)
  if (!Files) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    res.send(error)
    return
  } else {
    for (let i = 0; i < req.files.length ; i++) {
      album.images.push(
          {filename : req.files[i].filename}   
          ) }   
      user.save()   
    } 

  });

  
  app.get("/api/user/:id/album/:albumid/image/:imageid", async (req, res) => {
    const { id ,albumid, imageid} = req.params;
    let user = await User.findById(id);
    const album = user.albums.id(albumid);
    //const image = album.images.id(imageid);

    album.images.pull(imageid)
    user.save(function (err) {
      if (err) {
        res
          .status(500)
          .json({ error: "Error deleting album please try again." });
        console.log(err);
      } else {
        res.status(200).json({ ok: true, user });
      }
    });
  });

////////////////////---- LANG ----///////////////////
  app.post(`/api/languages`, async (req, res) => {
    const { langue, iso, nativName, } = req.body;
    const lang = new Lang(req.body);
    lang.save(function (err) {
      if (err) {
        res
          .status(500)
          .json({ error: "Error registering new Lang please try again." });
        console.log(err);
      } else {
        res.status(200).json({ ok: true, lang });
      }
    });
  });

  app.get(`/api/languages`, async (req, res) => {
    let langs = await Lang.find();
    return res.status(200).send(langs);
  });
/////////////USER LANGS////////////

  app.post(`/api/user/:id/langs`, async (req, res) => {
    const { id } = req.params;
    const {  langue, iso , nativName, lvl,langid } = req.body;
    console.log("req.body",req.body)
    const newlang = { langue, iso , nativName, lvl,langid };
    const user = await User.findByIdAndUpdate( id, {new:true}   );
    user.languages.push(newlang);
    console.log("user",user)
    user.save(function (err) {
      if (err) {
        res
          .status(500)
          .json({ error: "Error registering new user please try again." });
        console.log(err);
      } else {
        res.status(200).json({ ok: true, user });
      }
    });
  });


  app.get(`/api/user/:id/langs/:langid/del`, async (req, res) => {
    const { id,langid } = req.params;
    const user = await User.findByIdAndUpdate(   id, { new:true  }   );
    user.languages.pull(langid);
    user.save(function (err) {
      if (err) {
        res
          .status(500)
          .json({ error: "Error deleting language please try again." });
        console.log(err);
      } else {
        res.status(200).json({ ok: true, user });
      }
    });
  });

  /////////////////////////////  Friend & Blocked   //////////////////////////////////

  app.post(`/api/user/:id/friend`, async (req, res) => {
    const { id } = req.params;
    console.log("req.body",req.body.userId)
    const user = await User.findByIdAndUpdate( 
      id,  {new:true}   );
    user.friends.push(req.body.userId);
    console.log("user",user)
    user.save(function (err) {
      if (err) {
        res
          .status(500)
          .json({ error: "Error blocking user please try again." });
        console.log(err);
      } else {
        res.status(200).json({ ok: true, user });
      }
    });
  });

  app.get(`/api/user/:id/friend/:friendid/del`, async (req, res) => {
    const { id, friendid } = req.params;
    const user = await User.findByIdAndUpdate(   id, { new:true  }   );
    user.friends.pull(friendid);
    user.save(function (err) {
      if (err) {
        res
          .status(500)
          .json({ error: "Error deleting language please try again." });
        console.log(err);
      } else {
        res.status(200).json({ ok: true, user });
      }
    });
  });

  app.post(`/api/user/:id/block`, async (req, res) => {
    const { id } = req.params;
    //console.log("req.body",req.body.userId)
    const user = await User.findByIdAndUpdate( 
      id,  {new:true}   );
    user.blocked.push(req.body.userId);
    //console.log("user blocking",user._id)

    const userBlocked = await User.findByIdAndUpdate( 
      req.body.userId,  {new:true}   );
    userBlocked.blockedby.push(id);
    //console.log("userblocked",userBlocked._id)

    userBlocked.save(function (err) {
      if (err) {
        res
          .status(500)
          .json({ error: "Error blocking user please try again." });
        console.log(err);
      } 
    });

    user.save(function (err) {
      if (err) {
        res
          .status(500)
          .json({ error: "Error blocking user please try again." });
        console.log(err);
      } else {
        res.status(200).json({ ok: true, user });
      }
    });
    
 
  });


  app.get(`/api/user/:id/block/:userid/del`, async (req, res) => {
    const { id, userid } = req.params;
    const user = await User.findByIdAndUpdate(   id, { new:true  }   );
    const userBlocked = await User.findByIdAndUpdate(   userid, { new:true  }   );
    userBlocked.blocked.pull(id);
    userBlocked.save(function (err) {
      if (err) {
        res
          .status(500)
          .json({ error: "Error deleting language please try again." });
        console.log(err);
      } else {
        res.status(200);
      }
    });
    user.blocked.pull(userid);
    user.save(function (err) {
      if (err) {
        res
          .status(500)
          .json({ error: "Error deleting language please try again." });
        console.log(err);
      } else {
        res.status(200).json({ ok: true, user });
      }
    });

  });


//FIN DONT FORGET }
};
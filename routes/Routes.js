const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET ;

// Import our User schema
const User = require("../models/User");
const Message = require("../models/Message");
const Room = require("../models/Message");
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

const cors = require('cors');

//MULTER
const multer = require("multer");
const fs = require('fs');

var storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    
    const { id } = req.params;
    const dir = `./client/public/uploads/${id}`;

    try {
      await fs.promises.access(dir);
      // The check succeeded
      console.log("suceed") 
    } catch (error) {
      console.log("failed")
        return fs.mkdir(dir, error => cb(error, dir))
      // The check failed
    }  
    
    return cb(null , dir)
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
  //function to control which files should be uploaded
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({  
  storage : storage,
  fileFilter : fileFilter,
});

const path = require("path");


module.exports = (app) => {
  //
  /*app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "/index.html"));
  });*/

  app.get("/api/home", function (req, res) {
    res.send("Welcome");
  });
  //A Corriger pour lancer l'app
  app.get("/api/secret", withAuth, function (req, res) {
    res.send("The password is potato");
  });
  //WITH AUTH MIDDLEWARE POUR PROTEGER LA ROUTE

  // POST route to have all user list
  app.get("/api/userfcb",cors(), async (req, res) => {
    // CURSOR To loop through
    let user = await User.find(req.body);
    return res.status(200).send(user);
  });

  app.get("/api/users",cors(), async (req, res) => {
    // CURSOR To loop through
    let users = await User.find();
    return res.status(200).send(users);
  });
  
  app.get("/api/users/:id", cors(), async (req, res) => {
    // Users list without the main user
    const  {  id  } = req.params;
    //const user = await User.findByIdAndUpdate(  id );
    //console.log("blocked",user.blocked,"blockedBy", user.blockedby)

    let users = await User.find({_id:{$ne: id} });
    return res.status(200).send(users);
    
  });
  
  app.get("/api/usersfind/:id", cors(), async (req, res) => {
    // Users list without the main user
    const  {  id  } = req.params;
    const {   } = req.body;
    //const user = await User.findByIdAndUpdate(  id );
    //console.log("blocked",user.blocked,"blockedBy", user.blockedby)
console.log(req.body)
    let users = await User.find({
      _id:  {$ne: id} ,
      city  : req.body.city ,
      languages :  req.body.languages
    })
    //.select({city : 1 , languages : 1})
    ;
    return res.status(200).send(users);
  });

/***************---- USER ----********************************/
  app.post('/api/user', function (req, res, next) {
    const { email,password,nickname,age,city,description,gender,avatar } = req.body;
    const user = new User(req.body);

    if(req.body.selectlang !== undefined){
      user.languages.push(  { $each: req.body.selectlang  }
      )}
  
      if(req.body.albums !== undefined){

        user.albums.push(req.body.albums);}

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

  app.get(`/api/user/:id`, cors(), async (req, res) => {
    const { id } = req.params;
    let user = await User.findById( id  );
    return res.status(202).send(user);
  });

  /*******************  FONCTION UPDATE DE OUF  **************************/ 
  app.put(`/api/user/:id`, cors(), async (req, res) => {
    const { id } = req.params;

console.log("body",req.body)

    const user = await User.findByIdAndUpdate( 
       id, req.body, {  new:true  }        );


    if(req.body.selectlang !== undefined){
    user.languages.push(  { $each: req.body.selectlang  }
    )}

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

  /////////////////////////---FORGOT PSWD -----///////////////////////
app.get("/api/emailcheck/:email", cors(), async (req,res)=> {
  const   email  = req.params.email;
  //if user existe
  let user = await User.findOne({email} , 
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
        email: email
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
        host : 'ssl0.ovh.net',
        secure: false, // use SSL
        port: 587, // port for secure SMTP
        auth: {
          user: process.env.EMAIL_ADRESS,
          pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false
      }
      });

      const mailOptions = {
        from: 'clayclay@worldpal.fr',
        to: email,
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

  app.get('/api/resetpassword/:id/:token', cors(), function(req, res) {

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

  app.put('/api/resetpassword/:id/:token', cors(), async function(req, res) {
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

  app.put("/api/avatar/user/:id", cors(), upload.single("avatar"), async function (req, res, next) {
      const avatar = req.file;
      const { id } = req.params;
      const user = await User.findByIdAndUpdate(
        id, { avatar: avatar.filename },  { new:true  } );
      if (!avatar) {
        const error = new Error("Please upload a file");
        error.httpStatusCode = 400;
        return next(error);
      } else {
        return res.status(202).json({ ok: true, user });
      }
    }
  );


  app.delete(`/api/user/:id`, cors(), async (req, res) => {
    const { id } = req.params;
    let user = await User.findByIdAndDelete(id);
    return res.status(202).json({ ok: true, user });
  });

  

  ////////////////////---- ROOM----///////////////////

  app.post(`/api/room`, cors(),(req, res) => {
     const newroom = {
      roomid : req.body.roomid,      
    }
    let room = new Room( newroom  ); 
    room.save(function (err) {
      if (err) {
        res
          .status(500)
          .send({ error: "Error opening // registering room please try again." });
        console.log(err);
      } else {
        res.status(200).send(room);
      }
    });
   // console.log('room1',room , req.body.user1)
    room.users.push({_id: req.body.user1 })
    room.users.push({_id: req.body.user2 })
    //console.log('room2',room)
    });

    app.get(`/api/room/:roomid/online/:id`,cors(), async (req, res) => {
      //TODO
      const id=req.params.roomid;
      const uid=req.params.id;
      const online= Date.now();
      console.log(uid)
      const room = await Room.findOne(  { roomid: req.params.roomid}   );
      
      //const myUser = await room.users.find(user => user._id === uid)
      const myUser = room.users.id(uid)
      console.log("myuser",myUser);
      myUser.set({online:Date.now()})

      console.log("room POST",room);
      room.save();
    });

  app.get(`/api/room/:user1&:user2`, cors(), async (req, res) => {
    const { user1,user2 } = req.params;
    
    let room = await Room.findOne(
        {
          $and: [
            {"users._id":user1},
            {"users._id":user2}
        ] 
        }
     );
     console.log('is room exist ?',room)
        return res.status(202).send(room)
  });


  app.get(`/api/room/:user1`,cors(), async (req, res) => {
    const { user1} = req.params;
    let room = await Room.find(
            {"users._id":user1}
     );
        return res.status(202).send(room)
  });

 
  ////////////////////---- MESSAGES----///////////////////

  app.get(`/api/messages`, async (req, res) => {
    let messages = await Message.find();
    return res.status(202).send(messages);
  });

  
  app.get(`/api/msghisto/:id`,cors(), async (req, res) => {
    const {id }= req.params;
    let room = await Room.findOne({roomid:id});
    return res.status(202).send(room.messages);
  });
 
  /////////////////////------ MAILBOX--------///////////////////
  app.get(`/api/messages/:id`, cors(),async (req, res) => {
    const { id } = req.params;
//console.log("id route",id)

    let messages = await Message.find(
     { $or: [
        { 
          receiver:id 
        },
        {
          sender:id 
        }
      ]
     
    }, function (
      err,
      docs
    ) {
      // docs is an array of partially-`init`d documents
      // defaults are still applied and will be "populated"
    })/*.limit(1)*/;
    return res.status(202).send(messages);

  });
 
//////////////////////////////////////////////////////////////////////////////

  app.get("/api/logout",cors(), function (req, res) {
    SendRefreshToken(res, "");
    res.send({ message: "Successfully logged out" });
  });

  app.post("/api/authenticate", cors(), function (req, res) {
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


  app.post(`/api/user/:id/albums`, cors(), async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      id, {new:true} 
    ); 
    
    user.albums.push(req.body.albums);

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

  app.get(`/api/user/:id/albums/:albumid/del`, cors(),async (req, res) => {
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

  app.put(`/api/user/:id/album/:albumid/`,cors(), async (req, res, next) => {
  
    const { id, albumid } = req.params;
//console.log("PUT EDIT Id",id,"Album Id",albumid)
     const user = await User.findByIdAndUpdate(
        id, {new:true}  );

      const album = user.albums.id( albumid );

  album.title=req.body.title;
  description= req.body.description;

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

  app.get(`/api/user/:id/album/:albumid/`,cors(), async (req, res, next) => {
  
      const { id, albumid } = req.params;
  //console.log("PUT EDIT Id",id,"Album Id",albumid)
       const user = await User.findByIdAndUpdate(
          id, {new:true}  );
  
        const album = user.albums.id( albumid );
    
        return res.status(202).send(album);
      });

  app.post(`/api/user/:id/album/:albumid/:checked`,cors(), upload.array("file", 12), async (req, res, next) => {
  const Files = req.files;

//console.log( req.params);
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
          {filename : req.files[i].filename, featured : req.params.checked}   
          ) 
        }  
      user.save(function (err) {
      if (err) {
        res
          .status(500)
          .json({ error: "Error deleting album please try again." });
        console.log(err);
      } else {
        res.status(200).json({ ok: true, user });
      }
    })   
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

    /*app.post(`/api/user/:id/langs`,cors(), async (req, res) => {
      const { id } = req.params;
     // const {  langue, iso , nativName, lvl,langid } = req.body;
      console.log("req.body",req.body)
      
     // const newlang = { langue, iso , nativName, lvl,langid };
      const user = await User.findByIdAndUpdate( id, {new:true}   );
     // user.languages.push(newlang);
     user.languages.push(
         {
          $each: req.body.selectlang
        }
     )
  
      console.log("user",user.languages)
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
    });*/


  app.get(`/api/user/:id/langs/:langid/del`, cors(), async (req, res) => {
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

  app.post(`/api/user/:id/friend`, cors(), async (req, res) => {
    const { id } = req.params;
    console.log("req.body",req.body.userId)
    const user = await User.findByIdAndUpdate( 
      id,  {new:true}   );
    user.friends.push(req.body.userId);
    console.log("user",user)

    const userfriendby = await User.findByIdAndUpdate( 
      req.body.userId,  {new:true}   );
    userfriendby.friendsby.push(id);
    
    userfriendby.save(function (err) {
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

  app.get(`/api/user/:id/friend/:friendid/del`,cors(), async (req, res) => {
    const { id, friendid } = req.params;
    const user = await User.findByIdAndUpdate(   id, { new:true  }   );
    const userfriendby = await User.findByIdAndUpdate(   friendid, { new:true  }   );
    userfriendby.friendsby.pull(id);
    userfriendby.save(function (err) {
      if (err) {
        res
          .status(500)
          .json({ error: "Error deleting language please try again." });
        console.log(err);
      } else {
        res.status(200);
      }
    });

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

  app.post(`/api/user/:id/block`,cors(), async (req, res) => {
    const { id } = req.params;
  console.log("req.body pour user block",req.body.userId)
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


  app.get(`/api/user/:id/block/:userid/del`,cors(), async (req, res) => {
    const { id, userid } = req.params;
    console.log("unblocked")
    const user = await User.findByIdAndUpdate(   id, { new:true  }   );
    const userBlocked = await User.findByIdAndUpdate(   userid, { new:true  }   );
    userBlocked.blockedby.pull(id);
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

/*
  app.get(`/api/chat/:id/`, async (req, res) => {

const id  =req.params.id;
const filter = {chatid : id};

const update = {chatid : id }
await Message.countDocuments(filter); // 0
console.log('id',id)
const  conversation =  await Message.findOneAndUpdate(filter,update,{ new:true, upsert: true } );

console.log("conversation",conversation)

const newMessage = {sender: "sender" , receiver: "receiver", text: "textMsg" };

conversation.messages.push(newMessage);
conversation.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("conv",conversation)
  }
});
   });
*/

app.put("/api/chat/img/:id",upload.single('img'),cors(), async function (req, res, next) {
  const img = req.file;
  const name = req.file.filename
  console.log(name)

  if (!img) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  } else {
    return res.status(202).json({ name});
  }
}
);





//FIN DONT FORGET }
};

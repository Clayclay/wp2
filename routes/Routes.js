const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const secret = "jesuislaplusbelle";

// Import our User schema
const User = require("../models/User");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

const SendRefreshToken = require("../SendRefreshToken");

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

  // POST route to register a user
  app.post("/api/user", function (req, res, next) {
    const {
      email,
      password,
      nickname,
      age,
      city,
      description,
      languages,
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
    let user = await User.findByIdAndUpdate(id, req.body);
    return res.status(202).send(user);
  });

  app.put(`/api/user/:id`, async (req, res) => {
    const { id } = req.params;
    let user = await User.findByIdAndUpdate(id, req.body);
    return res.status(202).send({
      error: false,
      user,
    });
  });

  app.put("/api/avatar/user/:id", avatarUpload.single("avatar"), async function (req, res, next) {
      const avatar = req.file;
      const { id } = req.params;
      console.log("filename", req.file);
      const user = await User.findByIdAndUpdate(id, {
        avatar: avatar.filename,
      });
      if (!avatar) {
        const error = new Error("Please upload a file");
        error.httpStatusCode = 400;
        return next(error);
      } else {
        return res.status(202).send(user);
      }
    }
  );
  // Faire avatar user delete

  app.delete(`/api/user/:id`, async (req, res) => {
    const { id } = req.params;
    let user = await User.findByIdAndDelete(id);
    return res.status(202).send(user);
  });
  // route for Chat.js
  app.get(`/api/messages`, async (req, res) => {
    const id = req.query.convId;
    let messages = await Message.find({ conversation: id });
    return res.status(202).send(messages);
  });
  // route for Mailbox
  app.get(`/api/messages/:id`, async (req, res) => {
    const { id } = req.params;
    let messages = await Message.find({ conversation: id }, function (
      err,
      docs
    ) {
      // docs is an array of partially-`init`d documents
      // defaults are still applied and will be "populated"
    }).limit(1);

    return res.status(202).send(messages);
  });

  app.post(`/api/conversation`, async (req, res) => {
    const { conversationId, users } = req.body;
    let conversation = new Conversation(req.body);
    // console.log("users",users)
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
            res.json(user);
          }
        });
      }
    });
  });

  app.get("/checkToken", withAuth, function (req, res) {
    res.sendStatus(200);
  });

  app.post(`/api/user/:id/albums`, async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const newAlbum = { title, description };

    const user = await User.findByIdAndUpdate(
      id /*{ $push: { albums: newAlbum }}*/
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
  
  app.post(`/api/user/:id/album/:albumid/`, albumUpload.array("file", 12), async (req, res, next) => {
  const Files = req.files;
//console.log('Files', Files)
  const { id, albumid } = req.params;
//console.log("Id",id,"Album Id",albumid)
   const user = await User.findByIdAndUpdate( id );
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
    user.save()

    if (err) return res.status(404).json({ err: err.message });
      res.redirect("/edit");

  });

//FIN DONT FORGET }
};
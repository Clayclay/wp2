
  @Clayclay  Then save your authstate in localstorage when user logged in, 
  so whenever you need it, you grab the data from localstorage. 
  and remove it when user logged out.
  

  ///////////////////////////////////////////////////////////////////////////////////////
  
  TH FOR SOCKET 
  
  
  socket.on("active", ({ username, dbID }) => {
    users.push({ id: socket.id, username, dbID });
    socket.broadcast.emit(
      "status",
      users.map((user) => user.dbID)
    );
  });

heres a simple tipical use of a socket tho

I am emiting an event with name active from the client 
and along with it an object containing
 the keys username and dbID. 
 That object is destructrured in the callback 
 and I am using them however I want bellow. 
 In this case 
 I am emiting an event to 
 all the clients connected to the server at that moment 



 app.post("/api/user", function (req, res, next) {
  const {    gender,    avatar,  } = req.body;
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

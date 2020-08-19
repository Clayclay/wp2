
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


app.put(`/api/user/:id/album/:albumid/`,/* albumUpload.array("file", 12),*/ async (req, res, next) => {
 const Files = req.files;
  const { id, albumid } = req.params
//console.log('files', Files)
console.log(id, albumid)
const user = await User.findByIdAndUpdate( id )
console.log('user', user)
    if (!Files) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  } else {

      const promiseFilesArray = Files.map(async(file) => {
          console.log("filename", file.filename)
          var album = {"id": albumid, "images": file.filename}
const user =  User.findOneAndUpdate(id, {$push: {albums: album}} );
          
user.set({ albums: albumid ,  images: file.filename} );

 const album = await Album.findById(albumid,{ images: file.filename,   });
         console.log('user', user)
         console.log('album', album)
      })
      await Promise.all(promiseFilesArray, id , albumid, Files);
     return res.status(202).send(user);
      
  }
}
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


  User.findById(userId)
  .then((user) => {
    const address = user.addresses.id(addressId); // returns a matching subdocument
    address.set(req.body); // updates the address while keeping its schema       
    // address.zipCode = req.body.zipCode; // individual fields can be set directly

    return user.save(); // saves document with subdocuments and triggers validation
  })
  .then((user) => {
    res.send({ user });
  })
  .catch(e => res.status(400).send(e));
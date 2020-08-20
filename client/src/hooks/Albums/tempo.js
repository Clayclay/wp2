app.put(`/api/user/:id/album/:albumid/`, albumUpload.array("file", 12), async (req, res, next) => {
  const Files = req.files;
//console.log('files', Files)
  const { id, albumid } = req.params;
//console.log("Id",id,"Album Id",albumid)
  const user = await User.findByIdAndUpdate(id,  { "user.albums.id": albumid }  );
//console.log("user",user)
          //----- O K -----//
  if (!Files) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    res.send(error)
    return
  } else {



    
       const FilesArray = Files.map(async (file) => {
//console.log("filename", file.filename)
         const Album = { images:[file.filename] }  ;
         const album = user.albums.id(albumid);
         album.set(Album)
//console.log("Album",album)
        }) 


      } 
await user.save()
res.send(user)    
  });
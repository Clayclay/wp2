import React, { useState , useContext} from 'react';
import axios from 'axios';
import { authContext } from "../../App";
import "./Album.css";


export const AddImage = (AlbumId) => {

  const { state: authState } = useContext(authContext);
  const id = authState.user._id;    
  const [img, setImg] = useState(null);
  const [data, setData] = useState([]);

  const handleChange = e => {

    setData(e.target.files)

         for (var i = 0; i < e.target.files.length; i++)  //for multiple files
    { 
      if (e.target.files.length > 0) {
          let reader = new FileReader();
      
          reader.addEventListener("load", () => {
            setImg(reader.result);
          });
   
          reader.readAsDataURL(e.target.files[i]);
           }  
    }  
  };

  //DO DISPLAY ALL IMG
 
  console.log(data)
  //if not react function MIN
  const handleSubmit = (e) =>{
    e.preventDefault();

    const albumid = AlbumId.AlbumId;

    const MyformData = new FormData();
    MyformData.append('file',data);

    for (var i of e.target.files) {
      MyformData.append('file', e.target.files[i])
    }

    /*for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(url + '/public/' + req.files[i].filename)
  }*/

    //Not working
    console.log(MyformData)
 
    axios.put(`http://localhost:5000/api/user/${id}/albums/${albumid}/`, MyformData)
      .then((result) => {
      alert("The files are successfully uploaded");
    });
  }

  /*function Preview({ img }) {
    console.log(img);
    if (!img) {
      return null;
    }
    return <img src={img} alt="" />;
  }*/

  //<Preview img={img} /> 

return (
  <div className="container">
    <form onSubmit={handleSubmit} encType="multipart/form-data">

      {img && <img src={img} alt="" />}
      
      <input
        type="file"
        name="file"
        onChange={handleChange}
         multiple
      />

      <button type="submit">Submit</button>
    </form>
  </div> 
);
};

export default AddImage ;



import React, { useState , useContext} from 'react';
import axios from 'axios';
import { authContext } from "../../App";
import "./Album.css";


export const AddImage = (AlbumId) => {

  const { state: authState } = useContext(authContext);
  const id = authState.user._id;    
  const [img, setImg] = useState(null);
  const [data, setData] = useState('');

  const handleChange = e => {
     
     

         for (let i = 0; i < e.target.files.length; i++) {
           setData(
          e.target.files[i]
         );
      

         if (e.target.files.length > 0) {
          const reader = new FileReader();
      
          reader.addEventListener("load", () => {
            setImg(reader.result);
          });
          reader.readAsDataURL(e.target.files[i]);
        } 
       }    
  };
 
 const HandleSubmit = (e) =>{
     e.preventDefault();

     
     const albumid = AlbumId.AlbumId;

     const MyformData = new FormData();
     MyformData.append('files', data);
 
   axios.put(`http://localhost:5000/api/user/${id}/albums/${albumid}/image`, MyformData)
     .then((result) => {
      alert("The files are successfully uploaded");
     });

 }

function Preview({ img }) {
  console.log(img);
  if (!img) {
    return null;
  }
  return <img src={img} alt="" />;
}


return (
  <div className="container">
      <form onSubmit={HandleSubmit}>
        <Preview img={img} />
        <input
          type="file"
          name="files"
          onChange={handleChange}
          multiple
        />

        <button type="submit">Submit</button>
      </form>
      </div> 
);

};


export default AddImage ;



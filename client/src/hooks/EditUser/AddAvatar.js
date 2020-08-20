import React, { useState , useContext} from 'react';
import axios from 'axios';
import { authContext } from "../../App";
import Avatar from "../Avatar";


export const AddAvatar = () => {

  const { state: authState } = useContext(authContext);
  const id = authState.user._id;    
  const [img, setImg] = useState(null);
  const [avat, setAvat] = useState('');
  
  const avatar = authState.user.avatar;

  const handleChange = e => {
     
      setAvat(
          e.target.files[0] 
         );

         if (e.target.files.length > 0) {
          const reader = new FileReader();
      
          reader.addEventListener("load", () => {
            setImg(reader.result);
          });
          reader.readAsDataURL(e.target.files[0]);
        }      
  };

 const HandleSubmit = (e) =>{
     e.preventDefault();

     const MyformData = new FormData();
     MyformData.append('avatar', avat);
 
   axios.put(`http://localhost:5000/api/avatar/user/${id}`, MyformData)
     .then((result) => {
      alert("The avatar is successfully uploaded");
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
  <div className="">
      <Avatar avatar={avatar}      />
      <form onSubmit={HandleSubmit}>
        <Preview img={img} />
        <input
          type="file"
          name="avatar"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      </div> 
);

};


export default AddAvatar ;





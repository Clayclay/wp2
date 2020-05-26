import React, { useState, Component , useContext} from 'react';
import axios from 'axios';
import { authContext } from "../App";

export const Upload = () => {

  const { state: authState, dispatch } = React.useContext(authContext);
  const id = authState.user._id;
  const initialState = {
    avatar: ''}
  const [img, setImg] = useState(null);
  const [data, setData] = useState(initialState);
  
  const handleChange = e => {
    console.log(e.target.files[0])
      setData(
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

     const formData = new FormData();
     formData.append('file', data);

   axios.put(`http://localhost:5000/api/upload/user/${id}`, formData)
     .then((result) => {
       // access results...${id}
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
  <div>
      <form onSubmit={HandleSubmit}>
        <Preview img={img} />
        <input
          type="file"
          name="file"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      </div> 
);



};


export default Upload ;





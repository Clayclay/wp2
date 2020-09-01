import React, { useState , useContext} from 'react';
import { authContext } from "../../App";
import Avatar from "../Avatar";
import { initialState } from "../../store/reducers/auth_reducer";


export const AddAvatar = () => {

  const { state: authState, dispatch } = useContext(authContext);
  const id = authState.user._id;
  
  const avatar = authState.user.avatar;  
  
  const [img, setImg] = useState(null);
  const [data, setData] = useState(initialState);


  const handleChange = e => {
     
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

     const MyformData = new FormData();
     MyformData.append('avatar', data);
 
     fetch(`http://localhost:5000/api/avatar/user/${id}`, {
      method: 'PUT',
      body: MyformData
    })
    .then(res => {
      if (res.ok) {
        return res.json();
       }
        throw res;   
    })
    .then(resJson => {
      alert("Avatar is successfully Updated");
    })
     .catch(error => {
      console.error(error);
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText
        });
    });
       
 }

function Preview({ img }) {
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





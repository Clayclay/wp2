import React , { useContext, useState } from "react";

import { authContext } from "../../App";
import "./Album.css";

import AlbumCard from "./AlbumCard";

const Albums = () => {

const { state: authState } = useContext(authContext);
const id = authState.user._id;

const [data, setData] = useState('');

const handleInputChange = event => { 
  setData(
    {
    ...data,
    [event.target.name]: event.target.value
  }); 
};

console.log(data);
const handleFormSubmit = (event) => {
  event.preventDefault();
  setData({
    ...data,
    isSubmitting: true,
    errorMessage: null
  });
  fetch (`http://localhost:5000/api/user/${id}/albums` ,{ 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`
  },
  body: JSON.stringify({         
    title: data.title,
   description: data.description,   
  })
})
.then(res => {
  if (res.ok) {
    return res.json();
   }
    throw res;   
})
.then(resJson => 
  {alert("Album is successfully created");}
  )
.catch(error => {
  console.error(error);
    setData({
      ...data,
      isSubmitting: false,
      errorMessage: error.message || error.statusText
    });
});
};

    
    return(
      <div className="" >

         {authState.user.albums && 
            authState.user.albums.map(album => (            
      <AlbumCard  key={album._id.toString()} album={album}  />
      ))}
 
      <h3>New Album</h3>
      <form onSubmit={handleFormSubmit}>

             <label htmlFor="title">
                 Title
                  <input
                  //On relie les champs
                    type="text"
                    value={data.title}
                    onChange={handleInputChange}
                    name="title"
                    id="title"
                  />
                </label>
                <label htmlFor="description">
               Description
               <input
                 type="text"
                 value={data.description}
                 onChange={handleInputChange}
                 name="description"
                 id="description"
               />
             </label>

<button onClick={handleFormSubmit}>   Create new Album </button>        
              </form>

      </div>
    )
}

export default Albums ; 
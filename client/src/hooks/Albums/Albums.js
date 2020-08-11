import React , { useContext,useReducer,useEffect, useState} from "react";
import { authContext } from "../../App";

import Album from '../Album';

const Albums = () => {
const { state: authState } = useContext(authContext);
const id = authState.user._id;

const initialState = {
    albums: [authState.user.albums],
    isFetching: false,
    hasError: false
}

const [data, setData] = useState(initialState);

const handleInputChange = event => {
  setData({
    ...data,
    [event.target.name]: event.target.value
  });
};

const handleFormSubmit = (event) => {
  event.preventDefault();     
  fetch(`http://localhost:5000/api/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authState.token}`
    },
    body: JSON.stringify({         
      albums:
      [ {
      title: data.title,
      description: data.description,
      image:data.image
  } ]
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw res;
      }
    })
    .then(resJson => {
      console.log(resJson);
    })
    .catch(error => {
      console.log(error);
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error.message || error.statusText
    });
    });
    
};
    
    return(
        <div className = "container">
      
           {authState.user.albums && authState.user.albums.map(album => {
           return <Album key={album._id} album={album} />
        })}

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

            <input
              type="file"
              name="file"
              onChange={handleInputChange}
            />
<button onClick={handleFormSubmit}>   Create  </button>        
              </form>

      </div>
    )
}

export default Albums ; 
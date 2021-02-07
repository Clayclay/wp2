import React, { useState } from 'react';
import { initialState } from "../../../store/reducers/auth_reducer";

export const EditAlbum = (album) => {

    const [user, setUser] = useState(initialState);

  const handleInputChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

    return(
        <div>
 {album.title}
 
 <label htmlFor="title">
              Title
              <input
              //On relie les champs
                type="text"
                value={album.title}
                onChange={handleInputChange}
                name="city"
                id="city"
                placeholder={album.title}
              />
            </label>

 {album.description}
        
      </div>
    )
}


export default EditAlbum;
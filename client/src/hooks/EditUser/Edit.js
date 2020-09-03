import React , {useContext, useState} from "react";
import { authContext } from "../../App";
//import {  useParams } from 'react-router-dom';
//import * as ACTION_TYPES from '../../store/actions/action_types';
import * as ACTION_TYPES from '../../store/actions/action_types';

import AlbumCard from "./Albums/AlbumCard";
import CreateAlbums from './Albums/CreateAlbums';

import AddAvatar from "./AddAvatar";
import { initialState } from "../../store/reducers/auth_reducer";

import Langs from "../Lang/Lang";

import './Edit.css';

export const Edit = () => {    

  const { state: authState, dispatch } = useContext(authContext);
  const id = authState.user._id;
  const [user, setUser] = useState(initialState);

  const initAlbums= {albums: authState.user.albums};
  const [albums,setAlbums] = useState(initAlbums);

  const handleInputChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setUser({
      ...user,
      isSubmitting: true,
      errorMessage: null
    });
    fetch (`http://localhost:5000/api/user/${id}` ,{ 
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`
    },
    body: JSON.stringify({         
      city: user.city,
      age: user.age,
      languages: user.languages,   
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
      }
      throw res;   
  })
  .then(resJson => {
    alert("User is successfully Updated");
    dispatch({ 
        type: ACTION_TYPES.USER_INPUT_CHANGE,
        payload: resJson
      })
  })
    .catch(error => {
    console.error(error);
      setUser({
        ...user,
        isSubmitting: false,
        errorMessage: error.message || error.statusText
      });
  });  
};

const [array,setArray]=useState([])

  const handleLangSubmit = (userlang,e) => {
    console.log(userlang)
    e.preventDefault(); 
// const LangsArr = Langs.push(Lang); => return array lenght
// good use CONCAT
//setArray(array.concat(userlang));  
//console.log(array)
//Add array of langage to user
    setUser({
      languages: userlang
    });
  //console.log(user)
  }


  const handleDelete = (albumId, e) => {
    e.preventDefault();
    /*On doit set user pour re afficher le user meme quand on suprime car 
    meme si on delete on effectuer une mise a jours une update
    */
    setUser({
      ...user,
      isSubmitting: true,
      errorMessage: null
    });
    fetch (`http://localhost:5000/api/user/${id}/albums/${albumId}/del` ,{ 
      method: "GET",
      headers: {          
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`          },
    })
    .then(res => {
      if (res.ok) {
        return res.json();
        }
        throw res;   
    })
    .then(resJson => {
      dispatch({ 
        type: ACTION_TYPES.USER_INPUT_CHANGE,
        payload: resJson
      })
    })
    .catch(error => {
      console.error(error);
        setUser({
          ...user,
          isSubmitting: false,
          errorMessage: error.message || error.statusText
        });
    });
};
    

  return (
      <div className="container">
        
        <div className="card">
          <div className="edit">
          <form onSubmit={handleFormSubmit}>
              <h1>Edit</h1>    
              {authState.user.nickname} {id}                     
                
          <label htmlFor="city">
                City
                <input
                //On relie les champs
                  type="text"
                  value={user.city}
                  onChange={handleInputChange}
                  name="city"
                  id="city"
                  placeholder={authState.user.city}
                />
              </label>
              <label htmlFor="age">
                Age
                <input
                //On relie les champs
                  type="text"
                  value={user.age}
                  onChange={handleInputChange}
                  name="age"
                  id="age"
                  placeholder={authState.user.age}
                />
              </label>
              <label htmlFor="language">
              Languages

select --{user.languages} //
in db -- {authState.user.languages} //
{authState.user.languages > 0 &&    
                authState.user.languages.map(language => (
                <option key={language._id.toString()} value={language._id}>{language.nativName}</option>
            ))}

 change ----           
<Langs onSubmit={handleLangSubmit}  />

              

            </label>

      {user.errorMessage && (
                <span className="form-error">{user.errorMessage}</span>
              )}
  
  <button onClick={handleFormSubmit}>   Update  </button>        
            </form>

            
<AddAvatar   /> 

{authState.user.albums && 
          authState.user.albums.map(album => (            
  <AlbumCard  key={album._id.toString()} album={album} onDelete={handleDelete}  />
))}

<CreateAlbums  />
          
              <button
        onClick={() => {
          fetch (`http://localhost:5000/api/user/${id}` ,{ 
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${authState.token}`
        },
      })//is incorrect, you should dispatch from the click, or manage it in state
          .then( resJson => {
              dispatch({ type: ACTION_TYPES.LOGOUT })
          })
        }  
      }>Delete Profile</button>

          </div>
        </div>
      </div>
    );


};

export default Edit ;
import React , {useContext, useState} from "react";
import { authContext } from "../../App";
//import {  useParams } from 'react-router-dom';
//import * as ACTION_TYPES from '../../store/actions/action_types';
import * as ACTION_TYPES from '../../store/actions/action_types';


import Albums from '../Albums/Albums';
import './Edit.css';
import AddAvatar from "./AddAvatar";

export const Edit = ({user}) => {    

  const { state: authState, dispatch } = useContext(authContext);
  const id = authState.user._id;

  const initialState = {
  nickname: authState.user.nickname,
  city: authState.user.city,
  age: authState.user.age,
  languages: authState.user.languages,
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
        setData({
          ...data,
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
          city: data.city,
          age: data.age,
          languages: data.languages,   
        })
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
          setData({
            ...data,
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
                
            <p>{data.nickname} {id}</p>
            <label htmlFor="city">
                  City
                  <input
                  //On relie les champs
                    type="text"
                    value={data.city}
                    onChange={handleInputChange}
                    name="city"
                    id="city"
                  />
                </label>
                <label htmlFor="age">
                  Age
                  <input
                  //On relie les champs
                    type="text"
                    value={data.age}
                    onChange={handleInputChange}
                    name="age"
                    id="age"
                  />
                </label>
                <label htmlFor="language">
               Languages
               <input
                 type="text"
                 value={data.languages}
                 onChange={handleInputChange}
                 name="languages"
                 id="languages"
                 placeholder="English"
               />
               <input
                 type="text"
                 onChange={handleInputChange}
                 name="languages"
                 id="languages"
                 placeholder="English"
               />
             </label>

        {data.errorMessage && (
                  <span className="form-error">{data.errorMessage}</span>
                )}
    
    <button onClick={handleFormSubmit}>   Update  </button>        
              </form>

              
<AddAvatar/>
<Albums/>
             

               <button
          onClick={() => {
            fetch (`http://localhost:5000/api/user/${id}` ,{ 
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${authState.token}`
          },
        })
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
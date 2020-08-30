import React , {useContext, useState, useEffect} from "react";
import { authContext } from "../../App";
//import {  useParams } from 'react-router-dom';
//import * as ACTION_TYPES from '../../store/actions/action_types';
import * as ACTION_TYPES from '../../store/actions/action_types';

import Albums from '../Albums/Albums';
import './Edit.css';
import AddAvatar from "./AddAvatar";
import { initialState } from "../../store/reducers/auth_reducer";

import Langs from "../Lang/Lang";

export const Edit = () => {    

  const { state: authState, dispatch } = useContext(authContext);
  const id = authState.user._id;

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
       alert("User is successfully Updated");
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
                {authState.user.nickname} {id}                     
                 
            <label htmlFor="city">
                  City
                  <input
                  //On relie les champs
                    type="text"
                    value={data.city}
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
                    value={data.age}
                    onChange={handleInputChange}
                    name="age"
                    id="age"
                    placeholder={authState.user.age}
                  />
                </label>
                <label htmlFor="language">
               Languages
<Langs />

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


              
<AddAvatar   /> 
<Albums/>
             
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
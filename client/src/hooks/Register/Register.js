import React, {useState, useContext}  from "react";
import { authContext } from "../../App";
import * as ACTION_TYPES from '../../store/actions/action_types';

import './Register.css';

const initialState = {
  email: "",
  password: "",
  description: "",
  city: "",
  age: "", 
  nickname:"",
  isSubmitting: false,
  errorMessage: null       
};

export const Register = () => {
 // OBJET MAGIQUE QUI TRANSMET A TS LES COMPO
  const { dispatch }  = useContext(authContext);
  const [data, setData] = useState(initialState);

  const handleChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };
   
// a function that handles the form submission to the backend API
  const handleSubmit = (event) => {
    // the functional update 
    event.preventDefault();
    //useState ne fusionne pas automatiquement les objets de mise à jour. avec prevState
    setData(prevState => ({
      ...prevState,
      isSubmitting: true,
      errorMessage: null       
    }));

     //use the fetch API to send payload to serveur
     //that handles the form submission to the backend
    fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({         
        email: data.email,
        password: data.password,
        nickname: data.nickname,
        age: data.age,
        city: data.city,
        description: data.description,
        gender: data.gender,
        languages: data.languages, 
      })
    })
        .then(res => res.json())
       
       //is successful, we will dispatch a LOGIN action
      
        .then(resJson => {
          if (resJson.error) {
            throw new Error(resJson.error);
          }
        dispatch({ 
             type: ACTION_TYPES.ADD_USER,
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
     <div className="container" >
      
       <div className="card">
         <div className="register">
         <form onSubmit={handleSubmit} encType="multipart/form-data">
             <h1>Register</h1>
         <label htmlFor="nickname">
               Nickname
               <input
                 type="text"
                 value={data.nickname}
                 onChange={handleChange}
                 name="nickname"
                 id="nickname"
               />
             </label>
             <label htmlFor="email">
               Email
               <input
                 type="email"
                 value={data.email}
                 onChange={handleChange}
                 name="email"
                 id="email"
               />
             </label>
       <label htmlFor="password">
               Password
               <input
                 type="password"
                 value={data.password}
                 onChange={handleChange}
                 name="password"
                 id="password"
                 autoComplete="on"
                 
               />
             </label>
             <label htmlFor="gender">
               Gender
               <div onChange={handleChange}>
               <input type="radio" value="male"  defaultChecked name="gender"/> Male
               <input type="radio" value="female" name="gender"/> Female
               </div>
            </label>
             <label htmlFor="age">
               Age
               <input
                 type="number"
                 value={data.age}
                 onChange={handleChange}
                 name="age"
                 id="age"
               />
             </label>
             <label htmlFor="city">
               City
               <input
                 type="text"
                 value={data.city}
                 onChange={handleChange}
                 name="city"
                 id="city"
               />
             </label>
             <label htmlFor="description">
               Description
               <input
                 type="text"
                 value={data.description}
                 onChange={handleChange}
                 name="description"
                 id="description"
               />
             </label>
            
             <label htmlFor="language">
               Language
               <select name="languages"  onChange={handleChange} multiple size="3" value={[data.languages]}>
               
               <option value="dutch">Dutch</option>
               <option value= "english">English</option>
               <option value="french">French</option>
              
               
               <option value="japanese">Japanese</option> 
               <option value="spanish">Spanish</option>
               
               </select>
             </label>


     {data.errorMessage && (
               <span className="form-error">{data.errorMessage}</span>
             )}
 
             <button disabled={data.isSubmitting}>
               {data.isSubmitting ? (
                 "Loading..."
               ) : (
                 "Register"
               )}
               
             </button>
           </form>
         </div>
       </div>
     </div>
   );
 };
 export default Register ;

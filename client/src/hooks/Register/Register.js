import React  from "react";
import { authContext } from "../../App";
import * as ACTION_TYPES from '../../store/actions/action_types';

import './Register.css';


export const Register = () => {

 // OBJET MAGIQUE QUI TRANSMET A TS LES COMPO
 const { dispatch }  = React.useContext(authContext);

   //we need to import the Context from the App component into our Login component and then use the dispatch function in the app. 

   //INIT
   const initialState = {
     email: "",
     password: "",
     isSubmitting: false,
     errorMessage: null,
     nickname:""
   };

 
   //useState hook to handle the form state
 const [data, setData] = React.useState(initialState);
 //initialState object into the useStatehook.
 //handle the pseudo state (name), the password state
 const handleInputChange = event => {
     setData({
       ...data,
       [event.target.name]: event.target.value
     });
   };


// a function that handles the form submission to the backend API
   const handleFormSubmit = (event) => {
     event.preventDefault();
     setData({
       ...data,
       isSubmitting: true,
       errorMessage: null
     });
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
         languages: [data.languages],
         avatar: data.avatar
  
       })
     })
       .then(res => {
         if (res.ok) {
           return res.json();
         }
         
          throw res;  
                
       })
       //is successful, we will dispatch a LOGIN action
       .then(resJson => {
         // In order to call dispatch, we need to import the AuthContext from the App component into our Login component and then use the dispatch function
        dispatch({ 
             type: ACTION_TYPES.ADD_USER,
             payload: resJson
          })
       })

       //si erreur on affiche un message d'erreur
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
     <div className="registerContainer">
      
       <div className="card">
         <div className="container">
         <form onSubmit={handleFormSubmit}>
             <h1>Register</h1>

         <label htmlFor="nickname">
               Nickname
               <input
               //On relie les champs
                 type="text"
                 value={data.nickname}
                 onChange={handleInputChange}
                 name="nickname"
                 id="nickname"
               />
             </label>
             <label htmlFor="email">
               Email
               <input
               //On relie les champs
                 type="email"
                 value={data.email}
                 onChange={handleInputChange}
                 name="email"
                 id="email"
               />
             </label>
 
       <label htmlFor="password">
               Password
               <input
                 type="password"
                 value={data.password}
                 onChange={handleInputChange}
                 name="password"
                 id="password"
                 autoComplete="on"
               />
             </label>
             <label htmlFor="age">
               Age
               <input
                 type="number"
                 value={data.age}
                 onChange={handleInputChange}
                 name="age"
                 id="age"
               />
             </label>
             
             <label htmlFor="city">
               City
               <input
                 type="text"
                 value={data.city}
                 onChange={handleInputChange}
                 name="city"
                 id="city"
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
             
             
             
             <label htmlFor="avatar">
               Avatar
               <input
                 type="text"
                 value={data.avatar}
                 onChange={handleInputChange}
                 name="avatar"
                 id="avatar"
               />
             </label>

             <label htmlFor="languages">

<select value={data.languages} multiple={true} defaultValue={['english']}>
  <option value="english">english</option>
  <option value="french">french</option>
  <option value="spanish">spanish</option>
  <option value="dutch">dutch</option>
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

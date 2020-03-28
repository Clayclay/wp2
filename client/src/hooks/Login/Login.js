import React  from 'react';
import { Context } from "../../App";
import * as ACTION_TYPES from '../../store/actions/action';

import './Login.css';


const Login = () => {

 // OBJET MAGIQUE QUI TRANSMET A TS LES COMPO 
 const { dispatch }  = React.useContext(Context);

 //INIT
 const initialState = {
  email: "",
  password: "",
  isSubmitting: false,
  errorMessage: null
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
  
  

  const handleFormSubmit = (event) => { //want this method to make a request to authenticate with our backend and save the resulting token to a browser cookie.
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null
    });
       fetch('/api/authenticate', {// use fetch to authenticate against our backend and retrieve a JSON Web Token
        method: 'POST',
          headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
          email: data.email,
          password: data.password
        })   
      })
      .then(res => {
        if (res.ok) {
          return res.json();
         }
          else {  
            throw res;  
                   }
      })
      .then(resJson => {
        // In order to call dispatch, we need to import the AuthContext from the App component into our Login component and then use the dispatch function
       dispatch({ 
            type: ACTION_TYPES.LOGIN_SUCCESS,
            payload: resJson
         })
       
      })

//A REVOIR POUR AFFICHER LA BONNE ERREUR DE AUTHENTICATE
      .catch(error => {
        console.error(error);
        alert('Error logging in please try again');
      });
  };

  
    return (
      
      <form onSubmit={handleFormSubmit}>
        <h1>Login</h1>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email"
          value={data.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          id="password"
          autoComplete="on"
          value={data.password}
          onChange={handleInputChange}
          required
          className="loginInput mt-20"
        />
       <input className="button mt-20" type="submit" value="Submit"/>
      </form>
    );
  };
  export default Login;

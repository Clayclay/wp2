import React  from 'react';
import { authContext } from "../../App";
import * as ACTION_TYPES from '../../store/actions/action_types';
//import * as ACTIONS from '../../store/actions/actions';
import './Login.css';


const Login = () => {

 
 // OBJET MAGIQUE QUI TRANSMET A TS LES COMPO 
 const {  dispatch  }  = React.useContext(authContext);



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
       .catch(error => {
          setData({
            ...data,
            isSubmitting: false,
            errorMessage: error.message || error.statusText
          });
      })
  };

  
    return (
    <div className="loginContainer">
      <h1>Login</h1>
      <form onSubmit={handleFormSubmit}>
        <p><input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email"
          value={data.email}
          onChange={handleInputChange}
          required
        /></p>
        <p><input
          type="password"
          name="password"
          placeholder="Enter password"
          id="password"
          autoComplete="on"
          value={data.password}
          onChange={handleInputChange}
          required       
        />
        </p>

       {data.errorMessage && (
              <span className="form-error">{data.errorMessage}</span>
            )}

           <button className="button mt-20" disabled={data.isSubmitting}>
              {data.isSubmitting ? (
                "Loading..."
              ) : (
                "Login"
              )}
              </button>
                
       </form>
    </div>
    );
  };
  export default Login;

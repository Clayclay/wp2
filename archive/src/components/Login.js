import React from "react";


import { AuthContext } from "../App";

  export const Login = () => {

   // OBJET MAGIQUE QUI TRANSMET A TS LES COMPO
    const { dispatch } = React.useContext(AuthContext);

    //INIT
    const initialState = {
      pseudo: "",
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


// a function that handles the form submission to the backend API
    const handleFormSubmit = event => {
      event.preventDefault();
      setData({
        ...data,
        isSubmitting: true,
        errorMessage: null
      });
      //use the fetch API to send payload to serveur
      //that handles the form submission to the backend
      fetch("http://localhost:3000/api/profile", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({         
          pseudo: data.pseudo,
          password: data.password
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
              type: "LOGIN",
              payload: resJson
              //pass the response from the server as a payload 
          })
        })
        //si erreur on affiche un message d'erreur
        .catch(error => {
          setData({
            ...data,
            isSubmitting: false,
            errorMessage: error.message || error.statusText
          });
        });
    };


  return (
      <div className="login-container">
       
        <div className="card">
          <div className="container">
          <form onSubmit={handleFormSubmit}>
              <h1>Login</h1>

          <label htmlFor="pseudo">
                Pseudo
                <input
                //On relie les champs
                  type="text"
                  value={data.pseudo}
                  onChange={handleInputChange}
                  name="pseudo"
                  id="pseudo"
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
  
      {data.errorMessage && (
                <span className="form-error">{data.errorMessage}</span>
              )}
  
              <button disabled={data.isSubmitting}>
                {data.isSubmitting ? (
                  "Loading..."
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };
  export default Login;
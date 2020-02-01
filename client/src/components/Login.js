import React from "react";


import { AuthContext } from "../App";


  export const Login = () => {

   // OBJET MAGIQUE QUI TRANSMET A TS LES COMPO
    const { dispatch } = React.useContext(AuthContext);

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
  //handle the email state, the password state
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
      fetch("http://localhost:3000/api/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: data.email,
          password: data.password
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
              type: "LOGIN",
              payload: resJson
          })
        })
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

          <label htmlFor="email">
                Email Address
                <input
                //On relie les champs
                  type="text"
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
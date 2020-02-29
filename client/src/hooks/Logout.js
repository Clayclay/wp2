import React from 'react';
import {    useHistory  } from "react-router-dom";

  import AuthReducer from "../App";

function AuthButton() {

 let history = useHistory();

 return AuthReducer.isAuthenticated ? (
   <p>
     Welcome!{" "}
     <button
       onClick={() => {
        AuthReducer.ACTION_TYPES.LOGOUT(() => history.push("/"));
       }}
     >
       Sign out
     </button>
   </p>
 ) : (
   <p>You are not logged in.</p>
 );

}




export default AuthButton ;












/*
const Logout = () => {
    localStorage.clear("token");
   }
     

export default Logout;*/
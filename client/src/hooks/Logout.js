import React from 'react';
import { Context } from "../App";
import AuthReducer from "../App";
import axios from 'axios';
//Axios est une bibliothèque JavaScript fonctionnant comme un client HTTP. 
import * as ACTION_TYPES from '../store/actions/action';



function Logout() {

  const { dispatch }  = React.useContext(Context);



 return AuthReducer.is_authenticated ? (
   <div>
             Welcome!{" "}

            <button
          onClick={() => {
            axios.get('/api/logout')
            return dispatch({ type: ACTION_TYPES.LOGOUT });
          }}>Log out</button>

   </div>
    ) : (
   <div>You are not logged in.</div>
     );

}


export default Logout;












/*
const Logout = () => {
    localStorage.clear("token");
   }
     

export default Logout;*/
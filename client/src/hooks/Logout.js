import React from 'react';
import { Context } from "../App";

import axios from 'axios';
//Axios est une bibliothèque JavaScript fonctionnant comme un client HTTP. 
//Axios est une bibliothèque JavaScript fonctionnant comme un client HTTP. Elle permet de communiquer avec des API en utilisant des requêtes.
import * as ACTION_TYPES from '../store/actions/action';




function Logout() {

  const { state, dispatch }  = React.useContext(Context);

 return state.is_authenticated ? 
 
 (
   <div>
             Welcome!{" "}

            <button
          onClick={() => {
            axios.get('http://localhost:3000/api/logout')
            .then(() =>
            dispatch({ type: ACTION_TYPES.LOGOUT })
          )
          
        }}>Log out</button>

   </div>    ) : (   <div>You are not logged in.</div>     );

}


export default Logout;






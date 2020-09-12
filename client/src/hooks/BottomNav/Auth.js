import React , {useContext } from 'react';
import { authContext } from "../../App";

import BottomNav from './BottomNav';


function Auth() {

  const { state, dispatch }  = useContext(authContext);

 return state.is_authenticated ? 
 
 (
   <div className="">
     

      <BottomNav is_authenticated={ state.is_authenticated}/>

   </div>    ) : ( 
   <div className="">
        
    </div>     ) 
   ;

}


export default Auth;






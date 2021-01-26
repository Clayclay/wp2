import React , {useContext} from 'react';
import { authContext } from "../App";

import BottomNav from './BottomNav/BottomNav';
import LogOutTimer from '../function/LogOutTimer';

function Auth() {

  const { state   }  = useContext(authContext);
 
 return state.is_authenticated ? 
 
 (
   <div className="">
     
      <LogOutTimer />
      <BottomNav />

   </div>    ) : ( 

    <div className=""></div>   

   ) 
   ;

}


export default Auth;






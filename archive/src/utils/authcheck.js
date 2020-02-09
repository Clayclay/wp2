//Will be used to update the authentication state of the user and retrieve the user profile data 
//and save it to the global state.

import React, { useEffect, useContext } from 'react';
import history from './history';
import Context from './context';


import * as ACTIONS from '../Store/actions/actions';

//This component will be rendered every time a user logs in and out

const AuthCheck = () => {
  //is essentially how we update the authentication state using the useEffect() hook.
  const context = useContext(Context)

  useEffect(() => {
    if(context.authObj.isAuthenticated()) {
      context.handleUserLogin()
      context.handleUserAddProfile(context.authObj.userProfile)
      history.replace('/')
    }
    else {
      context.handleUserLogout()
      context.handleUserRemoveProfile()
      history.replace('/')
      }
    }, [])

    return(
        <div>
        </div>
    )}




export default AuthCheck;
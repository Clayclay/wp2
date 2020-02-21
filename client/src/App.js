import React from 'react';
//import logo from './logo.svg';
import './App.css';

import Login from "./hooks/login";
import Home from "./hooks/home";
import Header from "./hooks/header";

//import Context from "./utils/context";

import * as ACTIONS from './store/actions/actions';

// SERVICES

import * as AuthReducer from './store/reducers/auth_reducer';
//import profileService from './services/profileService';


//export const Context = React.createContext();

export const AuthContext = React.createContext(); // added this





const App = () =>{


     /*
      Auth Reducer
    */

  const [stateAuthReducer, dispatchAuthReducer] = 
  React.useReducer(AuthReducer.AuthReducer, AuthReducer.initialState);
 
  //we use the syntax Reducer1.Reducer1 to access Reducer1
  //he intialState can be accessed using Reducer1.initailState


  const handleLogin = () => {
    dispatchAuthReducer(ACTIONS.login_success())
  }

  const handleAddProfile = (profile) => {
    dispatchAuthReducer(ACTIONS.add_profile(profile))
  }
  
  return (

    <AuthContext.Provider
    value={{
      authState: stateAuthReducer.is_authenticated
      ,      dispatchAuthReducer
        
        ,handleUserLogin: () => handleLogin(),
        handleUserAddProfile: (profile) => handleAddProfile(profile),
    }}
  >
    <Header />
    <div className="App">{!stateAuthReducer.is_authenticated ? <Login /> : <Home />}</div>
  </AuthContext.Provider>

);
 
}

export default App;

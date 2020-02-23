import React from 'react';
//import logo from './logo.svg';
import './App.css';

import Login from "./hooks/login";
import Home from "./hooks/home";
import Header from "./hooks/header";


// SERVICES


import initialState from './store/reducers/auth_reducer';

//import profileService from './services/profileService';


export const AuthContext = React.createContext();


const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

const App = () =>{
  
 /*      Auth Reducer    */
  const [state, dispatch] = React.useReducer(AuthReducer, initialState);

      
  return (

    <AuthContext.Provider
    value={{
      state,
      dispatch
    }}
  >
    <Header />
    <div className="App">{!state.isAuthenticated ? <Login /> : <Home />}</div>
  </AuthContext.Provider>

);
}

export default App;

import React from 'react';
//import logo from './logo.svg';
import './App.css';

import Login from "./hooks/login";
import Home from "./hooks/home";
import Header from "./hooks/header";

//import Context from "./utils/context";



// SERVICES

import AddReducer from './store/reducers/add_reducer';
//import profileService from './services/profileService';


//export const Context = React.createContext();

export const AuthContext = React.createContext(); // added this



//We use the syntax import * as Reducer1 because we want to import both the Reducer1 and the initialState. 

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const App = () =>{

  const [state, dispatch] = React.useReducer(AddReducer, initialState);
 //const [state, dispatch] = React.useReducer(AddReducer.AddReducer, AddReducer.initialState);

  //we use the syntax Reducer1.Reducer1 to access Reducer1
  //he intialState can be accessed using Reducer1.initailState
  
  return (

    <AuthContext.Provider
    value={{
      state,
      dispatch
        //Reducer1
        //stateProp1: stateReducer1.stateprop1,
        //stateProp2: stateReducer1.stateprop2,
        //dispatchContextTrue: () => handleDispatchTrue(),
        //dispatchContextFalse: () => handleDispatchFalse(),
    }}
  >
    <Header />
    <div className="App">{!state.isAuthenticated ? <Login /> : <Home />}</div>
  </AuthContext.Provider>

);
 
}

export default App;

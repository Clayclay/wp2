import React from 'react';
import logo from './logo.svg';
import './App.css';

import Login from "./hooks/login";
import Home from "./hooks/home";
import Header from "./hooks/header";

import Context from "./utils/context"

import * as AddReducer from './store/reducers/add_reducer';
//We use the syntax import * as Reducer1 because we want to import both the Reducer1 and the initialState. 


const App = () =>{
  const [state, dispatch] = React.useReducer(AddReducer, initialState);
 // const [state, dispatch] = React.useReducer(AddReducer.AddReducer, AddReducer.initialState);

  //we use the syntax Reducer1.Reducer1 to access Reducer1
  //he intialState can be accessed using Reducer1.initailState
  
  return (

    <Context.Provider
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
  </Context.Provider>

);
 
}

export default App;

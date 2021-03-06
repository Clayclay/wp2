import "./App.css";
import React from 'react';
import { BrowserRouter as Link,  Route,  Switch    } from 'react-router-dom';

import withAuth from './withAuth';
import Home from './hooks/Home/Home';
import Login from './hooks/Login/Login';
import Register from './hooks/Register/Register';

import Header from './hooks/Header/Header';
import AuthButton from './hooks/AuthButton';
import Users from './hooks/Users/Users';
import Secret from './hooks/Secret';

/* in work */
import Chat from './hooks/Chat/Chat';
import Join from './hooks/Join';
import Profile from './hooks/Profile';
import Edit from './hooks/EditUser/Edit';
//import Menu from './hooks/Menu';

import AuthReducer from './store/reducers/auth_reducer';
import Upload from "./hooks/Upload";



export const initialState = {
  is_authenticated: false,
  user: null,
  token: null
};



// OBJET MAGIQUE QUI TRANSMET A TS LES COMPO 
export const authContext = React.createContext();


function App()    {
  
 /*
      Auth Reducer
  */
  const [state, dispatch] = React.useReducer(AuthReducer, initialState);  
  
    return (
    <div>

    <authContext.Provider //va permettre de rendre nos données d’app disponibles aux composants 
      value={{   state,  dispatch     }} 
      >   
     
    <Header />
   
    <div>
  
    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. React Router App*/}
    <AuthButton is_authenticated={ state.is_authenticated} />

    <Switch>
      <Route path="/login" ><Login /></Route>
      <Route exact path="/">{ ! state.is_authenticated ? <Login />:<Home />}</Route>
      <Route path="/edit">{ ! state.is_authenticated ? <Login />:<Edit />} </Route>
      

      <Route exact path="/users" >{ ! state.is_authenticated ? <Login />:<Users />}</Route>
      <Route exact path="/user/:id">{ ! state.is_authenticated ? <Login />:<Profile  />}</Route>

      <Route path="/secret" component={withAuth(Secret)} ><Secret/></Route>
      
      
      <Route path="/register" exact>{ ! state.is_authenticated ? <Register />:<Home  />}</Route>
      <Route path="/upload" ><Upload /></Route>
      <Route path='/join' ><Join/></Route>
      <Route path='/chat' component={Chat}/>
     
    </Switch>

   
  



  </div>  
    </authContext.Provider> 
    </div>    
    ); 
    
  }
  
  export default App ;


  /* tempo */ 

  /*       */

import "./App.css";
import React, {useReducer, createContext} from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthReducer from './store/reducers/auth_reducer';
import withAuth from './withAuth';
import Home from './hooks/Home/Home';
import Login from './hooks/Login/Login';
import Register from './hooks/Register/Register';
import Users from './hooks/Users/Users';
import Secret from './hooks/Secret';
import Chat from './hooks/Messenger/Chat/Chat';
import Profile from './hooks/Profile';
import Edit from './hooks/EditUser/Edit';
import MailBox from "./hooks/MailBox/Mailbox";
import Auth from"./hooks/Auth";
import CreateAlbum from './hooks/EditUser/Albums/CreateAlbum';
import EditAlbum  from './hooks/EditUser/Albums/EditAlbum';
import Album from "./hooks/Album";
import Appbar from "./hooks/Appbar/Appbar";
import ResetPassword from "./hooks/ResetPswd/ResetPassword";
import {  ThemeProvider } from '@material-ui/core/styles';
import theme from  './theme';

import Match from './hooks/Match/Match';

export const initialState = {
  is_authenticated: false,
  user: null,
  token: null,
  filter: null
};


// OBJET MAGIQUE QUI TRANSMET A TS LES COMPO 
export const authContext = createContext();


function App()    {
 
 /*
      Auth Reducer
  */
  const [state, dispatch] =  useReducer(AuthReducer, initialState);  
 

    return (
    <div>

    <ThemeProvider theme={theme}>

    <authContext.Provider //va permettre de rendre nos données d’app disponibles aux composants 
      value={{   state,  dispatch     }}   >   
     
    <Appbar />
    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. React Router App*/}


    <Switch>
      <Route path="/login" ><Login /></Route>
      <Route path="/resetpassword" ><ResetPassword /></Route>
      <Route path="/register" exact>{ ! state.is_authenticated ? <Register  />:<Home  />}</Route>
      <Route exact path="/">{ ! state.is_authenticated ? <Login />:<Home  />}</Route>
      <Route path="/edit">{ ! state.is_authenticated ? <Login />:<Edit  />} </Route>
      <Route path="/createAlbum">{ ! state.is_authenticated ? <Login />:<CreateAlbum  />} </Route>
      <Route exact path="/editAlbum/:id">{ ! state.is_authenticated ? <Login />:<EditAlbum  />} </Route>
      <Route exact path="/album/:id" >{ ! state.is_authenticated ? <Login />:<Album />}</Route>

      <Route exact path="/match" >{ ! state.is_authenticated ? <Login />:<Match />}</Route>

      <Route exact path="/users" >{ ! state.is_authenticated ? <Login />:<Users />}</Route>
      <Route exact path="/user/:id">{ ! state.is_authenticated ? <Login />:<Profile  />}</Route>
      <Route path='/mailbox' exact>{ ! state.is_authenticated ? <Login  />:<MailBox />}</Route>

      <Route exact path='/chat/:roomid/:id' exact >{ ! state.is_authenticated ? <Login/>:<Chat  />}</Route>

      <Route path="/secret" component={withAuth(Secret)} ><Secret/></Route>
    </Switch>


    <Auth /* IDLE-TIMER */ />
    </authContext.Provider> 
    </ThemeProvider>
    </div>    
    ); 
    
  }
  
  export default App ;



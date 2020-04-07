import "./App.css";
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import withAuth from './withAuth';
import Home from './hooks/home';
import Login from './hooks/Login/Login';

import Header from './hooks/Header';
import Logout from './hooks/Logout';
import Users from './hooks/Users';
import Secret from './hooks/Secret';

/* in work */
import Chat from './hooks/Chat/Chat'
import Join from './hooks/Join'
import Profile from './hooks/Profile';
import Register from './hooks/Register';

/*      */
import * as ACTIONS from './store/actions/actions';
//import AuthReducer from './store/reducers/auth_reducer';
/*  ESSAI */
import * as ACTION_TYPES from './store/actions/action_types'


export const initialState = {
  is_authenticated: false,
  user: null,
  token: null
};

const AuthReducer = ( state= initialState , action) => {
  
  switch (action.type) {

    case  ACTION_TYPES.ADD_USER:
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
       is_authenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };

      case ACTION_TYPES.LOGIN_SUCCESS:
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", JSON.stringify(action.payload.token));  
        return {
          ...state,
          is_authenticated: true,
          user: action.payload,
          token: action.payload.token
        }
        case ACTION_TYPES.LOGIN_FAILURE:
          return {
            ...state,
            is_authenticated: false
          }

        case ACTION_TYPES.LOGOUT:
          
          //When this action is dispatched, we clear localStorage of all data and set user and token to null .
          localStorage.clear();
          return {
            ...state,
           is_authenticated: false,
            user: null,
            token: null
          }

    default:
      return state;
  }
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
      value={{
        //Auth Reducer
        state,  dispatch
        
      }} 
      >   
     
<Header />

<div>

  <ul>
    <li><Link to="/">Home </Link></li> 
    <li><Link to="/users">Users List </Link></li>
  </ul>
  
  <Switch>
    <Route path="/" exact>{ ! state.is_authenticated ? <Login /> : <Home />}</Route>
    <Route path="/users" exact><Users /></Route>
    <Route path="/users/:id" exact> <Profile/></Route>

<Route path="/secret" exact component={withAuth(Secret)} />
<Route path="/login" exact><Login /></Route>
<Route path="/register" exact><Register /></Route>
<Route path='/chat' component={Chat}/>
<Route path="/join" exact><Join /></Route>
  </Switch>
    
  <Logout is_authenticated={ state.is_authenticated} />

  </div>  
    </authContext.Provider> 
    </div>    
    ); 
    
  }
  
  export default App ;

  /* tempo */ 

  /*       */

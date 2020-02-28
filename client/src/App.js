import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import withAuth from './withAuth';

import Home from './hooks/Home';
import Secret from './hooks/Secret';
import Login from './hooks/Login';
import Register from './hooks/Register';
import Header from './hooks/Header';

//import AuthReducer from './store/reducers/auth_reducer';
import * as ACTION_TYPES from './store/actions/action_types'

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

export const AuthReducer = (state , action) => {
  switch (action.type) {

    case  ACTION_TYPES.ADD_PROFILE:
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };

      case ACTION_TYPES.LOGIN_SUCCESS:
        return {
          ...state,
          is_authenticated: true
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
            isAuthenticated: false,
            user: null,
            token: null,
          }

    default:
      return state;
  }
};

export const Context = React.createContext();


function App() {
  const [state, dispatch] = React.useReducer(AuthReducer, initialState);
    return (
      <Context.Provider//va permettre de rendre nos données d’app disponibles aux composants 
      value={{
        state,
        dispatch
      }}
      >
      
      <Header />

      <div>
        <ul>
      
          <li><Link to="/">Home</Link></li>
          <li><Link to="/secret">Secret</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
        
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/secret" component={withAuth(Secret)} />
          <Route path="/register" exact component={Register} />

          <Route path="/login" exact component={Login} > {!state.isAuthenticated ? <Login /> : <Home />}    </Route>      
          </Switch>
        
         
          
      </div>
     
          
      </Context.Provider> //<button onClick={logout}>Logout</button>
    );
  }
  export default App;

//<div className="App">{!state.isAuthenticated ? <Register /> : <Home />}</div>
//<Route path="/airports"   render={() => (<div> This is the airport route </div>)}/>
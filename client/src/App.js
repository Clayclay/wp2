import "./App.css";
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import withAuth from './withAuth';

import Home from './hooks/Home';

import Login from './hooks/Login';
import Register from './hooks/Register';
import Header from './hooks/Header';
import Logout from './hooks/Logout';
import List from './hooks/User_list';

import Secret from './hooks/Secret';
import Account from './hooks/User_account';
import Profile from './hooks/Profile';

import Chat from './hooks/Chat';

import AuthReducer from './store/reducers/auth_reducer';
import { createStore } from 'redux';

const initialState = {
  is_authenticated: false,
  user: null,
  token: null, 
};

 
export const Context = React.createContext();

const store = createStore(AuthReducer);

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
          <li><Link to="/user_list">User List</Link></li>
          <li><Link to="/chat">Message</Link></li>
          <li><Link to="/User_account">My Profile</Link></li>
        </ul>
        
        <Switch>
          <Route path="/" exact><Home /></Route>

          <Route path="/secret" exact component={withAuth(Secret)} />

          <Route path="/register" exact>{ !state.is_authenticated ? <Register /> : <Home />} </Route>
          <Route exact path="/login"> { !state.is_authenticated ? <Login /> : <Home />}</Route>
          
          <Route path="/user_list" exact><List /></Route>
          <Route path="/chat" exact><Chat /></Route>


          <Route path="/User_account" exact component={withAuth(Account)} />
 



          </Switch>
        <Logout is_authenticated={state.is_authenticated} />
          
          
      </div>
          
      </ Context.Provider> 

                 
    ); 
    
  }
  
  export default App;

  /* 
<Route path="/Chat" exact component={withAuth(Secret)}><Chat /></Route>


   /*<button
      onClick={() => !state.isAuthenticated ? <Logout/> : <Login/>}
      className="App-link"  >Logout
    </button>

//<Route path="/login" exact   render={() =>!state.isAuthenticated ? <Login /> : <Home/>} />  

//<div className="App">{!state.isAuthenticated ? <Register /> : <Home />}</div>
//<Route path="/airports"   render={() => (<div> This is the airport route </div>)}/>
/* <Route exact path="/" render={() => (              
         loggedIn ? ( <Redirect to="/dashboard"/>  ) : (  <PublicHomePage/>  )
    )}/>*/  
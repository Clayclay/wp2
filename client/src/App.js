import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import withAuth from './withAuth';

import Home from './hooks/Home';
import Secret from './hooks/Secret';
import Login from './hooks/Login';
import Register from './hooks/Register';
import Header from './hooks/Header';
import Logout from './hooks/Logout';

import AuthReducer from './store/reducers/auth_reducer';
import allReducers from './store/reducers';

import { createStore } from 'redux';


import { ReactReduxContext } from 'react-redux';

const initialState = {
  is_authenticated: false,
  user: null,
  token: null, 
};

export const Context = React.createContext();

const store = createStore(
  AuthReducer,
  +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {

  const [state, dispatch] = React.useReducer(AuthReducer, initialState);

    return (
      <ReactReduxContext.Provider  //va permettre de rendre nos données d’app disponibles aux composants 
      value={{
        state,
        dispatch
      }}
      store={store}
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
          <Route path="/" exact><Home /></Route>
          <Route path="/secret" exact component={withAuth(Secret)} />
          <Route path="/register" exact><Register/> </Route>
            
          <Route exact path="/login"> { !state.is_authenticated ? <Login /> : <Home />}</Route>


        </Switch>
        <Logout></Logout>
        
      </div>
          
      </ReactReduxContext.Provider> 

                 
    ); 
    console.log(store.getState())
  }
  

 
  
 


  export default App;

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
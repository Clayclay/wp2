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
        </ul>
        
        <Switch>
          <Route path="/" exact><Home /></Route>
          <Route path="/secret" exact component={withAuth(Secret)} />
          <Route path="/register" exact><Register/> </Route>
            
          <Route exact path="/login"> { !state.is_authenticated ? <Login /> : <Home />}</Route>



          </Switch>
        <Logout is_authenticated={state.is_authenticated} />
          

      </div>
          
      </ Context.Provider> 

                 
    ); 
    
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
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import withAuth from './withAuth';

import Home from './hooks/Home';
import Secret from './hooks/Secret';
import Login from './hooks/Login';
import Register from './hooks/Register';
import Header from './hooks/Header';

import AuthReducer from './store/reducers/auth_reducer';

export const Context = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};




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
          <Route 
           //A higher-order component = 
           //function which takes in a component and returns a component. 
           //withAuth, that will take in a component we want to protect, like <Secret /> , 
           //and slightly modify it so that users can’t access it unless they are logged in:
          path="/secret" component={withAuth(Secret)} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />

          {!state.isAuthenticated ? <Login /> : <Home />}
          <div className="App">{!state.isAuthenticated ? <Register /> : <Home />}</div>
       
          <Route render={() => (<div> Sorry, this page does not exist. </div>)} />
          
        </Switch>
      </div>
      </Context.Provider>
    );
  }
  export default App;

  //<Route path="/airports"   render={() => (<div> This is the airport route </div>)}/>
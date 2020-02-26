import React  from 'react';


import {  
  BrowserRouter as Router,
  Link, Route, Switch } from 'react-router-dom';


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
      <Router>
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
          <Route path="/login" component={Login} />
          
          <div className="App">{!state.isAuthenticated ? <Register /> : <Home />}</div>
        </Switch>
      </div>

      </Router>
      </Context.Provider>
    );
  }
  export default App;
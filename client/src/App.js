import React, { Component } from 'react';


import {
  
  BrowserRouter as Router,
  
  Link, Route, Switch } from 'react-router-dom';

import withAuth from './withAuth';

import Home from './hooks/Home';
import Secret from './hooks/Secret';
import Login from './hooks/Login';
import Register from './hooks/Register';

export const AuthContext = React.createContext();

export default class App extends Component {
  render() {
    return (
      <Router>
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
          <Route path="/register" component={Register} />
        </Switch>
      </div>
      </Router>
    );
  }
}
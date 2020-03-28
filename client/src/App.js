import "./App.css";
import React ,{useState} from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import withAuth from './withAuth';
import Home from './hooks/home';
import Login from './hooks/Login/Login';
import Register from './hooks/Register';
import Header from './hooks/Header';
import Logout from './hooks/Logout';
import Users from './hooks/Users';
import Secret from './hooks/Secret';

/* in work */
import Chat from './hooks/Chat/Chat'
import Join from './hooks/Join'
import Account from './hooks/User_account';
/*        */
import AuthReducer from './store/reducers/auth_reducer';

const initialState = {
  is_authenticated: false,
  user: null,
  token: null, 
};
 
export const Context = React.createContext();

function App() {
  
  const [state, dispatch] = React.useReducer(AuthReducer, initialState);

  const [id, setId] = useState('');


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
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/users">Users List </Link></li>

          <li><Link onClick={e => (!id) ? e.preventDefault() : null} to={`/users/${id}`}>Profile</Link></li>

          <li><Link to="/join">join</Link></li>

        </ul>
        
        <Switch>
          <Route path="/" exact>{ !state.is_authenticated ? <Login /> : <Home />}</Route>
          <Route path="/secret" exact component={withAuth(Secret)} />
          <Route path="/register" exact>{ !state.is_authenticated ? <Register /> : <Home />} </Route>
          <Route path="/users" exact><Users /></Route>

          <Route path="/users/:id" exact component={Account}></Route>

<Route path='/chat' component={Chat}/>
<Route path="/join" exact><Join /></Route>

          </Switch>
        <Logout is_authenticated={state.is_authenticated} />
          
          
      </div>
      </ Context.Provider> 
         
    ); 
    
  }
  
  export default App;

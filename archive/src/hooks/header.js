//will contain the links to the components and a login or logout button based on the user authentication state.

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../utils/context';

const Header = () => {
  const context = useContext(Context)

    return(
        <div>
          <Link to='/' style={{padding: '5px'}}>
            Home
          </Link>
          <Link to='/profile' style={{padding: '5px'}}>
            Profile
          </Link>
          <Link to='/hooksform' style={{padding: '5px'}}>
            Hooks Form
          </Link>
          <Link to='/hookscontainer' style={{padding: '5px'}}>
            Hooks Container
          </Link>
          <Link to='/privateroute' style={{padding: '5px'}}>
            Private Route
          </Link>
          {!context.authState
            ? <button onClick={() => context.authObj.login()}>Login</button>
            : <button onClick={() => context.authObj.logout()}>Logout</button>
          }
        </div>
  )};

//We also have a ternary expression that displays either 
//a login or logout button depending on whether the user is authenticated or not.

export default Header;
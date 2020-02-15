import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../utils/context';

const Header = () => {
 // const context = useContext(Context)

    return(
        <div>
          <Link to='/' style={{padding: '5px'}}>
            Home
          </Link>
          <Link to='/profile' style={{padding: '5px'}}>
            Profile
          </Link>
          
          {!context.authState
            ? <button onClick={() => context.authObj.login()}>Login</button>
            : <button onClick={() => context.authObj.logout()}>Logout</button>
          }
        </div>
  )};


export default Header;
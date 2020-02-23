import React, { useContext } from 'react';



import Context from '../App';


const Header = () => {

  const context = useContext(Context)

    return(
        <div>

<nav id="navigation">
      <h1 href="#" className="logo">
        HOOKED
      </h1>
    </nav>
          
          {/*!context.authState
            ? <button onClick={() => context.authObj.login()}>Login</button>
            : <button onClick={() => context.authObj.logout()}>Logout</button>
          */}
        </div>
  )
};


export default Header;
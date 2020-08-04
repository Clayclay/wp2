import React, { useEffect, useState , useContext } from 'react';
import {authContext} from '../../App';

import './Home.css';

const Home = () => {
  const initialState = {
  content:'Loading...'
  };

  const {  state  }  = useContext(authContext);
  const [message, setMessage] = useState(initialState);
 
  
  // instead of state.user.nickname
  //const { user: { nickname } = {} } = state;
  
useEffect(() => {
    
    fetch('/api/home')
      .then(res => res.text())
      .then(res =>   setMessage({ content: res })    )

  },[]);
  

  return (

    <div className="container">
    <p>{message.content} {state.user.nickname}</p>
  
    </div>
  );


}
export default Home;



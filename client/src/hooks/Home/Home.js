import React, { useEffect, useState , useContext } from 'react';
import {authContext} from '../../App';

import './Home.css';

import Match from '../Friend/Match';  

const Home = () => {
  const initialState = {
  content:'Loading...'
  };

  const { state: authState }  = useContext(authContext);
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
   
    <p>{message.content} {authState.user.nickname}</p>
    
     Match \0/
    {authState.user.friends.length > 0 && 
      authState.user.friends.map((userId) =>
        <Match  userId={userId} key={userId}  />       
      )}

    
  
    </div>
  );


}
export default Home;



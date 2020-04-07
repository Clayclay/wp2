import React, { useEffect, useState , useContext } from 'react';
import { authContext } from "../App";
import { Link } from 'react-router-dom';


const Home = () => {

  const initialState = {
  content:'Loading...'
  
  };


  const [message, setMessage] = useState(initialState);
  const {  state , dispatch}  = useContext(authContext);

  const useCurrentUser = () => useContext(authContext);
  const { user: { _id, nickname } = {} } = state;
  
useEffect(() => {
    
    fetch('/api/home')
      .then(res => res.text())
      .then(res =>   setMessage({ content: res })    )
      
      ;

  },[]);
  

  return (

    <div>
<p>{message.content} {nickname}</p>


<ul>
    
    <li><Link onClick={e => (!_id) ? e.preventDefault() : null} to={`/users/${_id}`}>Profile</Link></li>
    
  </ul>



</div>
  );


}
export default Home;


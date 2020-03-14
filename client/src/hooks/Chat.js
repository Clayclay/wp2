// maintenant est de lier le code de socket client qui communiquera avec le socket côté serveur 
import React, { useEffect } from 'react';

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');


const Chat = () => {
        
  const initialState = {
    content:'Loading...'
    };
    const [message, setMessage] = React.useState(initialState);
  
  

    /* useEffect is an alternative to using React class lifecycle methods;
     three of them in-particular:
      componentDidMount, componentDidUpdate, and componentWillUnmount.*/  
  useEffect(() => { 
    fetch('/api/chat')
    .then(res => res.text())
    .then(res =>   setMessage({ content: res })    );
      
  },[]);         
  
    return (<div>
      <p></p>

      <ul id="messages"></ul>
    <form action="">
      <input id="m" autocomplete="off" /><button>Send</button>
    </form>


      
     
  </div>  )
    
  
  }
  export default Chat;
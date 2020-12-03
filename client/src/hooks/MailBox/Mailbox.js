import React , { useEffect, useReducer, useContext, useState }  from 'react';
import {authContext} from '../../App';

import {getMessages} from '../../function/GetMessages';
      
      

const Mailbox = () => {
    const { state: authState } = useContext(authContext);
    const id = authState.user._id;
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [messages,setMessages]=useState([]);

      useEffect(() => {        
        setLoading(true);
        getMessages(/*smthg*/ )
        .then(messages => {
         
          setMessages(messages)
          setLoading(false);
          })
      }, []);

    return (
       <div className = "container">
     
      </div>
      
    )
}

export default Mailbox;
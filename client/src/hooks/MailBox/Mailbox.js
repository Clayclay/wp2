import React , { useEffect, useReducer, useContext, useState }  from 'react';
import {authContext} from '../../App';

import {getMessages} from '../../function/GetMessages';
      
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

const Mailbox = () => {
    const { state: authState } = useContext(authContext);
    const id = authState.user._id;
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [messages,setMessages]=useState([]);


      useEffect(() => {        
        setLoading(true);
        getMessages(id)
        .then(messages => {
console.log("messages mailbox",messages)
          setMessages(messages)
          setLoading(false);
          })
      }, []);


    return (
       <div className = "container">

     { messages.length > 0 &&
      messages.map((message) => (
       <li key={message._id}> 
          {message.sender}
          {message.receiver}
         
          {message.text}
          <time>{message.createdAt} </time>
          <time>{message.updatedAt} </time>

          
      {  id == message.sender ?  message.receiver   :  message.sender     }
          
          <Button   component={Link}  variant="outlined"
          onClick={e => (!message.chatId) ? e.preventDefault() : null} to={`/chat/${message.chatId}/${id}`}
          >Chat {message.chatId}</Button>

      </li>   
        ))     
     }

      </div>
    )
}

export default Mailbox;
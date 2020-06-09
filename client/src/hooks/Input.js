import React , { useState, useContext }  from 'react';
import {authContext} from '../App';
import {  useParams } from 'react-router-dom'


import './Profile';

const Input = () =>   {  
    
    
    const { state: authState} = React.useContext(authContext);
   
    let params = useParams();
    const id = params.id ;
    const receiver = id ;
    const sender = authState.user._id;
    
    console.log(receiver);
    console.log(sender);
    
    const [message,setMessage] = useState('');

    const sendMessage = (event) => {
        event.preventDefault();
        // for not refreshing the all page again and afain
        if(message){
          // emit('sendMessage', message, () => setMessage(''));
        }
    }


return (

    <div className="inputContainer">
        <form className="form">
            <input className="input"
            type="text"
            placeholder="type a message.."
            value={message} 
            onChange={(event) => setMessage(event.target.value)} 
            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null }
            />
              <button className="sendButton" onClick={(event) => sendMessage(event)}> Send </button>
        </form>

    </div>
)


}

export default Input;
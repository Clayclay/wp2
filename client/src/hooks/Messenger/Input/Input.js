import React from  'react';
import './Input.css';
//Send et set undefined how to receive ? need to be pass as proprieties
// les def ds le chat comp puis ajouter {} ds input

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const InputMsg = ({ message, setMessage, sendMessage , isTyping }) => 

(
    <form className="form">
        <Input 
        className="input"
        type="text"
        placeholder="type a message.."
        value={message} 
        onChange={(event) => setMessage(event.target.value)} 
        onKeyPress={event =>  event.key === 'Enter' ? sendMessage(event) : null  }
        onkeyup={event => isTyping(event)}
        />
        
        <Button 
        className="sendButton" 
        variant="contained" color="primary"
        onClick={(event) => sendMessage(event)}> Send </Button>

    </form>

) 

export default InputMsg;
import React from 'react';
import './Input.css';


//Send et set undefined how to receive ? need to be pass as proprieties
// les def ds le chat comp puis ajouter {} ds input
const Input = ({ message, setMessage, sendMessage }) => (
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


)

export default Input;
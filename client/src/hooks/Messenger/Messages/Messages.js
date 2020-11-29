import React from 'react';
import './Messages.css'; //todo

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from '../Message/Message';

//Send et set undefined how to receive ? need to be pass as proprieties
// les def ds le chat comp puis ajouter {} ds input
const Messages = ({messages, sender, oldMessage }) => (

  <ScrollToBottom className="messages">
   {/* scroll and then loop thrue the message for this need to go back to chat.js*/}
  
  {oldMessage.map((message,i)  => <div key={i}><Message message={message}  sender={sender} /></div>)}

  {messages.map((message,i) => <div key={i}><Message message={message} sender={sender} /></div>)}
{/*   Message separate component need  some parameter */ }

  </ScrollToBottom>

)

export default Messages;
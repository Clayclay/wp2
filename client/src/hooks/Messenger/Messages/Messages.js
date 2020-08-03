import React from 'react';
import './Messages.css';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from '../Message/Message';

//Send et set undefined how to receive ? need to be pass as proprieties
// les def ds le chat comp puis ajouter {} ds input
const Messages = ({messages, name, messHisto }) => (

  <ScrollToBottom className="messages">
   {/* scroll and then loop thrue the message for this need to go back to chat.js*/}
  

{messHisto.map((message,i) => 
<div key={i}>
<div className="messageContainer justifyStart">
        <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{message.message}</p>
        </div>
        <p className="sentText pl-10">{message.sender}</p>
    </div>
</div> )}

{ /* {messHisto.map((message,i)  => <div key={i}><Message message={message.message} name={message.sender} /></div>)}
*/}

   {messages.map((message,i) => <div key={i}><Message message={message} name={name} /></div>)}
{/*   Message separate component need  some parameter */ }

  </ScrollToBottom>

)

export default Messages;
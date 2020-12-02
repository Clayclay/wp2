import React from 'react';
import './Message.css';       //TODO 
import ReactEmoji from 'react-emoji';

// probleme de confusion entre user + id sender voir convertir id en  name

//Check previous component propriety and add it ()
const Message = ({message : {sender, text}, name }) => {
let isSentByCurrentUser = false;

const trimmedName = name.trim().toLowerCase();

if(sender === trimmedName ){
    isSentByCurrentUser = true ;
}
   //Base on variable sentbycurrent we ll send thing differently

return (
    /* if */ isSentByCurrentUser ?
    (
        <div className="messageContainer justifyEnd">
            <p className="sentText pr-10">{name}</p>
            <div className="messageBox backgroundBlue">
                <p className="messageText colorWhite">{ReactEmoji.emojify(text) }</p>
            </div>
        </div>// render somthing
    )

    : /* not => */
    (
        <div className="messageContainer justifyStart">
        <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{text}</p>
        </div>
        <p className="sentText pl-10">{sender}</p>
    </div>
    )
)

}
// logic + variable = {} for render only ()
export default Message;
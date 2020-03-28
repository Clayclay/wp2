import React from 'react';
import './Message.css';
import ReactEmoji from 'react-emoji';

//Check previous component propriety and add it ()
const Message = ({message : {user, text}, name }) => {
let isSentByCurrentUser = false;

const trimmedName = name.trim().toLowerCase();

if(user === trimmedName ){
    isSentByCurrentUser = true ;
}
   //Base on variable sentbycurrent we ll send thing differently

return (
    /* if */ isSentByCurrentUser ?
    (
        <div className="messageContainer justifyEnd">
            <p className="sentText pr-10">{trimmedName}</p>
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
        <p className="sentText pl-10">{user}</p>
    </div>
    )
)

}
// logic + variable = {} for render only ()
export default Message;
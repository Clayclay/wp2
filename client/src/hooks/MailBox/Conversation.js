import React from 'react';


const Conversation = ({conversation}) => {

    return(

        <div className="profiles">
           
            <div>ConversationId : {conversation.conversationId}</div>

            <div>Users : 
                {conversation.users.map(user => (
                    <li key={user}>{user}</li>
                ))}
            </div>
        </div>
    );
};

export default Conversation;
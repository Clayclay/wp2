import React from 'react';

export const Message = ({message}) => {
  
    return(

<div className="Messages">
     
      
      <div className="content">
        
        <div>{message._id}</div>
        <div>{message.message}</div>       

      </div>
    </div>
    );
}

export default Message;

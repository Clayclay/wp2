import React, { useEffect , useContext} from 'react';
import {Link} from 'react-router-dom';
import {authContext} from '../../App';

const Conversation = ({userId}) => {

   
const { state: authState} = useContext(authContext);

useEffect(() => {

const myId = authState.user._id;

    fetch (`http://localhost:5000/api/conversation` ,{ 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`
    },
    body: JSON.stringify({         
      users: [myId,userId]  
    })
  })
  .then(res =>  res.json(
    console.log("conversation resjson log",res)
  ))
    .catch(error => {
    console.error(error);
  });

}, [authState,userId]);

  return (
      <div className="container">
    
    <Link onClick={ e => (!userId) ? e.preventDefault() : null} to={`/chat?room=${userId}`}>
        <button className={'button mt-20'} type="submit">Message</button>
        </Link>       

      </div>
  );
};

export default Conversation;
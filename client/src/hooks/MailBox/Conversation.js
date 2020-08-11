import React, { useEffect, useReducer, useState } from 'react';
import * as ACTION_TYPES from '../../store/actions/action_types';
import {Link} from 'react-router-dom';

const initialState = { };

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.REQUEST:
      return {
        ...state,
        isFetching: true,
        hasError: false
      };
    case ACTION_TYPES.SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: action.payload
      };
    case ACTION_TYPES.FAILURE:
      return {
        ...state,
        hasError: true,
        isFetching: false
      };
    default:
      return state;
  }
};

const Conversation = ({conversation}) => {
    const [, dispatch]= useReducer(reducer, initialState);
    const id = conversation.conversationId;

    const  [ messages, setMessages] = useState([]);

    useEffect(() => {
        dispatch({
            type: "FETCH_REQUEST"
        });
        fetch(`http://localhost:5000/api/messages/${id}`,{
          method: "GET",
          headers:{       }
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            } else {
              throw res;
            }
    })
    .then(resJson => {
        console.log(resJson);
        setMessages(resJson);
        dispatch({
          type: "FETCH_MESSAGES_SUCCESS",
          payload: resJson
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: "FETCH_MESSAGES_FAILURE"
        });
      });

    },  [id]);

    /*<GetName id={message.sender} /> ---> problem async car affiche avant de recevoir info
    */
   
    return(

        <div className="">
            <h3>ConversationId : {conversation.conversationId}</h3>
            <ul> {messages.map(message => (
              
               <li key={message._id}>

               <p>from : {message.user}</p>
                                
                  <Link onClick={e => (!message.sender) ? e.preventDefault() : null} to={`/chat/${message.sender}`}>
                  {message.text}
                  </Link>
                
                <p><time>{message.createdAt}</time></p>

               </li>
   
            ))}</ul>
        </div>
    );
};

export default Conversation;
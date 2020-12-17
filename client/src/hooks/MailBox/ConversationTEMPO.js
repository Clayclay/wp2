import React, { useEffect, useReducer, useState } from 'react';
import * as ACTION_TYPES from '../../store/actions/action_types';
import {Link} from 'react-router-dom';
import ConvCard from './ConvCardTEMPO';

import ListItem from '@material-ui/core/ListItem';

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
    console.log("id",id)
    const  [ messages, setMessages] = useState([]);

    useEffect(() => {
        dispatch({
            type: "FETCH_REQUEST"
        });
        fetch(`http://localhost:5000/api/messages/${id}`,{
          method: "GET",
          headers:{  }
        })
        .then(res => {
            if (res.ok) {
              return res.json();
            } else {
              throw res;
            }
    })
    .then(resJson => {
        console.log("messages",resJson);
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

 
   
    return(

        <div className="">

            <ul> {messages.map(message => (
               <ListItem  key={message._id} component={Link}   onClick={e => (!message.sender) ? e.preventDefault() : null} to={`/chat/${message.sender}`} >
                  <ConvCard  message={message}   />
                  
               </ListItem >
            ))}</ul>
        </div>
    );
};

export default Conversation;
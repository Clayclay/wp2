import React, { useEffect, useReducer, useState } from 'react';
import * as ACTION_TYPES from '../../store/actions/action_types';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import ConvCard from './ConvCard';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

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

  const classes = useStyles();
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
      <List className={classes.root}>

             {messages.map(message => (
               <GridListTile key={message._id} >
              <ConvCard  message={message} />  
              </GridListTile>
            ))}

        </List>
    );
};

export default Conversation;
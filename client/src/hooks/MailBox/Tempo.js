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

    /*<GetName id={message.sender} /> ---> problem async car affiche avant de recevoir info
    */
   
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


/////MAILBOX///////


import React , { useEffect, useReducer, useContext }  from 'react';
import {authContext} from '../../App';
import Conversation from './ConversationTEMPO';
import  './Mailbox.css';

    const initialState = {
        conversations: [],
        isFetching: false,
        hasError: false,
      };
      
      const reducer = (state, action) => {
        switch (action.type) {
          case "FETCH_CONVERSATIONS_REQUEST":
            return {
              ...state,
              isFetching: true,
              hasError: false
            };
          case "FETCH_CONVERSATIONS_SUCCESS":
            return {
              ...state,
              isFetching: false,
              conversations: action.payload
            };
          case "FETCH_CONVERSATIONS_FAILURE":
            return {
              ...state,
              hasError: true,
              isFetching: false
            };
          default:
            return state;
        }
      };


const Mailbox = () => {
    const { state: authState } = useContext(authContext);
    const [state, dispatch] = useReducer(reducer, initialState);
    const id = authState.user._id;

      useEffect(() => {
        dispatch({
          type: "FETCH_CONVERSATIONS_REQUEST"
        });
        fetch(`http://localhost:5000/api/conversation/${id}`, {
          headers: {
            Authorization: `Bearer ${authState.token}`
          }
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
            dispatch({
              type: "FETCH_CONVERSATIONS_SUCCESS",
              payload: resJson
            });
          })
          .catch(error => {
            console.log(error);
            dispatch({
              type: "FETCH_CONVERSATIONS_FAILURE"
            });
          });
          
      }, [authState.token]);
    return (
       <div className = "container">
      <div id="conversations-list">  <p>Messages</p>
        {state.isFetching ? (
          <span className="loader">LOADING...</span>
        ) : state.hasError ? (
          <span className="error">AN ERROR HAS OCCURED</span>
        ) : (
          <>
            {state.conversations.length > 0 &&
              state.conversations.map(conversation => (
                <Conversation key={conversation._id.toString()} conversation={conversation} />
              ))}
          </>
        )}
      </div>
      </div>
      
    )
}

export default Mailbox;


////////////////////MAILBOX CARD////////////////////



const MailboxCard = ({message}) => {

    const classes = useStyles();

    const { state: authState } = useContext(authContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sender, setSender]=useState({});
    const [receiver, setReceiver]=useState({});

    const id = authState.user._id;
    
    const [isUser,setisUser]=useState();

    const dateMsg = new Date(message.createdAt)


    useEffect(() => {        
        setLoading(true);
        getUser(message.sender)
        .then(sender => {
          setSender(sender)
          setLoading(false);
          })
        if (message.sender === id ) {
          setisUser(true)
         } else {
           setisUser(false)
         } 
      }, [message.sender]);

      useEffect(() => {        
        setLoading(true);
        getUser(message.receiver)
        .then(receiver => {
        setReceiver(receiver)
          setLoading(false);
          })
     
    
     
  }, [message.receiver]);


    return (

          
         isUser? ( 
         
              <div   >
              <ListItem 
                alignItems="flex-start"
                component={Link} 
                onClick={e => (!message.chatId) ? e.preventDefault() : null} to={`/chat/${message.chatId}/${id}`}   >
        
                <ListItemAvatar>
                    <AvatarUser avatar={receiver.avatar} nickname={receiver.nickname}  online={receiver.online}  />  
                </ListItemAvatar>
                    
                    <ListItemText
              primary= {receiver.nickname} 
              secondary={  
                <React.Fragment>
                  
                  
                  <ReplyIcon fontSize="small" color="disabled" />
                  
                  {message.text}  
                 
                </React.Fragment>             
              }
            />
              <Typography variant="body2" component="span" className={classes.inline}  color="textPrimary" >
                    { dateMsg.toLocaleString()  /* message.updatedAt */ }  
              
                    </Typography>

            </ListItem>
            <Divider variant="inset" component="li" /></div>          
                    )
                         : 
                  ( <div>
                    <ListItem alignItems="flex-start"    key={message._id}  component={Link}  onClick={e => (!message.chatId) ? e.preventDefault() : null} to={`/chat/${message.chatId}/${id}`}   >
                     <ListItemAvatar>
                        <AvatarUser avatar={sender.avatar} nickname={sender.nickname}  online={sender.online}  />  
                     </ListItemAvatar> 
                      <ListItemText
                      primary= {sender.nickname} 
                      secondary={message.text}
                      />
                  
                  <Typography variant="body2" component="span" className={classes.inline}  color="textPrimary" >
                    { dateMsg.toLocaleString()  /* message.updatedAt */ }  
                  </Typography>
          
          </ListItem>
          <Divider variant="inset" component="li" />
                    </div>
                    )  

    )
}*/}

export default MailboxCard;
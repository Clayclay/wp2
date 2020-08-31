import React, { useEffect, useState, useContext } from  'react';
import {  useParams } from 'react-router-dom';
import io from 'socket.io-client';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';


import './Chat.css';
import {authContext} from '../../../App';

import GetName from '../../../function/GetName';

let socket;

const initialState = { }
/*
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
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
*/
const Chat = () => {
    let params = useParams();
    const {  state: authState }  = useContext(authContext);
    const idSender = authState.user._id;

    const idReceiver = params.id;
    
    const name = authState.user.nickname;

    const ENDPOINT = 'http://localhost:5000' ;

    //const [, dispatch]= useReducer(reducer, initialState);
     
    const  [users, setUsers] = useState('');

    const  [ message, setMessage] = useState('');
    const  [ messages, setMessages] = useState([]);

    const [ messHisto, setMessHisto]= useState ([]);

    //* STEP 1 : having a unic id conversation by using user id *//

    const getIdWithCompare = (idReceiver, idSender) => {
      if (idSender < idReceiver) {
        return idSender+idReceiver  
      }
      else {
       return idReceiver+idSender
      }  
  }

 const ConversationId = getIdWithCompare(idReceiver, idSender);
 const room = ConversationId ;

 // if conversation doesnt exist in BDD, create conv

    useEffect(() => {
  
      fetch (`http://localhost:5000/api/conversation` ,{ 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authState.token}`
      },
      body: JSON.stringify({         
       conversationId: getIdWithCompare(idReceiver, idSender),
       users: [idSender,idReceiver]
      })
    })
    .then(res =>  { 
      if (res.ok) {
        return res.json();
      } else {
        throw res;
      }
  })
  .then(resJson => {
    //console.log("resJson reponse",resJson);
    
  })
    .catch(error => {
      console.error("conv already exist",error);
     
    });


//* STEP 2 : retrieve historic of message *//


fetch(`/api/messages?convId=${ConversationId}`, {
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
    setMessHisto(resJson);
  })
  .catch(error => {
    console.log(error);
  });

  }, [idReceiver,idSender, authState]);

//console.log("message historic",messHisto)

//* STEP 3 : SOCKET *//

    useEffect(() => {
       socket = io(ENDPOINT); 
     // room and message need to be init BEFORE
       
      console.log("room",room)
        socket.emit('join',{name,room}, (error) => {
            if(error){
                alert(error);
            }
        });
    }, [ENDPOINT,name,room]);
    
    
    useEffect(() => {
        socket.on('message', message => {
          setMessages(messages => [ ...messages, message ]);
        });  
       
       socket.on('roomData', ({ users }) => {
        setUsers(users);
      });
    }, []);
  
    // function for sending messages
    const sendMessage = (event) => {

        event.preventDefault();
        // for not refreshing the all page again and afain
        if(message){
          //console.log("socket id" , socket.id);
          socket.emit('sendMessage', message, ConversationId, idReceiver, idSender, () => setMessage(''));
        }
    }
 
    // Fonction is typing a mettre en forme
    /*const isTyping = (event) => {
      event.preventDefault();
      socket.emit(
        console.log("typing")
        /*"Typing", message*/
        // probleme de clavier
       /* );/*
      socket.on("Typing", () => {
          console.log(  " is typing") ;
        });
      };*/
//console.log("receiver" , idReceiver, "sender", idSender);

    return(

        // Main component with a lot of data so we gonna create a separate file
        <div className="outerContainer">
            <div className="chatContainer">
 
               {/*how to get the roomname dynamicly ? 
               we have a room propriety in chat.js*/}
                <InfoBar receiver= {<GetName id={idReceiver} />}  />
                {/* need messages proprieties */}
                <Messages messages={messages} name={name} messHisto={messHisto}/>

                <Input message={message} setMessage={setMessage} /*isTyping={isTyping}*/ sendMessage={sendMessage} />

            </div>
            <TextContainer users={users}/>
        </div>
    );
}

// VOIR DISCONNECT

export default Chat;
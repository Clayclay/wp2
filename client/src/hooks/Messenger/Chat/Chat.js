import React, { useEffect, useState, useContext } from  'react';

/*SOCKET IO */ 
import io from 'socket.io-client';

/**/
import {  useParams } from 'react-router-dom';
import {authContext} from '../../../App';

/*CSS BASE */
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import './Chat.css';

/* INPUT */
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { Grid } from '@material-ui/core';

/* AVATAR */ 
import {getUser} from '../../../function/GetUser';
import AvatarUser from '../../AvatarUser';

/*MESSAGES*/
import Messages from '../Messages/Messages';


let socket;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

const Chat = () => {
  const classes = useStyles();

  let params = useParams();
  const {  state: authState }  = useContext(authContext);
  
  const sender = authState.user._id;
  const receiver = params.id;
  const name = authState.user.nickname;

  const [receiverUser, setReceiverUser] = useState({});
  const  [ textMsg, setTextMsg] = useState('');
  //const  [ message, setMessage] = useState('');
  const  [ messages, setMessages] = useState([]);
  const [ oldMessage, setOldMessage]= useState ([]);

  const [roomId, setRoomId]= useState (params.roomid);
  console.log("roomId",roomId, "user", params.id)

  /*Check if roomId already exist if not create...*/
  useEffect(() => {
    /*  STEP 1 */
    fetch (`http://localhost:5000/api/room` ,{ 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`
        },
        body: JSON.stringify({         
        roomid: roomId,
        user1: sender,
        user2: receiver
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
    console.error("room already exist",error);
  })
  }, [roomId]);

useEffect(()=>{
/* STEP 2 : retrieve historic of message */
fetch(`http://localhost:5000/api/msghisto/${roomId}`, {
  method: "GET",
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
    setOldMessage(resJson);
  })
  .catch(error => {
    console.log(error);
  });

  }, []);



 /* SOCKET IO */ 
 const ENDPOINT = 'http://localhost:5000';

/* Get User */
useEffect(()=>{
  const id = receiver
  getUser(id)
  .then( response => {
    setReceiverUser(response)
  })
},[receiver]);


useEffect(() => {  
  socket = io(ENDPOINT); 
  console.log('roomId',roomId);
    socket.emit('join',{roomId,sender}, (error) => {
      if(error){
          alert(error);
      }
    }); 
    return  ()=>{
      socket.emit('leave',{roomId,sender}, (error)=>{
        if(error){
          alert(error);
        }
      })
    }
 }, []);


 useEffect(() => {
  console.log("step2")
  socket.on('message', message => {
    setMessages(messages => [ ...messages, message ]);
  });  
  console.log('messages:',messages)
}, []);

const sendMessage = (event) => {
  event.preventDefault();   // for not refreshing the all page again and afain
   if(textMsg){
     socket.emit('sendMessage', sender,receiver,textMsg,roomId, () => setTextMsg(''));
   } 
};

    return(
      <div className="outerContainer" >
      <div className="chatContainer">
       <Box maxWidth="sm"  >
         <Container maxWidth="sm">
            <AvatarUser avatar={receiverUser.avatar}  nickname={receiverUser.nickname} online={receiverUser.online}/>
          </Container>
        </Box>

      
      <Box maxWidth="sm" overflow="hidden" className="textContainer" >
        <Container maxWidth="sm">
          <Grid item xs={12}>
            <Messages messages={messages} name={name} oldMessage={oldMessage}/>
          </Grid>
        </Container> 
      </Box>
      
      <Box maxWidth="sm" overflow="hidden" className="chatInput" >
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <TextField
         className="input" 
          id="textMsg"
          name="textMsg"
          size="small"
          type="text"
          placeholder="message.."
          value={textMsg} 
          onChange={(event) => setTextMsg(event.target.value)} 
          onKeyPress={event =>  event.key === 'Enter' ? sendMessage(event) : null  }
          //onkeyup={event => isTyping(event)}
          />
          
        </FormControl> 
      </Box>
      </div>
      </div>
    )
}



export default Chat;

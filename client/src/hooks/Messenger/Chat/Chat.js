import React, { useEffect, useState, useContext } from  'react';

/*SOCKET IO */ 
import io from 'socket.io-client';

/**/
import {  useParams } from 'react-router-dom';
import {  authContext } from '../../../App';

/*CSS BASE */
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import { Grid } from '@material-ui/core';


import IconButton from '@material-ui/core/IconButton';

/* AVATAR */ 
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {getUser} from '../../../function/GetUser';
import AvatarUser from '../../AvatarUser';

/*MESSAGES*/
import Messages from '../Messages/Messages';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import InputChat from '../Input/InputChat';


let socket;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '80vh'
  },
  margin: {
    margin: theme.spacing(1),
  },
  topSection:{
   
  },
  messageSection:{
      height: '55vh',
    overflow: 'auto'
  },
  inputSection:{
   
    padding: '8px 0px 0px',

  }
 

 
}));

const Chat = () => {
  const classes = useStyles();

  let params = useParams();
  const {  state: authState }  = useContext(authContext);
  
  const sender = authState.user._id;
  const receiver = params.id;
  const name = authState.user.nickname;

  const [receiverUser, setReceiverUser] = useState({});

  const [ textMsg, setTextMsg] = useState('');
  const [ img, setImg] = useState([]);

  //const  [ message, setMessage] = useState('');
  const [ messages, setMessages] = useState([]);
  const [ oldMessage, setOldMessage]= useState ([]);

  const [roomId, setRoomId]= useState (params.roomid);
  //console.log("roomId",roomId, "user", params.id)

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
  //console.log('roomId',roomId);
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
  socket.on('message', message => {
    setMessages(messages => [ ...messages, message ]);
  });  
  console.log("step2",'messages:',messages)
}, []);


const sendMessage = (event) => {
  event.preventDefault();   // for not refreshing the all page again and afain
  if(textMsg){
    console.log("type text ")
     //socket.emit('sendMessage', sender,receiver,textMsg,roomId, () => setTextMsg(''));
  }
  /*if (imgMsg){
    console.log("type img")
    socket.emit('sendMessage', sender,receiver,textMsg,roomId, () => setTextMsg(''));
  }*/
};


    return(

      <Container maxWidth="sm"  className={classes.root}>

 
      <Grid container  spacing={1} className={classes.topSection} >
        <Grid item xs={2} >
          <IconButton
            aria-label="back"
            size="medium"
            onClick={() => {  }}
            component={Link}  
            to="/mailbox"
            label="Messages" 
          >
            <ArrowBackIosIcon color="action" />
          </IconButton>
        </Grid>
        <Grid item xs={8}>
        <Typography variant="h4" component="h4">
        {receiverUser.nickname}
        </Typography>
        </Grid>

        <Grid item  xs={2} >
          <AvatarUser classNameEdit={classes.large} avatar={receiverUser.avatar}  nickname={receiverUser.nickname} online={receiverUser.online}/>
        </Grid>
      </Grid>

      <Divider />
      
      <Grid container  className={classes.messageSection}>
        <Messages messages={messages} name={name} oldMessage={oldMessage}/>
      </Grid>

        <Divider />

        <Grid container className={classes.inputSection} >
        <InputChat   textMsg={textMsg} sendMessage={sendMessage} setImg={setImg} imgMsg={img}  setTextMsg={setTextMsg}  />
        </Grid>

        <Divider />
      
      </Container>
    )
}



export default Chat;

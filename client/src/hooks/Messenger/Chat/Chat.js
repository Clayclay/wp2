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

import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

/* INPUT */
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


/* AVATAR */ 
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
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
  input: {
    display: 'none',
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

      <Container maxWidth="sm">
      <div className="outerContainer" >
 
      <Grid container spacing={3}>
      <Grid item >
        <IconButton
          aria-label="back"
          size="large"
          onClick={() => { alert('clicked') }}
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

        <Grid item >
          <AvatarUser classNameEdit={classes.large} avatar={receiverUser.avatar}  nickname={receiverUser.nickname} online={receiverUser.online}/>
        </Grid>

      </Grid>

      
      <Box maxWidth="sm" overflow="hidden" className="textContainer" >
        <Container maxWidth="sm">
          <Grid item xs={12}>
            <Messages messages={messages} name={name} oldMessage={oldMessage}/>
          </Grid>
        </Container> 
      </Box>
      
<Grid container spacing={3} className="chatInput" >
  

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
  

<input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
<label htmlFor="icon-button-file">
  <IconButton  aria-label="upload picture" component="span">
    <PhotoCamera />
  </IconButton>
</label>


<Button variant="contained"
type="submit"
onClick={sendMessage}
>Send</Button>
         
</FormControl> 

</Grid>

      </div>


      </Container>
    )
}



export default Chat;

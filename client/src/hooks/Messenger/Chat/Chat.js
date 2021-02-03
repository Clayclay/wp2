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

/* ROOM */
import {checkRoom} from '../../../function/CheckRoom';

/* AVATAR */ 
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {getUser} from '../../../function/GetUser';
import AvatarUser from '../../AvatarUser';

/*MESSAGES*/
import Messages from '../Messages/Messages';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import InputChat from '../Input/InputChat';
import InputPicture from '../Input/InputPicture';


/* INPUT */
import InputEmo from '../Input/InputEmo';
import SendIcon from '@material-ui/icons/Send';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';

import OutlinedInput from '@material-ui/core/OutlinedInput';

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
 /* SOCKET IO */ 
 const ENDPOINT = 'http://localhost:5000';

  const [receiverUser, setReceiverUser] = useState({});
  const [ textMsg, setTextMsg] = useState('');
  const [ img, setImg] = useState({});
  const [ messages, setMessages] = useState([]);
  const [ oldMessage, setOldMessage]= useState ([]);
  const [roomId]= useState(params.roomid);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
    setAnchorEl(null);
    };

  const addEmoji = e => {
    let emoji = e.native;
    setTextMsg( textMsg + emoji );
  };

/* Get User */
useEffect(()=>{
  const id = receiver
  getUser(id)
  .then( response => {
    setReceiverUser(response)
  })
},[receiver]);

useEffect(() => {
    /* STEP 1*/
    /*Check if roomId already exist if not create...*/

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
    //console.error("room already exist",error);
  })
}, [authState.token]);

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

  
}, [authState.token]);


useEffect(() => {  
  /* STEP 3 : Socket Io Init */
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
  //console.log("step4",'messages:',messages)
}, []);

/* SEND MESSAGE */

const sendImg = e => {
 e.preventDefault();

 setImg(e.target.files[0]);
 console.log("step 4 ", img, e.target.files[0].name);
 setTextMsg(e.target.files[0].name);
 socket.emit('sendImage', sender,receiver,img, textMsg,roomId, () => setTextMsg(''),setImg(null));

};

const sendMessage = (event) => {
  event.preventDefault();   // for not refreshing the all page again and afain
  if(textMsg ){
    console.log("type text ")
     socket.emit('sendMessage', sender,receiver,textMsg,roomId, () => setTextMsg(''));
  } 
};



return(

<Container maxWidth="sm"  className={classes.root}>

 {/*****TOP SECTION *******/ }
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
{/******MESSAGES SECTION ******/}
  <Grid container  className={classes.messageSection}>
    <Messages messages={messages} name={name} oldMessage={oldMessage}/>
  </Grid>

<Divider />

{/*******INPUT SECTION *******/}
  <Grid container className={classes.inputSection} >

        

    <Grid container  className="chatInput">
      <Grid item xs={2} align="left"><div>

        <IconButton  
        onClick={handleClick}
        aria-controls="simple-menu" 
        aria-haspopup="true"
        aria-label="+ Media Menu" 
        component="span">
          <AddIcon/>
        </IconButton>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
{/*MICRO */ }
          <MenuItem onClick={handleClose}>Todo Micro</MenuItem>
{/*PICTURE */ }
          <MenuItem onClick={handleClose}>    <InputPicture  sendImg={sendImg}    /></MenuItem>

        </Menu></div>
      </Grid>

      <Grid item xs={8}   >
{/*INPUT MSG + EMOJI */ }
        <InputChat addEmoji={addEmoji} setTextMsg={setTextMsg} textMsg={textMsg} sendMessage={sendMessage} />
      </Grid>
{/*SEND */ }
      <Grid item xs={2} align="right">
      <IconButton onClick={sendMessage} aria-label="send"   component="span" color="primary" >
        <SendIcon/>
      </IconButton>
      </Grid>

    </Grid>

  </Grid>

<Divider />   
</Container>
    )
}



export default Chat;

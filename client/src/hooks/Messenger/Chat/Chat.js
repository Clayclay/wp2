import React, { useEffect, useState, useContext } from  'react';

/*SOCKET IO */ 
import io from 'socket.io-client';

/**/
import {  useParams } from 'react-router-dom';
import {authContext} from '../../../App';

/*CSS BASE */
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
  const [receiverUser, setReceiverUser] = useState({})
    
  const  [ textMsg, setTextMsg] = useState('');
  const  [ message, setMessage] = useState('');
  const  [ messages, setMessages] = useState([]);
  const [ oldMessage, setOldMessage]= useState ([]);

  

 const sendMessage = (event) => {
  event.preventDefault();   // for not refreshing the all page again and afain
  console.log(textMsg,receiver,sender)
  if(textMsg){
    socket.emit('sendMessage', textMsg, receiver, sender, () => setTextMsg(''));
  }
}
/* Get User */
useEffect(()=>{
  const id = receiver
  getUser(id)
  .then( response => {
    setReceiverUser(response)
  })
},[receiver]);

 /* SOCKET IO */ 
 const ENDPOINT = 'http://localhost:5000';
 useEffect(() => {
   socket = io(ENDPOINT); 
     // room and message need to be init BEFORE 
 }, [ENDPOINT]);

 useEffect(() => {
  socket.on('message', message => {
    setMessages(messages => [ ...messages, message ]);
  });  
}, []);


    return(
   
      
      <Container maxWidth="sm">

        <AvatarUser avatar={receiverUser.avatar}  nickname={receiverUser.nickname} />


        <Grid item xs={12}>
          <Messages messages={messages} sender={sender} oldMessage={oldMessage}/>
        </Grid>

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
      </Container>   

    )
}



export default Chat;


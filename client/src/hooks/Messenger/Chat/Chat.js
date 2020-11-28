import React, { useEffect, useState, useContext } from  'react';

/* SOCKET IO */
import io from 'socket.io-client';

/**/
import {  useParams } from 'react-router-dom';
import {authContext} from '../../../App';

/*CSS BASE */

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

/* INPUT */
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SendIcon from '@material-ui/icons/Send';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

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

const Message = ({message : {sender,receiver, text}}) => {
  
  return (
    <div>
      {sender} 
      {text}
    </div>
  )
}

const Messages = ({messages}) => {
  {messages.map((message,i) => <div key={i}><Message message={message}  /></div>)}
}

const Chat = () => {
  const classes = useStyles();
  const ENDPOINT = 'http://localhost:5000';


  let params = useParams();
  const {  state: authState }  = useContext(authContext);
  const sender = authState.user._id;
  const receiver = params.id;
    
  const  [ textMsg, setTextMsg] = useState('');
  console.log(textMsg)
  const  [ messages, setMessages] = useState([]);
  const [ oldMessage, setOldMessage]= useState ([]);

/* SOCKET IO */
  useEffect(() => {
    socket = io(ENDPOINT); 
  // room and message need to be init BEFORE 
 }, [ENDPOINT]);


 useEffect(() => {  },[]);

 const sendMessage = (event) => {
  event.preventDefault();   // for not refreshing the all page again and afain
  if(textMsg){
    socket.emit('sendMessage', textMsg, receiver, sender, () => setTextMsg(''));
  }
}


    return(
    <Box component="span" m={1}>
      <Container maxWidth="sm">

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
  </Box> 
    )
}



export default Chat;


import React from 'react';

import Message from '../Message/Message';

import { makeStyles } from '@material-ui/core/styles';

import { Grid  } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
 root: {
 
  },
}));

//Send et set undefined how to receive ? need to be pass as proprieties
// les def ds le chat comp puis ajouter {} ds input
const Messages = ({messages, name, oldMessage }) => {
  const classes = useStyles();
return  (

  <Grid  >
   {/* scroll and then loop thrue the message for this need to go back to chat.js*/}
  
  {oldMessage.map((message,i)  => <div key={i}><Message message={message}  name={name} /></div>)}

  {messages.map((message,i) => <div key={i}><Message message={message}   name={name} /></div>)}
{/*   Message separate component need  some parameter */ }

  </Grid>

)}

export default Messages;
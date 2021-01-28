import React from  'react';

import { makeStyles } from '@material-ui/core/styles';

/* INPUT */
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

import MediaMenu from './MediaMenu' ;

const useStyles = makeStyles((theme) => ({
  }));

const InputChat = ({sendMessage,setTextMsg,  textMsg}) =>  {
    const classes = useStyles();

    return(
<Grid container spacing={2} className="chatInput">

<Grid item xs={1} align="left">
<MediaMenu />
</Grid>

<Grid item xs={10}   >

          <TextField
          fullWidth
          variant="outlined"
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

  </Grid>
  <Grid item xs={1} align="right">
  <IconButton onClick={sendMessage} aria-label="send"   component="span" color="primary"  size='large' >
    <SendIcon/>
  </IconButton>
</Grid>

</Grid>
    )
}

export default InputChat;
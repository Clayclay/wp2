import React from  'react';

import { makeStyles } from '@material-ui/core/styles';

/* INPUT */
import TextField from '@material-ui/core/TextField';

import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

import MediaMenu from './MediaMenu' ;


/*      EMOJI MART       */
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

const useStyles = makeStyles((theme) => ({
  }));

const InputChat = ({sendMessage,setTextMsg,  textMsg}) =>  {
    const classes = useStyles();


    const addEmoji = e => {
      let emoji = e.native;
      setTextMsg(
       textMsg + emoji
      );
    };

    return(
<Grid container  className="chatInput">

<Grid item xs={2} align="left">
<MediaMenu addEmoji={addEmoji}/>
</Grid>


<Grid item xs={8}   >

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
  <Grid item xs={2} align="right">
  <IconButton onClick={sendMessage} aria-label="send"   component="span" color="primary"  size='large' >
    <SendIcon/>
  </IconButton>
</Grid>

</Grid>
    )
}

export default InputChat;
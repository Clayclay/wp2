import React from  'react';

import MediaMenu from './InputEmo';
import { Grid } from '@material-ui/core';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const InputChat = ({sendMessage,setTextMsg, textMsg}) =>  {

  const addEmoji = e => {
    let emoji = e.native;
    setTextMsg( textMsg + emoji );
  };

    return(

<Grid   >
          <OutlinedInput
          fullWidth
          variant="outlined"
          className="input" 
          id="textMsg"
          name="textMsg"
          size="small"
          type="text"
          placeholder="Aa"
          value={textMsg} 
          onChange={(event) => setTextMsg(event.target.value)} 
          onKeyPress={event =>  event.key === 'Enter' ? sendMessage(event) : null  }
          //onkeyup={event => isTyping(event)}
          endAdornment={

<div> <MediaMenu addEmoji={addEmoji} />  </div>  
          }
         />
  
</Grid>



    )
}

export default InputChat;
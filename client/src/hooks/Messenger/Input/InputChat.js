import React, {useState} from  'react';

import { makeStyles } from '@material-ui/core/styles';

/* INPUT */
import TextField from '@material-ui/core/TextField';

import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';


import MediaMenu from './MediaMenu';


import FormControl from '@material-ui/core/FormControl';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

/*      EMOJI MART       */
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  }));

const InputChat = ({sendMessage,setTextMsg, setImg, img,  textMsg}) =>  {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);

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

  const addImg = e => {
    e.preventDefault();
    setImg(e.target.files[0]) 
   
   const MyformData = new FormData();
   MyformData.append('img', e.target.files[0]);

   fetch(`http://localhost:5000/api/img`, {
    method: 'PUT',
    body: MyformData
  })
  .then(res => {
    if (res.ok) {
      return res.json();
     }
      throw res;   
  })
  .then(resJson => {
    alert("img is successfully Updated");
  })
   .catch(error => {
    console.error(error);
      setImg({
        ...img,
        isSubmitting: false,
        errorMessage: error.message || error.statusText
      });
  });

   sendMessage(e)
  };

  const [values, setValues] = React.useState({
    showEmoji: false,
  });

  const handleClickShowEmoji = () => {
    setValues({ ...values, showEmoji: !values.showEmoji });
  };

  const handleMouseDownEmoji = (event) => {
    event.preventDefault();
  };

    return(
<Grid container  className="chatInput">
<Grid item xs={2} align="left">

<div>

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
    <MenuItem onClick={handleClose}>Todo Micro</MenuItem>
  
  {/*PICTURE */ }

  <Grid item > 
    <input accept="image/*" 
            name="img"
            onChange={addImg}
            className={classes.input}
            id="icon-button-file" 
            type="file" 
            />
    <label htmlFor="icon-button-file">
      <IconButton color="primary" aria-label="upload picture" component="span">
        <PhotoCamera />
      </IconButton>
    </label>
  </Grid>
</Menu>    
  </div>

</Grid>


<Grid item xs={8}   >

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

<div>  

<MediaMenu />

      
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle emoji visibility"
                onClick={handleClickShowEmoji}
                onMouseDown={handleMouseDownEmoji}
              >
                {values.showEmoji ?
                <Picker onSelect={addEmoji} 
                title='Pick your emoji…'
                style={{ position: 'absolute', bottom: '40px' }}
                set='facebook'
                  />
            : <InsertEmoticonIcon />}

              </IconButton>
            </InputAdornment>
            
</div>  
          }

         />
  


  </Grid>
  <Grid item xs={2} align="right">
  <IconButton onClick={sendMessage} aria-label="send"   component="span" color="primary" >
    <SendIcon/>
  </IconButton>
</Grid>

</Grid>
    )
}

export default InputChat;
import React, { useState } from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddIcon from '@material-ui/icons/Add';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

/*      EMOJI MART       */
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

const useStyles = makeStyles((theme) => ({
       input: {
      display: 'none',
    },
  }));
  

export default function MediaMenu({addEmoji}) {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [state, setState] = useState(null);

    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
    setAnchorEl(null);
    };

    

  const handleEmoji = () => {
  return( <Picker onSelect={addEmoji}  /> )
      };


  return (
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

        <MenuItem onClick={handleClose}>Profile</MenuItem>

  <MenuItem onClick={handleClick}>
  <ListItemIcon>
  <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
    <PhotoCamera fontSize="small"  />
  </ListItemIcon>
  </MenuItem>

  <Grid item >
 <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
  <IconButton  aria-label="upload picture" component="span">
    <PhotoCamera />
  </IconButton>
  </Grid>

 
  <MenuItem onClick={handleEmoji}>
  <ListItemIcon><EmojiEmotionsIcon  fontSize="small"  /></ListItemIcon>
  </MenuItem>
  
</Menu>
      
    </div>
  );
}
import React, { useState } from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddIcon from '@material-ui/icons/Add';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

import Button from '@material-ui/core/Button';

import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

/*      EMOJI MART       */
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

const useStyles = makeStyles((theme) => ({
       input: {
      display: 'none',
    },
  }));
  

export default function MediaMenu({addEmoji, addImg}) {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const [img, setImg] = useState(null);
  const [data, setData] = useState();

  //const [state, setState] = useState(null);

  const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
  setAnchorEl(null);
  };

  const handleImg = e => {  
    setData(
      e.target.files[0] 
    );
    
    addImg(e);

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
  
  {/*PICTURE */ }

  <Grid item > 
  
    <input accept="image/*" 
            name="img"
            onChange={handleImg}
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

 

 {/*EMOJI */ } 
 
 <Picker onSelect={addEmoji}  />


</Menu>
      
  </div>
  );
}
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
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
/*      EMOJI MART       */
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

const useStyles = makeStyles((theme) => ({
       input: {
      display: 'none',
    },
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  }));
  

export default function MediaMenu({addEmoji, addImg}) {

  const classes = useStyles();


  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
   

      </List>
     <Picker onSelect={addEmoji} 
                title='Pick your emoji…'
                style={{ position: 'absolute', bottom: '40px' }}
                set='facebook'
                  />
    </div>
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  

  const [data, setData] = useState();

  const [open, setOpen] = React.useState(false);



  const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
  };

  

  const handleClose = () => {
    setOpen(false); 
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setOpen(true);
  };

 
   

  return (
  
<div>


{['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
      

          <Picker onSelect={addEmoji} 
                title='Pick your emoji…'
               
                set='facebook'
                  />

          </Drawer>
        </React.Fragment>
      ))}



      ----


<IconButton  
onClick={handleClick}
aria-controls="simple-menu" 
aria-haspopup="true"
aria-label="Emo Media Menu" 
component="span">
  <InsertEmoticonIcon/>
</IconButton>

<Menu
  id="Emo-menu"
  anchorEl={anchorEl}
  keepMounted
  open={Boolean(anchorEl)}
  onClose={handleClose}
>
<MenuItem>
<Picker onSelect={addEmoji} 
                title='Pick your emoji…'
                style={{ position: 'absolute', bottom: '40px' }}
                set='facebook'
                  />
</MenuItem>
</Menu>    
</div>
  );
}
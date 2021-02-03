import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Drawer from '@material-ui/core/Drawer';

/*      EMOJI MART       */
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "fit-content",
    flexShrink: 0,
  },
    drawerPaper: {
      width: "fit-content",
    },
  
  }));
  

export default function InputEmo({addEmoji}) {

  const classes = useStyles();


  const [state, setState] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  

   

  return (
  
<div>


{[ 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton aria-label="upload picture" component="span"
          onClick={toggleDrawer(anchor, true)} >

            <InsertEmoticonIcon/>
          </IconButton>

          <Drawer anchor="bottom" open={state[anchor]} onClose={toggleDrawer(anchor, false)}
          classesname={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
           >
      
          <Picker onSelect={addEmoji} 
                title='Pick your emoji…'
               
                set='apple'
                  />

          </Drawer>
        </React.Fragment>
      ))}

</div>
  );
}
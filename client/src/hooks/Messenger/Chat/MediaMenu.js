import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
       input: {
      display: 'none',
    },
  }));
  

export default function MediaMenu() {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem onClick={handleClose}>My account</MenuItem>

        <Grid item >
 <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
  <IconButton  aria-label="upload picture" component="span">
    <PhotoCamera />
  </IconButton>
  </Grid>


        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
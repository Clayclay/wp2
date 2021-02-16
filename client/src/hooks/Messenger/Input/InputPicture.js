import React from  'react';
import { makeStyles } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
    input: {
      display: 'none',
    },
    }));

const InputPicture = ({sendImg}) => {
    const classes = useStyles();
 

    return(

        <Grid item > 

        <input accept="image/*" 
                name="img"
                onChange={sendImg}
                className={classes.input}
                id="icon-button-file" 
                type="file" 
                />
        <label htmlFor="icon-button-file">
          <IconButton aria-label="upload picture" component="span">
            <PhotoCamera />
          </IconButton>
        </label>
      </Grid>


    )
}

export default InputPicture ;
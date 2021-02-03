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


    /* 

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
  };*/

  

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
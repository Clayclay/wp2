import React, { useState , useContext} from 'react';
import { authContext } from "../../App";


import Button from '@material-ui/core/Button';

import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import { FormControl } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  root: {
    width: "fit-content",
    float: "right",
    '& > *': {
      margin: theme.spacing(1),
    },
  },  
  input: {
    display: 'none',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  label:{
    marginBottom: "-7px"
  }
}));

export const AddAvatar = ({user , setAvatarData, HandleAvatarSubmit}) => {
  const classes = useStyles();

  const { state: authState, dispatch } = useContext(authContext);
  const id = authState.user._id;
  
  const avatar = authState.user.avatar;  
  
  const [img, setImg] = useState(null);
 
  const url = `/uploads/`+id +`/` + avatar;
 


  const handleChange = e => {
     
      setAvatarData(
          e.target.files[0] 
         );

         if (e.target.files.length > 0) {
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            setImg(reader.result);
          });
          reader.readAsDataURL(e.target.files[0]);
        }      
  };

 
function Preview({ img }) {
  if (!img) {
    return null;
  }
  return <Avatar src={img} alt={authState.user.nickname} className={classes.large} />
  }



return (
  
  
    <Grid className={classes.root} > 
    <FormControl onSubmit={HandleAvatarSubmit}>

  <Fab color="primary"  aria-label="picture select"  className={classes.fab}>
    <label htmlFor="icon-button-file" >
    <input accept="image/*" 
            name="avatar"
            onChange={handleChange}
            className={classes.input}
            id="icon-button-file" 
            type="file" 
            />
      <PhotoCamera className={classes.label} /> 
    </label> </Fab>  
     
   
 
  
 { img!== null &&
  <Grid item >   
    Preview :
    <Preview img={img} />
    <Button className={classes.button}  type="submit" variant="contained" color="primary" >Submit</Button>
  </Grid> 
  }

  </FormControl> 
 </Grid>
);

};


export default AddAvatar ;





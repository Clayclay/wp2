import React, { useState , useContext} from 'react';
import { authContext } from "../../App";
import * as ACTION_TYPES from '../../store/actions/action_types';
import { initialState } from "../../store/reducers/auth_reducer";

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles((theme) => ({
  root: {
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
}));

export const AddAvatar = (user) => {
  const classes = useStyles();

  const { state: authState, dispatch } = useContext(authContext);
  const id = authState.user._id;
  
  const avatar = authState.user.avatar;  
  
  const [img, setImg] = useState(null);
  const [data, setData] = useState(initialState);

  const url = `/uploads/`+id +`/` + avatar;
 


  const handleChange = e => {
     
      setData(
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

 const HandleSubmit = (e) =>{
     e.preventDefault();

     const MyformData = new FormData();
     MyformData.append('avatar', data);
 
     fetch(`http://localhost:5000/api/avatar/user/${id}`, {
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
      dispatch({ 
        type: ACTION_TYPES.USER_INPUT_CHANGE,
        payload: resJson
      })
    })
     .catch(error => {
      console.error(error);
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText
        });
    });
       
 }

function Preview({ img }) {
  if (!img) {
    return null;
  }
  return <Avatar src={img} alt={authState.user.nickname} className={classes.large} />
  }



return (
  <Grid container className={classes.root} spacing={2}>
    <Grid item > 
    <Avatar src={url} alt={authState.user.nickname} className={classes.large} />
    </Grid> 
    <Grid item > 
    <form onSubmit={HandleSubmit}>
      
    <input accept="image/*" 
            name="avatar"
            onChange={handleChange}
            className={classes.input}
            id="icon-button-file" 
            type="file" 
            />
    <label htmlFor="icon-button-file">
      <IconButton color="primary" aria-label="upload picture" component="span">
        <PhotoCamera />
      </IconButton>
    </label>
    
    <Button type="submit" variant="contained" color="primary" >Submit</Button>
    </form> 
  </Grid>

  <Grid item > 
  Preview :
  <Preview img={img} />
  </Grid>

  </Grid> 
);

};


export default AddAvatar ;





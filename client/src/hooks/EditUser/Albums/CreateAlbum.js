import React , { useContext, useState } from "react";
import { authContext } from "../../../App";
import * as ACTION_TYPES from '../../../store/actions/action_types';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({ 

}));

const initialState = {
  title : "",
  description: "", 
}
const CreateAlbum = () => {
  const classes = useStyles();
  const { state: authState , dispatch } = useContext(authContext);
  const id = authState.user._id;
  const [data, setAlbum] = useState(initialState);

  
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  

const handleInputChange = event => { 
  setAlbum({
    ...data,
    [event.target.name]: event.target.value
  }); 
};

const handleCreate = (event) => {
  event.preventDefault();
  setAlbum({
    ...data,
    isSubmitting: true,
    errorMessage: null
  });
  fetch (`http://localhost:5000/api/user/${id}/albums` ,{ 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`
  },
    body: JSON.stringify({ 
      albums: {        
      title: data.title,
      description: data.description }  
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
      throw res;   
  })
  .then(resJson => {
    alert("Album is successfully created");
    dispatch({ 
      type: ACTION_TYPES.USER_INPUT_CHANGE,
      payload: resJson
    })
  })
  .catch(error => {
    console.error(error);
      setAlbum({
        ...data,
        isSubmitting: false,
        errorMessage: error.message || error.statusText
      });
  });
return handleClose()
};   
  return(
    <div className="" >
      
      <Button variant="contained" color="primary"   onClick={handleClickOpen}  >
                  <AddIcon />
                  </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
       
<form onSubmit={handleCreate}>
<DialogTitle id="form-dialog-title">New Album</DialogTitle>
        <DialogContent>
          <DialogContentText>
           To create new album, please enter your title here.
          </DialogContentText>
          
          <TextField
            margin="dense"
            id="title"
            name="title"
            label="title"
            type="text"
            fullWidth
            value={data.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="description"
            name="description"
            label="description"
            type="text"
            fullWidth
            value={data.description}
            onChange={handleInputChange}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate } color="primary">
           Create
          </Button>
        </DialogActions>

</form>
</Dialog>
</div>

  )
}

export default CreateAlbum ; 
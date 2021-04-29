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
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';

import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) =>({}));
const initialState = {
    title : "",
    description: "", 
  }

export const EditAlbum = ({album}) => {


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

const handleEditAlbum = (e) => {
  e.preventDefault();

  fetch (`/api/user/${id}/album/${album._id}` ,{ 
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`
  },
    body: JSON.stringify({     
      title: data.title,
      description: data.description  
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
      throw res;   
  })
  .then(resJson => {
    alert("Album is successfully Edit");
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

const handleDeleteAlbum = (e) => {
  e.preventDefault();

 
  fetch (`/api/user/${id}/albums/${album._id}/del` ,{ 
    method: "GET",
    headers: {          
      "Content-Type": "application/json",
      Authorization: `Bearer ${authState.token}`          },
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
    
  });
  return handleClose()
};



    return(
        <div>

<Button variant="contained" color="primary"  onClick={handleClickOpen}>
                 <EditIcon/>
                  </Button>
    

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      


<form onSubmit={handleEditAlbum}>
<DialogTitle id="form-dialog-title">Edit Album</DialogTitle>
        <DialogContent>
          <DialogContentText>
           To Edit new album, please change below.
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
          
          <Button  onClick={(e)=>handleDeleteAlbum(e,album,data)} color="primary">
                    <DeleteIcon/>
          </Button>

          <Button variant="contained" onClick={(e) => handleEditAlbum(e,album,data)} color="primary">
           Edit
          </Button>

        </DialogActions>

</form>



</Dialog>

      </div>
    )
}


export default EditAlbum;
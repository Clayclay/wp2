import React, { useState , useContext} from 'react';
import axios from 'axios';
import { authContext } from "../../../App";


import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Dialog from '@material-ui/core/Dialog';
import Checkbox from '@material-ui/core/Checkbox';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) =>({}));

export const AddImage = ({album}) => {
  const classes = useStyles();
  const { state: authState , dispatch} = useContext(authContext);
  const id = authState.user._id;    
  const [img, setImg] = useState(null);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
 
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setImg(null)
  };

  console.log(data)

const handleCheckedChange = e  => {
  setChecked(e.target.checked);
  /*setData(
    {
      ...data, 
      [e.target.name]: e.target.checked
    }
  )*/
}

  const handleChange = e => { 
    setData(
      e.target.files
      );

    for (var i = 0; i < e.target.files.length; i++)  //for multiple files
    { 
      if (e.target.files.length > 0) {
          let reader = new FileReader();
      
          reader.addEventListener("load", () => {
            setImg(reader.result);
          });
   
          reader.readAsDataURL(e.target.files[i]);
           }  
    }  
  };
  
  //if not react function MIN
  const handleSubmit = (e) =>{
    e.preventDefault();

    const MyformData = new FormData();
      
    for (let i = 0; i < data.length; i++) {
      MyformData.append('file', data[i])
    }

    //axios.post(url[, data[, config]])

    axios.post(`/api/user/${id}/album/${album._id}/${checked}`,
     MyformData  
     )
      .then((result) => { alert("The files are successfully uploaded")
       /* dispatch({ 
          type: ACTION_TYPES.USER_INPUT_CHANGE,
          payload: result
        })*/
      });
  return handleClose()
  }

return (
<div>

  <Button variant="contained" onClick={handleClickOpen} color="primary">
      <PhotoCameraIcon/>
  </Button>

  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
  <form onSubmit={handleSubmit} encType="multipart/form-data">

 <FormGroup row>

      <DialogTitle id="form-dialog-title">Add picture</DialogTitle>
              <DialogContent>
                <DialogContentText>
                 To add picture new album, please select below.
                </DialogContentText>
                

                {img && <img src={img} alt="" />}
      
      <input
        type="file"
        name="file"
        onChange={handleChange}
         multiple
      />
                
              </DialogContent>

              
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={handleCheckedChange} name="checked" />}
        label="Featured"
      />


              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
        
                <Button variant="contained" onClick={handleSubmit} color="primary">
                 Submit
                </Button>
      
              </DialogActions>

        </FormGroup>
      </form>
      
    
      
      </Dialog>
</div>
);
};

export default AddImage ;




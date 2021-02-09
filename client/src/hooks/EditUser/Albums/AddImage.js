import React, { useState , useContext} from 'react';
import axios from 'axios';
import { authContext } from "../../../App";
import * as ACTION_TYPES from '../../../store/actions/action_types';


import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';

const useStyles = makeStyles((theme) =>({}));

export const AddImage = ({album}) => {
  const classes = useStyles();
  const { state: authState , dispatch} = useContext(authContext);
  const id = authState.user._id;    
  const [img, setImg] = useState(null);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const handleChange = e => {

    setData(e.target.files)

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
//console.log(data[i].name);
      MyformData.append('file', data[i])
    }

    axios.post(`http://localhost:5000/api/user/${id}/album/${album._id}/`, MyformData)
      .then((result) => { alert("The files are successfully uploaded")
       /* dispatch({ 
          type: ACTION_TYPES.USER_INPUT_CHANGE,
          payload: result
        })*/
      });
      
    


  return handleClose()
  }

    
  /*function Preview({ img }) {
    console.log(img);
    if (!img) {
      return null;
    }
    return <img src={img} alt="" />;
  }*/

  //<Preview img={img} /> 

return (
<div>

  <Button variant="contained" onClick={handleClickOpen} color="primary">
      <PhotoCameraIcon/>
  </Button>

  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
  <form onSubmit={handleSubmit} encType="multipart/form-data">


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
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
        
                <Button variant="contained" onClick={handleSubmit} color="primary">
                 Submit
                </Button>
      
              </DialogActions>
      
      </form>
      
      
      
      </Dialog>
</div>
);
};

export default AddImage ;


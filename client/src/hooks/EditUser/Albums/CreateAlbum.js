import React , { useContext, useState } from "react";
import { authContext } from "../../../App";
import * as ACTION_TYPES from '../../../store/actions/action_types';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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
      title: data.title,
      description: data.description,   
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
};   
  return(
    <div className="" >

<Container maxWidth="sm">
<Card className={classes.card}>
<CardContent className={classes.cardContent}>
<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
New Album
</Typography>


<Button variant="contained" onClick={handleCreate} color="primary">
    <AddIcon />
</Button>
</CardContent>
</Card>

</Container>


    <form onSubmit={handleCreate}>

      <label htmlFor="title">
        Title
        <input
          //On relie les champs
            type="text"
            value={data.title}
            onChange={handleInputChange}
            name="title"
            id="title"
          />
      </label>
      <label htmlFor="description">
        Description
        <input
          type="text"
          value={data.description}
          onChange={handleInputChange}
          name="description"
          id="description"
        />
      </label>

      

    <button onClick={handleCreate}>   Create new Album </button>        
    </form>

    </div>
  )
}

export default CreateAlbum ; 
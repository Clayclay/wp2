import React , { useContext, useState } from 'react';
import { authContext } from "../../App";
import * as ACTION_TYPES from '../../store/actions/action_types';

import Button from '@material-ui/core/Button';
import { createStyles,  makeStyles } from '@material-ui/core/styles';

import { initialState } from "../../store/reducers/auth_reducer";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

const BlockUser= (userId) => {
  const classes = useStyles();

  const { state: authState, dispatch } = useContext(authContext);
  const id = authState.user._id;

  const [user, setUser] = useState(initialState);
  console.log(userId.userId)

  const blockSubmit = (event) => {
      event.preventDefault();
      fetch (`http://localhost:5000/api/user/${id}/block` ,{ 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authState.token}`
      },
      body: JSON.stringify({         
        userId : userId.userId ,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
        }
        throw res;   
    })
    .then(resJson => {
      alert("User is block");
      dispatch({ 
          type: ACTION_TYPES.USER_INPUT_CHANGE,
          payload: resJson
        })
    })
      .catch(error => {
      console.error(error);
        setUser({
          ...user,
          isSubmitting: false,
          errorMessage: error.message || error.statusText
        });
    });  
  };


  const removeBlock = (event) => {
    event.preventDefault();
    fetch (`http://localhost:5000/api/user/${id}/block/${userId.userId}/del` ,{ 
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`
    },

  })
  .then(res => {
    if (res.ok) {
      return res.json();
      }
      throw res;   
  })
  .then(resJson => {
    alert("User is  not block");
    dispatch({ 
        type: ACTION_TYPES.USER_INPUT_CHANGE,
        payload: resJson
      })
  })
    .catch(error => {
    console.error(error);
      setUser({
        ...user,
        isSubmitting: false,
        errorMessage: error.message || error.statusText
      });
  });  
};

    return(

<div className={classes.root}>

<Button variant="contained" color="secondary" onClick={blockSubmit} >
  Block User
</Button>

<Button variant="contained" color="secondary" onClick={removeBlock} >
  UnBlock User
</Button>

</div>
    
    )
}

export default BlockUser;
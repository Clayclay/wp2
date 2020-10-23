import React , { useEffect, useReducer, useContext,useState } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';



const Friend = (userId) => {

    const { state: authState, dispatch } = useContext(authContext);
    const id = authState.user._id;
    //const [user, setUser] = useState(initialState);

  

    const addFriend = (event) => {
        event.preventDefault();
        fetch (`http://localhost:5000/api/user/${id}/friend` ,{ 
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authState.token}`
        },
        body: JSON.stringify({         
          friend: userId,
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
          }
          throw res;   
      })
      .then(resJson => {
        alert("Friend is add to your list");
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

    const removeFriend = (event) => {
      event.preventDefault();
      fetch (`http://localhost:5000/api/user/${id}/friend/${userId}/del` ,{ 
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
      alert("Friend is remove from list");
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
<Button variant="contained" color="secondary"  onClick={() => {addFriend}} >
  Add Friend
</Button>
<Button variant="contained" color="secondary" onClick={() => {removeFriend}} >
  Remove Friend
</Button>
</div>
    )
}
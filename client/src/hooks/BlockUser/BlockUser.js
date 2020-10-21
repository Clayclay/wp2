import React , { useEffect, useReducer, useContext,useState } from 'react';



const BlockUser= (userId) => {

    const { state: authState, dispatch } = useContext(authContext);
    const id = authState.user._id;

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch (`http://localhost:5000/api/user/${id}/block` ,{ 
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authState.token}`
        },
        body: JSON.stringify({         
          userId: userId,
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

    return(
<div className={classes.root}>
<Button variant="contained" color="secondary" onClick={() => {handleSubmit}} >
  Block User
</Button>
</div>
    )
}

export default BlockUser;
import React , {  useState, useContext } from 'react';
import { authContext } from "../../App";
import * as ACTION_TYPES from '../../store/actions/action_types';

import Button from '@material-ui/core/Button';
import { createStyles,  makeStyles } from '@material-ui/core/styles';

import { initialState } from "../../store/reducers/auth_reducer";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);


const Friend = ({userId, id}) => {

  const classes = useStyles();
  const { state: authState, dispatch } = useContext(authContext);
  const [user, setUser] = useState(initialState);

  const addFriend = (event) => {
        event.preventDefault();
        fetch (`/api/user/${id}/friend` ,{ 
            method: "POST",
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
      fetch (`/api/user/${id}/friend/${userId}/del` ,{ 
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

  const friendWith = authState.user.friends.includes(userId); 
//console.log("friendWith ?",friendWith)
    return(

    <div className={classes.root}>
      {friendWith ? 
<Button color="primary" onClick={removeFriend} >
   <PersonAddDisabledIcon/>
</Button>
:
<Button variant="contained"  color="primary"  onClick={addFriend} >
  <PersonAddIcon/>
</Button>
    }
    </div>
    )
}

export default Friend ;
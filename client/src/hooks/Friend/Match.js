import React , { useEffect, useReducer, useContext,useState } from 'react';
import {getUser} from '../../function/GetUser';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Match = (userId) => {
    const classes = useStyles();
    const { state: authState, dispatch } = useContext(authContext);
    const id = authState.user._id;

    const [user, setUser]= useState({});
// Check if id 


console.log(array1.includes(2));

const friendWith = authState.user.friends.includes(userId); 
// and
const friendBy = authState.user.friendsby.includes(UserId);

if( friendWith === true && friendby === true){
isMatch = true;
}

//affichage du portrait de User//

useEffect(()=>{
    getUser(userId)
    .then( response => {
      setUser(response)
    })
  },[userId]);

    return (    
       
           isMatch= true && 
        
        <div className={classes.root}>
            <Avatar      alt={user.nickname}  src={"/uploads/avatar/" + user.avatar}       />
        </div>
    
    )
}
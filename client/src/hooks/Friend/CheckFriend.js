import React , { useEffect, useContext,useState } from 'react';
import {getUser} from '../../function/GetUser';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { authContext } from "../../App";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const CheckFriend = ({userId}) => {
  const classes = useStyles();
  const { state: authState } = useContext(authContext);


  const [match, setMatch]= useState();
// Check if id 
  const [isMatch, setIsMatch] = useState(false)

  const friendWith = authState.user.friends.includes(userId); 
// and
  const friendBy = authState.user.friendsby.includes(userId);

//console.log(userId,match,'match',isMatch) 
//affichage du portrait de User//

useEffect(()  =>  {
  if( friendWith === true && friendBy === true){
    setIsMatch(true)
    getUser(userId)
    .then( response => {
      setMatch(response)
    })
  }
  },[authState.token,userId,friendWith,friendBy]);

    return (    
       
           isMatch && /*= true ? */match != null &&
        
        <div className={classes.root}>
            <Avatar      alt={match.nickname}  src={"/uploads/avatar/" + match.avatar}       />
        </div>
       
    
    )
}

export default CheckFriend ; 
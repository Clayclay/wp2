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

const Match = ({userId}) => {
    const classes = useStyles();
    const { state: authState, dispatch } = useContext(authContext);
    const id = authState.user._id;

    const [user, setUser]= useState({});
// Check if id 
    const [ isMatch, setIsMatch] = useState(false)

const friendWith = authState.user.friends.includes(userId); 
// and
const friendBy = authState.user.friendsby.includes(userId);

console.log(friendWith,friendBy,user,'match',isMatch) 
//affichage du portrait de User//

useEffect(()=>{

  if( friendWith === true && friendBy === true){
    setIsMatch(true)
    getUser(userId)
    .then( response => {
      setUser(response)
    })
  }
  },[userId]);

    return (    
       
           isMatch && /*= true ? */
        
        <div className={classes.root}>
            <Avatar      alt={user.nickname}  src={"/uploads/avatar/" + user.avatar}       />
        </div>
       
    
    )
}

export default Match ; 
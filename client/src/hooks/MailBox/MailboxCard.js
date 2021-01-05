import React , { useContext, useState, useEffect }  from 'react';
import {authContext} from '../../App';

import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import MessageCard from './MessageCard';
import { Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import AvatarUser from '../AvatarUser';

import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';

import {getUser} from '../../function/GetUser';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));


const MailboxCard = ({room}) => {
  const classes = useStyles();
  

  const { state: authState } = useContext(authContext);
  const id = authState.user._id;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


 //GET LAST MSG//
 const [lastMsg, setLastMsg]=useState(room.messages[room.messages.length-1]);
 const date = new Date(lastMsg.createdAt);
 console.log('date',date)
 //   //

  const [users,setUsers]=useState(room.users);


  // GET AVATAR //
  const toUserFind = users.find( ({_id})  => _id !=id );
  const [toUser, setToUser] = useState([])

  console.log("to",toUser._id,toUserFind,room.messages)



  /* Get User toUser */
useEffect(()=>
getUser(toUserFind._id)
.then(  response   => {
  setToUser(response)
})
,[toUserFind]);

  
  //    //
 const [unread]= useState([]);
  useEffect (()=> {
     //UNREAD MESSAGE//
  const connectedUser =   room.users.find( ({_id})  => _id ===id )
  console.log("date user", connectedUser.online)

  const messages = room.messages.length >0 && room.messages.map((message)=> {
    const clientDate= new Date(connectedUser.online);
    const messageDate= new Date(message.createdAt);
    if ( clientDate < messageDate){
      console.log("true",true);
      unread.push( true );
     }
  }) 

  console.log('unread',unread.length)
//  // 
  },[room.users])
 
  return (   

    lastMsg !== undefined &&

<Grid>
<ListItem   component={Link} 
onClick={e => (!room.roomid) ? e.preventDefault() : null} to={`/chat/${room.roomid}/${toUser._id}`}  
alignItems="flex-start"
  >
        <ListItemAvatar>

          <AvatarUser  avatar={toUser.avatar} nickname={toUser.nickame} />

        </ListItemAvatar>

      <ListItemText
       primary={<MessageCard message={lastMsg}  key={lastMsg._id} />} secondary={ date.toLocaleString() } />

    {unread.length > 0 &&
    <Badge badgeContent={unread.length} color="primary">
        <MailIcon />
      </Badge>}

</ListItem>
        <Divider variant="inset" component="li" />

</Grid>
    

  ) 
}


export default MailboxCard;




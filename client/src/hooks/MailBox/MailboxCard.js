import React , { useContext, useState, useEffect }  from 'react';
import {authContext} from '../../App';

import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import MessageCard from './MessageCard';
import { Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AvatarUser from '../AvatarUser';


import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';

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
  const toUser = users.find( ({_id})  => _id !=id );
  const [user, setUser] = useState([])

  useEffect(() => {
    fetch(`http://localhost:5000/api/user/${toUser._id}`, {
    method: "GET",
    headers: {  }
    })
    .then(res => {
        if (res.ok) {
        //console.log('res',res)
        return res.json();
        } else {
        throw res;
        }
    })
    .then(resJson => {
    setUser(  resJson );
    })
    .catch(error => {
        console.log(error);
    });
    
  },[toUser])
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
onClick={e => (!room.roomid) ? e.preventDefault() : null} to={`/chat/${room.roomid}/${id}`}  
alignItems="flex-start"
  >
        <ListItemAvatar>

          <AvatarUser  avatar={user.avatar} nickname={user.nickame} />

        </ListItemAvatar>

      <ListItemText
       primary={<MessageCard message={lastMsg}  key={lastMsg._id} user={user} />} secondary={ date.toLocaleString() } />

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




import React , { useContext, useState, useEffect }  from 'react';
import {authContext} from '../../App';
import {Link} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import MessageCard from './MessageCard';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import AvatarUser from '../AvatarUser';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';

import {getUser} from '../../function/GetUser';

const MailboxCard = ({room}) => {

  const { state: authState } = useContext(authContext);
  const id = authState.user._id;
  //const [error, setError] = useState(null);
  //const [loading, setLoading] = useState(false);


 //GET LAST MSG//
 const [lastMsg]=useState(room.messages[room.messages.length-1]);
 const date = new Date(lastMsg.createdAt);
 //console.log('date',date)
 //   //

  const [users]=useState(room.users);

  // GET AVATAR //
  const toUserFind = users.find( ({_id})  => _id !==id );
  const [toUser, setToUser] = useState([])

  //console.log("to",toUser._id,toUserFind,room.messages)


 const [unread]= useState([]);

  /* Get User toUser */
useEffect(()=>  { 
getUser(toUserFind._id)
.then(  response   => {
  setToUser(response)
})

     //UNREAD MESSAGE//
  const connectedUser =   room.users.find( ({_id})  => _id ===id )

  //console.log("date user", connectedUser.online)

  room.messages.length >0 && room.messages.map((message)=> {
    const clientDate= new Date(connectedUser.online);
    const messageDate= new Date(message.createdAt);
    if ( clientDate < messageDate){
      //console.log("true",true);
      unread.push( true );
     }
  }) 

  //console.log('unread',unread.length)
 
  },[room.users,toUserFind,id,room.messages,unread])
 
  return (   

    lastMsg !== undefined &&

<div >
   
<ListItem  
component={Link} 
button
onClick={e => (!room.roomid) ? e.preventDefault() : null} to={`/chat/${room.roomid}/${toUser._id}`}  
alignItems="flex-start"
divider
  >
        <ListItemAvatar>

          <AvatarUser  avatar={toUser.avatar} nickname={toUser.nickame} />

        </ListItemAvatar>

      <ListItemText
       primary={<MessageCard message={lastMsg}  key={lastMsg._id} />} secondary={ date.toLocaleString() } />

    {unread.length > 0 &&
    <Badge badgeContent={unread.length} color="primary">
        <MailIcon color='action'/>
      </Badge>}

</ListItem>
        
  </div>

  ) 
}


export default MailboxCard;




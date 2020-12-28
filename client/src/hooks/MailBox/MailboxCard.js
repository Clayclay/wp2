import React , { useContext, useState }  from 'react';
import {authContext} from '../../App';

import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import MessageCard from './MessageCard';
import { Grid } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

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

 const [lastMsg, setLastMsg]=useState(room.messages[room.messages.length-1]);
  //TO get Last Message
  //let msgArray = room.messages;
  //let last = msgArray[msgArray.length-1]
  //if(last  !== undefined )

  const [users,setUsers]=useState(room.users);
  const toUser = users.find( ({_id})  => _id !=id );

  const connectedUser =   room.users.find( ({_id})  => _id ===id )
  console.log("date user", connectedUser.online)


  const [unread]= useState([]);
  const messages = room.messages.length >0 && room.messages.map((message)=> {
    const clientDate= new Date(connectedUser.online);
    const messageDate= new Date(message.createdAt);
    if ( clientDate < messageDate){
      console.log("true",true);
      unread.push( true );
     }
  }) 

 console.log('unread',unread.length)

  
 
  return (   

    <Grid container spacing={3}>
      <ListItem 
        alignItems="flex-start"
        component={Link} 
        onClick={e => (!room.roomid) ? e.preventDefault() : null} to={`/chat/${room.roomid}/${id}`}  >

      {lastMsg !== undefined &&   
        <MessageCard message={lastMsg}  key={lastMsg._id}  toUser={toUser} />   
        }

      </ListItem>
      <Divider />
    </Grid >
  ) 
}


export default MailboxCard;




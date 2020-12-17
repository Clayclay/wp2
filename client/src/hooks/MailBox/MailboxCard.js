import React , { useEffect, useContext, useState }  from 'react';
import {authContext} from '../../App';

import {getUser} from '../../function/GetUser';
      
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import AvatarUser from '../AvatarUser';

import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';

import ReplyIcon from '@material-ui/icons/Reply';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import Avatar from '@material-ui/core/Avatar';

import MessageCard from './MessageCard';

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

  return (   

    <div>
      <ListItem 
        alignItems="flex-start"
        component={Link} 
        onClick={e => (!room.roomid) ? e.preventDefault() : null} to={`/chat/${room.roomid}/${id}`}  >
         
      {lastMsg !== undefined &&   
        <MessageCard message={lastMsg}  key={lastMsg._id}/>
        }

          {/*
          room.messages.map((message)=>
            <MessageCard message={message}  key={message._id}/>
           )
          */}

      </ListItem>
    </div>
  ) 




}


export default MailboxCard;
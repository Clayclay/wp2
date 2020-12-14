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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));


const MailboxCard = ({message}) => {

    const classes = useStyles();

    const { state: authState } = useContext(authContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sender, setSender]=useState({});
    const [receiver, setReceiver]=useState({});

    const id = authState.user._id;
    
    const [isUser,setisUser]=useState();

    const dateMsg = new Date(message.createdAt)


    useEffect(() => {        
        setLoading(true);
        getUser(message.sender)
        .then(sender => {
          setSender(sender)
          setLoading(false);
          })
        if (message.sender === id ) {
          setisUser(true)
         } else {
           setisUser(false)
         } 
      }, [message.sender]);

      useEffect(() => {        
        setLoading(true);
        getUser(message.receiver)
        .then(receiver => {
        setReceiver(receiver)
          setLoading(false);
          })
     
    
     
  }, [message.receiver]);


    return (

          
         isUser? ( 
         
              <div   >
              <ListItem 
                alignItems="flex-start"
                component={Link} 
                onClick={e => (!message.chatId) ? e.preventDefault() : null} to={`/chat/${message.chatId}/${id}`}   >
        
                <ListItemAvatar>
                    <AvatarUser avatar={receiver.avatar} nickname={receiver.nickname}  online={receiver.online}  />  
                </ListItemAvatar>
                    
                    <ListItemText
              primary= {receiver.nickname} 
              secondary={  
                <React.Fragment>
                  
                  
                  <ReplyIcon fontSize="small" color="disabled" />
                  
                  {message.text}  
                 
                </React.Fragment>             
              }
            />
              <Typography variant="body2" component="span" className={classes.inline}  color="textPrimary" >
                    { dateMsg.toLocaleString()  /* message.updatedAt */ }  
              </Typography>

            </ListItem>
            <Divider variant="inset" component="li" /></div>          
                    )
                         : 
                  ( <div>
                    <ListItem alignItems="flex-start"    key={message._id}  component={Link}  onClick={e => (!message.chatId) ? e.preventDefault() : null} to={`/chat/${message.chatId}/${id}`}   >
                     <ListItemAvatar>
                        <AvatarUser avatar={sender.avatar} nickname={sender.nickname}  online={sender.online}  />  
                     </ListItemAvatar> 
                      <ListItemText
                      primary= {sender.nickname} 
                      secondary={message.text}
                      />
                  
                  <Typography variant="body2" component="span" className={classes.inline}  color="textPrimary" >
                    { dateMsg.toLocaleString()  /* message.updatedAt */ }  
                  </Typography>
          
          </ListItem>
          <Divider variant="inset" component="li" />
                    </div>
                    )  

    )
}

export default MailboxCard;
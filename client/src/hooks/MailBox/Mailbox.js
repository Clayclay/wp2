import React , { useEffect, useContext, useState }  from 'react';
import {authContext} from '../../App';

import {getMessages} from '../../function/GetMessages';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import MailboxCard from './MailboxCard';
import List from '@material-ui/core/List';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));


const Mailbox = () => {

    const classes = useStyles();

    const { state: authState } = useContext(authContext);
    const id = authState.user._id;
    
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [messages,setMessages]=useState([]);


      useEffect(() => {        
        setLoading(true);
        getMessages(id)
        .then(messages => {
console.log("messages mailbox",messages)
          setMessages(messages)
          setLoading(false);
          })
      }, []);



    return (
      <Container maxWidth="sm">
        <List className={classes.root}      >
 {messages.length > 0 &&
      messages.map((message) => 

                <MailboxCard  message={message} /> 

        
      )}
        </List>
      </Container>
    )
}

export default Mailbox;
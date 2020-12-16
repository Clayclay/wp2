import React , { useEffect, useContext, useState }  from 'react';
import {authContext} from '../../App';


import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import List from '@material-ui/core/List';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '-webkit-fill-available',
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



      useEffect(() => {        
      
        
      }, []);



    return (
      <Container maxWidth="sm">
        <List className={classes.root}      >
 {messages.length > 0 &&
      messages.map((message) => 

                <MailboxCard  message={message} key={message._id} /> 

        
      )}
        </List>
      </Container>
    )
}

export default Mailbox;
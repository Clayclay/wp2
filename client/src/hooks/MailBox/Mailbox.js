import React , { useEffect, useContext, useState }  from 'react';
import {authContext} from '../../App';
import MailboxCard from './MailboxCard';

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

  const [rooms ,setRooms] = useState([])

  useEffect(()=>{
      /*  STEP 1 */
    fetch (`http://localhost:5000/api/room/${id}` ,{ 
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authState.token}`
    },
  })
  .then(res =>  { 
  if (res.ok) {
    return res.json();
  } else {
    throw res;
  }
  })  
  .then(resJson => {
  //console.log(resJson)
  setRooms(resJson); 
  })
  .catch(error => {
  console.error("room not found",error);
  })  
  },  [ ]);


  

  return (
    <Container maxWidth="sm">
      <List className={classes.root}      >

        {rooms.length > 0 &&
            rooms.map((room) => 
            //Only display room with message
            room.messages.length > 0 &&   
              <MailboxCard room={room} key={room._id} />
        )} 

      </List>
    </Container>
  )
}



export default Mailbox;


import React , { useEffect, useContext, useState }  from 'react';
import {authContext} from '../../App';
import MailboxCard from './MailboxCard';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';

const Mailbox = () => {

  const { state: authState } = useContext(authContext);
  const id = authState.user._id;
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [rooms ,setRooms] = useState([])

  useEffect(()=>{
      /*  STEP 1 */
    fetch (`/api/room/${id}` ,{ 
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
  setLoading(false)
  })
  .catch(error => {
  console.error("room not found",error);
  setError(error)
  })  
  },  [authState.token,id ]);


  

  return (

    <Container maxWidth="sm">
      <List >

{loading ? (
  <span className="loader">LOADING...</span>
): error ? (
  <span className="error">AN ERROR HAS OCCURED</span>
) : (

rooms.length > 0 &&
            rooms.map((room) => 
            //Only display room with message
            room.messages.length > 0 &&   
              <MailboxCard room={room} key={room._id} />
              
        )
)}
        

      </List>
    </Container>
  )
}



export default Mailbox;


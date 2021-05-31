import React, { useEffect, useState , useContext } from 'react';
import {authContext} from '../../App';

import './Home.css';

import Container from '@material-ui/core/Container';
import CheckFriend from '../Friend/CheckFriend';  
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
 
}));

const initState = {
  u: [],
  isFetching: true,
  hasError: false
};

const Home = () => {
  const initialState = {  content:'Loading...'  };
  const classes = useStyles();

  const { state: authState }  = useContext(authContext);
  const [message, setMessage] = useState(initialState);

 const [u] = useState(initialState);

 const [ ,setisFetching] = useState(initialState)

 const [, setUsers] = useState([]);
  
  // instead of state.user.nickname
  //const { user: { nickname } = {} } = state;
  
useEffect(() => {
    fetch('/api/home')
      .then(res => res.text())
      .then(res =>   setMessage({ content: res })    )
      .then (setisFetching(false))
  },[]);

  useEffect(() => {

    fetch('/api/users/' ,{ 
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`
  },
  body: JSON.stringify({         
   
  }),  
 
})
      .then(resJson => setUsers(resJson))


  },[]);
  

  return (

    <div className="container">
   
    <p>{message.content} {authState.user.nickname}</p>
    
       
<Container component="main" maxWidth="xs">
{useContext.isFetching ? (
<span className="loader">LOADING...</span>
) : u.hasError ? (
<span className="error">AN ERROR HAS OCCURED</span>
) : (
<>

<Grid container className={classes.root} spacing={2}>

  <Typography  component="h4">
    Friend Request
  </Typography>

  {authState.user.friendsby.length > 0 && 
    authState.user.friendsby.map((userId) =>
    <Grid item >
      <CheckFriend userId={userId} key={userId}  /> 
    </Grid>  
    )}

</Grid>

//--- friend album ? 
// same language /city user ?

{authState.user.languages.map((langue)=>langue.langue)}

</>
)}


</Container>

    </div>
  );


}
export default Home;



import React, {useEffect,useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const GetUser = ({id})  =>  {

const [user, setUser] =useState( [] );

useEffect(() => {
  
  fetch(`http://localhost:5000/api/user/${id}`, {
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
     //console.log(resJson);
     setUser(resJson);
    })
    .catch(error => {
      console.log(error);
     
    });

}, [id]);
  

return (
    
    
    
       <Grid container spacing={1}>
        <Grid item >
          <Avatar alt={user.nickname} src={`/uploads/avatar/${user.avatar}`} />
        </Grid>
        <Grid item >
        <Typography gutterBottom variant="h6">
          {user.nickname}
          </Typography>
        </Grid>
      </Grid>
    
        
    )
}

export default GetUser;
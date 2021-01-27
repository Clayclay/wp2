import React, { useEffect, useState, useContext } from 'react';
import {authContext} from '../../App';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ReplyIcon from '@material-ui/icons/Reply';

import {getUser} from '../../function/GetUser';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      /*maxWidth: '36ch',*/
      backgroundColor: theme.palette.background.paper,
      height: 'inherit',
    },
    inline: {
      display: 'inline',
    },
  }),
);

const MessageCard = ({message}) => {
    const classes = useStyles();
    const { state: authState } = useContext(authContext);
    const id = authState.user._id;

    const [user,setUser]=useState({});

      /* Get User sender */
useEffect(()=>{
  getUser(message.sender)
  .then( response => {
    setUser(response)
  })
},[message.sender]);

    let isSentByCurrentUser = false;
    if(message.sender === id ){
        isSentByCurrentUser = true ;
    }

    const date = new Date(message.createdAt);

    //console.log(message)

    return(

  /* if */ isSentByCurrentUser ?
  (   
  
      <Grid container   wrap="nowrap"  spacing={2}>
          <Grid item xs = {1} >
              <ReplyIcon fontSize="small"/>
          </Grid>
          <Grid  item xs zeroMinWidth >
          <Typography noWrap > {message.text}</Typography>
          </Grid>
      </Grid>

  )

  : /* not => */
  (    
        <Grid container wrap="nowrap" spacing={2} >
            <Grid item  >
                <Typography  ><b>{user.nickname}</b></Typography>
            </Grid>
            <Grid item xs={1}  ><RemoveIcon fontSize="small" color='action'/></Grid> 
            <Grid item  zeroMinWidth >
              <Typography noWrap  >{message.text}</Typography>
            </Grid>
        </Grid>
  )   

       
    )
}

export default MessageCard;
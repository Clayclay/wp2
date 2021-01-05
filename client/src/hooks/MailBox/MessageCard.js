import React, { useEffect, useState, useContext } from 'react';
import {authContext} from '../../App';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import AvatarUser from '../AvatarUser';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ReplyIcon from '@material-ui/icons/Reply';
import Divider from '@material-ui/core/Divider';

import {getUser} from '../../function/GetUser';

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

    console.log(message)

    return(

  /* if */ isSentByCurrentUser ?
  (   
        <Grid container spacing={2}>
            <Grid item xs={2} >
                <ReplyIcon/>
            </Grid>
            <Grid item  >
                {message.text}
            </Grid>
        </Grid>
  )

  : /* not => */
  (    
        <Grid container spacing={2} >
            <Grid item xs={2} >
                <Typography gutterBottom variant="subtitle1" >
                {user.nickname}
                </Typography>
            </Grid>
            <Grid item   >
                {message.text}
            </Grid>
        </Grid>
  )   

       
    )
}

export default MessageCard;
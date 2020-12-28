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

const MessageCard = ({message, toUser}) => {
    const classes = useStyles();
    const [user, setUser] = useState([])
    const { state: authState } = useContext(authContext);
    const id = authState.user._id;

    let isSentByCurrentUser = false;
    if(message.sender === id ){
        isSentByCurrentUser = true ;
    }

    const date = new Date(message.createdAt);
//console.log(toUser)
    useEffect(() => {
        fetch(`http://localhost:5000/api/user/${toUser._id}`, {
        method: "GET",
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
        setUser(  resJson );
        })
        .catch(error => {
            console.log(error);
        });
        
    },[message.sender])

    return(

  /* if */ isSentByCurrentUser ?
  (   
  
  
    
    <Grid container spacing={2}>
    
    <Grid item >
    <AvatarUser  avatar={user.avatar} nickname={user.nickame} />
    </Grid>

        <Grid container>
            <Grid item >
                <ReplyIcon/>
            </Grid>
            <Grid item >
                {message.text}
            </Grid>
        </Grid>
        <Grid item  >
                <Typography gutterBottom variant="caption" component="h2">
                    <time>{ date.toLocaleString() }</time>
                </Typography>
            </Grid>
    </Grid>
  
 
  )

  : /* not => */
  (    
    
    <Grid container spacing={2}>
    
        <Grid item >
        <AvatarUser  avatar={user.avatar} nickname={user.nickame} />
        </Grid>


        <Grid container>
            <Grid item >
                <Typography gutterBottom variant="h6" component="h2">
                {user.nickname}
                </Typography>
            </Grid>
            <Grid item >
                {message.text}
            </Grid>
        </Grid>

        <Grid item >
            <Typography gutterBottom variant="caption" component="h2">
            <time>{date.toLocaleString() }</time>
            </Typography>
        </Grid>    
    </Grid>
  

  )   

       
    )
}

export default MessageCard;
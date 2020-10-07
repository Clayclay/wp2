import React, { useEffect, useReducer, useState } from 'react';

import {Link} from 'react-router-dom';

import { createStyles, makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import AvatarUser from '../AvatarUser';
import Grid from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';



const initialState = {
    sender: [],
    isFetching: false,
    hasError: false
}

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

const ConvCard = ({message} )    => {
    const classes = useStyles();
    
    const [sender, setSender] = useState(initialState)

    useEffect(() => {
        fetch(`http://localhost:5000/api/user/${message.sender}`, {
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
        setSender(  resJson );
        })
        .catch(error => {
            console.log(error);
        });
        
    },[message.sender])

  
    return(
                     


<Card className={classes.root}>
<CardContent>

<Grid container spacing={2}>
        <Grid item >
        <AvatarUser  avatar={sender.avatar} nickname={sender.nickame} />
        </Grid>

      <Grid spacing={2}>
      <Grid item >
      <Typography gutterBottom variant="h5" component="h2">
        {message.user} 
      </Typography>
        </Grid>
        <Grid item >
                <time>{message.createdAt}</time>
        </Grid>
        <Grid item >
        {message.text}
        </Grid>
        
        
      </Grid>

</Grid>

</CardContent>
</Card>


                 
                  



    )
}

export default ConvCard;
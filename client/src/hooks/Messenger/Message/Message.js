import React, { useState, useEffect } from 'react';
import './Message.css';       //TODO 
import ReactEmoji from 'react-emoji';
import {getUser} from '../../../function/GetUser';

import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// probleme de confusion entre user + id sender voir convertir id en  name


const useStyles = makeStyles((theme) => ({
   text: {
    "border-radius": "20px",
    padding: "10px 20px",
    color:" white",
    width:"fit-content",
     background:"#2979FF"   
   }
   
  }));

//Check previous component propriety and add it ()
const Message = ({message : {sender, text, createdAt}, name }) => {
    const classes = useStyles();
    const [senderUser , setSenderUser] = useState({})
/* Get User */
    useEffect(()=>{
        const id = sender
        getUser(id)
        .then( response => {
        setSenderUser(response)
        })
    },[sender]);

    let isSentByCurrentUser = false;
    const trimmedName = name.trim().toLowerCase();
    if(senderUser.nickname === trimmedName ){
        isSentByCurrentUser = true ;
    }
    //Base on variable sentbycurrent we ll send thing differently

return (
    /* if */ isSentByCurrentUser ?
    (
    /*
        <div className="messageContainer justifyEnd">
            <p className="sentText pr-10">{name}</p>
            <div className="messageBox backgroundBlue">
                <p className="messageText colorWhite">{ReactEmoji.emojify(text) }</p>
            </div>
        </div>// render somthing*/


    <Grid container >
        <Grid item xs={12}    >
            <ListItemText  align="right" primary={
                <Typography className={classes.text} >
                    {ReactEmoji.emojify(text) }
                    </Typography>}
            ></ListItemText>
        </Grid>
        <Grid item xs={12}>
            <ListItemText align="right" secondary={createdAt}></ListItemText>
        </Grid>
    </Grid>



    )
    : /* not => */
    (
       /* 
        <div className="messageContainer justifyStart">
        <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{text}</p>
        </div>
        <p className="sentText pl-10">{senderUser.nickname}</p>
    </div>*/


    <Grid container>
        <Grid item xs={12}>
            <ListItemText align="left" primary={ 
                <Typography className={classes.text} > {ReactEmoji.emojify(text) }  </Typography>}>
            </ListItemText>
        </Grid>
        <Grid item xs={12}>
            <ListItemText align="left" secondary={createdAt}></ListItemText>
        </Grid>
    </Grid>


    )
)

}
// logic + variable = {} for render only ()
export default Message;
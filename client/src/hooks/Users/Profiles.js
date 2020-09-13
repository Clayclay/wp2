import React from 'react';
import {Link} from 'react-router-dom';
import Avatar from '../Avatar';
import Lang from '../Lang';

import { makeStyles } from '@material-ui/core/styles';
import ChatIcon from '@material-ui/icons/Chat';
import IconButton from '@material-ui/core/IconButton';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';



  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        flexGrow: 1,
      },
    },
    input: {
      display: 'none',
    },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  }));

const Profiles = ({user}) => {
    const classes = useStyles();

    const url = "/uploads/avatar/" + user.avatar;

    return(
    
       
       <div className={classes.root}>
       <Paper className={classes.paper}>
         <Grid container spacing={2}>
           <Grid item>
             <ButtonBase className={classes.image}>
             <img className={classes.img} alt="complex" src={url} />
             </ButtonBase>
           </Grid>
           <Grid item xs={12} sm container>
             <Grid item xs container direction="column" spacing={2}>
               <Grid item xs>
                 <Typography gutterBottom variant="subtitle1">
                 {user.nickname}
                 </Typography>
                 <Typography variant="body2" gutterBottom>
                 
        {user.languages && 
        user.languages.map(language => (            
          <Lang key={language._id.toString()} language={language} />
          ))}
                 </Typography>
                 <Typography variant="body2" color="textSecondary">
                 {user.age} y.o.  {user.gender}
                 </Typography>
               </Grid>
               <Grid item>
                 <Typography variant="body2" style={{ cursor: 'pointer' }}>
                   <Link onClick={e => (!user._id) ? e.preventDefault() : null} to={`/user/${user._id}`}>
                      Details
                   </Link>
                 </Typography>
               </Grid>
             </Grid>
             <Grid item>
               <Typography variant="subtitle1">
                  <Link onClick={ e => (!user._id) ? e.preventDefault() : null} to={`/chat/${user._id}`}>
                      <IconButton color="primary" aria-label="Message" component="span">
                        <ChatIcon />
                      </IconButton >
                  </Link>  
               </Typography>
             </Grid>
           </Grid>
         </Grid>
       </Paper>
     </div>


    );


};

/*
{user.languages.map(language => (
  <li key={language} >{language}</li>
))}




*/

export default Profiles;

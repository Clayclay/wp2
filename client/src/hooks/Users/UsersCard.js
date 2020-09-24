import React from 'react';
import {Link} from 'react-router-dom';


import { makeStyles } from '@material-ui/core/styles';
import ChatIcon from '@material-ui/icons/Chat';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import AvatarUser from '../AvatarUser';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';


import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import Chip from '@material-ui/core/Chip';


  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
     

  }));

const UsersCard = ({user}) => {
    const classes = useStyles();

    const url = "/uploads/avatar/" + user.avatar;

    return(
         
         
      

<Card className={classes.root}>

  <CardActionArea   >
  

                <AvatarUser avatar={user.avatar} nickname={user.nickname}  />

    <CardContent>

                <Typography gutterBottom variant="h5" component="h2">
                  {user.nickname}
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">
                      {user.age} y.o.  
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">
                      {user.gender}
                    </Typography>
                  </Grid>
                </Grid>




                <Grid item>
                  {user.languages && user.languages.map(language => (     
                    
                  <li key={language._id.toString()} language={language} >

                      <Chip
                        color="primary"
                        label={language.langue}
                        variant="outlined" 
                        className={classes.chip}
                      /> 
                  </li>
                  ))}
                </Grid>
      </CardContent>
 
   </CardActionArea>
</Card>


    );
};


export default UsersCard;

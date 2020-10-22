import React from 'react';
import {Link} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import ChatIcon from '@material-ui/icons/Chat';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AvatarUser from '../AvatarUser';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';


  const useStyles = makeStyles((theme) => ({
    root: {
     // maxWidth: 345,
      "margin-bottom": 2,
      height: "-webkit-fill-available",
    },
    media: {
      //height: 140,
    },
     

  }));

const UsersCard = ({user}) => {
    const classes = useStyles();

    const url = "/uploads/avatar/" + user.avatar;

    return(
         
         
      

<Card className={classes.root}>

  <CardActionArea   >
   <CardContent>
<Grid container spacing={2}>
                <Grid item xs={12} sm={6} >
                  <AvatarUser avatar={user.avatar} nickname={user.nickname}  />
                </Grid>
                <Grid item xs={12} >
                  <Typography gutterBottom variant="h5" component="h5">
                    {user.nickname}
                  </Typography>
                </Grid>

                  <Grid item xs={6} sm  >
                    <Typography variant="body2" color="textSecondary">
                      {user.age} y.o.  
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm >
                    <Typography variant="body2" color="textSecondary">
                      {user.gender}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} >
                  {user.languages && user.languages.map(language => (     
                    
                  <li key={language._id.toString()} language={language} >
<Grid item xs={4}>
                      <Chip
                        color="primary"
                        label={language.langue}
                        variant="outlined" 
                        className={classes.chip}
                      /> </Grid>
                  </li>
                  ))}
                </Grid>
      </CardContent>
 
   </CardActionArea>
</Card>


    );
};


export default UsersCard;

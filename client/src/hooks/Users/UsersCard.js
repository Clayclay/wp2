import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AvatarUser from '../AvatarUser';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import Lang from '../Lang';

import List from '@material-ui/core/List';
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

     return(

<Card className={classes.root}>

  <CardActionArea   >
   <CardContent>
<Grid container spacing={2}>
                <Grid item xs={12} sm={6} >
                  <AvatarUser avatar={user.avatar} nickname={user.nickname}  online={user.online}  />
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
                    
                  <List key={language._id.toString()} language={language} >

                     <Lang  key={language._id.toString()} language={language} />

                  </List>
                  ))}
                </Grid>
      </CardContent>
 
   </CardActionArea>
   <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More TODO
        </Button>
      </CardActions>
</Card>


    );
};


export default UsersCard;

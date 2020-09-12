import React from 'react';


import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));

const Album = ({album}) => {
    const classes = useStyles();

    
    return(
      
     
 
<div>
               
                <Card className={classes.card}></Card>

                <CardMedia
                    className={classes.cardMedia}
                    image={"/uploads/album/" + album.image}
                  />
                 <CardContent className={classes.cardContent}>
                   <Typography gutterBottom variant="h5" component="h2">
                     {album.title}
                   </Typography>
                   <Typography>
                     {album.description}
 
                   </Typography>
                 </CardContent>
                 <CardActions>
                   <Button size="small" color="primary">
                     View
                   </Button>

                 </CardActions>
                


                 </div>



    );
}

export default Album;
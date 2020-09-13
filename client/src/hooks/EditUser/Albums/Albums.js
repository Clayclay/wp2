import React, { } from 'react';
import {  Link } from "react-router-dom";

import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';



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



const Albums = ({albums ,onDelete }) => {
  
  const preventDefault = (event) => event.preventDefault();
  

  const classes = useStyles();
    return(
<main>      
        {/* Hero unit */}
        <div className={cl  Content}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              My Album layout
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Create and edit album.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                <Link to="/createAlbum" >
                  <Button variant="contained" color="primary">
                  <AddIcon />
                  </Button>
                </Link>  
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action TODO share ?!
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {albums.map((album) => (
              <Grid item key={album._id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
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
                <Link    to="/editAlbum/:id" >
                  <Button variant="contained" color="primary">
                 <EditIcon/>
                  </Button>
                </Link> 
               

                  <Button variant="contained" onClick={(e) => onDelete( album, e ) } color="primary">
                    <DeleteIcon/>
                  </Button>

                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

    )
}

export default Albums;
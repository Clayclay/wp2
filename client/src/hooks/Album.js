import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {  useParams } from 'react-router-dom';




const useStyles = makeStyles((theme) => ({
    
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },


  }));

const Album = () => {
  const classes = useStyles();
  let params = useParams();

  const idProfile = params.id ;
  const idAlbum = params.albumid ;
  const [album,setAlbum]= useState();
  
  useEffect(()  =>  {
    fetch(`/api/user/${idProfile}/album/${idAlbum}`, {
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
       setAlbum(  resJson );
      })
      .catch(error => {
        console.log(error);
      });
  },[])

    
    return(
      

      <Grid container alignItems="center" maxwidth="sm">

<Container component="main" maxWidth="xs">
     
      <div className={classes.root}>
        

      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        { album &&  album.images.map((tile) => (
          <GridListTile key={tile.createdAt} cols={tile.cols || 1}>
            <img src={"/uploads/"+idProfile+"/"+tile.filename} alt={tile.filename} />
          </GridListTile>
        ))}
      </GridList>
    </div>

    </Container></Grid>

    );
}

export default Album;

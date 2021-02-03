import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
  }));

const Lang = ({language}) => {
    const classes = useStyles();
    return(
   
        <Grid className={classes.root}>
        <Chip
        label={language.langue}
        />
        </Grid>

    );
}

export default Lang;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

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
        <div className={classes.root}>
        <Chip
        label={language.langue}
        />
        </div>
    );
}

export default Lang;
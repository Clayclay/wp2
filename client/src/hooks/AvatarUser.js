import React, { } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   root: {
     display: 'flex',
     '& > *': {
       margin: theme.spacing(1),
     },
   },
   large: {
     width: theme.spacing(7),
     height: theme.spacing(7),
   },
 }));

const AvatarUser = ({avatar , nickname}) => {

const url = "/uploads/avatar/" + avatar;
const classes = useStyles();

 return   (
  
    <Avatar src={url} alt={nickname} className={classes.large} />

    );
};

export default AvatarUser;
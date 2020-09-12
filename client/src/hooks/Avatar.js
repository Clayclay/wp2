import React, { } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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

const AvatarUser = ({avatar}) => {

const url = "/uploads/avatar/" + avatar;
const classes = useStyles();




 return   (
   <div className={classes.root}>
    <Avatar src={url} alt="avatar" className={classes.large}><AccountCircleIcon/></Avatar>
   </div>
    );
};

export default AvatarUser;
import React, { } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import Badge from '@material-ui/core/Badge';

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

 const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const AvatarUser = ({avatar , nickname, online, classNameEdit } ) => {

const url = "/uploads/avatar/" + avatar;
const classes = useStyles();

const isOnline=online;
let element

 if(isOnline){
  element =
    <StyledBadge
      overlap="circle"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      variant="dot"
    >
      <Avatar src={url} alt={nickname} className={classNameEdit} />
    </StyledBadge>
  
 }else{
  element = <Avatar src={url} alt={nickname} /*className={classes.large}*/ />
  
 }

  return element
};

export default AvatarUser;




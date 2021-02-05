import React, {useContext } from 'react';
import { authContext } from "../App";
import Avatar from '@material-ui/core/Avatar';
import {withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

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

const AvatarUser = ({avatar , nickname, online } ) => {

  const { state: authState } = useContext(authContext);
const url = "/uploads/" + authState.user._id + "/" + avatar;

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
      <Avatar src={url} alt={nickname}  />
    </StyledBadge>
  
 }else{
  element = <Avatar src={url} alt={nickname} /*className={classes.large}*/ />
  
 }

  return element
};

export default AvatarUser;




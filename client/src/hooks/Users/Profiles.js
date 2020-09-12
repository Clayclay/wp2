import React from 'react';
import {Link} from 'react-router-dom';
import Avatar from '../Avatar';
import Lang from '../Lang';

import { makeStyles } from '@material-ui/core/styles';
import ChatIcon from '@material-ui/icons/Chat';
import IconButton from '@material-ui/core/IconButton';

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));

const Profiles = ({user}) => {

    const classes = useStyles();
    return(

<div className="">
        
        <Avatar avatar={user.avatar} />
         {user.age} y.o.  {user.gender}
        

        {user.languages && 
        user.languages.map(language => (            
          <Lang key={language._id.toString()} language={language} />
          ))}

      
    
      
        <Link onClick={e => (!user._id) ? e.preventDefault() : null} to={`/user/${user._id}`}>
        <button className={'button mt-20'} type="submit">View</button>
        </Link>

        <Link onClick={ e => (!user._id) ? e.preventDefault() : null} to={`/chat/${user._id}`
          }>
        <IconButton color="primary" aria-label="Message" component="span">
          <ChatIcon />
        </IconButton >
        </Link>   

       
       
      </div>


    );


};

/*
{user.languages.map(language => (
  <li key={language} >{language}</li>
))}*/

export default Profiles;

import React from 'react';
import {Link} from 'react-router-dom';
import Avatar from '../Avatar';

const Profiles = ({user}) => {
  
    return(

<div className="profiles">
         
          

      <div className="content">
        <h3><div className="usersNickname">{user.nickname}</div></h3>
        <Avatar avatar={user.avatar} />
        <div>{user._id}</div>
        <div>{user.age}</div>

      
    
      
        <Link onClick={e => (!user._id) ? e.preventDefault() : null} to={`/user/${user._id}`}>
        <button className={'button mt-20'} type="submit">Details</button>
        </Link>

        <Link onClick={ e => (!user._id) ? e.preventDefault() : null} to={`/chat/${user._id}`
          }>
        <button className={'button mt-20'} type="submit">Message</button>
        </Link>       

       
      </div>
    </div>

    );


};

/*
{user.languages.map(language => (
  <li key={language} >{language}</li>
))}*/

export default Profiles;

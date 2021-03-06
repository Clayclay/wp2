import React from 'react';
import {Link} from 'react-router-dom';

export const Profiles = ({user}) => {
  
    return(

<div className="profiles">
      <img
        src={user.img}
        alt=""
      />
      
      <div className="content">
        <h3><div className="usersNickname">{user.nickname}</div></h3>
        <div>{user._id}</div>
        <div>{user.age}</div>
        


        <Link onClick={e => (!user._id) ? e.preventDefault() : null} to={`/user/${user._id}`}>
        <button className={'button mt-20'} type="submit">Details</button>
        </Link>

        <Link onClick={e => (!user._id) ? e.preventDefault() : null} to={`/chat`}>
        <button className={'button mt-20'} type="submit">Message</button>
        </Link>


      </div>
    </div>

    );

}

export default Profiles;

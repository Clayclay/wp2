import React from 'react';
import {Link} from 'react-router-dom';


export const Profile = ({user}) => {
  
    return(

<div className="profile">
      <img
        src={user.img}
        alt=""
      />
      <div className="content">
        <h3>{user.email}</h3>
        <span> {user.age}</span>
        <span> {user._id}</span>


        <Link onClick={e => (!user._id) ? e.preventDefault() : null} to={`/users/${user._id}`}>
              <button className={'button mt-20'} type="submit">Details</button>
            </Link>


      </div>
    </div>

    );

}

export default Profile;

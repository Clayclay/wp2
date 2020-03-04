import React from 'react';


export const Profile = ({user}) => {

    return(

<div className="profile">
      <img
        src={user.img}
        alt=""
      />
      <div className="content">
        <h2>{user.email}</h2>
        <span> {user.age}</span>
      </div>
    </div>

    );

}

export default Profile;

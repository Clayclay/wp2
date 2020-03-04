import React from 'react';


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
      </div>
    </div>

    );

}

export default Profile;

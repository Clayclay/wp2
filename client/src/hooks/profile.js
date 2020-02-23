import React  from 'react';

  export const RenderProfile = ({profile}) => {
    return (
      <div className="profile">
        <img
          src={profile.nickname}
          alt=""
        />
        <div className="content">
          <h2>{profile.email}</h2>
          
        </div>
      </div>
    );
  };


export default RenderProfile;
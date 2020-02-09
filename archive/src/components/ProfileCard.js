import React from "react";

export const ProfileCard = ({ profile }) => {
    //Presentational Component = render the props only
  return (
    <div className="profile">
     
      <div className="content">
        <h2>{profile.pseudo}</h2>
        {profile.age}
        
            
      </div>
    </div>
  );
};
export default ProfileCard;
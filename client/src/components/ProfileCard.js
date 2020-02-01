import React from "react";

export const ProfileCard = ({ profile }) => {
    
  return (
    <div className="profile">
     
      <div className="content">
        <h2>{profile.pseudo}</h2>
        
            
      </div>
    </div>
  );
};
export default ProfileCard;
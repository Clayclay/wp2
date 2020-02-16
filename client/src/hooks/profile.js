import React from "react";
export const ProfileCard = ({ profile }) => {
    
  return (
   
      <div className="content">
        <h2>{profile.nickname}</h2>
        {profile.age}
      </div>
    
  );
};
export default ProfileCard;
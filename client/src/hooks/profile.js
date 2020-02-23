import React  from 'react';
import Context from '../utils/context';


//const Profile = () => {
  //const context = useContext(Context)


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
/*
    return(
      <div>
        <RenderProfile profile={context.authObj.userProfile} />
      </div>
  )}*/



export default RenderProfile;
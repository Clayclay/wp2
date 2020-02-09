

import profileService from '../services/profileService';
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Profile = ({profile}) =>  {


  const [profiles, setprofiles] = useState(null);

  //initiation des constante profiles et set profile

  useEffect(() => {
    //React que notre composant doit exécuter quelque chose après chaque affichage
    //à l’intérieur de notre composant nous permet d’accéder à la variable d’état count
    if(!profiles) {
      getProfiles();
    }
  })

  const getProfiles = async () => {
    let res = await profileService.getAll();
    console.log(res);
    setprofiles(res);
  }



  const renderProfile = profile => {

    return(
 <div>      
    <h1>Profile</h1>
    <div id="profile">
      
      
      <ul key={profile._id} className="list__item profile">
      <h3 className="profile__pseudo">{profile.pseudo} </h3>

        <div><li>{profile.email}</li>
        <li>{profile.age}</li>
        <li>{profile.gender}</li>
        <li>{profile.city} </li>
        
        <li>{profile.image}</li>
        <li>{profile.languages.toString()}</li>
        <li>{profile.albums.toString()}</li> </div>
        </ul>

    </div> 
</div>
    );
};
//sinon =
return (
  <div className="App">
    <ul className="list">
      {(profiles && profiles.length > 0) ? (
        profiles.map(profile => renderProfile(profile))
      ) : (
        <p>No profiles found</p>
      )}
    </ul>
  </div>
);



}

export default Profile;



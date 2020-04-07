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
        <h3>{user.email}</h3>
        <h3>{user._id}</h3>
        <h3> {user.age}</h3>
        


        <Link onClick={e => (!user._id) ? e.preventDefault() : null} to={`/users/${user._id}`}>
              <button className={'button mt-20'} type="submit">Details</button>
            </Link>


      </div>
    </div>

    );

}

export default Profiles;

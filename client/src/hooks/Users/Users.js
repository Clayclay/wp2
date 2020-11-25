import React , { useEffect, useContext, useState } from 'react';
import { authContext } from "../../App";
import { getUsers } from '../../function/GetUsers';
import UsersList from './UsersList';

import Container from '@material-ui/core/Container';
import { set } from 'mongoose';

const Users = () => {

  const { state: authState } =useContext(authContext);

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const id = authState.user._id;
  
 

  const blockedusers= authState.user.blocked;
  const blockedbyusers=authState.user.blockedby ;

  const [blockFilter]= useState(blockedusers .concat(blockedbyusers));
  
  const [usersList, setUsersList] = useState([]);

  const filterArray = (array, filters) => {
    return array.filter((item) => {
      return Object.keys(filters).every((key) => {
        if (typeof filters[key] !== "function") {
          return true;
        }
        return filters[key](item[key]);
      });
    });
  };

  useEffect(() => {
    setLoading(true);
    getUsers(id)  
    .then(users => {
      let filteredUsers = users;

      if (blockFilter !=='' ){
        blockFilter.map(  (item)  =>  (  
         filteredUsers = users.filter((user) => !blockFilter.includes(user._id))
        ))
      setUsers(filteredUsers) 
      }

      setUsers(filteredUsers)
      setLoading(false);
    })
  }, [authState.token]);

    return(

      <Container maxWidth="sm">

        {loading ? (
          <span className="loader">LOADING...</span>
        ) : error ? (
          <span className="error">AN ERROR HAS OCCURED</span>
        ) : (
          <>


    <UsersList users={users} blockedusers={authState.user.blocked} blockedbyusers={authState.user.blockedby} />

          </>
        )} 

      </Container>
    );
};



export default Users;


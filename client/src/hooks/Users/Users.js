import React , { useEffect, useContext, useState } from 'react';
import { authContext } from "../../App";
import { getUsers } from '../../function/GetUsers';
import UsersList from './UsersList';

import Container from '@material-ui/core/Container';

const Users = () => {

  const { state: authState } =useContext(authContext);

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUsers(authState.user._id)  .then(users => {
      setUsers(users);
      setLoading(false);
    })
    ;
  }, [authState.token]);

    return(

      <Container maxWidth="sm">

        {loading ? (
          <span className="loader">LOADING...</span>
        ) : error ? (
          <span className="error">AN ERROR HAS OCCURED</span>
        ) : (
          <>

    <UsersList users={users}/>

          </>
        )} 

      </Container>
    );
};



export default Users;


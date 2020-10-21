import React , { useEffect, useReducer, useContext,useState } from 'react';
import { authContext } from "../../App";
import { getUsers } from '../../function/GetUsers';
import UsersList from './UsersList';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    
  },
  gridList: {
    width: 500,
    //height: 450,

  },
  search: {
    margin: '5px',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));



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


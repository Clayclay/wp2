import React , { useEffect, useReducer, useContext,useState } from 'react';
import { authContext } from "../../App";
import UsersCard from './UsersCard';
import './Users.css';
import * as ACTION_TYPES from '../../store/actions/action_types';
import FetchReducer from '../../store/reducers/fetch_reducer';
import Container from '@material-ui/core/Container';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import {Link} from 'react-router-dom';

import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

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

const initialState = {
  users: [],
  isFetching: false,
  hasError: false,
};



const Users = () => {
  const classes = useStyles();
  const { state: authState } =useContext(authContext);
  const [state, dispatch] = useReducer(FetchReducer, initialState);
  const id = authState.user._id;

  const [users,setUsers] = useState([]);


  useEffect(() => {
    //console.log("RUNTIME user")
    dispatch({
      type: ACTION_TYPES.REQUEST
    }); 
    fetch(`http://localhost:5000/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${authState.token}`
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then(resJson => {
        dispatch({
          type: ACTION_TYPES.SUCCESS,
          payload: resJson
        });
        setUsers(state.users);
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: ACTION_TYPES.FAILURE
        });
      });
      
  }, [authState.token]);

console.log("users",users,'state.users',state.users)

    return(

      <Container maxWidth="sm">

        {state.isFetching ? (
          <span className="loader">LOADING...</span>
        ) : state.hasError ? (
          <span className="error">AN ERROR HAS OCCURED</span>
        ) : (
          <>

<UsersList users={users}/>

          </>
        )} 

      </Container>
    );
};


const UsersList = ({users}) => {
  const classes = useStyles();
  const LANGUAGES = {
  EN: 'english',
  FR: 'french'
};

const filterEnglishUsers = user => user.langue === LANGUAGES.EN;
const filterFrenchUsers = user => user.langue === LANGUAGES.FR;

const languageFilters = {
  [LANGUAGES.EN]: filterEnglishUsers,
  [LANGUAGES.FR]: filterFrenchUsers
};

  

  const [filter, setFilter] = useState('');

  const filteredUsers = !!filter ? users : users.filter(languageFilters[filter]);
  // const filter = ask if no filter ? ( YES there is no filter so only user) 
  //: OR (NO there is filter so users.filter)
     return (

      <div className={classes.root}>


      <div className="users__filter">
      <button onClick={() => setFilter(LANGUAGES.FR)}>
        French
      </button>
      </div>


<GridList cellHeight={220} className={classes.gridList} cols={1} >
          {filteredUsers.map((user) =>
         

           <GridListTile  key={user._id.toString()}  component={Link}  onClick={e => (!user._id) ? e.preventDefault() : null} to={`/user/${user._id}`} >
                  
                    <UsersCard key={user._id.toString()} user={user} />
                    
                </GridListTile>
          //OR FALSE

        )}
  </GridList>
  
  </div>
     )

}

export default Users;


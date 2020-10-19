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
        filter: null,
        isFetching: false,
        hasError: false,
      };

const Users = () => {
      const classes = useStyles();
      const { state: authState } =useContext(authContext);

      const [state, dispatch] = useReducer(FetchReducer, initialState);

      const id = authState.user._id;
   
      const [filter, setFilter] = useState(initialState);
      const [filteredUsers, setfilteredUsers] = useState([]); 

      useEffect(() => {
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
            console.log(resJson);
            dispatch({
              type: ACTION_TYPES.SUCCESS,
              payload: resJson
            });
            setfilteredUsers(resJson);
          })
          .catch(error => {
            console.log(error);
            dispatch({
              type: ACTION_TYPES.FAILURE
            });
          });
          
      }, [authState.token]);

    useEffect(() => {
        setfilteredUsers([]);
      const filtered = state.users.map((p) => ({
          ...p,
          filtered: p.languages.filter((el) => el.langue === filter).length > 0
        }));
        setfilteredUsers(filtered);
        
      }, [filter]);

    /*const handleFilter = e =>
     {
      setFilter("english")
     console.log("filter", filter)
      dispatch({ type: ACTION_TYPES.USER_FILTER, payload: filter });
    }*/

console.log("filteredusers",filteredUsers, "filter",filter)

    return(

      <Container maxWidth="sm">
      <div className={classes.root}>

 
      <div className="users__filter">
      <button onClick={() => setFilter("french")}>
        French
      </button>
      <button onClick={() => setFilter("english")}>
        english
      </button>

       
      </div>

      
        
        {state.isFetching ? (
          <span className="loader">LOADING...</span>
        ) : state.hasError ? (
          <span className="error">AN ERROR HAS OCCURED</span>
        ) : (
          <>

          {filteredUsers.map((item) =>
          item.filtered === true ? 
            <span key={item.nickname}>{item.nickname}</span>
           : ""
        )}

          <GridList cellHeight={220} className={classes.gridList} cols={1} >
            {state.users.length > 0 &&  state.users.map(user => (
                <GridListTile  key={user._id.toString()}  component={Link}  onClick={e => (!user._id) ? e.preventDefault() : null} to={`/user/${user._id}`} >
                  
                    <UsersCard key={user._id.toString()} user={user} />

                </GridListTile>
              ))}
          </GridList>
          </>
        )} 
        

      </div>

      </Container>
    );
};

export default Users;


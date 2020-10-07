import React , { useEffect, useReducer, useContext } from 'react';
import { authContext } from "../../App";
import UsersCard from './UsersCard';
import './Users.css';
import * as ACTION_TYPES from '../../store/actions/action_types';
import FetchReducer from '../../store/reducers/fetch_reducer';
import Container from '@material-ui/core/Container';

import Typography from '@material-ui/core/Typography';


import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import {Link} from 'react-router-dom';

import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

    const initialState = {
        users: [],
        isFetching: false,
        hasError: false,
      };

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
      const classes = useStyles();
      const { state: authState } =useContext(authContext);

      const [state, dispatch] = useReducer(FetchReducer, initialState);

      const id = authState.user._id;
   

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
          })
          .catch(error => {
            console.log(error);
            dispatch({
              type: ACTION_TYPES.FAILURE
            });
          });
          
      }, [authState.token]);

    return(

      <Container maxWidth="sm">
      <div className={classes.root}>

      <Paper component="form" className={classes.search}>
     <InputBase
       className={classes.input}
       placeholder="Search "
       inputProps={{ 'aria-label': 'search ' }}
     />
     <IconButton type="submit" className={classes.iconButton} aria-label="search">
       <SearchIcon />
     </IconButton>
   </Paper>
        
        {state.isFetching ? (
          <span className="loader">LOADING...</span>
        ) : state.hasError ? (
          <span className="error">AN ERROR HAS OCCURED</span>
        ) : (
          <>
          <GridList cellHeight={180} className={classes.gridList} cols={2} >
            {state.users.length > 0 && state.users.map(user => (
                <GridListTile key={user._id.toString()}  component={Link}  onClick={e => (!user._id) ? e.preventDefault() : null} to={`/user/${user._id}`} >
                  
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


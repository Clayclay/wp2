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
import GridListTileBar from '@material-ui/core/GridListTileBar';

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
      }));

const Users = () => {
      const classes = useStyles();
      const { state: authState } =useContext(authContext);

      const [state, dispatch] = useReducer(FetchReducer, initialState);

      useEffect(() => {
        dispatch({
          type: ACTION_TYPES.REQUEST
        }); 
        fetch("/api/users/", {
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

        
        {state.isFetching ? (
          <span className="loader">LOADING...</span>
        ) : state.hasError ? (
          <span className="error">AN ERROR HAS OCCURED</span>
        ) : (
          <>
          <GridList cellHeight={180} className={classes.gridList} cols={2} >
            {state.users.length > 0 && state.users.map(user => (
                <GridListTile key={user._id.toString()} >
                  
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


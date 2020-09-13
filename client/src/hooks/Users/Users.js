import React , { useEffect, useReducer, useContext } from 'react';
import { authContext } from "../../App";
import Profiles from './Profiles';
import './Users.css';
import * as ACTION_TYPES from '../../store/actions/action_types';
import FetchReducer from '../../store/reducers/fetch_reducer';
import Container from '@material-ui/core/Container';

import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

    const initialState = {
        users: [],
        isFetching: false,
        hasError: false,
      };

      const useStyles = makeStyles((theme) => ({
        root: {
         
          '& > *': {
            margin: theme.spacing(1),
    
          },
        },
      paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
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
      <div className={classes.root}>
    
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Users List
        </Typography>

        {state.isFetching ? (
          <span className="loader">LOADING...</span>
        ) : state.hasError ? (
          <span className="error">AN ERROR HAS OCCURED</span>
        ) : (
          <>
            {state.users.length > 0 &&
              state.users.map(user => (

                 <Box p={1} m={1} >
                <Profiles key={user._id.toString()} user={user} />
                </Box>

              ))}
          </>
        )}
      </Container>
      
           
      </div>
    );
};

export default Users;


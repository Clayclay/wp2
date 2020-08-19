import React , { useEffect, useReducer, useContext } from 'react';
import { authContext } from "../../App";
import Profiles from './Profiles';
import './Users.css';
import * as ACTION_TYPES from '../../store/actions/action_types';
import FetchReducer from '../../store/reducers/fetch_reducer';

    const initialState = {
        users: [],
        isFetching: false,
        hasError: false,
      };


const Users = () => {

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
    
    
      <div className="container">  <p>{authState.user.nickname}</p>
        {state.isFetching ? (
          <span className="loader">LOADING...</span>
        ) : state.hasError ? (
          <span className="error">AN ERROR HAS OCCURED</span>
        ) : (
          <>
            {state.users.length > 0 &&
              state.users.map(user => (
                <Profiles key={user._id.toString()} user={user} />
              ))}
          </>
        )}
      </div>
      
      
    );
};

export default Users;


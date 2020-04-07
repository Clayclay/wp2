import React from 'react';
import Profiles from './Profiles';
import {authContext } from "../App";

const initialState = {
  users: [],
  isFetching: false,
  hasError: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USER_REQUEST":
      return {
        ...state,
        isFetching: true,
        hasError: false
      };
    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        isFetching: false,
        user: action.payload
      };
      case "FETCH_USER_FAILURE":
        return {
          ...state,
          hasError: true,
          isFetching: false
        };
      default:
        return state;
    }
};


const Profile = () => {

  
const { state: authState } = React.useContext(authContext);

const [state, dispatch] = React.useReducer(reducer, initialState);

     console.log('state',state) ;
      
        React.useEffect(() => {
          dispatch({
            type: "FETCH_USER_REQUEST"
          });
          fetch("/api/users/:id/", {
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
                type: "FETCH_USER_SUCCESS",
                payload: resJson
              });
            })
            .catch(error => {
              console.log(error);
              dispatch({
                type: "FETCH_USER_FAILURE"
              });
            });
            
        }, [authState.token]);
        console.log(state.hasError)
      return(
        <React.Fragment>
        <div className="home">
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
        </React.Fragment> 
    );
};
export default Profile;


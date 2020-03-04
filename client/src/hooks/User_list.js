import React  from 'react';
import { Context } from "../App";
import Profile from './Profile';



    const initialState = {
        users: [],
        isFetching: false,
        hasError: false,
      };

      const reducer = (state, action) => {
        switch (action.type) {
          case "FETCH_USERS_REQUEST":
            return {
              ...state,
              isFetching: true,
              hasError: false
            };
          case "FETCH_USERS_SUCCESS":
            return {
              ...state,
              isFetching: false,
              users: action.payload
            };
          case "FETCH_USERS_FAILURE":
            return {
              ...state,
              hasError: true,
              isFetching: false
            };
          default:
            return state;
        }
      };

const List = () => {

      const { state: authState } = React.useContext(Context);

      const [state, dispatch] = React.useReducer(reducer, initialState);

      React.useEffect(() => {
        dispatch({
          type: "FETCH_USERS_REQUEST"
        });
        fetch("/api/user", {
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
              type: "FETCH_USERS_SUCCESS",
              payload: resJson
            });
          })
          .catch(error => {
            console.log(error);
            dispatch({
              type: "FETCH_USERS_FAILURE"
            });
          });
      }, [authState.token]);

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
              <Profile key={user._id.toString()} user={user} />
            ))}
        </>
      )}
    </div>
    </React.Fragment>
    );
};

export default List;
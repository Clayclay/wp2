import React, {useContext , useReducer , useEffect} from 'react';
import { authContext } from "../../App";
import Message from './Message';

    const initialState = {
        messages: [],
        isFetching: false,
        hasError: false,
      };

      const reducer = (state, action) => {
        switch (action.type) {
          case "FETCH_MESSAGES_REQUEST":
            return {
              ...state,
              isFetching: true,
              hasError: false
            };
          case "FETCH_MESSAGES_SUCCESS":
            return {
              ...state,
              isFetching: false,
              messages: action.payload
            };
          case "FETCH_MESSAGES_FAILURE":
            return {
              ...state,
              hasError: true,
              isFetching: false
            };
          default:
            return state;
        }
      };

const Messages = () => {

      const { state: authState } = useContext(authContext);

      const [state, dispatch] = useReducer(reducer, initialState);

      useEffect(() => {
        dispatch({
          type: "FETCH_MESSAGES_REQUEST"
        });
        fetch("/api/messages/", {
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
              type: "FETCH_MESSAGES_SUCCESS",
              payload: resJson
            });
          })
          .catch(error => {
            console.log(error);
            dispatch({
              type: "FETCH_MESSAGES_FAILURE"
            });
          });
          
      }, [authState.token]);

    return(
    
      <React.Fragment>
      <div className="messages">  <p></p>
        {state.isFetching ? (
          <span className="loader">LOADING...</span>
        ) : state.hasError ? (
          <span className="error">AN ERROR HAS OCCURED</span>
        ) : (
          <>
            {state.messages.length > 0 &&
              state.messages.map(message => (
                <Message key={message._id.toString()} message={message} />
              ))}
          </>
        )}
      </div>
      
      </React.Fragment> 
    );
};

export default Messages;
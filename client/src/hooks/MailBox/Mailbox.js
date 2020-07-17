import React , { useEffect, useReducer, useContext }  from 'react';
import {authContext} from '../../App';
import Chat from '../Messenger/Chat/Chat';



    const initialState = {
        conversations: [],
        isFetching: false,
        hasError: false,
      };

      
      const reducer = (state, action) => {
        switch (action.type) {
          case "FETCH_CONVERSATIONS_REQUEST":
            return {
              ...state,
              isFetching: true,
              hasError: false
            };
          case "FETCH_CONVERSATIONS_SUCCESS":
            return {
              ...state,
              isFetching: false,
              users: action.payload
            };
          case "FETCH_CONVERSATIONS_FAILURE":
            return {
              ...state,
              hasError: true,
              isFetching: false
            };
          default:
            return state;
        }
      };


const Conversation = () => {
    const { state: authState } = useContext(authContext);

      const [state, dispatch] = useReducer(reducer, initialState);

      useEffect(() => {
        dispatch({
          type: "FETCH_CONVERSATIONS_REQUEST"
        });
        fetch("/api/conversation/", {
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
              type: "FETCH_CONVERSATIONS_SUCCESS",
              payload: resJson
            });
          })
          .catch(error => {
            console.log(error);
            dispatch({
              type: "FETCH_CONVERSATIONS_FAILURE"
            });
          });
          
      }, [authState.token]);
    return (
        <React.Fragment>
      <div className="messages">  <p></p>
        {state.isFetching ? (
          <span className="loader">LOADING...</span>
        ) : state.hasError ? (
          <span className="error">AN ERROR HAS OCCURED</span>
        ) : (
          <>
            {state.conversations.length > 0 &&
              state.conversations.map(conversation => (
                <Chat key={conversation._id.toString()} conversation={conversation} />
              ))}
          </>
        )}
      </div>
      
      </React.Fragment> 
    )
}

export default Conversation;
import React , { useEffect, useReducer, useContext } from 'react';
import * as ACTION_TYPES from '../../store/actions/action_types';
import { authContext } from "../../App";

    const initialState = {
        langs: [],
        isFetching: false,
        hasError: false,
      };

      const LangReducer = (state, action) => {

        switch (action.type) {

          case ACTION_TYPES.REQUEST:
            return {
              ...state,
              isFetching: true,
              hasError: false
            };
          case ACTION_TYPES.SUCCESS:
            return {
              ...state,
              isFetching: false,
              langs: action.payload
            };
          case ACTION_TYPES.FAILURE:
            return {
              ...state,
              hasError: true,
              isFetching: false
            };
          default:
            return state;
        }
      };



const Langs = () => {

    const { state: authState } =useContext(authContext);

      const [state, dispatch] = useReducer(LangReducer, initialState);

      useEffect(() => {
        dispatch({
            type: ACTION_TYPES.REQUEST
          }); 
        fetch("/api/languages/", {
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
    
      <div className="container">  
        {state.isFetching ? (
          <span className="loader">LOADING...</span>
        ) : state.hasError ? (
          <span className="error">AN ERROR HAS OCCURED</span>
        ) : (
          <>
          
          <select>
            {state.langs.length > 0 &&    
                state.langs.map(language => (
                <option key={language._id.toString()} value={language._id}>{language.nativName}</option>
            ))}
            </select>

          </>
        )}
      </div>
      
    );
};

export default Langs;



import React , { useEffect, useReducer, useContext } from 'react';
import * as ACTION_TYPES from '../../store/actions/action_types';
import { authContext } from "../../App";

import LangReducer from '../../store/reducers/lang_reducer';

 const initialState = {
    langs: [],
    isFetching: false,
    hasError: false,
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
          
          <select multiple >
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



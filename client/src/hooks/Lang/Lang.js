import React , { useEffect, useReducer, useContext, useState } from 'react';
import * as ACTION_TYPES from '../../store/actions/action_types';
import { authContext } from "../../App";

import LangReducer from '../../store/reducers/lang_reducer';
import { JsonWebTokenError } from 'jsonwebtoken';
import { json } from 'body-parser';

 const initialState = {
    langs: [],
    isFetching: false,
    hasError: false,
  };

const Langs = ({onSubmit}) => {

  const { state: authState } =useContext(authContext);
  const [state, dispatch] = useReducer(LangReducer, initialState);

  const [userlang,setLang]=useState({});

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
//console.log(resJson);
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

  const handleChange = ({target}) => {
    const value = JSON.parse(target.value);
    setLang(value);
  } 

  return(
  
    <div className="container">  
      {state.isFetching ? (
        <span className="loader">LOADING...</span>
      ) : state.hasError ? (
        <span className="error">AN ERROR HAS OCCURED</span>
      ) : (
        <>
          <label>
        <select multiple={true} onChange={handleChange} >
          {state.langs.length > 0 &&    
              state.langs.map(language => (
              <option key={language._id} value={[JSON.stringify(language)
              ]}>{language.nativName}</option>
          ))}
          </select>
          <button onClick={(e) => onSubmit(  userlang , e ) }>Add languages</button>
        </label>

        <pre>{JSON.stringify(userlang, null, 2)}</pre> 
        </>
      )}
    </div>
    
  );
};

export default Langs;



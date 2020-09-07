import React , { useEffect, useReducer, useContext, useState } from 'react';
import * as ACTION_TYPES from '../../../store/actions/action_types';
import { authContext } from "../../../App";
import LangReducer from '../../../store/reducers/lang_reducer';

 const initialState = {
    langs: [],
    isFetching: false,
    hasError: false,
  };

const CreateLangs = ({onSubmit}) => {
  const { state: authState } =useContext(authContext);
  const id = authState.user._id;
  
  //to display all lang
  const [ state , dispatch ] = useReducer(LangReducer, initialState);
  //to create userlang
  const [userlang,setLang]=useState({});
  //const [lvl,setLvl]=useState(1);

  useEffect(() => {
    //to get all Langs
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

  const handleChange = event /*({target})*/ => {
    //const value = JSON.parse(target.value);
    setLang(
      {
        ...userlang,
        [event.target.name]: event.target.value
      });
  } 
  
  return(
  
    <div className="">  
      {state.isFetching ? (
        <span className="loader">LOADING...</span>
      ) : state.hasError ? (
        <span className="error">AN ERROR HAS OCCURED</span>
      ) : (
        <>
          <label htmlFor="langList">
        <select onChange={handleChange} value={userlang.languages} 
        name="languages"  >
          
          {state.langs.length > 0 &&    
              state.langs.map(language => (
              <option key={language._id} 
              value={[JSON.stringify(language) ]}>
                {language.nativName}</option>
          ))}
          </select>
          

          <button onClick={(e) => onSubmit(  userlang , e ) }>Add languages</button>
        </label>
        
        </>
      )}

   
    </div>
    
  );
};
/*
<label htmlFor="lvl">
<div onChange={handleChange} defaultValue={"1"} >
<input type="radio" value="1" name="lvl"/> 1 Beginner
<input type="radio" value="2" name="lvl"/> 2
<input type="radio" value="3" name="lvl"/> 3 
<input type="radio" value="4" name="lvl"/> 4
<input type="radio" value="5" name="lvl"/> 5
<input type="radio" value="6" name="lvl"/> 6 Fluent
</div>
</label>*/

export default CreateLangs;



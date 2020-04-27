import React  from 'react';
import { authContext } from "../App";
import {  useParams } from 'react-router-dom'
import * as ACTION_TYPES from '../store/actions/action_types';

const initialState = {
  user: [],
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
    case ACTION_TYPES.SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.payload
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


const Profile = () => {

const { state: authState } = React.useContext(authContext);

const [state, dispatch] = React.useReducer(reducer, initialState);

//nice! you'll have to fix CORS but good progress

let params = useParams();
const id = params.id ;
      
        React.useEffect(() => {
          
          
          dispatch({
            type: "FETCH_USER_REQUEST"
          });
          fetch(`http://localhost:5000/api/user/${id}`, {
           
            headers: {  }
          })
          .then(res => {
              if (res.ok) {
                //console.log('res',res)
                return res.json();
              } else {
                throw res;
              }
            })
          /*.then(res => res.text())          // convert to plain text
          .then(text => console.log(text))  // then log it out*/
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
            
        },[id ,authState.token]);
       
      return(
        <React.Fragment>
        <div className="home">
          {state.isFetching ? (
            <span className="loader">LOADING...</span>
          ) : state.hasError ? (
            <span className="error">AN ERROR HAS OCCURED</span>
          ) : (
            <>
              <p>{state.user.nickname}</p>
              <p>{state.user.email}</p>
               <p>{state.user.age} </p> 
               <p>{state.user.city} </p>     
               <p>{state.user.avatar} </p>    
            </>
          )}
        </div>

        

        </React.Fragment> 
    );
};
export default Profile;


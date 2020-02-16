// display + handle fetching  from the server and displaying them. +

// mission = get the token from app

import React from "react";

import { AuthContext } from "../App";
//import Context from "../App";


//import ProfileCard from "./ProfileCard";
import  ProfileCard  from "./profile"


//network = 3 states 
//1 request process ( avec loader)
//2 request successful ??? ( render payload)
//3 request fails ?? Error
//need : useEffect and useReducer hooks.



//INIT des const
  const initialState = {
    profiles: [],// list de profiles
    isFetching: false,
    hasError: false,
  };

//REDUCER
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PROFILES_REQUEST":
      return {
        ...state,
        isFetching: true,
        hasError: false
      };
    case "FETCH_PROFILES_SUCCESS":
      return {
        ...state,
        isFetching: false,
        profiles: action.payload
      };
    case "FETCH_PROFILES_FAILURE":
      return {
        ...state,
        hasError: true,
        isFetching: false
      };
    default:
      return state;
  }
};

export const Home = () => {

  const { state: authState } = React.useContext(AuthContext);
  
  //// usereducer hook retourne state+dispatch.state
  //// appel de dispatch pour transform et changer l'etat
  //pass in the reducer and initialStat
  const [state, dispatch] = React.useReducer(reducer, initialState);
  
// useEffect function = 
//handle the network calls +dispatch the necessary ACTION based on the server response. 


  React.useEffect(() => {
    dispatch({
      type: "FETCH_PROFILES_REQUEST"
    });
    fetch("http://localhost:3000/api/profile", {
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
          type: "FETCH_PROFILES_SUCCESS",
          payload: resJson
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: "FETCH_PROFILES_FAILURE"
        });
      });
  }, [authState.token]);

return (
  <React.Fragment>
    <div className="home">
      {state.isFetching ? (
        <span className="loader">LOADING...</span>
      ) : state.hasError ? (
        <span className="error">AN ERROR HAS OCCURED</span>
      ) : (
        <>
          {state.profiles.length > 0 &&
            state.profiles.map(profile => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
        </>
      )}
    </div></React.Fragment>
  );
};
export default Home;
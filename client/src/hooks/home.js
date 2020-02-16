// display + handle fetching  from the server and displaying them. +

// mission = get the token from app

import React from "react";


import Context from "../App";


//import ProfileCard from "./ProfileCard";
import RenderProfile from "./profile"


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

  const { state: authState } = React.useContext(Context);

  const [state, dispatch] = React.useReducer(reducer, initialState);
return (
    <div className="home">
      {state.isFetching ? (
        <span className="loader">LOADING...</span>
      ) : state.hasError ? (
        <span className="error">AN ERROR HAS OCCURED</span>
      ) : (
        <>
          {state.profiles.length > 0 &&
            state.profiles.map(profile => (
              <RenderProfile key={profile.id.toString()} profile={profile} />
            ))}
        </>
      )}
    </div>
  );
};
export default Home;
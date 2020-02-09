import React from "react";
import "./App.css";

import Login from "./components/Login";

import Home from "./components/Home";
import Header from "./components/Header";
import Register from "./components/Register";

import ContextState from './context_state_config';


//BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css';

//Objet MAGIQUE Qui transmet a ts les composants
export const AuthContext = React.createContext(); 


// CONSTRUCTOR INIT des differentes variables utiliser apres par le reducer
const initialState = {
  isAuthenticated: false,
  //user: null,
  profile: null,
  token: null,
  //Verif necessaire = si authenticated + data + token de retour du serv apres le log
};

//REDUCER ( notre ouvrier)
// reducer est donc une fonction qui modifie le state de votre application en fonction d'une action.
//case-switch statement Register ou Logout
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      // envois le payload user + token dans le localstorage 
      //localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("profile", JSON.stringify(action.payload.profile));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {   
        ...state,
        isAuthenticated: true,
        //user: action.payload.user,
        profile: action.payload.profile,
        token: action.payload.token
        //puis retourne new state Tout OK
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        //user: null,
        profile : null,
        //On nettois
      };
      
  
    default:
      return state;
  }
};


//App =nœud DOM « racine » car tout ce qu’il contient sera géré par React DOM.
//App est tout seul
function App() {
    // usereducer hook retourne state+dispatch.state
    // appel de dispatch pour transform et changer l'etat
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    
    <div>
     	 <ContextState />
      </div>



    /*
    //Auth context passe object magique afin dêtre utliser par tout autre component
      <AuthContext.Provider
        value={{
          //passe un object dans la prop value
          state,
          dispatch
          //  cet object contient state + dispatch function
          //
         }}
        >
        <Header />
        
        <div className="App">{!state.isAuthenticated ? <Login /> : <Home />}</div>
    </AuthContext.Provider>
      //conditionally render the components if is authenticated = login sinon Home
         */
      
      

  );
  };


// a déplacer bienvenu dans renderprofile
export default App ; 
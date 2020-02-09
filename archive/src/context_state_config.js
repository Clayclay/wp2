//all the business logic for reading and updating the global state 
// will hold all the logic for reading and updating the global state with the useReducer hook and context.

import React, { useReducer } from 'react';
import Context from './utils/context';

//import * as ACTIONS from './store/actions/actions';
import * as ACTIONS from './Store/actions/actions';

import * as Reducer1 from './Store/reducers/plain_reducer';
//use the syntax import * as Reducer1 because we want to import both the Reducer1 and the initialState. T

import * as AuthReducer from './Store/reducers/auth_reducer';
import * as FormReducer from './Store/reducers/form_reducer';
import Routes from './routes';

//importing all our actions and reducers.

import Auth from './utils/auth';

//Note you probably dont want to have so many variables and functions in context in a real app, 
//this is just for demonstration purposes. Simply remove the properties you don't need.


const auth = new Auth()
//new Auth () is how we initialize our class then save it in the auth variable.

const ContextState = () => {
    
    /*
        Plain Reducer
    */

   //importing all our actions and reducers. 
//We then pass in our Reducer1 and its initial state to the useReducer() hook. 

    const [stateReducer1, dispatchReducer1] = useReducer(Reducer1.Reducer1,
                                                         Reducer1.initialState)
//We use the syntax import * as Reducer1 
//because we want to import both the Reducer1 and the initialState.

 //Then we use the syntax Reducer1.Reducer1 to access Reducer1 and the intialState can be accessed using Reducer1.initailState.
//we save the the result of the useReducer()
//In the example above, stateReducer1 is how we access the state properties 
//we defined in the intialState of Reducer1.

//dispatchReducer1 is our dispatch function that allows us
// to update the state with actions.

    const handleDispatchTrue = () => {
      //    dispatchReducer1(type: "SUCCESS")
      //    dispatchReducer1(ACTIONS.SUCCESS)
      dispatchReducer1(ACTIONS.success())
    }

    const handleDispatchFalse = () => {
      //     dispatchReducer1(type: "FAILURE")
      //    dispatchReducer1(ACTIONS.FAILURE)
      dispatchReducer1(ACTIONS.failure())
     
    }
    //Actions.truc into our dispatch function, which tells our reducer how to update the state.

    /*
      Auth Reducer
    */
    const [stateAuthReducer, dispatchAuthReducer] =                      useReducer(AuthReducer.AuthReducer,
                                                           AuthReducer.initialState)


    const handleLogin = () => {
      dispatchAuthReducer(ACTIONS.login_success())
    }

    const handleLogout = () => {
      dispatchAuthReducer(ACTIONS.login_failure())
    }

    const handleAddProfile = (profile) => {
      dispatchAuthReducer(ACTIONS.add_profile(profile))
    }

    const handleRemoveProfile = () => {
      dispatchAuthReducer(ACTIONS.remove_profile())
    }



    /*
      Form Reducer
    */

        const [stateFormReducer, dispatchFormReducer] = useReducer(FormReducer.FormReducer, FormReducer.initialState)


    const handleFormChange = (event) => {
      dispatchFormReducer(ACTIONS.user_input_change(event.target.value))
    };

    const handleFormSubmit = (event) => {
      event.preventDefault();
      event.persist();             dispatchFormReducer(ACTIONS.user_input_submit(event.target.useContext.value))
    };

    //Handle authentication from callback
    const handleAuthentication = (props) => {
      //create andleAuthentication() function.
      if(props.location.hash) {
        auth.handleAuth()
        //rops.location.hash is true 
        //then we call the auth.handleAuth() function we just setup in the Auth class.
      }
    }



    return(
      <div>
      <Context.Provider
      // we have 2 properties, handleAuth which calls 
      //our handleAuthentication() function and authObj which we use to pass down our entire
          value={{
            //Reducer1
            stateProp1: stateReducer1.stateprop1,
            stateProp2: stateReducer1.stateprop2,
            //use the syntax Reducer1.Reducer1 to access Reducer1 and the intialState can be accessed using Reducer1.initailState.
            dispatchContextTrue: () => handleDispatchTrue(),
            dispatchContextFalse: () => handleDispatchFalse(),

            //Form Reducer
            useContextChangeState: stateFormReducer.user_textChange,
            useContextSubmitState: stateFormReducer.user_textSubmit,
            useContextSubmit: (event) => handleFormSubmit(event),
            useContextChange: (event) => handleFormChange(event),

            //Auth Reducer
            authState: stateAuthReducer.is_authenticated,
            profileState:  stateAuthReducer.profile,
            handleUserLogin: () => handleLogin(),
            handleUserLogout: () => handleLogout(),
            handleUserAddProfile: (profile) => handleAddProfile(profile),
            handleUserRemoveProfile: () => handleRemoveProfile(),

            //Handle auth
            handleAuth: (props) => handleAuthentication(props),
            authObj: auth
          }}>
          <Routes />
      </Context.Provider>
      </div>
    )
}


export default ContextState;
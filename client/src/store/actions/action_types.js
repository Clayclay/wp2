//Will hold all the string actions types in variables. 
//This will allow easy modifying of your action types since 
//you will only have to change them here instead having to track down where ever you used the action in your code.


export const SUCCESS = "SUCCESS"
//Will be used as our boiler plate actions.
export const FAILURE = "FAILURE"

export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
//Used to update authentication state of the user.
export const LOGIN_FAILURE = "LOGIN_FAILURE"

export const ADD_PROFILE = "ADD_PROFILE"
//Used to save the profile data from Auth0 to the global state.
export const REMOVE_PROFILE = "REMOVE_PROFILE"

export const USER_INPUT_CHANGE = "USER_INPUT_CHANGE"
//Used to track the changes and submit of the user submitted text of the form.
export const USER_INPUT_SUBMIT = "USER_INPUT_SUBMIT"
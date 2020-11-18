//Will hold all the string actions types in variables. 
//This will allow easy modifying of your action types since 
//you will only have to change them here instead having to track down where ever you used the action in your code.

/*
 * action types
 */

import * as ACTION_TYPES from './action_types'

export const SUCCESS = {
  type: ACTION_TYPES.SUCCESS
}

export const FAILURE = {
  type: ACTION_TYPES.FAILURE
}


export const success = () => {
  return {
    type: ACTION_TYPES.SUCCESS
  }
}

export const failure = () => {
  return {
    type: ACTION_TYPES.FAILURE
  }
}



export const login_success = () => {
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS
  }
}

export const login_failure = () => {
  return {
    type: ACTION_TYPES.LOGIN_FAILURE
  }
}


export const add_user = (user) => {
  return {
    type: ACTION_TYPES.ADD_USER,
    payload: user
  }
}

export const remove_user = () => {
  return {
    type: ACTION_TYPES.REMOVE_USER
  }
}

export const user_input_change = (user) => {
  return {
    type: ACTION_TYPES.USER_INPUT_CHANGE,
    payload: user
  }
}

export const user_input_submit = (text) => {
  return {
    type: ACTION_TYPES.USER_INPUT_SUBMIT,
    payload: text
  }
}


export const add_filter = (filter) => {
  return {
    type: ACTION_TYPES.ADD_FILTER,
    payload: filter
  }
}

export const logout = () => {
    return {
      type: ACTION_TYPES.LOGOUT
    }
  }



/*
 * other constants
 */



 /*
 * action creators
 */
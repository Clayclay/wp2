//Will hold the reducer to read and update state properties related to our form.


import * as ACTION_TYPES from '../actions/action_types'


export const initialState = {
  user_textChange: '',
  user_textSubmit: ''
}
//these actions are going to be used with a form we need to pass in the event keyword as a parameter to both our functions. 

export const FormReducer = (state, action) => {
    switch(action.type) {
      case ACTION_TYPES.USER_INPUT_CHANGE:
        return {
          ...state,
          user_textChange: action.payload
          // tracks changes to the input element
        }
      case ACTION_TYPES.USER_INPUT_SUBMIT:
        return {
          ...state,
          user_textSubmit: action.payload
          //adds the submitted form to the global state.
        }
      default:
        throw new Error();
    }
}
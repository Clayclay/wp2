//We use the syntax import * as Reducer1 because we want to import both the Reducer1 and the initialState. 
import * as ACTION_TYPES from '../actions/action_types'

export const initialState = {
  is_authenticated: false,
  user: null,
  token: null,
};


 export const AuthReducer = (state , action) => {
    switch (action.type) {

      case  ACTION_TYPES.ADD_PROFILE:
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.user,
          token: action.payload.token
        };

        case ACTION_TYPES.LOGIN_SUCCESS:
          return {
            ...state,
            is_authenticated: true
          }

      case "LOGOUT":
        localStorage.clear();
        return {
          ...state,
          isAuthenticated: false,
          user: null
        };


      default:
        return state;
    }
  };
  export default AuthReducer;


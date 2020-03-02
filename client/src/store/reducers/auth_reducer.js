//We use the syntax import * as Reducer1 because we want to import both the Reducer1 and the initialState. 
import * as ACTION_TYPES from '../actions/action'

//Les reducers 
//contiennent les méthodes qui effectuent le changement d’état de votre application.

//Dans Redux, les reducers ont pour mission de modifier le store
// en réponse aux actions.

export const initialState = {
  is_authenticated: false,
  user: null,
  token: null,
};

//Décrit comment une action va modifier un état donner pour retourner un nouvel état.
export const AuthReducer = (state , action) => {
  
  switch (action.type) {

    case  ACTION_TYPES.ADD_PROFILE:
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
       is_authenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };

      case ACTION_TYPES.LOGIN_SUCCESS:
        return {
          ...state,
          is_authenticated: true
         
        }
        case ACTION_TYPES.LOGIN_FAILURE:
          return {
            ...state,
            is_authenticated: false
          }

        case ACTION_TYPES.LOGOUT:
          
          //When this action is dispatched, we clear localStorage of all data and set user and token to null .
          localStorage.clear();
          return {
            ...state,
           is_authenticated: false,
            user: null,
            token: null,
          }

    default:
      return state;
  }
};
  export default AuthReducer;


import * as ACTION_TYPES from '../actions/action_types'


export const LangReducer = (state, action) => {

    switch (action.type) {

      case ACTION_TYPES.REQUEST:
        return {
          ...state,
          isFetching: true,
          hasError: false
        };
      case ACTION_TYPES.SUCCESS:
        return {
          ...state,
          isFetching: false,
          langs: action.payload
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


  export default LangReducer;
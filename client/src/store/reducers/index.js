import authReducer from './auth_reducer';
// autre reducer
import { combineReducers } from 'redux';

const allReducers = combineReducers ({

        auth: authReducer
})

export default allReducers;
import authReducer from './auth_reducer';
import LangReducer from './lang_reducer';
// autre reducer
import { combineReducers } from 'redux';

const allReducers = combineReducers ({

        auth: authReducer,
        lang: LangReducer
})

export default allReducers;
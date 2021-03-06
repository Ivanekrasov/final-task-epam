import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import appointmentReducer from './appointmentReducer'

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    appointment: appointmentReducer

});
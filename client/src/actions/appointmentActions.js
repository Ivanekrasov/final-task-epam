import axios from 'axios';

import {
    GET_ERRORS
} from './types';


// Add experience
export const addAppointment = (expData, history) => dispatch => {
    axios
        .post('/api/appointments', expData)
        .then(res => {
            history.push('/');
            alert('Appointment submit. We will call you back soon')
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};



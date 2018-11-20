const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAppointmentInput(data, registrated) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.date = !isEmpty(data.date) ? data.date : '';

    if (!registrated) {
        if (!Validator.isLength(data.name, {min: 2, max: 30})) {
            errors.name = 'Name must be between 2 and 30 characters';
        }

        if (Validator.isEmpty(data.name)) {
            errors.name = 'Name field is required';
        }
    }

    if (!Validator.isMobilePhone(data.phone)) {
        errors.phone = 'Phone number is invalid';
        if (Validator.isEmpty(data.phone)) {
            errors.phone = 'Phone field is required';
        }
    }

    if (!Validator.isAfter(data.date)) {
        errors.date = 'Inappropriate date has chosen';
        if (Validator.isEmpty(data.date)) {
            errors.date = 'Date field is required';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
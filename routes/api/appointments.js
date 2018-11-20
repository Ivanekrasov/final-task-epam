const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Input Validation
const validateAppointmentInput = require('../../validation/appointment');

// Load Appointment model
const Appointment = require('../../models/Appointment');

// @route   GET api/appointments/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Appointments Works' }));



// @route   GET api/appointments/
// @desc    Get current appointments
// @access  Private
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const errors = {};

        Appointment.findOne({ user: req.user.id })
            .populate('user', 'name')
            .then(appointments => {
                if (!appointments) {
                    errors.noappointment = 'No appointment found for this user';
                    return res.status(404).json(errors);
                }
                res.json(appointments);
            })
            .catch(err => res.status(404).json(err));
    }
);


// @route   POST api/appointments
// @desc    Add an appointment for authenticated user
// @access  Private
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateAppointmentInput(req.body, true);

        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }

        // Get fields
        const appointmentFields = {};

        appointmentFields.user = req.user.id;
        appointmentFields.name = req.user.name;
        appointmentFields.phone = req.body.phone;
        appointmentFields.date = req.body.date;
        if (req.body.name) appointmentFields.name = req.body.name;
        if (req.body.registrated) appointmentFields.registrated = req.body.registrated;
        if (req.body.specialist) appointmentFields.specialist = req.body.specialist;
        if (req.body.price) appointmentFields.price = req.body.price;

        Appointment.findOne({ user: req.user.id, date: req.body.date})
            .then(appointments => {
            if (appointments) {
                // Update
                Appointment.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: appointmentFields },
                    { new: true }
                ).then(appointments => res.json(appointments));
            } else {
                // Create

                // Check if time busy
                Appointment.findOne({ date: appointmentFields.date }).then(appointments => {
                    if (appointments) {
                        errors.date = 'That time is already busy';
                        return res.status(400).json(errors);
                    }
                    // Save Appointment
                    new Appointment(appointmentFields).save().then(appointments => res.json(appointments));
                });
            }
        });
    }
);


// @route   GET api/appointments/all
// @desc    Get up-to-date appointments
// @access  Private
router.get(
    '/all',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const errors = {};

        Appointment.find()
            .populate('user', 'name')
            .then(appointments => {
                if (!appointments) {
                    errors.noappointment = 'There are no appointments';
                    return res.status(404).json(errors);
                }

                res.json(appointments);
            })
            .catch(err => res.status(404).json(err));
    }
);


// @route   GET api/appointments/:appID
// @desc    Get one appointment by ID
// @access  Private
router.get('/:appID',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {

    const errors = {};

    Appointment.findOne({ _id: req.params.appID })
    .populate('user', 'name')
    .then(appointments => {
        if (!appointments) {
            errors.noappointment = 'There is no appointment with this ID';
            res.status(404).json(errors);
        }

        res.json(appointments);
    })
    .catch(err => res.status(404).json({err: 'Invalid ID'}));
});


// @route   DELETE api/appointments/:appID
// @desc    Cancel an appointment by ID
// @access  Private
router.delete(
    '/:appID',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Appointment.findByIdAndRemove({ _id: req.params.appID })
            .populate('user', 'name')
            .then(appointments => {
                appointments.save().then(profile => res.json(profile));
            })
            .catch(err => res.status(404).json({err: 'Invalid ID'}));
    }
);

module.exports = router;

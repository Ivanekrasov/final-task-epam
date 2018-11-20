const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AppointmentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    specialist: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    },
    registrated:{
        type: Boolean,
        default: true,
        required: false
    }
});

module.exports = Appointment = mongoose.model('appointments', AppointmentSchema);

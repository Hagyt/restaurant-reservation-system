'use strict'

const mongoose = require('mongoose');

const ReservationSchema = mongoose.Schema({
    table: {
        type: Number,
        required: true
    },

    date: {
        type: String,
        required: true
    },

    restaurant: {
        type: mongoose.Schema.ObjectId,
        required: true
    }

});

module.exports = mongoose.model('Reservation', ReservationSchema);
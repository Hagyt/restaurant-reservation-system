const mongoose = require('mongoose');

const RestaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
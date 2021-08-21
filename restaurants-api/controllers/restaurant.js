'use strict'

const Restaurant = require('../models/Restaurant');

let controller = {
    saveRestaurant: async (req, res) => {
        let restaurant = new Restaurant(req.body);

        restaurant.save((error, restaurantSaved) => {
            if(error) return res.status(500).send({ message: 'Error trying to save restaurant' });

            if(!restaurantSaved) return res.status(404).send({ message: 'It could not be saved' });

            return res.status(200).send({ restaurantSaved });
        });
    },

    getRestuarants: async (req, res) => {
        Restaurant.find((error, restaurants) => {
            if(error) return res.status(500).send({ message: "Error trynig to get restaurants" });

            if(!restaurants) return res.status(404).send({ message: "Does not exist restaurants" });

            return res.status(200).send({ restaurants });
        });
    },

    getRestaurant: function(req, res) {
        let restaurantId = req.params.id;

        if(restaurantId == null) return res.status(404).send({ message : 'The restaurant does not exist' });

        Restaurant.findById(restaurantId, (err, restaurant) => {
            if(err) return res.status(500).send({ message : 'Error trying to get the restaurant' });

            if(!restaurant) return res.status(404).send({ message : 'The restaurant does not exist' });

            return res.status(200).send({ restaurant });
        });
    },

    updateRestaurant: async (req, res) => {
        let restaurantId = req.params.id;
        let restaurant = req.body;

        Restaurant.findByIdAndUpdate(restaurantId, restaurant, { new: true}, (error, restaurantUpdated) => {
            if(error) return res.status(500).send({ message: "Error trying to update restaurant" });

            if(!restaurantUpdated) return res.status(404).send({ message: "The restaurant does not exist" });

            return res.status(200).send(restaurantUpdated);
        });
    },

    deleteRestaurant: async (req, res) => {
        let restaurantId = req.params.id;

        Restaurant.findByIdAndRemove(restaurantId, (err, restaurantDeleted) => {
            if(err) return res.status(500).send({ message: "Error trying to delete restaurant" });

            if(!restaurantDeleted) return res.status(404).send({ message: "The restaurant does not exist" });

            return res.status(200).send({ restaurantDeleted });
        });
    },

}

module.exports = controller;


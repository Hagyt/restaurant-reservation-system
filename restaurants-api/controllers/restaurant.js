'use strict'

const Restaurant = require('../models/Restaurant');
const Reservation = require('../models/Reservation');

let controller = {
    getRestuarants: async (req, res) => {
        Restaurant.find((error, restaurants) => {
            if (error) return res.status(500).send({
                message: "Error trynig to get restaurants"
            });

            if (!restaurants) return res.status(404).send({
                message: "Does not exist restaurants"
            });

            return res.status(200).send({ restaurants });
        });
    },

    getRestaurant: function(req, res) {
        let restaurantId = req.params.id;

        if (restaurantId == null) return res.status(404).send({
            message : 'The restaurant does not exist'
        });

        Restaurant.findById(restaurantId, (err, restaurant) => {
            if (err) return res.status(500).send({
                message : 'Error trying to get the restaurant'
            });

            if (!restaurant) return res.status(404).send({
                message : 'The restaurant does not exist'
            });

            return res.status(200).send({ restaurant });
        });
    },

    saveRestaurant: async (req, res) => {
        let restaurant = new Restaurant(req.body);

        restaurant.save((error, restaurantSaved) => {
            if (error) return res.status(500).send({
                message: 'Error trying to save restaurant'
            });

            if (!restaurantSaved) return res.status(404).send({
                message: 'It could not be saved'
            });

            return res.status(200).send({ restaurantSaved });
        });
    },

    updateRestaurant: async (req, res) => {
        let restaurantId = req.params.id;
        let restaurant = req.body;

        Restaurant.findByIdAndUpdate(restaurantId,
                                     restaurant, { new: true},
                                     (error, restaurantUpdated) => {
            if (error) return res.status(500).send({
                message: "Error trying to update restaurant"
            });

            if (!restaurantUpdated) return res.status(404).send({
                message: "The restaurant does not exist"
            });

            return res.status(200).send(restaurantUpdated);
        });
    },

    deleteRestaurant: async (req, res) => {
        let restaurantId = req.params.id;

        Restaurant.findByIdAndRemove(restaurantId,
                                     (err, restaurantDeleted) => {
            if (err) return res.status(500).send({
                message: "Error trying to delete restaurant"
            });

            if (!restaurantDeleted) return res.status(404).send({
                message: "The restaurant does not exist"
            });

            return res.status(200).send({ restaurantDeleted });
        });
    },

    getReservations: async (req, res) => {
        Restaurant.aggregate([
            {
                $lookup: {
                    from: "reservations",
                    as: "reservation",
                    let: { restaurant: "$_id"},
                    pipeline: [
                        { $match: { $expr: { $eq: ['$restaurant', '$$restaurant']}}}                            
                    ]
                }
            },
            {
                $unwind: '$reservation'
            }
        ]).exec((error, reservations) => {
            if (error) return res.status(500).send({
                message: "Error trying to get reservations"
            });

            if (!reservations) return res.status(404).send({
                message: "Seems to be empty"
            });

            return res.status(200).send({ 
                message: 'Here you are!',
                reservations 
            });
        });

        
        // find((error, reservations) => {
        //     if (error) return res.status(500).send({
        //         message: "Error trynig to get reservations"
        //     });

        //     if (!reservations) return res.status(404).send({
        //         message: "Does not exist reservations"
        //     });

        //     return res.status(200).send({ reservations });
        // });
    },

    getReservationsByRestaurant: async (req, res) => {
        let restaurantId = req.params.id;

        if (restaurantId == null) return res.status(404).send({
            message : 'Restaurant id was not provided'
        });

        Reservation.find({ restaurant: restaurantId}, (error, reservations) => {
            if (error) return res.status(500).send({
                message : 'Error trying to get reservations'
            });

            if (!reservations) return res.status(404).send({
                message : 'The are not reservations'
            });

            return res.status(200).send({ reservations });
        });
    },

    saveReservation: async (req, res) => {
        let restaurantId = req.params.id;
        
        Restaurant.findById(restaurantId, (error, restaurantFound) => {
            if (error) return res.status(500).send({
                message : 'Error trying to get the restaurant'
            });
            
            if (!restaurantFound) return res.status(404).send({
                message : 'The restaurant does not exist'
            });

            let { table, date } = req.body

            let reservation = new Reservation();

            reservation.table = table;
            reservation.date = date;
            reservation.restaurant = restaurantId;

            // Check if the table is already reserved
            Reservation.countDocuments({
                $and: [
                    {
                        date: date 
                    },
                    {
                        table: table
                    }
                ]
            }, (error, isTableReserved) => {
                if (error) return res.status(500).send({
                    message : 'Error trying to count restaurants tables reserved'
                });

                if (isTableReserved == 1) {
                    return res.status(400).send({
                        message : 'This table is already reserved on this date'
                    });
                } else {
                    // Get count of restaurants reserved
                    Reservation.countDocuments({ date: date },
                                               (error, totalReserved) => {
                        if (error) return res.status(500).send({
                            message : 'Error trying to count total restaurants reserved'
                        });
        
                        if (totalReserved >= 20) {
                            return res.status(400).send({
                                message : 'There are already 20 reservations for this day'
                            });
                        } else {
                            // Get restaurant reservation on the date
                            Reservation.countDocuments({ 
                                $and: [
                                    { 
                                        date: date 
                                    },
                                    {
                                        restaurant: restaurantId
                                    }
                                ]
                            }, (error, reservedByRestaurant) => {
                                if (error) return res.status(500).send({
                                    message : 'Error trying to count restaurant reservations'
                                });
        
                                if (reservedByRestaurant >= 15) {
                                    return res.status(400).send({
                                        message : 'Ther are already 15 reservations for this day'
                                    });
                                } else {
                                    reservation.save((error, reservationSaved) => {
                                        if (error) return res.status(500).send({
                                            message: 'Error trying to save restaurant'
                                        });
                            
                                        if (!reservationSaved) return res.status(404).send({
                                            message: 'It could not be saved'
                                        });
                            
                                        return res.status(200).send({
                                            message: 'Reservation was successfull',
                                            reservationSaved
                                        });
    
                                    });
    
                                }
    
                            });
        
                        }
        
                    });

                }

            });
            
        });
    }

}

module.exports = controller;


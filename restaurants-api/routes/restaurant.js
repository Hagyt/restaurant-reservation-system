'use strict'

const express = require('express');
const router = express.Router();
let RestaurantController = require('../controllers/restaurant');

// Restaurant
router.get('/restaurants', RestaurantController.getRestuarants);
router.get('/restaurants/:id', RestaurantController.getRestaurant);
router.post('/restaurants', RestaurantController.saveRestaurant);
router.put('/restaurants/:id', RestaurantController.updateRestaurant);
router.delete('/restaurants/:id', RestaurantController.deleteRestaurant);

// Reservation
router.get('/reservations', RestaurantController.getReservations);
router.get('/reservations/:id', RestaurantController.getReservationsByRestaurant);
router.post('/reservations/:id', RestaurantController.saveReservation);

module.exports = router;
'use strict'

// Restaurant routes
const express = require('express');
const router = express.Router();
let RestaurantController = require('../controllers/restaurant');

router.post('/save', RestaurantController.saveRestaurant);
router.get('/', RestaurantController.getRestuarants);
router.get('/:id', RestaurantController.getRestaurant);
router.put('/update/:id', RestaurantController.updateRestaurant);
router.delete('/delete/:id', RestaurantController.deleteRestaurant);

module.exports = router;
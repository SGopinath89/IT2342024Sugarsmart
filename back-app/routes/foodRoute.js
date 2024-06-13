const express = require('express');
const router = express.Router();
const foodController = require('../controller/foodController');

// Route to create a new food item
router.post('/', foodController.createFood);

// Route to get food details by name
router.get('/:name',foodController.getFoodDetails);

module.exports = router;
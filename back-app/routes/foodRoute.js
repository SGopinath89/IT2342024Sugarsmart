const express = require('express');
const router = express.Router();
const foodController = require('../controller/foodController');

// Route to get food details by name
router.get('/:name',foodController.getFoodDetails);

module.exports = router;
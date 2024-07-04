const express = require('express');
const router = express.Router();
const foodController = require('../controller/foodController');
const auth = require('../middleware/auth');

// Route to get food details by name
router.get('/:name',auth.verifyToken,foodController.getFoodDetails);

module.exports = router;
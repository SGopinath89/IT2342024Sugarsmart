const jwt = require('jsonwebtoken');
const Food = require('../models/food');
const Glucose = require('../models/bloodSugar');

exports.getFoodDetails = async (req, res) => {
    try {
        const { name } = req.params;
        const food = await Food.findOne({ name: { $regex: new RegExp(name, 'i') }}); 
        if (!food) {
            return res.status(404).json({ msg: 'Food not found' });
        }

        // Get user's blood glucose level
        const userGlucose = await Glucose.findOne({ user: req.user.id }).sort({ date: -1 });
        
        if (!userGlucose) {
            return res.status(404).json({ msg: 'Blood glucose data not found' });
        }

        // Set the threshold value
        const glucoseThreshold = 180; 
        const carbohydrateThreshold = 30; 

        let consumeMessage = "You can consume this food.";
        if (userGlucose.level > glucoseThreshold && food.carbohydrates > carbohydrateThreshold) {
            consumeMessage = "You should not consume this food due to high carbohydrate content.";
        }

        res.json({ 
            food: {
                name: food.name,
                calories: food.calories,
                carbohydrates: food.carbohydrates,
                protein: food.protein,
                fat: food.fat
            },
            consumeMessage });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};
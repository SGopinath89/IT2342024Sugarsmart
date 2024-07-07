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

        const userGlucose = await Glucose.findOne({ user: req.user.id }).sort({ date: -1 });

        const foodDetails = {
            name: food.name,
            calories: food.calories,
            carbohydrates: food.carbohydrates,
            protein: food.protein,
            fat: food.fat
        };

        if (userGlucose) {
            const glucoseThreshold = 180; 
            const carbohydrateThreshold = 30; 

            let consumeMessage = "You can consume this food.";
            if (userGlucose.glucose_level > glucoseThreshold && food.carbohydrates > carbohydrateThreshold) {
                consumeMessage = "You should not consume this food due to high carbohydrate content.";
            }

            res.json({ 
                food: foodDetails,
                glucoseLevel: userGlucose.glucose_level,
                consumeMessage 
            });
        } else {
            // If no glucose level data is found, return only the food details
            res.json({ 
                food: foodDetails
            });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};
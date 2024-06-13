const Food = require('../models/food');
const Glucose = require('../models/bloodSugar');

exports.createFood = async (req, res) => {
    try {
        const { name, calories, carbohydrates, protein, fat } = req.body;

        // Check if the food already exists
        let food = await Food.findOne({ name });
        if (food) {
            return res.status(400).json({ msg: 'Food already exists' });
        }

        // Create a new food entry
        food = new Food({
            name,
            calories,
            carbohydrates,
            protein,
            fat
        });

        await food.save();
        res.json(food);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

exports.getFoodDetails = async (req, res) => {
    try {
        const { name } = req.params;
        const food = await Food.findOne({ name });

        if (!food) {
            return res.status(404).json({ msg: 'Food not found' });
        }

        // Get user's blood glucose level
        const userGlucose = await Glucose.findOne({ user: req.user.id }).sort({ date: -1 });

        if (!userGlucose) {
            return res.status(404).json({ msg: 'Blood glucose data not found' });
        }

        // Set the threshold value
        const glucoseThreshold = 180; // Example threshold value
        const carbohydrateThreshold = 30; // Example carbohydrate threshold

        let consumeMessage = "You can consume this food.";
        if (userGlucose.level > glucoseThreshold && food.carbohydrates > carbohydrateThreshold) {
            consumeMessage = "You should not consume this food due to high carbohydrate content.";
        }

        res.json({ food, consumeMessage });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};
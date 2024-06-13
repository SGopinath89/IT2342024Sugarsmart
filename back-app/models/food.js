const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    carbohydrates: {
        type: Number,
        required: true,
    },
    protein: {
        type: Number,
        required: true,
    },
    fat: {
        type: Number,
        required: true,
    }
});

const Food = mongoose.model('Food', FoodSchema);
module.exports = Food;
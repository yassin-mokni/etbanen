const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MealSchema = new Schema({
    name: {
        type: 'string',
        required: true
    },
    image: {
        type: 'string',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = Meal = mongoose.model('meal', MealSchema);
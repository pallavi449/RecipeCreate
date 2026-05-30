const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },
  meal: {
    type: String,
    required: true,
    enum: ['Breakfast', 'Lunch', 'Dinner'],
  },
  value: { type: String, required: true },
  createdBy: { type: String, default: 'anonymous' },
}, { timestamps: true });

module.exports = mongoose.model('MealPlan', mealPlanSchema);
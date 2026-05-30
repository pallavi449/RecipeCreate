const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Italian', 'Indian', 'Mexican', 'Chinese', 'Breakfast', 'Salad', 'Dessert', 'American', 'Other'],
  },
  description: { type: String, default: '' },
  ingredients: {
    type: String,
    required: [true, 'Ingredients are required'],
  },
  steps: {
    type: String,
    required: [true, 'Preparation steps are required'],
  },
  time: {
    type: String,
    required: [true, 'Cooking time is required'],
  },
  calories: {
    type: Number,
    required: [true, 'Calories are required'],
    min: [1, 'Calories must be positive'],
  },
  emoji: { type: String, default: '🍽️' },
  rating: { type: Number, default: 0 },
  createdBy: {
    type: String,
    required: [true, 'Creator is required'],
    default: 'anonymous',
  },
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);
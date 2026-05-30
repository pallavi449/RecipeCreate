const MealPlan = require('../models/MealPlan');

exports.getMealPlan = async (req, res) => {
  try {
    const plan = await MealPlan.find().sort({ day: 1 });

    res.json({
      success: true,
      data: plan,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.saveMeal = async (req, res) => {
  try {
    const { day, meal, value } = req.body;

    if (!day || !meal || !value) {
      return res.status(400).json({
        success: false,
        message: 'Day, meal and value are required',
      });
    }

    const existing = await MealPlan.findOne({ day, meal });

    if (existing) {
      existing.value = value;

      await existing.save();

      return res.json({
        success: true,
        data: existing,
      });
    }

    const newMeal = new MealPlan({
      day,
      meal,
      value,
    });

    await newMeal.save();

    res.status(201).json({
      success: true,
      data: newMeal,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteMeal = async (req, res) => {
  try {
    const { day, meal } = req.query;

    await MealPlan.findOneAndDelete({
      day,
      meal,
    });

    res.json({
      success: true,
      message: 'Meal removed',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
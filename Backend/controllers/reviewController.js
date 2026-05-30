const Review = require('../models/Review');

// GET all reviews for a recipe
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      recipeId: req.params.recipeId,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: reviews,
    });
  } catch (err) {
    console.error('Get Reviews Error:', err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// POST add a review
exports.addReview = async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    if (!name || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Name, rating and comment are required',
      });
    }

    const review = new Review({
      recipeId: req.params.recipeId,
      name,
      rating,
      comment,
    });

    const savedReview = await review.save();

    res.status(201).json({
      success: true,
      data: savedReview,
    });
  } catch (err) {
    console.error('Add Review Error:', err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
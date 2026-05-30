const express = require('express');

const router = express.Router();

const {
  getReviews,
  addReview,
} = require('../controllers/reviewController');

router.get('/:recipeId', getReviews);

router.post('/:recipeId', addReview);

module.exports = router;
const express = require('express');
const router = express.Router();
const { getMealPlan, saveMeal, deleteMeal } = require('../controllers/mealPlanController');

router.get('/', getMealPlan);
router.post('/', saveMeal);
router.delete('/', deleteMeal);

module.exports = router;
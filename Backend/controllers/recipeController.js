const Recipe = require('../models/Recipe');
const Review = require('../models/Review');

// GET all recipes — search by name or ingredient, filter by category
exports.getAllRecipes = async (req, res) => {
  try {
    const { search, searchType, category } = req.query;
    let query = {};

    if (search) {
      query = searchType === 'ingredient'
        ? { ingredients: { $regex: search, $options: 'i' } }
        : { title: { $regex: search, $options: 'i' } };
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    const recipes = await Recipe.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: recipes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET single recipe with reviews
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ success: false, message: 'Recipe not found' });

    const reviews = await Review.find({ recipeId: req.params.id }).sort({ createdAt: -1 });
    res.json({ success: true, data: { ...recipe.toObject(), reviews } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST create recipe — with validation
exports.createRecipe = async (req, res) => {
  try {
    const { title, category, description, ingredients, steps, time, calories, emoji } = req.body;

    // Validation
    if (!title || !category || !ingredients || !steps || !time || !calories) {
      return res.status(400).json({
        success: false,
        message: 'Title, category, ingredients, steps, time and calories are all required',
      });
    }

    const recipe = new Recipe({
      title, category, description,
      ingredients, steps, time,
      calories: Number(calories), emoji,
      createdBy: req.body.createdBy || 'anonymous',
    });

    const saved = await recipe.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// PUT update recipe — only owner can update
exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ success: false, message: 'Recipe not found' });

    // Ownership check
    if (recipe.createdBy !== (req.body.createdBy || 'anonymous')) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this recipe' });
    }

    const updated = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE recipe — only owner can delete
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ success: false, message: 'Recipe not found' });

    // Ownership check
    const requestedBy = req.query.createdBy || 'anonymous';
    if (recipe.createdBy !== requestedBy) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this recipe' });
    }

    await Recipe.findByIdAndDelete(req.params.id);
    await Review.deleteMany({ recipeId: req.params.id });
    res.json({ success: true, message: 'Recipe deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
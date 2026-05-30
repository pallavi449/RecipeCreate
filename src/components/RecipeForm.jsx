import { useState } from 'react';
import { recipeService } from '../services/recipeService';

const RecipeForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [''],
    preparationSteps: [''],
    cookingTime: '',
    servings: '',
    category: 'Breakfast'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (index, field, value) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData({ ...formData, [field]: updated });
  };

  const addField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await recipeService.createRecipe(formData);
      alert('Recipe created successfully!');
      // Redirect or reset form
    } catch (err) {
      console.error(err);
      alert('Failed to create recipe');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-3xl font-bold mb-8">Create New Recipe</h2>

      <input type="text" name="title" placeholder="Recipe Title" required onChange={handleChange} className="w-full p-3 border rounded-lg mb-4" />

      <textarea name="description" placeholder="Description" required onChange={handleChange} className="w-full p-3 border rounded-lg mb-4 h-32" />

      <div className="grid grid-cols-3 gap-4 mb-6">
        <input type="number" name="cookingTime" placeholder="Cooking Time (mins)" required onChange={handleChange} className="p-3 border rounded-lg" />
        <input type="number" name="servings" placeholder="Servings" required onChange={handleChange} className="p-3 border rounded-lg" />
        <select name="category" onChange={handleChange} className="p-3 border rounded-lg">
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Dessert">Dessert</option>
        </select>
      </div>

      {/* Ingredients */}
      <h3 className="font-semibold mb-2">Ingredients</h3>
      {formData.ingredients.map((ing, i) => (
        <input key={i} value={ing} onChange={(e) => handleArrayChange(i, 'ingredients', e.target.value)} 
               placeholder={`Ingredient ${i+1}`} className="w-full p-3 border rounded-lg mb-2" />
      ))}
      <button type="button" onClick={() => addField('ingredients')} className="text-green-600 mb-6">+ Add Ingredient</button>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700"
      >
        {loading ? 'Creating...' : 'Create Recipe'}
      </button>
    </form>
  );
};

export default RecipeForm;
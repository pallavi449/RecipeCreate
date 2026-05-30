import { useState } from 'react';
import { useRecipes } from '../context/RecipeContext';

const emojis = ['🍝', '🍛', '🍕', '🌮', '🥗', '🍣', '🍜', '🥘', '🍗', '🥩', '🍱', '🥙', '🍲', '🧆', '🥞'];
const categories = ['Italian', 'Indian', 'Mexican', 'Chinese', 'Breakfast', 'Salad', 'Dessert', 'American', 'Other'];

function CreateRecipeModal({ onClose }) {
  const { addRecipe } = useRecipes();
  const [form, setForm] = useState({
    title: '',
    category: 'Other',
    time: '',
    calories: '',
    emoji: '🍽️',
    description: '',
    ingredients: '',
    steps: '',
  });
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const set = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Recipe name is required';
    if (!form.time.trim()) e.time = 'Cook time is required';
    if (!form.calories || isNaN(form.calories)) e.calories = 'Valid calories required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    addRecipe({ ...form, calories: Number(form.calories), isCustom: true });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-6 rounded-t-3xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-white text-2xl font-bold">Create Recipe</h2>
              <p className="text-orange-100 text-sm mt-1">Step {step} of 2</p>
            </div>
            <button onClick={onClose} className="text-white text-2xl hover:rotate-90 transition-transform">✕</button>
          </div>
          {/* Progress */}
          <div className="mt-4 bg-orange-300 rounded-full h-2">
            <div
              className="bg-white rounded-full h-2 transition-all duration-300"
              style={{ width: step === 1 ? '50%' : '100%' }}
            />
          </div>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              {/* Emoji picker */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Choose an Icon</label>
                <div className="flex flex-wrap gap-2">
                  {emojis.map((e) => (
                    <button
                      key={e}
                      onClick={() => set('emoji', e)}
                      className={`text-2xl w-10 h-10 rounded-xl transition ${
                        form.emoji === e ? 'bg-orange-100 ring-2 ring-orange-400 scale-110' : 'hover:bg-gray-100'
                      }`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Recipe Name *</label>
                <input
                  value={form.title}
                  onChange={(e) => set('title', e.target.value)}
                  placeholder="e.g. Mom's Special Pasta"
                  className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 ${
                    errors.title ? 'border-red-400' : 'border-gray-200'
                  }`}
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => set('category', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400"
                >
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>

              {/* Time & Calories */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Cook Time *</label>
                  <input
                    value={form.time}
                    onChange={(e) => set('time', e.target.value)}
                    placeholder="e.g. 30 min"
                    className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 ${
                      errors.time ? 'border-red-400' : 'border-gray-200'
                    }`}
                  />
                  {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Calories *</label>
                  <input
                    type="number"
                    value={form.calories}
                    onChange={(e) => set('calories', e.target.value)}
                    placeholder="e.g. 450"
                    className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 ${
                      errors.calories ? 'border-red-400' : 'border-gray-200'
                    }`}
                  />
                  {errors.calories && <p className="text-red-500 text-xs mt-1">{errors.calories}</p>}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Short Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  placeholder="What makes this recipe special?"
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 resize-none"
                />
              </div>

              <button
                onClick={() => { if (validate()) setStep(2); }}
                className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition"
              >
                Next: Add Details →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              {/* Preview */}
              <div className="bg-orange-50 rounded-2xl p-4 flex items-center gap-4">
                <span className="text-5xl">{form.emoji}</span>
                <div>
                  <p className="font-bold text-gray-800">{form.title}</p>
                  <p className="text-sm text-gray-500">{form.category} • {form.time} • {form.calories} cal</p>
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Ingredients</label>
                <textarea
                  value={form.ingredients}
                  onChange={(e) => set('ingredients', e.target.value)}
                  placeholder="2 cups flour&#10;1 tsp salt&#10;3 eggs..."
                  rows={4}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 resize-none text-sm"
                />
                <p className="text-xs text-gray-400 mt-1">One ingredient per line</p>
              </div>

              {/* Steps */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Instructions</label>
                <textarea
                  value={form.steps}
                  onChange={(e) => set('steps', e.target.value)}
                  placeholder="1. Boil water&#10;2. Add pasta&#10;3. Mix sauce..."
                  rows={5}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400 resize-none text-sm"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition"
                >
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition"
                >
                  ✅ Save Recipe
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateRecipeModal;
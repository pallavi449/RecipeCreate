import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext.jsx';

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, toggleFavorite, isFavorite, addReview } = useRecipes();
  const recipe = recipes.find((r) => r.id === Number(id));
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');

  if (!recipe) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🍽️</div>
        <p className="text-2xl font-bold text-gray-600">Recipe not found</p>
        <button onClick={() => navigate('/recipes')} className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-xl">
          Back to Recipes
        </button>
      </div>
    </div>
  );

  const handleReview = () => {
    if (!comment.trim() || !name.trim()) return;
    addReview(recipe.id, { name, rating, comment, date: new Date().toLocaleDateString() });
    setComment('');
    setName('');
    setRating(5);
  };

  const ingredients = recipe.ingredients
    ? recipe.ingredients.split('\n').filter(Boolean)
    : ['No ingredients listed'];

  const steps = recipe.steps
    ? recipe.steps.split('\n').filter(Boolean)
    : ['No instructions listed'];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-8">
      <div className="max-w-4xl mx-auto">

        {/* Back */}
        <button
          onClick={() => navigate('/recipes')}
          className="mb-6 text-orange-500 font-semibold hover:underline flex items-center gap-2"
        >
          ← Back to Recipes
        </button>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-br from-orange-100 to-orange-50 h-56 flex items-center justify-center text-9xl">
            {recipe.emoji}
          </div>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{recipe.title}</h1>
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {recipe.category}
                </span>
                {recipe.description && (
                  <p className="mt-3 text-gray-500">{recipe.description}</p>
                )}
              </div>
              <button
                onClick={() => toggleFavorite(recipe.id)}
                className="text-4xl hover:scale-125 transition-transform"
              >
                {isFavorite(recipe.id) ? '❤️' : '🤍'}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { icon: '⏱', label: 'Cook Time', value: recipe.time },
                { icon: '🔥', label: 'Calories', value: `${recipe.calories} cal` },
                { icon: '⭐', label: 'Rating', value: recipe.rating },
              ].map((s) => (
                <div key={s.label} className="bg-orange-50 rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <p className="font-bold text-gray-800">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Ingredients */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🛒 Ingredients</h2>
            <ul className="space-y-2">
              {ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 shrink-0" />
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">👨‍🍳 Instructions</h2>
            <ol className="space-y-3">
              {steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-gray-700">
                  <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {step.replace(/^\d+\.\s*/, '')}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">⭐ Ratings & Reviews</h2>

          {/* Existing Reviews */}
          {recipe.reviews && recipe.reviews.length > 0 ? (
            <div className="space-y-4 mb-8">
              {recipe.reviews.map((r, i) => (
                <div key={i} className="border border-gray-100 rounded-2xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-bold text-gray-800">{r.name}</p>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map((s) => (
                        <span key={s} className={s <= r.rating ? 'text-yellow-400' : 'text-gray-200'}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{r.comment}</p>
                  <p className="text-xs text-gray-400 mt-2">{r.date}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm mb-6">No reviews yet. Be the first!</p>
          )}

          {/* Add Review */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Write a Review</h3>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 mb-3 focus:outline-none focus:border-orange-400 text-sm"
            />
            {/* Star Rating */}
            <div className="flex gap-2 mb-3">
              <span className="text-sm text-gray-600 font-semibold mt-1">Rating:</span>
              {[1,2,3,4,5].map((s) => (
                <button
                  key={s}
                  onClick={() => setRating(s)}
                  className={`text-2xl transition hover:scale-110 ${s <= rating ? 'text-yellow-400' : 'text-gray-200'}`}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this recipe..."
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 mb-3 focus:outline-none focus:border-orange-400 resize-none text-sm"
            />
            <button
              onClick={handleReview}
              className="bg-orange-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-600 transition"
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
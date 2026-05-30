import { useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext.jsx';

function RecipeCard({ recipe, onDelete }) {
  const { toggleFavorite, isFavorite } = useRecipes();
  const navigate = useNavigate();
  const fav = isFavorite(recipe.id);

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col">
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 h-36 flex items-center justify-center text-6xl relative">
        {recipe.emoji}
        <button
          onClick={() => toggleFavorite(recipe.id)}
          className="absolute top-3 right-3 text-2xl hover:scale-125 transition-transform"
        >
          {fav ? '❤️' : '🤍'}
        </button>
        {recipe.isCustom && (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
            My Recipe
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-800 text-sm mb-1 leading-tight">{recipe.title}</h3>
        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-medium w-fit mb-2">
          {recipe.category}
        </span>
        {recipe.description && (
          <p className="text-xs text-gray-400 mb-2 line-clamp-2">{recipe.description}</p>
        )}
        <div className="flex justify-between text-xs text-gray-500 mb-3">
          <span>⏱ {recipe.time}</span>
          <span>🔥 {recipe.calories} cal</span>
          <span>⭐ {recipe.rating}</span>
        </div>
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => navigate(`/recipes/${recipe.id}`)}
            className="flex-1 text-sm font-semibold py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            👁 View
          </button>
          <button
            onClick={() => toggleFavorite(recipe.id)}
            className={`flex-1 text-sm font-semibold py-2 rounded-xl transition ${
              fav ? 'bg-red-100 text-red-500 hover:bg-red-200' : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            {fav ? '💔 Unsave' : '❤️ Save'}
          </button>
          {recipe.isCustom && onDelete && (
            <button
              onClick={() => onDelete(recipe.id)}
              className="px-3 py-2 bg-gray-100 text-gray-500 rounded-xl hover:bg-red-100 hover:text-red-500 transition text-sm"
            >
              🗑
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
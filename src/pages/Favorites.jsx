import { useRecipes } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';
import { Link } from 'react-router-dom';

function Favorites() {
  const { recipes, favorites, deleteRecipe } = useRecipes();
  const favoriteRecipes = recipes.filter((r) => favorites.includes(r.id));

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-1">❤️ My Favorites</h1>
        <p className="text-gray-500 mb-8">{favoriteRecipes.length} saved recipes</p>

        {favoriteRecipes.length === 0 ? (
          <div className="text-center py-32 text-gray-400">
            <div className="text-8xl mb-6">💔</div>
            <p className="text-3xl font-bold text-gray-600">No favorites yet</p>
            <p className="mt-3 text-gray-400">Go to Recipes and tap ❤️ to save your favorites</p>
            <Link to="/recipes">
              <button className="mt-8 bg-orange-500 text-white font-bold px-8 py-3 rounded-2xl hover:bg-orange-600 transition">
                Browse Recipes
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favoriteRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} onDelete={deleteRecipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
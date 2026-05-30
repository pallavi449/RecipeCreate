import { useState } from 'react';
import { useRecipes } from '../context/RecipeContext.jsx';
import RecipeCard from '../components/RecipeCard';
import CreateRecipeModal from '../components/CreateRecipeModal';

const categories = ['All', 'Italian', 'Indian', 'Mexican', 'Chinese', 'Breakfast', 'Salad', 'Dessert', 'American', 'Other'];

function RecipeList() {
  const { recipes, deleteRecipe } = useRecipes();
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [category, setCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);

  const filtered = recipes.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch = searchType === 'name'
      ? r.title.toLowerCase().includes(q)
      : (r.ingredients || '').toLowerCase().includes(q);
    const matchCat = category === 'All' || r.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-1">All Recipes</h1>
            <p className="text-gray-500">{recipes.length} recipes available</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-orange-500 text-white font-bold px-6 py-3 rounded-2xl hover:bg-orange-600 transition shadow-lg shadow-orange-200 flex items-center gap-2"
          >
            <span className="text-lg">+</span> Create Recipe
          </button>
        </div>

        {/* Search with toggle */}
        <div className="flex gap-2 mb-4">
          <div className="flex bg-white border border-gray-200 rounded-2xl overflow-hidden flex-1 shadow-sm">
            <input
              type="text"
              placeholder={searchType === 'name' ? '🔍 Search by recipe name...' : '🥕 Search by ingredient...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-5 py-3 focus:outline-none text-sm"
            />
          </div>
          <div className="flex bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <button
              onClick={() => setSearchType('name')}
              className={`px-4 py-3 text-sm font-semibold transition ${searchType === 'name' ? 'bg-orange-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              By Name
            </button>
            <button
              onClick={() => setSearchType('ingredient')}
              className={`px-4 py-3 text-sm font-semibold transition ${searchType === 'ingredient' ? 'bg-orange-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              By Ingredient
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                category === cat
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onDelete={deleteRecipe} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            <div className="text-7xl mb-4">🍽️</div>
            <p className="text-2xl font-bold">No recipes found</p>
            <p className="text-sm mt-2">Try searching something else or create your own!</p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-6 bg-orange-500 text-white font-bold px-6 py-3 rounded-2xl hover:bg-orange-600 transition"
            >
              + Create Recipe
            </button>
          </div>
        )}
      </div>
      {showModal && <CreateRecipeModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default RecipeList;
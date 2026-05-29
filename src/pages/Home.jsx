import { Link } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext.jsx';
import { useState } from 'react';
import CreateRecipeModal from '../components/CreateRecipeModal';

function Home() {
  const { recipes, favorites } = useRecipes();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-400 text-white py-28 px-8 text-center">
        <h1 className="text-6xl font-bold mb-4">🍽️ Recipe Planner</h1>
        <p className="text-xl text-orange-100 mb-10">Create recipes, save favorites, and plan your week.</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/recipes">
            <button className="bg-white text-orange-500 font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition">
              Browse Recipes
            </button>
          </Link>
          <button
            onClick={() => setShowModal(true)}
            className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-orange-500 transition"
          >
            + Create Recipe
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto -mt-8 px-8">
        <div className="grid grid-cols-3 gap-6">
          {[
            { label: 'Total Recipes', value: recipes.length, icon: '📚' },
            { label: 'My Favorites', value: favorites.length, icon: '❤️' },
            { label: 'Custom Recipes', value: recipes.filter(r => r.isCustom).length, icon: '✍️' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-2">{s.icon}</div>
              <p className="text-3xl font-bold text-orange-500">{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto py-16 px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Everything You Need</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '✍️', title: 'Create Recipes', desc: 'Add your own recipes with ingredients and steps.' },
            { icon: '❤️', title: 'Save Favorites', desc: 'Bookmark recipes you love for quick access anytime.' },
            { icon: '📅', title: 'Plan Your Week', desc: 'Organize breakfast, lunch and dinner day by day.' },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-2xl shadow p-8 text-center hover:shadow-lg transition">
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {showModal && <CreateRecipeModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default Home;
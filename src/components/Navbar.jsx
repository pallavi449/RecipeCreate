import { Link, useLocation } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';

function Navbar() {
  const location = useLocation();
  const { favorites } = useRecipes();

  const link = (path, label, badge) => (
    <Link
      to={path}
      className={`relative text-white font-semibold text-sm px-4 py-2 rounded-full transition hover:bg-orange-700 ${
        location.pathname === path ? 'bg-orange-700' : ''
      }`}
    >
      {label}
      {badge > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
          {badge}
        </span>
      )}
    </Link>
  );

  return (
    <nav className="bg-orange-500 px-8 py-4 flex items-center justify-between shadow-md sticky top-0 z-50">
      <Link to="/" className="text-white text-2xl font-bold tracking-wide">
        🍽️ Recipe Planner
      </Link>
      <div className="flex gap-2">
        {link('/', 'Home')}
        {link('/recipes', 'Recipes')}
        {link('/favorites', '❤️ Favorites', favorites.length)}
        {link('/meal-plan', 'Meal Plan')}
      </div>
    </nav>
  );
}

export default Navbar;
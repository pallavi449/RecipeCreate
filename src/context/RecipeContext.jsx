import { createContext, useContext, useState } from 'react';

const RecipeContext = createContext();

const initialRecipes = [
  {
    id: 1, title: 'Spaghetti Carbonara', category: 'Italian', time: '30 min',
    calories: 520, emoji: '🍝', rating: 4.8,
    description: 'Classic Italian pasta with eggs, cheese, pancetta and black pepper.',
    ingredients: '200g spaghetti\n100g pancetta\n2 large eggs\n50g parmesan\n2 cloves garlic\nSalt & black pepper',
    steps: '1. Boil pasta in salted water\n2. Fry pancetta until crispy\n3. Mix eggs and parmesan\n4. Drain pasta, mix with pancetta\n5. Add egg mixture off heat\n6. Season and serve',
    reviews: [],
  },
  {
    id: 2, title: 'Chicken Tikka Masala', category: 'Indian', time: '45 min',
    calories: 430, emoji: '🍛', rating: 4.7,
    description: 'Tender chicken in a rich, creamy tomato-based curry sauce.',
    ingredients: '500g chicken breast\n1 cup yogurt\n2 tbsp tikka masala paste\n400ml tomato sauce\n200ml cream\n1 onion\n3 cloves garlic\nGinger, spices',
    steps: '1. Marinate chicken in yogurt and spices\n2. Grill chicken until charred\n3. Fry onions, garlic, ginger\n4. Add paste and tomatoes\n5. Simmer 15 mins\n6. Add cream and chicken\n7. Serve with rice',
    reviews: [],
  },
  {
    id: 3, title: 'Avocado Toast', category: 'Breakfast', time: '10 min',
    calories: 280, emoji: '🥑', rating: 4.5,
    description: 'Simple, healthy and delicious avocado on toasted bread.',
    ingredients: '2 slices bread\n1 ripe avocado\n1 lemon\nSalt & pepper\nRed chili flakes\n2 eggs (optional)',
    steps: '1. Toast the bread\n2. Mash avocado with lemon juice\n3. Season with salt and pepper\n4. Spread on toast\n5. Top with chili flakes\n6. Add poached egg if desired',
    reviews: [],
  },
  {
    id: 4, title: 'Beef Tacos', category: 'Mexican', time: '25 min',
    calories: 390, emoji: '🌮', rating: 4.6,
    description: 'Juicy seasoned beef in crispy taco shells with fresh toppings.',
    ingredients: '500g ground beef\n8 taco shells\n1 onion\n2 cloves garlic\nTaco seasoning\nLettuce, tomato, cheese\nSour cream, salsa',
    steps: '1. Brown beef in pan\n2. Add onion and garlic\n3. Add taco seasoning\n4. Simmer 10 mins\n5. Warm taco shells\n6. Fill with beef and toppings',
    reviews: [],
  },
  {
    id: 5, title: 'Caesar Salad', category: 'Salad', time: '15 min',
    calories: 220, emoji: '🥗', rating: 4.4,
    description: 'Crisp romaine lettuce with classic Caesar dressing and croutons.',
    ingredients: '1 romaine lettuce\n100g croutons\n50g parmesan\nCaesar dressing\n1 lemon\nBlack pepper',
    steps: '1. Wash and chop romaine\n2. Make or use store dressing\n3. Toss lettuce with dressing\n4. Add croutons and parmesan\n5. Season with lemon and pepper',
    reviews: [],
  },
  {
    id: 6, title: 'Margherita Pizza', category: 'Italian', time: '40 min',
    calories: 480, emoji: '🍕', rating: 4.9,
    description: 'Classic Neapolitan pizza with tomato, mozzarella and fresh basil.',
    ingredients: 'Pizza dough\n200ml tomato sauce\n200g mozzarella\nFresh basil\n2 tbsp olive oil\nSalt',
    steps: '1. Preheat oven to 250°C\n2. Roll out dough\n3. Spread tomato sauce\n4. Add mozzarella slices\n5. Bake 10-12 mins\n6. Top with fresh basil',
    reviews: [],
  },
];

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [favorites, setFavorites] = useState([]);

  const addRecipe = (recipe) => {
    setRecipes((prev) => [{ ...recipe, id: Date.now(), rating: 5.0, reviews: [] }, ...prev]);
  };

  const deleteRecipe = (id) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
    setFavorites((prev) => prev.filter((fid) => fid !== id));
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const isFavorite = (id) => favorites.includes(id);

  const addReview = (recipeId, review) => {
    setRecipes((prev) =>
      prev.map((r) => {
        if (r.id !== recipeId) return r;
        const newReviews = [...(r.reviews || []), review];
        const avgRating = (newReviews.reduce((sum, rv) => sum + rv.rating, 0) / newReviews.length).toFixed(1);
        return { ...r, reviews: newReviews, rating: Number(avgRating) };
      })
    );
  };

  return (
    <RecipeContext.Provider value={{ recipes, favorites, addRecipe, deleteRecipe, toggleFavorite, isFavorite, addReview }}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipes() {
  return useContext(RecipeContext);
}
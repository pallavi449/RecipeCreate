import { useState } from 'react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const meals = ['Breakfast', 'Lunch', 'Dinner'];

const suggestions = ['Oatmeal', 'Eggs & Toast', 'Chicken Salad', 'Pasta', 'Stir Fry', 'Pizza', 'Tacos', 'Soup', 'Sandwich', 'Rice Bowl'];

function MealPlan() {
  const [plan, setPlan] = useState({});
  const [editing, setEditing] = useState(null);
  const [input, setInput] = useState('');

  const setMeal = (day, meal, value) => {
    setPlan((prev) => ({ ...prev, [`${day}-${meal}`]: value }));
    setEditing(null);
    setInput('');
  };

  const key = (day, meal) => `${day}-${meal}`;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Weekly Meal Plan</h1>
        <p className="text-gray-500 mb-8">Plan your meals for the entire week</p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-2xl shadow overflow-hidden">
            <thead>
              <tr className="bg-orange-500 text-white">
                <th className="p-4 text-left font-semibold w-28">Day</th>
                {meals.map((m) => (
                  <th key={m} className="p-4 text-left font-semibold">{m}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day, i) => (
                <tr key={day} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-4 font-bold text-orange-500 text-sm">{day}</td>
                  {meals.map((meal) => (
                    <td key={meal} className="p-3">
                      {editing === key(day, meal) ? (
                        <div className="flex flex-col gap-2">
                          <input
                            autoFocus
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && setMeal(day, meal, input)}
                            placeholder="Type a meal..."
                            className="border border-orange-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-orange-500 w-full"
                          />
                          <div className="flex flex-wrap gap-1">
                            {suggestions.slice(0, 4).map((s) => (
                              <button
                                key={s}
                                onClick={() => setMeal(day, meal, s)}
                                className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full hover:bg-orange-200 transition"
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setMeal(day, meal, input)}
                              className="text-xs bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600 transition"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditing(null)}
                              className="text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-lg hover:bg-gray-300 transition"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => { setEditing(key(day, meal)); setInput(plan[key(day, meal)] || ''); }}
                          className={`cursor-pointer rounded-xl px-3 py-2 text-sm transition min-h-[40px] flex items-center ${
                            plan[key(day, meal)]
                              ? 'bg-orange-50 text-gray-800 font-medium hover:bg-orange-100'
                              : 'text-gray-300 hover:bg-gray-100 border border-dashed border-gray-200'
                          }`}
                        >
                          {plan[key(day, meal)] || '+ Add meal'}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="mt-8 bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📋 Week Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-orange-50 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-orange-500">{Object.values(plan).filter(Boolean).length}</p>
              <p className="text-sm text-gray-500 mt-1">Meals Planned</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-green-500">{21 - Object.values(plan).filter(Boolean).length}</p>
              <p className="text-sm text-gray-500 mt-1">Remaining</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-blue-500">7</p>
              <p className="text-sm text-gray-500 mt-1">Days</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-purple-500">
                {Math.round((Object.values(plan).filter(Boolean).length / 21) * 100)}%
              </p>
              <p className="text-sm text-gray-500 mt-1">Complete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MealPlan;
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorMiddleware');

const recipeRoutes = require('./routes/recipeRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const mealPlanRoutes = require('./routes/mealPlanRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/recipes', recipeRoutes);
 app.use('/api/reviews', reviewRoutes);
 app.use('/api/mealplan', mealPlanRoutes);

app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/recipedb')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log('Server running on 5000'));
  })
  .catch((err) => console.error('DB Error:', err));
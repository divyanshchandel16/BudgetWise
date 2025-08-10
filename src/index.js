require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


// Routes
const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expenses');
const budgetRoutes = require('./routes/budgets');
const goalRoutes = require('./routes/goals');
const currencyRoutes = require('./routes/currency');
const analyticsRoutes = require('./routes/analytics');
const chartsRoutes = require('./routes/charts');
const notificationsRoutes = require('./routes/notifications');
const aiRoutes = require('./routes/ai');
app.use('/api', authRoutes);
app.use('/api', expenseRoutes);
app.use('/api', budgetRoutes);
app.use('/api', goalRoutes);
app.use('/api', currencyRoutes);
app.use('/api', analyticsRoutes);
app.use('/api', chartsRoutes);
app.use('/api', notificationsRoutes);
app.use('/api', aiRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

module.exports = app;

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 1000 });
app.use('/api', limiter);

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

// Health check endpoint
app.get('/health', (req, res) => res.json({ status: 'ok' }));


app.get('/', (req, res) => {
  res.send('Backend server is running

    Available API Endpoints:

    Register - POST /api/register
    Body: { "email", "password", "name" }

    Login - POST /api/login
    Body: { "email", "password", "name" }

    Create Expense - POST /api/expenses
    Body: { "date", "amount", "category", "description", "currency" }

    List Expenses (with pagination) - GET /api/expenses?page=1&limit=50

    Update Expense - PUT /api/expenses/:expenseId
    Body: { "amount", "description" }

    Delete Expense - DELETE /api/expenses/:expenseId

    Create Budget - POST /api/budgets
    Body: { "category", "limit", "start_date", "end_date" }

    List Budgets - GET /api/budgets?page=1&limit=50

    Update Budget - PUT /api/budgets/:budgetId
    Body: { "limit" }

    Delete Budget - DELETE /api/budgets/:budgetId

    Create Goal - POST /api/goals
    Body: { "goal_type", "target_amount", "deadline" }

    List Goals - GET /api/goals?page=1&limit=50

    Update Goal - PUT /api/goals/:goalId
    Body: { "target_amount" }

    Delete Goal - DELETE /api/goals/:goalId

    Spending Patterns - GET /api/analytics/spending-patterns

    Budget Adherence - GET /api/analytics/budget-adherence

    Spending Trend Chart - GET /api/charts/spending-trends

    Budget Performance Chart - GET /api/charts/budget-performance

    Currency Conversion - POST /api/convert-currency
    Body: { "amount", "from_currency", "to_currency" }

    Notifications - POST /api/notifications/trigger
    Body: { "type", "trigger" }

    AI Personalized Advice - GET /api/advice/personalized

    AI Insight - GET /api/insights/ai');
});

const PORT = process.env.PORT || 5000;

['MONGO_URI', 'JWT_SECRET'].forEach((k) => {
  if (!process.env[k]) {
    console.error(`Missing required environment variable: ${k}`);
    process.exit(1);
  }
});

mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

module.exports = app;

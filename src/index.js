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
  res.send(`
    <h2>Backend server is running</h2>
    <h3>Available API Endpoints after installing the project.</h3>
    <ul>
      <li><b>Register:</b> POST /api/register<br>
        Body: { "email", "password", "name" }
      </li>
      <li><b>Login:</b> POST /api/login<br>
        Body: { "email", "password", "name" }
      </li>
      <li><b>Create Expense:</b> POST /api/expenses<br>
        Body: { "date", "amount", "category", "description", "currency" }
      </li>
      <li><b>List Expenses:</b> GET /api/expenses?page=1&amp;limit=50</li>
      <li><b>Update Expense:</b> PUT /api/expenses/:expenseId<br>
        Body: { "amount", "description" }
      </li>
      <li><b>Delete Expense:</b> DELETE /api/expenses/:expenseId</li>
      <li><b>Create Budget:</b> POST /api/budgets<br>
        Body: { "category", "limit", "start_date", "end_date" }
      </li>
      <li><b>List Budgets:</b> GET /api/budgets?page=1&amp;limit=50</li>
      <li><b>Update Budget:</b> PUT /api/budgets/:budgetId<br>
        Body: { "limit" }
      </li>
      <li><b>Delete Budget:</b> DELETE /api/budgets/:budgetId</li>
      <li><b>Create Goal:</b> POST /api/goals<br>
        Body: { "goal_type", "target_amount", "deadline" }
      </li>
      <li><b>List Goals:</b> GET /api/goals?page=1&amp;limit=50</li>
      <li><b>Update Goal:</b> PUT /api/goals/:goalId<br>
        Body: { "target_amount" }
      </li>
      <li><b>Delete Goal:</b> DELETE /api/goals/:goalId</li>
      <li><b>Spending Patterns:</b> GET /api/analytics/spending-patterns</li>
      <li><b>Budget Adherence:</b> GET /api/analytics/budget-adherence</li>
      <li><b>Spending Trend Chart:</b> GET /api/charts/spending-trends</li>
      <li><b>Budget Performance Chart:</b> GET /api/charts/budget-performance</li>
      <li><b>Currency Conversion:</b> POST /api/convert-currency<br>
        Body: { "amount", "from_currency", "to_currency" }
      </li>
      <li><b>Notifications:</b> POST /api/notifications/trigger<br>
        Body: { "type", "trigger" }
      </li>
      <li><b>AI Personalized Advice:</b> GET /api/advice/personalized</li>
      <li><b>AI Insight:</b> GET /api/insights/ai</li>
    </ul>
  `);
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

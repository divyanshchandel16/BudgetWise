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

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;

['MONGO_URI', 'JWT_SECRET'].forEach((k) => {
  if (!process.env[k]) {
    console.error(`Missing required environment variable: ${k}`);
    process.exit(1);
  }
});

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

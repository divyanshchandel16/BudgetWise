const Expense = require('../models/Expense');
const Budget = require('../models/Budget');

// Spending trend chart data (group by month)
exports.spendingTrends = async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { userId: req.user._id };
    const expenses = await Expense.find(filter);
    // Group by month
    const chartData = {};
    expenses.forEach(exp => {
      const month = exp.date.toISOString().slice(0, 7); // YYYY-MM
      chartData[month] = (chartData[month] || 0) + exp.amount;
    });
    res.json({ chartData });
  } catch (err) {
    res.status(500).json({ message: 'Chart data error', error: err.message });
  }
};

// Budget performance chart data (category vs spent)
exports.budgetPerformance = async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { userId: req.user._id };
    const budgets = await Budget.find(filter);
    const expenses = await Expense.find(filter);
    const chartData = budgets.map(budget => {
      const spent = expenses.filter(e => e.category === budget.category && e.date >= budget.start_date && e.date <= budget.end_date)
        .reduce((sum, e) => sum + e.amount, 0);
      return {
        category: budget.category,
        limit: budget.limit,
        spent,
        start_date: budget.start_date,
        end_date: budget.end_date
      };
    });
    res.json({ chartData });
  } catch (err) {
    res.status(500).json({ message: 'Chart data error', error: err.message });
  }
};

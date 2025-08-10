const Expense = require('../models/Expense');
const Budget = require('../models/Budget');

// Spending patterns analytics
exports.spendingPatterns = async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { userId: req.user._id };
    const expenses = await Expense.find(filter);
    // Group by category
    const analytics = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});
    res.json({ analytics });
  } catch (err) {
    res.status(500).json({ message: 'Analytics error', error: err.message });
  }
};

// Budget adherence analytics
exports.budgetAdherence = async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { userId: req.user._id };
    const budgets = await Budget.find(filter);
    const expenses = await Expense.find(filter);
    // Calculate spent per budget category
    const adherence = budgets.map(budget => {
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
    res.json({ adherence });
  } catch (err) {
    res.status(500).json({ message: 'Analytics error', error: err.message });
  }
};

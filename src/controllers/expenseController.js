const Expense = require('../models/Expense');

// Create expense
exports.createExpense = async (req, res) => {
  try {
    const { date, amount, category, description, currency } = req.body;
    if (!date || !amount || !category || !currency) return res.status(400).json({ message: 'Missing required fields' });
    const expense = await Expense.create({
      userId: req.user._id,
      date,
      amount,
      category,
      description,
      currency
    });
    res.status(201).json({ expense });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// List expenses (user: own, admin: all)
exports.listExpenses = async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { userId: req.user._id };
    const expenses = await Expense.find(filter).sort({ date: -1 });
    res.json({ expenses });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update expense
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const expense = await Expense.findOneAndUpdate(
      req.user.role === 'admin' ? { _id: id } : { _id: id, userId: req.user._id },
      update,
      { new: true }
    );
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json({ expense });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete expense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOneAndDelete(
      req.user.role === 'admin' ? { _id: id } : { _id: id, userId: req.user._id }
    );
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const Budget = require('../models/Budget');

// Create budget
exports.createBudget = async (req, res) => {
  try {
    const { category, limit, start_date, end_date } = req.body;
    if (!category || !limit || !start_date || !end_date) return res.status(400).json({ message: 'Missing required fields' });
    const budget = await Budget.create({
      userId: req.user._id,
      category,
      limit,
      start_date,
      end_date
    });
    res.status(201).json({ budget });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// List budgets (user: own, admin: all)
exports.listBudgets = async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { userId: req.user._id };
    const budgets = await Budget.find(filter).sort({ start_date: -1 });
    res.json({ budgets });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update budget
exports.updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const budget = await Budget.findOneAndUpdate(
      req.user.role === 'admin' ? { _id: id } : { _id: id, userId: req.user._id },
      update,
      { new: true }
    );
    if (!budget) return res.status(404).json({ message: 'Budget not found' });
    res.json({ budget });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete budget
exports.deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const budget = await Budget.findOneAndDelete(
      req.user.role === 'admin' ? { _id: id } : { _id: id, userId: req.user._id }
    );
    if (!budget) return res.status(404).json({ message: 'Budget not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

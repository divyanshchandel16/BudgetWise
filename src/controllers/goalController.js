const Goal = require('../models/Goal');

// Create goal
exports.createGoal = async (req, res) => {
  try {
    const { goal_type, target_amount, deadline } = req.body;
    if (!goal_type || !target_amount || !deadline) return res.status(400).json({ message: 'Missing required fields' });
    const goal = await Goal.create({
      userId: req.user._id,
      goal_type,
      target_amount,
      deadline
    });
    res.status(201).json({ goal });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// List goals (user: own, admin: all)
exports.listGoals = async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { userId: req.user._id };
    const goals = await Goal.find(filter).sort({ deadline: 1 });
    res.json({ goals });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update goal
exports.updateGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const goal = await Goal.findOneAndUpdate(
      req.user.role === 'admin' ? { _id: id } : { _id: id, userId: req.user._id },
      update,
      { new: true }
    );
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    res.json({ goal });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete goal
exports.deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await Goal.findOneAndDelete(
      req.user.role === 'admin' ? { _id: id } : { _id: id, userId: req.user._id }
    );
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

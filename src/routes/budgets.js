const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const budgetController = require('../controllers/budgetController');

router.post('/budgets', authenticate, budgetController.createBudget);
router.get('/budgets', authenticate, budgetController.listBudgets);
router.put('/budgets/:id', authenticate, budgetController.updateBudget);
router.delete('/budgets/:id', authenticate, budgetController.deleteBudget);

module.exports = router;

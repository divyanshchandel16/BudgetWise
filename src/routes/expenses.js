const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const expenseController = require('../controllers/expenseController');

router.post('/expenses', authenticate, expenseController.createExpense);
router.get('/expenses', authenticate, expenseController.listExpenses);
router.put('/expenses/:id', authenticate, expenseController.updateExpense);
router.delete('/expenses/:id', authenticate, expenseController.deleteExpense);

module.exports = router;

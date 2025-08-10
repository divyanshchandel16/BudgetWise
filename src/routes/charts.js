const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const chartsController = require('../controllers/chartsController');

router.get('/charts/spending-trends', authenticate, chartsController.spendingTrends);
router.get('/charts/budget-performance', authenticate, chartsController.budgetPerformance);

module.exports = router;

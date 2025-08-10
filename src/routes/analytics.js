const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const analyticsController = require('../controllers/analyticsController');

router.get('/analytics/spending-patterns', authenticate, analyticsController.spendingPatterns);
router.get('/analytics/budget-adherence', authenticate, analyticsController.budgetAdherence);

module.exports = router;

const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const goalController = require('../controllers/goalController');

router.post('/goals', authenticate, goalController.createGoal);
router.get('/goals', authenticate, goalController.listGoals);
router.put('/goals/:id', authenticate, goalController.updateGoal);
router.delete('/goals/:id', authenticate, goalController.deleteGoal);

module.exports = router;

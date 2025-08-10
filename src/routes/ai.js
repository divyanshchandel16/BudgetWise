const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const aiController = require('../controllers/aiController');

router.get('/advice/personalized', authenticate, aiController.getPersonalizedAdvice);
router.get('/insights/ai', authenticate, aiController.getAIInsights);

module.exports = router;

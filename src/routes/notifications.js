const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const notificationController = require('../controllers/notificationController');

// For testing notification trigger
router.post('/notifications/trigger', authenticate, notificationController.triggerNotification);

module.exports = router;

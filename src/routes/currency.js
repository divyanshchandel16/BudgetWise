const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { convertCurrency } = require('../controllers/currencyController');

router.post('/convert-currency', authenticate, convertCurrency);

module.exports = router;

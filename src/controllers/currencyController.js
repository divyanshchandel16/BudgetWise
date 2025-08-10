const axios = require('axios');

exports.convertCurrency = async (req, res) => {
  try {
    const { amount, from_currency, to_currency } = req.body;
    if (!amount || !from_currency || !to_currency) return res.status(400).json({ message: 'Missing required fields' });
    const apiKey = process.env.EXCHANGE_API_KEY;
    const url = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`;
    const response = await axios.get(url);
    const rates = response.data.rates;
    if (!rates[from_currency] || !rates[to_currency]) return res.status(400).json({ message: 'Invalid currency code' });
    const usdAmount = amount / rates[from_currency];
    const converted = usdAmount * rates[to_currency];
    res.json({ converted });
  } catch (err) {
    res.status(500).json({ message: 'Currency conversion failed', error: err.message });
  }
};

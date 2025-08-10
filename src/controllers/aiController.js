const axios = require('axios');

// Get personalized advice from AI microservice
exports.getPersonalizedAdvice = async (req, res) => {
  try {
    const aiUrl = process.env.AI_SERVICE_URL + '/advice';
    const response = await axios.get(aiUrl, { params: { userId: req.user._id } });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'AI advice error', error: err.message });
  }
};

// Get AI financial insights
exports.getAIInsights = async (req, res) => {
  try {
    const aiUrl = process.env.AI_SERVICE_URL + '/insights';
    const response = await axios.get(aiUrl, { params: { userId: req.user._id } });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: 'AI insights error', error: err.message });
  }
};

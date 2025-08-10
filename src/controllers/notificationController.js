const nodemailer = require('nodemailer');
const Notification = require('../models/Notification');
const User = require('../models/User');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send notification email
exports.sendNotification = async (userId, type, trigger) => {
  const user = await User.findById(userId);
  if (!user) return;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: `BudgetWise Notification: ${type}`,
    text: `Trigger: ${trigger}`
  };
  await transporter.sendMail(mailOptions);
  await Notification.create({ userId, type, trigger, sent: true });
};

// Example endpoint to trigger notification (for testing)
exports.triggerNotification = async (req, res) => {
  try {
    const { type, trigger } = req.body;
    await exports.sendNotification(req.user._id, type, trigger);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Notification error', error: err.message });
  }
};

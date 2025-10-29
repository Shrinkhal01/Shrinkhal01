const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');
const User = require('../models/User');

// Get all messages (with pagination)
router.get('/messages', auth, async (req, res) => {
  try {
    const { room = 'general', limit = 50 } = req.query;
    
    const messages = await Message.find({ room })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate('sender', 'username');
    
    res.json(messages.reverse());
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

// Get all active users
router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find().select('username email createdAt');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Get current user info
router.get('/me', auth, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ message: 'Error fetching user info' });
  }
});

module.exports = router;

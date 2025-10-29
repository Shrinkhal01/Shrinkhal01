const express = require('express');
const router = express.Router();
const { query, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Message = require('../models/Message');
const User = require('../models/User');

// Get all messages (with pagination)
router.get('/messages', [
  auth,
  query('room').optional().trim().escape().isLength({ max: 100 }),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt()
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { room = 'general', limit = 50 } = req.query;
    
    // Safe query - room is validated and sanitized by express-validator
    // Mongoose provides built-in protection against NoSQL injection
    const messages = await Message.find({ room: String(room) })
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

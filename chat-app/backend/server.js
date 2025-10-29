require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const Message = require('./models/Message');
const jwt = require('jsonwebtoken');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 auth requests per windowMs
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(limiter);

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authLimiter, require('./routes/auth'));
app.use('/api/chat', require('./routes/chat'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Store connected users
const connectedUsers = new Map();

// Socket.IO authentication middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_here_change_in_production');
    socket.userId = decoded.userId;
    next();
  } catch (error) {
    next(new Error('Authentication error'));
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  // Store user connection
  socket.on('user_connected', async (userData) => {
    connectedUsers.set(socket.id, {
      userId: socket.userId,
      username: userData.username,
      socketId: socket.id
    });
    
    // Broadcast updated user list
    const activeUsers = Array.from(connectedUsers.values());
    io.emit('active_users', activeUsers);
    
    console.log(`User ${userData.username} connected. Total users: ${connectedUsers.size}`);
  });

  // Handle incoming messages
  socket.on('send_message', async (data) => {
    try {
      const { content, room = 'general', senderUsername } = data;
      
      // Save message to database
      const message = new Message({
        sender: socket.userId,
        senderUsername,
        content,
        room
      });
      
      await message.save();
      
      // Broadcast message to all clients
      io.emit('receive_message', {
        id: message._id,
        sender: socket.userId,
        senderUsername,
        content,
        room,
        createdAt: message.createdAt
      });
      
      console.log(`Message from ${senderUsername}: ${content}`);
    } catch (error) {
      console.error('Error saving message:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });

  // Handle typing indicator
  socket.on('typing', (data) => {
    socket.broadcast.emit('user_typing', {
      username: data.username,
      isTyping: data.isTyping
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      console.log(`User ${user.username} disconnected`);
      connectedUsers.delete(socket.id);
      
      // Broadcast updated user list
      const activeUsers = Array.from(connectedUsers.values());
      io.emit('active_users', activeUsers);
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

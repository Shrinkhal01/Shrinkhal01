# Chat Application - Quick Start Guide

## Overview

This is a full-stack real-time chat application that demonstrates modern web development practices with React, Node.js, Express, Socket.IO, and MongoDB.

## What's Inside

### Backend (`/chat-app/backend`)
- **Server**: Express.js server with Socket.IO for real-time communication
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Database**: MongoDB with Mongoose ODM for data persistence
- **API Routes**:
  - `/api/auth/register` - User registration
  - `/api/auth/login` - User login
  - `/api/auth/logout` - User logout
  - `/api/chat/messages` - Get message history
  - `/api/chat/users` - Get all users
  - `/api/chat/me` - Get current user info

### Frontend (`/chat-app/frontend`)
- **Framework**: React 18 with functional components and hooks
- **Real-time**: Socket.IO client for WebSocket communication
- **HTTP Client**: Axios for REST API calls
- **Components**:
  - `Login` - User authentication form
  - `Register` - User registration form
  - `ChatRoom` - Main chat interface with messages, user list, and input
- **Services**:
  - `api.js` - REST API service layer
  - `socket.js` - WebSocket service layer

## Prerequisites

Before running the application, ensure you have:

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
3. **npm** (comes with Node.js)

## Installation Steps

### Step 1: Install MongoDB

#### macOS (using Homebrew)
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Ubuntu/Debian
```bash
sudo apt-get update
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

#### Windows
Download and install from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

### Step 2: Install Backend Dependencies

```bash
cd chat-app/backend
npm install
```

### Step 3: Configure Backend Environment

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` with your settings:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
CLIENT_URL=http://localhost:3000
```

### Step 4: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### Step 5: Configure Frontend Environment (Optional)

Create a `.env` file in the frontend directory:

```bash
cp .env.example .env
```

Content:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

## Running the Application

### Start Backend Server

In one terminal window:

```bash
cd chat-app/backend
npm start
```

For development with auto-reload:
```bash
npm run dev
```

You should see:
```
Server is running on port 5000
MongoDB connected successfully
```

### Start Frontend

In another terminal window:

```bash
cd chat-app/frontend
npm start
```

The app will open automatically at `http://localhost:3000`

## Using the Application

### 1. Register a New Account
- Open `http://localhost:3000` in your browser
- Click "Register here" link
- Fill in username, email, and password
- Click "Register"

### 2. Login
- Enter your email and password
- Click "Login"

### 3. Start Chatting
- You'll see the chat interface with:
  - **Left sidebar**: List of active users
  - **Center**: Message history
  - **Bottom**: Message input field
- Type a message and click "Send" or press Enter
- Your message appears in the chat

### 4. Test Multi-User Chat
- Open a second browser window/tab in incognito mode
- Register another account
- Login with the new account
- Start chatting between the two accounts
- See real-time message delivery
- Notice the typing indicator when someone is typing

## Features Demonstration

### Real-Time Messaging
- Messages are delivered instantly via WebSocket
- No page refresh needed
- Messages persist in MongoDB

### Typing Indicator
- When you type, other users see "[Your Name] is typing..."
- Indicator disappears 1 second after you stop typing

### Active Users List
- Left sidebar shows all connected users
- Updates automatically when users join/leave
- Shows user avatars with initials

### Message Persistence
- All messages are stored in MongoDB
- Refresh the page - messages are still there
- New users can see message history

### Authentication
- JWT tokens stored in localStorage
- Automatic login if token is valid
- Logout clears the session

## Testing Checklist

- [ ] Register a new user
- [ ] Login with the user
- [ ] Send a message
- [ ] Open another browser window (incognito)
- [ ] Register another user
- [ ] Login with the second user
- [ ] See both users in the active users list
- [ ] Send messages from both users
- [ ] Verify real-time message delivery
- [ ] Type in one window and see typing indicator in the other
- [ ] Refresh the page and verify messages persist
- [ ] Logout from one account
- [ ] Verify the user is removed from active users list

## Troubleshooting

### Backend won't start
**Problem**: `Error: listen EADDRINUSE: address already in use :::5000`
**Solution**: Port 5000 is already in use. Change `PORT` in backend `.env` file to another port (e.g., 5001)

### MongoDB connection error
**Problem**: `MongooseServerSelectionError: connect ECONNREFUSED`
**Solution**: 
- Check if MongoDB is running: `brew services list` (macOS) or `sudo systemctl status mongodb` (Linux)
- Start MongoDB if it's not running
- Verify MONGODB_URI in `.env` file

### Frontend can't connect to backend
**Problem**: Network errors in browser console
**Solution**:
- Verify backend is running on port 5000
- Check REACT_APP_API_URL in frontend `.env`
- Ensure CORS is configured correctly in `backend/server.js`

### Socket.IO connection fails
**Problem**: "WebSocket connection failed" in console
**Solution**:
- Verify backend is running
- Check REACT_APP_SOCKET_URL in frontend `.env`
- Clear browser cache and reload

### Messages not persisting
**Problem**: Messages disappear on refresh
**Solution**:
- Check MongoDB is running
- Verify database connection in backend logs
- Check for errors in backend console

## API Testing with curl

Test the backend API directly:

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Get Messages (requires token)
```bash
curl http://localhost:5000/api/chat/messages \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Project Structure Details

```
chat-app/
├── README.md                      # Main project documentation
├── QUICKSTART.md                  # This file - quick start guide
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection configuration
│   ├── middleware/
│   │   └── auth.js                # JWT authentication middleware
│   ├── models/
│   │   ├── User.js                # User model with password hashing
│   │   └── Message.js             # Message model
│   ├── routes/
│   │   ├── auth.js                # Authentication endpoints
│   │   └── chat.js                # Chat endpoints
│   ├── .env.example               # Environment variables template
│   ├── package.json               # Backend dependencies
│   └── server.js                  # Main server file with Socket.IO
└── frontend/
    ├── public/
    │   └── index.html             # HTML template
    ├── src/
    │   ├── components/
    │   │   ├── Login.js           # Login form component
    │   │   ├── Register.js        # Registration form component
    │   │   └── ChatRoom.js        # Main chat interface
    │   ├── services/
    │   │   ├── api.js             # REST API service
    │   │   └── socket.js          # Socket.IO client service
    │   ├── styles/
    │   │   ├── App.css            # Global styles
    │   │   ├── Auth.css           # Authentication styles
    │   │   └── Chat.css           # Chat interface styles
    │   ├── App.js                 # Main App component
    │   └── index.js               # React entry point
    ├── .env.example               # Frontend environment template
    └── package.json               # Frontend dependencies
```

## Next Steps

After getting the basic app running:

1. **Customize the UI**: Edit the CSS files in `frontend/src/styles/`
2. **Add Features**: 
   - Multiple chat rooms
   - Direct messages
   - File uploads
   - Emoji support
   - User profiles
   - Message reactions
3. **Deploy**: 
   - Backend: Heroku, Railway, or DigitalOcean
   - Frontend: Vercel, Netlify, or GitHub Pages
   - Database: MongoDB Atlas (free tier available)

## Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [Socket.IO Documentation](https://socket.io/docs/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [JWT Introduction](https://jwt.io/introduction)

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review backend logs in the terminal
3. Check browser console for frontend errors
4. Verify all environment variables are set correctly

## License

MIT License - feel free to use this project for learning and development!

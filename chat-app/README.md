# Real-Time Chat Application

A full-stack real-time chatting application built with React, Node.js, Express, Socket.IO, and MongoDB.

## Features

### Frontend
- User registration and login with JWT authentication
- Real-time messaging with Socket.IO
- Display active users list
- Typing indicators
- Message history persistence
- Responsive and user-friendly interface

### Backend
- RESTful API for user authentication (signup, login, logout)
- JWT-based authentication
- Real-time communication using Socket.IO
- MongoDB for data persistence
- User and message management

## Tech Stack

### Frontend
- React 18
- Socket.IO Client
- Axios for API calls
- CSS3 for styling

### Backend
- Node.js
- Express.js
- Socket.IO for WebSocket communication
- MongoDB with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing

## Project Structure

```
chat-app/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── models/
│   │   ├── User.js            # User model
│   │   └── Message.js         # Message model
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   └── chat.js            # Chat routes
│   ├── .env.example           # Environment variables template
│   ├── package.json
│   └── server.js              # Main server file
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Login.js       # Login component
    │   │   ├── Register.js    # Registration component
    │   │   └── ChatRoom.js    # Main chat interface
    │   ├── services/
    │   │   ├── api.js         # API service
    │   │   └── socket.js      # Socket.IO service
    │   ├── styles/
    │   │   ├── App.css
    │   │   ├── Auth.css
    │   │   └── Chat.css
    │   ├── App.js             # Main App component
    │   └── index.js           # Entry point
    └── package.json
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd chat-app
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your_jwt_secret_key_here_change_in_production
CLIENT_URL=http://localhost:3000
```

### 3. Set up the Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory (optional):

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

## Running the Application

### 1. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# For macOS with Homebrew
brew services start mongodb-community

# For Linux
sudo systemctl start mongod

# For Windows
# Start MongoDB from Services or run mongod.exe
```

### 2. Start the Backend Server

```bash
cd backend
npm start
```

The backend server will start on `http://localhost:5000`

For development with auto-reload:
```bash
npm run dev
```

### 3. Start the Frontend

In a new terminal:

```bash
cd frontend
npm start
```

The frontend will start on `http://localhost:3000`

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Register a new account or login with existing credentials
3. Start chatting in real-time!
4. Open multiple browser tabs/windows to test multi-user functionality
5. See typing indicators when other users are typing
6. View the list of active users in the sidebar

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Chat
- `GET /api/chat/messages` - Get message history (requires auth)
- `GET /api/chat/users` - Get all users (requires auth)
- `GET /api/chat/me` - Get current user info (requires auth)

### Socket.IO Events

#### Client -> Server
- `user_connected` - Notify server of user connection
- `send_message` - Send a new message
- `typing` - Notify typing status

#### Server -> Client
- `receive_message` - Receive new message
- `active_users` - Receive list of active users
- `user_typing` - Receive typing notification

## Features in Detail

### User Authentication
- Secure JWT-based authentication
- Password hashing with bcryptjs
- Session persistence with localStorage

### Real-Time Messaging
- Instant message delivery using Socket.IO
- Message persistence in MongoDB
- Message history on page load

### Typing Indicators
- See when other users are typing
- Automatic timeout after 1 second of inactivity

### Active Users
- Real-time list of connected users
- Updates when users join/leave

### Message Persistence
- All messages stored in MongoDB
- Messages persist after page refresh
- Message history loaded on login

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- Protected API routes
- CORS configuration
- Socket.IO authentication middleware

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm start  # React development server with hot reload
```

## Building for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
```

The build files will be in the `frontend/build` directory.

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check the MONGODB_URI in your .env file
- Verify MongoDB is accessible on the specified port

### Socket.IO Connection Issues
- Check that backend and frontend URLs match
- Verify CORS settings in server.js
- Check browser console for connection errors

### Port Already in Use
- Change PORT in backend .env file
- Change port in frontend by setting PORT environment variable

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT

## Author

Shrinkhal
- GitHub: [@Shrinkhal01](https://github.com/Shrinkhal01)
- Email: shrinkhalshrinkhal22@gmail.com

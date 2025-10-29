# Chat Application Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT BROWSER                           │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    React Frontend (Port 3000)               │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │ │
│  │  │   Login/     │  │   ChatRoom   │  │   Register   │    │ │
│  │  │   Component  │  │   Component  │  │   Component  │    │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘    │ │
│  │         │                  │                  │            │ │
│  │         └──────────────────┴──────────────────┘            │ │
│  │                            │                                │ │
│  │         ┌──────────────────┴──────────────────┐            │ │
│  │         │                                      │            │ │
│  │    ┌────▼─────┐                       ┌───────▼──────┐    │ │
│  │    │  API     │                       │   Socket.IO  │    │ │
│  │    │  Service │                       │   Service    │    │ │
│  │    │  (Axios) │                       │   (Client)   │    │ │
│  │    └────┬─────┘                       └───────┬──────┘    │ │
│  └─────────┼─────────────────────────────────────┼──────────┘ │
└────────────┼─────────────────────────────────────┼────────────┘
             │                                      │
             │ HTTP REST API                        │ WebSocket
             │ (JWT Auth)                           │ (Real-time)
             │                                      │
┌────────────▼──────────────────────────────────────▼────────────┐
│                   Backend Server (Port 5000)                    │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                    Express.js Server                     │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │  │
│  │  │    CORS      │  │   Body       │  │  Static      │  │  │
│  │  │  Middleware  │  │   Parser     │  │  Files       │  │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  │  │
│  └──────────────────────────┬──────────────────────────────┘  │
│                             │                                  │
│           ┌─────────────────┴─────────────────┐               │
│           │                                   │               │
│      ┌────▼─────┐                       ┌─────▼──────┐       │
│      │   API    │                       │  Socket.IO │       │
│      │  Routes  │                       │   Server   │       │
│      └────┬─────┘                       └─────┬──────┘       │
│           │                                   │               │
│    ┌──────┴──────┐                    ┌───────┴────────┐     │
│    │             │                    │                │     │
│ ┌──▼───┐    ┌───▼───┐            ┌───▼────┐      ┌────▼──┐ │
│ │Auth  │    │Chat   │            │Message │      │Typing │ │
│ │Routes│    │Routes │            │Events  │      │Events │ │
│ └──┬───┘    └───┬───┘            └───┬────┘      └────┬──┘ │
│    │            │                    │                │     │
│    └────────┬───┴────────────────────┴────────────────┘     │
│             │                                                │
│      ┌──────▼──────┐                                        │
│      │     JWT     │                                        │
│      │ Auth Middle │                                        │
│      │    ware     │                                        │
│      └──────┬──────┘                                        │
│             │                                                │
│      ┌──────▼──────┐                                        │
│      │  Mongoose   │                                        │
│      │     ODM     │                                        │
│      └──────┬──────┘                                        │
└─────────────┼─────────────────────────────────────────────────┘
              │
              │ MongoDB Connection
              │
┌─────────────▼─────────────────────────────────────────────────┐
│                   MongoDB Database                             │
│  ┌──────────────────────────┐  ┌──────────────────────────┐  │
│  │   Users Collection       │  │  Messages Collection     │  │
│  │  ┌────────────────────┐  │  │  ┌────────────────────┐ │  │
│  │  │ - _id              │  │  │  │ - _id              │ │  │
│  │  │ - username         │  │  │  │ - sender (ref)     │ │  │
│  │  │ - email            │  │  │  │ - senderUsername   │ │  │
│  │  │ - password (hash)  │  │  │  │ - content          │ │  │
│  │  │ - createdAt        │  │  │  │ - room             │ │  │
│  │  └────────────────────┘  │  │  │ - createdAt        │ │  │
│  │                          │  │  └────────────────────┘ │  │
│  └──────────────────────────┘  └──────────────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. User Registration Flow
```
User Input → Register Component → API Service → POST /api/auth/register
→ Backend validates → Hash password → Save to MongoDB → Generate JWT
→ Return token + user data → Store in localStorage → Redirect to chat
```

### 2. User Login Flow
```
User Input → Login Component → API Service → POST /api/auth/login
→ Backend validates credentials → Compare password hash → Generate JWT
→ Return token + user data → Store in localStorage → Redirect to chat
```

### 3. Send Message Flow (Real-time)
```
User types message → ChatRoom Component → Socket.IO emit 'send_message'
→ Backend Socket.IO receives event → Save message to MongoDB
→ Broadcast 'receive_message' to all clients → All clients update UI
```

### 4. Load Message History Flow
```
Component mounts → API Service → GET /api/chat/messages (with JWT)
→ Backend validates JWT → Query MongoDB → Return messages array
→ Component renders messages
```

### 5. Typing Indicator Flow
```
User types → Debounced event → Socket.IO emit 'typing' {isTyping: true}
→ Backend broadcasts to other clients → Other clients show indicator
→ 1 second timeout → emit 'typing' {isTyping: false} → Hide indicator
```

### 6. Active Users Flow
```
User connects → Socket.IO connection → emit 'user_connected'
→ Backend stores user in Map → emit 'active_users' to all
→ All clients update user list
User disconnects → Backend removes from Map → emit 'active_users'
```

## Technology Stack

### Frontend
- **React 18**: UI framework
- **Axios**: HTTP client for REST API calls
- **Socket.IO Client**: WebSocket client for real-time events
- **CSS3**: Styling
- **localStorage**: Client-side token storage

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **Socket.IO**: WebSocket server
- **JWT**: Token-based authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing

### Database
- **MongoDB**: NoSQL database
- **Mongoose**: ODM (Object Data Modeling)

## Security Features

1. **Password Security**
   - Passwords hashed with bcrypt (salt rounds: 10)
   - Never stored in plain text
   - Hashing done before saving to database

2. **JWT Authentication**
   - Tokens expire after 7 days
   - Token required for all protected routes
   - Token validation on every request

3. **Socket.IO Authentication**
   - Token required for WebSocket connection
   - Connection rejected if token invalid
   - User ID extracted from token

4. **CORS Configuration**
   - Restricted to specific origin
   - Prevents unauthorized cross-origin requests

## API Endpoints

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Register new user |
| POST | /api/auth/login | No | Login user |
| POST | /api/auth/logout | No | Logout user |

### Chat
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/chat/messages | Yes | Get message history |
| GET | /api/chat/users | Yes | Get all users |
| GET | /api/chat/me | Yes | Get current user |

## Socket.IO Events

### Client → Server
| Event | Data | Description |
|-------|------|-------------|
| user_connected | {username} | User joins chat |
| send_message | {content, room, senderUsername} | Send message |
| typing | {username, isTyping} | Typing status |

### Server → Client
| Event | Data | Description |
|-------|------|-------------|
| receive_message | {id, sender, senderUsername, content, room, createdAt} | New message |
| active_users | [{userId, username, socketId}] | Updated user list |
| user_typing | {username, isTyping} | User typing status |

## Database Schema

### User Document
```javascript
{
  _id: ObjectId,
  username: String (unique, min 3 chars),
  email: String (unique, lowercase),
  password: String (hashed),
  createdAt: Date
}
```

### Message Document
```javascript
{
  _id: ObjectId,
  sender: ObjectId (ref: User),
  senderUsername: String,
  content: String,
  room: String (default: 'general'),
  createdAt: Date
}
```

## Scalability Considerations

### Current Implementation
- In-memory storage of connected users (Map)
- Single server instance
- MongoDB on localhost

### Future Enhancements for Scale
1. **Redis** for session management and pub/sub
2. **Load Balancer** for multiple server instances
3. **MongoDB Atlas** for cloud database
4. **Socket.IO Redis Adapter** for horizontal scaling
5. **CDN** for static assets
6. **Microservices** architecture separation

## Performance Optimizations

1. **Message Pagination**: Limit messages loaded (default: 50)
2. **Debounced Typing**: Typing indicator throttled to 1 second
3. **JWT Caching**: User info cached in localStorage
4. **Indexed Database**: MongoDB indexes on frequently queried fields
5. **Connection Pooling**: Mongoose maintains connection pool

## Monitoring & Logging

Currently implemented:
- Console logs for connections/disconnections
- Error logging in API routes
- MongoDB connection status

Recommended additions:
- Winston or Bunyan for structured logging
- Morgan for HTTP request logging
- Error tracking (Sentry)
- Performance monitoring (New Relic)

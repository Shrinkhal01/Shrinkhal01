import React, { useState, useEffect, useRef } from 'react';
import { authService, chatService } from '../services/api';
import socketService from '../services/socket';
import '../styles/Chat.css';

function ChatRoom({ onLogout }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeUsers, setActiveUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [currentUser, setCurrentUser] = useState(null);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);

    // Connect to socket
    const token = authService.getToken();
    socketService.connect(token);

    // Load initial messages
    loadMessages();

    // Emit user connected event
    socketService.emit('user_connected', { username: user.username });

    // Listen for new messages
    socketService.on('receive_message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Listen for active users
    socketService.on('active_users', (users) => {
      setActiveUsers(users);
    });

    // Listen for typing indicator
    socketService.on('user_typing', (data) => {
      if (data.isTyping) {
        setTypingUsers((prev) => new Set(prev).add(data.username));
      } else {
        setTypingUsers((prev) => {
          const newSet = new Set(prev);
          newSet.delete(data.username);
          return newSet;
        });
      }
    });

    return () => {
      socketService.disconnect();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      const msgs = await chatService.getMessages();
      setMessages(msgs);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTyping = () => {
    if (!currentUser) return;

    socketService.emit('typing', {
      username: currentUser.username,
      isTyping: true
    });

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      socketService.emit('typing', {
        username: currentUser.username,
        isTyping: false
      });
    }, 1000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser) return;

    socketService.emit('send_message', {
      content: newMessage,
      room: 'general',
      senderUsername: currentUser.username
    });

    setNewMessage('');

    // Stop typing indicator
    socketService.emit('typing', {
      username: currentUser.username,
      isTyping: false
    });
  };

  const handleLogout = () => {
    authService.logout();
    socketService.disconnect();
    onLogout();
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <h3>Active Users ({activeUsers.length})</h3>
        </div>
        <div className="user-list">
          {activeUsers.map((user, index) => (
            <div key={index} className="user-item">
              <div className="user-avatar">{user.username[0].toUpperCase()}</div>
              <span>{user.username}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-main">
        <div className="chat-header">
          <h2>General Chat</h2>
          <div className="header-actions">
            <span className="current-user">👤 {currentUser?.username}</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>

        <div className="messages-container">
          {messages.map((message, index) => (
            <div
              key={message.id || index}
              className={`message ${
                message.senderUsername === currentUser?.username ? 'own-message' : ''
              }`}
            >
              <div className="message-header">
                <span className="message-sender">{message.senderUsername}</span>
                <span className="message-time">{formatTime(message.createdAt)}</span>
              </div>
              <div className="message-content">{message.content}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {typingUsers.size > 0 && (
          <div className="typing-indicator">
            {Array.from(typingUsers).join(', ')} {typingUsers.size === 1 ? 'is' : 'are'} typing...
          </div>
        )}

        <form onSubmit={handleSendMessage} className="message-input-form">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleTyping();
            }}
            placeholder="Type your message..."
            className="message-input"
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatRoom;

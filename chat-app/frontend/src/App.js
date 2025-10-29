import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import ChatRoom from './components/ChatRoom';
import { authService } from './services/api';
import './styles/App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = authService.getToken();
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLogin(true);
  };

  if (isAuthenticated) {
    return <ChatRoom onLogout={handleLogout} />;
  }

  return (
    <>
      {showLogin ? (
        <Login
          onLogin={handleLogin}
          onSwitchToRegister={() => setShowLogin(false)}
        />
      ) : (
        <Register
          onRegister={handleRegister}
          onSwitchToLogin={() => setShowLogin(true)}
        />
      )}
    </>
  );
}

export default App;

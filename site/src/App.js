import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Header from './comp/Header';
import AuthPage from './comp/AuthPage';
import HomePage from './comp/HomePage';
import UserProfile from './comp/UserProfile';
import Footer from './comp/Footer';
import ManagerPage from './comp/ManagerPage'; // Import the ManagerPage component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Header isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/auth" element={isAuthenticated ? <Navigate to="/profile" /> : <AuthPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/profile" element={isAuthenticated ? <UserProfile setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/auth" />} />
          <Route path="/manager" element={<ManagerPage />} /> {/* Add the route for the ManagerPage */}
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
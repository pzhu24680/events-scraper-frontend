import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Signup from "./components/Signup";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Logout from "./components/Logout";
import './styles/Navbar.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('access_token') !== null);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  const handleLogin = () => {
    // Perform login actions (e.g., set tokens)
    localStorage.setItem('access_token', 'your_access_token_here');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Perform logout actions (e.g., clear tokens)
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
  };

  return (
    <div>
      <Router>
        <nav className="navbar">
          <ul className="navbar-list">
            <li className="navbar-item">
              <Link to="/" className="navbar-link">Home</Link>
            </li>
            {!isAuthenticated && (
              <li className="navbar-item">
                <Link to="/signup" className="navbar-link">Sign Up</Link>
              </li>
            )}
            {!isAuthenticated ? (
              <li className="navbar-item">
                <Link to="/login" className="navbar-link" onClick={handleLogin}>Login</Link>
              </li>
            ) : (
              <li className="navbar-item">
                <Link to="/logout" className="navbar-link" onClick={handleLogout}>Logout</Link>
              </li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<PrivateRoute element={<Homepage />} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
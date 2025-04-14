import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaTasks, FaSignOutAlt, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <FaTasks className="logo-icon" />
            <span className="logo-text">Finzarc</span>
          </div>
          
          <nav className="desktop-nav">
            {currentUser ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="nav-link"
                >
                  Dashboard
                </Link>
                <div className="user-menu">
                  <div className="user-info">
                    <div className="avatar">
                      <FaUser />
                    </div>
                    <span className="username">
                      {currentUser.username}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="btn btn-primary logout-btn"
                    >
                      <FaSignOutAlt className="icon-left" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="nav-link"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-primary register-btn"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-button"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            {currentUser ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="mobile-nav-link"
                >
                  Dashboard
                </Link>
                <div className="mobile-user-info">
                  <div className="mobile-avatar">
                    <FaUser />
                  </div>
                  <div className="mobile-user-details">
                    <div className="mobile-username">{currentUser.username}</div>
                    <div className="mobile-email">{currentUser.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="mobile-logout-btn"
                >
                  <FaSignOutAlt className="icon-left" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="mobile-nav-link"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="mobile-nav-link"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css"
function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="nav-link logo-link">🔗 Shortify</Link>
      </div>
      <nav className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </nav>
    </header>
  );
}

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Create this file for styles

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span className="footer-text">© {new Date().getFullYear()} Shortify</span>
        <Link to="/contact" className="footer-link">Contact</Link>
      </div>
    </footer>
  );
}

export default Footer;

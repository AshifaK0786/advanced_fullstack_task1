import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🛍️ E-Commerce
        </Link>
        <div className="nav-menu">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/cart" className="nav-link">
            Cart
          </Link>
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/signup" className="nav-link">
            Sign Up
          </Link>
          <Link to="/admin/add-product" className="nav-link">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

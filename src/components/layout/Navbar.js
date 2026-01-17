import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import '../../styles/navbar.css';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <i className="fas fa-shopping-cart"></i>
          <span>ShopEasy</span>
        </Link>
        
        <ul className="navbar-nav">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/shop" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/cart" 
              className={({ isActive }) => isActive ? 'nav-link cart-link' : 'nav-link cart-link'}
            >
              <i className="fas fa-shopping-bag"></i>
              Cart
              {cartItemsCount > 0 && (
                <span className="cart-badge">{cartItemsCount}</span>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
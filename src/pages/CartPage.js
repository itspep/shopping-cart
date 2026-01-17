import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import PaymentForm from '../components/cart/PaymentForm';
import '../styles/cart.css';  // This should be correct - it's inside src/

const CartPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <div className="container">
          <div className="empty-cart-content">
            <i className="fas fa-shopping-cart empty-cart-icon"></i>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/shop" className="btn btn-primary">
              <i className="fas fa-store"></i> Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Your Shopping Cart</h1>
          <button onClick={clearCart} className="btn btn-danger clear-cart-btn">
            <i className="fas fa-trash"></i> Clear Cart
          </button>
        </div>

        <div className="cart-layout">
          <div className="cart-items-section">
            <div className="cart-items-header">
              <h2>Items ({cartItems.length})</h2>
            </div>
            
            <div className="cart-items-list">
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div className="cart-sidebar">
            <CartSummary />
            <PaymentForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
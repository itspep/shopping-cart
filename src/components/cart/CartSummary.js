import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import '../../styles/cart-summary.css';

const CartSummary = () => {
  const { getTotalPrice, cartItems } = useContext(CartContext);
  
  const subtotal = getTotalPrice();
  const shipping = subtotal > 0 ? 10.00 : 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="cart-summary">
      <h2>Order Summary</h2>
      
      <div className="summary-details">
        <div className="summary-row">
          <span>Items ({cartItems.length})</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="summary-row">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        
        <div className="summary-row">
          <span>Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <div className="summary-divider"></div>
        
        <div className="summary-row total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="summary-note">
        <i className="fas fa-info-circle"></i>
        <p>Free shipping on orders over $50!</p>
      </div>
    </div>
  );
};

export default CartSummary;
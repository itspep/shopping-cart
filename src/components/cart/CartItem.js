import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../../context/CartContext';
import QuantityControl from '../ui/QuantityControl';
import '../../styles/cart-item.css';

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useContext(CartContext);

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const itemTotal = item.price * item.quantity;
  const itemImage = typeof item.image === 'string' && item.image.startsWith('http')
    ? item.image
    : `https://picsum.photos/100/100?random=${item.id}`;

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={itemImage} alt={item.name} loading="lazy" />
      </div>
      
      <div className="cart-item-details">
        <h3 className="cart-item-title">{item.name}</h3>
        <p className="cart-item-price">${item.price.toFixed(2)} each</p>
      </div>
      
      <div className="cart-item-quantity">
        <label htmlFor={`cart-quantity-${item.id}`}>Quantity:</label>
        <QuantityControl
          id={`cart-quantity-${item.id}`}
          quantity={item.quantity}
          onQuantityChange={handleQuantityChange}
          min={1}
          max={99}
        />
      </div>
      
      <div className="cart-item-total">
        <span className="total-label">Total:</span>
        <span className="total-amount">${itemTotal.toFixed(2)}</span>
      </div>
      
      <div className="cart-item-actions">
        <button 
          onClick={handleRemove}
          className="btn btn-danger btn-small remove-btn"
          aria-label={`Remove ${item.name} from cart`}
        >
          <i className="fas fa-times"></i> Remove
        </button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  }).isRequired
};

export default CartItem;
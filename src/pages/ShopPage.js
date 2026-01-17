import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/quantity-control.css';

const QuantityControl = ({ id, quantity, onQuantityChange, min = 1, max = 99 }) => {
  const handleIncrement = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= min && value <= max) {
      onQuantityChange(value);
    }
  };

  const handleBlur = (e) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < min) {
      onQuantityChange(min);
    } else if (value > max) {
      onQuantityChange(max);
    }
  };

  return (
    <div className="quantity-control">
      <button 
        type="button"
        onClick={handleDecrement}
        className="quantity-btn decrement"
        disabled={quantity <= min}
        aria-label="Decrease quantity"
      >
        <i className="fas fa-minus"></i>
      </button>
      
      <input
        type="number"
        id={id}
        value={quantity}
        onChange={handleInputChange}
        onBlur={handleBlur}
        min={min}
        max={max}
        className="quantity-input"
        aria-label="Quantity"
      />
      
      <button 
        type="button"
        onClick={handleIncrement}
        className="quantity-btn increment"
        disabled={quantity >= max}
        aria-label="Increase quantity"
      >
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};

QuantityControl.propTypes = {
  id: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number
};

export default QuantityControl;
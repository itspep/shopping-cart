import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../../context/CartContext';
import QuantityControl from '../ui/QuantityControl';
import '../../styles/product-card.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [showAdded, setShowAdded] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    const itemToAdd = {
      id: product.id,
      name: product.title || product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    };
    
    addToCart(itemToAdd);
    setShowAdded(true);
    
    // Reset feedback after 2 seconds
    setTimeout(() => {
      setShowAdded(false);
      setQuantity(1);
    }, 2000);
  };

  const productImage = typeof product.image === 'string' && product.image.startsWith('http') 
    ? product.image 
    : `https://picsum.photos/300/200?random=${product.id}`;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={productImage} 
          alt={product.title || product.name} 
          className="product-image"
          loading="lazy"
        />
        {product.rating && (
          <div className="product-rating">
            <i className="fas fa-star"></i>
            <span>{product.rating.rate.toFixed(1)}</span>
          </div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{product.title || product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
        
        <div className="product-description">
          {product.description && product.description.length > 100 
            ? `${product.description.substring(0, 100)}...`
            : product.description || 'A great product for your needs.'}
        </div>
        
        <div className="product-controls">
          <div className="quantity-section">
            <label htmlFor={`quantity-${product.id}`}>Quantity:</label>
            <QuantityControl
              id={`quantity-${product.id}`}
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
              min={1}
              max={10}
            />
          </div>
          
          <button 
            onClick={handleAddToCart}
            className={`btn btn-primary add-to-cart-btn ${showAdded ? 'added' : ''}`}
            disabled={showAdded}
          >
            {showAdded ? (
              <>
                <i className="fas fa-check"></i> Added!
              </>
            ) : (
              <>
                <i className="fas fa-cart-plus"></i> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number.isRequired,
    category: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    description: PropTypes.string,
    rating: PropTypes.shape({
      rate: PropTypes.number,
      count: PropTypes.number
    })
  }).isRequired
};

export default ProductCard;
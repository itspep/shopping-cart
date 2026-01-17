import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../../context/CartContext';
import '../../styles/payment-form.css';

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    
    if (!formData.cardHolder.trim()) {
      newErrors.cardHolder = 'Card holder name is required';
    }
    
    if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      newErrors.expiryDate = 'Please use MM/YY format';
    }
    
    if (!formData.cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = 'Please enter a valid CVV (3 or 4 digits)';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // Reset form after successful payment
      setFormData({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: '',
        saveCard: false
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setPaymentSuccess(false);
      }, 5000);
    }, 2000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({ ...prev, cardNumber: formatted }));
  };

  return (
    <div className="payment-form">
      <h2>Payment Details</h2>
      
      {paymentSuccess && (
        <div className="payment-success">
          <i className="fas fa-check-circle"></i>
          <p>Payment Successful! Your order has been placed.</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <div className="input-with-icon">
            <i className="fas fa-credit-card"></i>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              className={errors.cardNumber ? 'error' : ''}
            />
          </div>
          {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="cardHolder">Card Holder Name</label>
          <input
            type="text"
            id="cardHolder"
            name="cardHolder"
            value={formData.cardHolder}
            onChange={handleChange}
            placeholder="John Doe"
            className={errors.cardHolder ? 'error' : ''}
          />
          {errors.cardHolder && <span className="error-text">{errors.cardHolder}</span>}
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              maxLength="5"
              className={errors.expiryDate ? 'error' : ''}
            />
            {errors.expiryDate && <span className="error-text">{errors.expiryDate}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <div className="input-with-icon">
              <input
                type="password"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="123"
                maxLength="4"
                className={errors.cvv ? 'error' : ''}
              />
              <i className="fas fa-lock"></i>
            </div>
            {errors.cvv && <span className="error-text">{errors.cvv}</span>}
          </div>
        </div>
        
        <div className="form-check">
          <input
            type="checkbox"
            id="saveCard"
            name="saveCard"
            checked={formData.saveCard}
            onChange={handleChange}
          />
          <label htmlFor="saveCard">Save card for future purchases</label>
        </div>
        
        <div className="payment-security">
          <i className="fas fa-shield-alt"></i>
          <span>Your payment is secure and encrypted</span>
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary payment-btn"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <i className="fas fa-spinner fa-spin"></i> Processing...
            </>
          ) : (
            <>
              <i className="fas fa-lock"></i> Pay Now
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/ui.css';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-message">
      <div className="error-content">
        <i className="fas fa-exclamation-circle error-icon"></i>
        <p className="error-text">{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="btn btn-secondary">
            <i className="fas fa-redo"></i> Try Again
          </button>
        )}
      </div>
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func
};

export default ErrorMessage;
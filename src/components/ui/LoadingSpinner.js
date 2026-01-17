import React from 'react';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ size = 'medium', className = '' }) => {
  const sizeClass = `spinner-${size}`;
  
  return (
    <div className={`loading-spinner ${sizeClass} ${className}`} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string
};

export default LoadingSpinner;


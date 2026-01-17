import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to ShopEasy</h1>
            <p className="hero-subtitle">Your one-stop destination for amazing products at unbeatable prices</p>
            <Link to="/shop" className="btn btn-primary hero-btn">
              Start Shopping <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose ShopEasy?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shipping-fast"></i>
              </div>
              <h3>Free Shipping</h3>
              <p>Enjoy free shipping on all orders over $50. Fast delivery to your doorstep.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Secure Payment</h3>
              <p>Your payment information is protected with bank-level security.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h3>24/7 Support</h3>
              <p>Our customer support team is always ready to help you.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-undo-alt"></i>
              </div>
              <h3>Easy Returns</h3>
              <p>Not satisfied? Return any item within 30 days for a full refund.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Shopping?</h2>
            <p>Browse our collection of amazing products and find exactly what you need.</p>
            <Link to="/shop" className="btn btn-primary cta-btn">
              Visit Shop <i className="fas fa-store"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

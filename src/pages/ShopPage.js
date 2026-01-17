import React, { useState, useEffect } from 'react';
import ProductCard from '../components/shop/ProductCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import '../styles/shop.css';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      // Using FakeStore API
      const response = await fetch('https://fakestoreapi.com/products');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
      
      // Fallback mock data if API fails
      setProducts(getMockProducts());
    } finally {
      setLoading(false);
    }
  };

  // Mock data fallback
  const getMockProducts = () => {
    return [
      { id: 1, title: 'Laptop', price: 999.99, category: 'electronics', image: '💻', rating: { rate: 4.5 } },
      { id: 2, title: 'Smartphone', price: 699.99, category: 'electronics', image: '📱', rating: { rate: 4.2 } },
      { id: 3, title: 'Headphones', price: 199.99, category: 'electronics', image: '🎧', rating: { rate: 4.7 } },
      { id: 4, title: 'T-Shirt', price: 29.99, category: 'clothing', image: '👕', rating: { rate: 4.0 } },
      { id: 5, title: 'Jeans', price: 59.99, category: 'clothing', image: '👖', rating: { rate: 4.3 } },
      { id: 6, title: 'Sneakers', price: 89.99, category: 'clothing', image: '👟', rating: { rate: 4.6 } },
      { id: 7, title: 'Book', price: 24.99, category: 'books', image: '📚', rating: { rate: 4.8 } },
      { id: 8, title: 'Watch', price: 249.99, category: 'jewelery', image: '⌚', rating: { rate: 4.4 } }
    ];
  };

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    if (filter === 'all') return true;
    return product.category === filter;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating.rate - a.rating.rate;
      default:
        return 0;
    }
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="shop-page">
      <div className="container">
        <div className="shop-header">
          <h1>Our Products</h1>
          <p>Discover amazing products at great prices</p>
        </div>

        <div className="shop-controls">
          <div className="filter-controls">
            <label htmlFor="category-filter">Filter by:</label>
            <select 
              id="category-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            <label htmlFor="sort-by">Sort by:</label>
            <select 
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="products-grid">
          {sortedProducts.map(product => (
            <ProductCard 
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;

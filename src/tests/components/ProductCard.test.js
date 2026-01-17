import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../../components/shop/ProductCard';
import { CartProvider } from '../../context/CartContext';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  category: 'electronics',
  description: 'A test product description',
  image: 'https://via.placeholder.com/300',
  rating: { rate: 4.5, count: 100 }
};

describe('ProductCard', () => {
  const renderWithContext = (component) => {
    return render(
      <CartProvider>
        {component}
      </CartProvider>
    );
  };

  test('renders product information correctly', () => {
    renderWithContext(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('electronics')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  test('quantity controls work correctly', () => {
    renderWithContext(<ProductCard product={mockProduct} />);
    
    const incrementButton = screen.getByLabelText('Increase quantity');
    const decrementButton = screen.getByLabelText('Decrease quantity');
    const quantityInput = screen.getByLabelText('Quantity');
    
    expect(quantityInput.value).toBe('1');
    
    fireEvent.click(incrementButton);
    expect(quantityInput.value).toBe('2');
    
    fireEvent.click(decrementButton);
    expect(quantityInput.value).toBe('1');
  });

  test('add to cart button changes text when clicked', () => {
    renderWithContext(<ProductCard product={mockProduct} />);
    
    const addButton = screen.getByRole('button', { name: /add to cart/i });
    
    fireEvent.click(addButton);
    
    expect(screen.getByText(/added/i)).toBeInTheDocument();
  });
});
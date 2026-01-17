import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ShopPage from '../../pages/ShopPage';
import { CartProvider } from '../../context/CartContext';

// Mock the fetch API
global.fetch = jest.fn();

describe('ShopPage', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders loading spinner initially', () => {
    render(
      <CartProvider>
        <ShopPage />
      </CartProvider>
    );
    
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('renders products after loading', async () => {
    const mockProducts = [
      {
        id: 1,
        title: 'Test Product 1',
        price: 99.99,
        category: 'electronics',
        description: 'Test description 1',
        image: 'https://via.placeholder.com/300',
        rating: { rate: 4.5, count: 100 }
      },
      {
        id: 2,
        title: 'Test Product 2',
        price: 199.99,
        category: 'clothing',
        description: 'Test description 2',
        image: 'https://via.placeholder.com/300',
        rating: { rate: 4.0, count: 50 }
      }
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    render(
      <CartProvider>
        <ShopPage />
      </CartProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });
  });

  test('renders error message on fetch failure', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(
      <CartProvider>
        <ShopPage />
      </CartProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/failed to load products/i)).toBeInTheDocument();
    });
  });
});
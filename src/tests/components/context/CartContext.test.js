import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartContext, CartProvider } from '../../context/CartContext';

const TestComponent = () => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  } = React.useContext(CartContext);

  const testProduct = {
    id: 1,
    name: 'Test Product',
    price: 99.99,
    quantity: 1
  };

  return (
    <div>
      <div data-testid="cart-items-count">{cartItems.length}</div>
      <div data-testid="total-price">{getTotalPrice().toFixed(2)}</div>
      <div data-testid="total-items">{getTotalItems()}</div>
      
      <button onClick={() => addToCart(testProduct)}>Add to Cart</button>
      <button onClick={() => removeFromCart(1)}>Remove from Cart</button>
      <button onClick={() => updateQuantity(1, 5)}>Update Quantity</button>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

describe('CartContext', () => {
  test('provides initial empty cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('0');
    expect(screen.getByTestId('total-price')).toHaveTextContent('0.00');
    expect(screen.getByTestId('total-items')).toHaveTextContent('0');
  });

  test('adds items to cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText('Add to Cart');
    userEvent.click(addButton);

    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('1');
    expect(screen.getByTestId('total-price')).toHaveTextContent('99.99');
    expect(screen.getByTestId('total-items')).toHaveTextContent('1');
  });

  test('updates quantity of items in cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText('Add to Cart');
    userEvent.click(addButton);

    const updateButton = screen.getByText('Update Quantity');
    userEvent.click(updateButton);

    expect(screen.getByTestId('total-price')).toHaveTextContent('499.95'); // 99.99 * 5
    expect(screen.getByTestId('total-items')).toHaveTextContent('5');
  });

  test('removes items from cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText('Add to Cart');
    userEvent.click(addButton);

    const removeButton = screen.getByText('Remove from Cart');
    userEvent.click(removeButton);

    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('0');
    expect(screen.getByTestId('total-price')).toHaveTextContent('0.00');
  });

  test('clears entire cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText('Add to Cart');
    userEvent.click(addButton);
    userEvent.click(addButton);

    const clearButton = screen.getByText('Clear Cart');
    userEvent.click(clearButton);

    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('0');
    expect(screen.getByTestId('total-price')).toHaveTextContent('0.00');
  });
});
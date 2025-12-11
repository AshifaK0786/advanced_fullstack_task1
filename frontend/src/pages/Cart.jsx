import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data.cart);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/api/cart/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        fetchCart();
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleClearCart = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/api/cart/clear', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchCart();
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading cart...</div>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your Cart is Empty</h2>
        <Link to="/" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      <div className="cart-items">
        {cart.items.map((item) => (
          <div key={item.product._id} className="cart-item">
            <div className="item-info">
              <h3>{item.product.name}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Subtotal: ${item.price * item.quantity}</p>
            </div>
            <button className="btn btn-danger" onClick={() => handleRemoveItem(item.product._id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Total: ${cart.totalPrice}</h2>
        <div className="cart-actions">
          <button className="btn btn-primary">Checkout</button>
          <button className="btn btn-secondary" onClick={handleClearCart}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

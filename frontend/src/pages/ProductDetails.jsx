import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await response.json();
        setProduct(data.product);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to add items to cart');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: id, quantity }),
      });

      if (response.ok) {
        alert('Product added to cart!');
      } else {
        alert('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading product...</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="product-details">
      <div className="product-image">
        <img src={product.image || 'https://via.placeholder.com/400'} alt={product.name} />
      </div>
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="category">Category: {product.category}</p>
        <p className="description">{product.description}</p>
        <p className="price">${product.price}</p>
        <p className="stock">Stock: {product.stock}</p>
        <div className="quantity-selector">
          <label>Quantity:</label>
          <input
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;

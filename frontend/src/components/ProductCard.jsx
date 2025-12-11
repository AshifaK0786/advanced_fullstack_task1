import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image || 'https://via.placeholder.com/200'} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="description">{product.description.substring(0, 50)}...</p>
      <p className="price">${product.price}</p>
      <p className="stock">Stock: {product.stock}</p>
      <Link to={`/product/${product._id}`} className="btn btn-primary">
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;

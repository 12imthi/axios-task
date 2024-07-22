import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="card">
      {/* <img src={product.product_imagg} className="card-img-top" alt={product.product_name} /> */}
      <div className="card-body">
        <h5 className="card-title">{product.product_name}</h5>
        <p className="card-text">{product.product_description}</p>
        <p className="card-text">{product.product_price}</p>
      </div>
    </div>
  );
};

export default ProductCard;

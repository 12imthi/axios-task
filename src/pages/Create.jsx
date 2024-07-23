import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Create() {
  const [formData, setFormData] = useState({
    product_name: '',
    product_description: '',
    product_price: '',
    product_image: '',
  });

  console.log("formData", formData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post('https://669ff410b132e2c136ffaf54.mockapi.io/api/v1/products', formData);
      navigate('/product'); // Navigate to the product list page after successful creation
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Create Product</h1>
      {error && <div className="alert alert-danger">Error: {error.message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="product_name">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="product_name"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="product_description">Product Description</label>
          <textarea
            className="form-control"
            id="product_description"
            name="product_description"
            value={formData.product_description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="product_price">Product Price</label>
          <input
            type="number"
            className="form-control"
            id="product_price"
            name="product_price"
            value={formData.product_price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="product_image">Product Image URL</label>
          <input
            type="text"
            className="form-control"
            id="product_image"
            name="product_image"
            value={formData.product_image}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
}

export default Create;

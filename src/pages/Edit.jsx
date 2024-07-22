import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Edit() {
  const { id } = useParams(); // Get the route parameter
  const [editData, setEditData] = useState({
    product_name: '',
    product_description: '',
    product_price: '',
    product_image: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current data of the product
  

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://669b726e276e45187d3581cf.mockapi.io/api/products/${id}`);
      setEditData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://669b726e276e45187d3581cf.mockapi.io/api/products/${id}`, editData);
      navigate('/product'); // Redirect to products page after successful edit
    } catch (error) {
      console.error('Error updating product:', error.response ? error.response.data : error.message);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="container">
      <h1 className="page-title">Edit Product</h1>
      <form>
        <div className="form-group">
          <label htmlFor="product_name">Product Name</label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            value={editData.product_name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="product_description">Description</label>
          <textarea
            id="product_description"
            name="product_description"
            value={editData.product_description}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="product_price">Price</label>
          <input
            type="number"
            id="product_price"
            name="product_price"
            value={editData.product_price}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="product_image">Image URL</label>
          <input
            type="text"
            id="product_image"
            name="product_image"
            value={editData.product_image}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Edit;

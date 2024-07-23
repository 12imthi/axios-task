import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Products = ({ setId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://669ff410b132e2c136ffaf54.mockapi.io/api/v1/products');
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    console.log('Edit product with ID:', id);
    setId(id);
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const url = `https://669ff410b132e2c136ffaf54.mockapi.io/api/v1/products/${id}`;
    console.log('Attempting to delete:', url);
    try {
      await axios.delete(url);
      fetchData(); // Re-fetch the data after successful deletion
    } catch (error) {
      console.error('Error deleting product:', error.response ? error.response.data : error.message);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="container">
      <h1 className="page-title">Products</h1>
      <table className="table table-striped product-table">
        <thead>
          <tr>
            <th>Num</th>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{product.id}</td>
              {/* <td>{product.product_id}</td> */}
              <td>{product.product_name}</td>
              <td>{product.product_description}</td>
              <td>${product.product_price}</td>
              <td>
                <button type="button" className="btn btn-warning" style={{marginRight: '10px'}} onClick={() => handleEdit(product.id)}>
                  Edit
                </button>
                <button type="button" className="btn btn-danger" onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="btn btn-danger m-5"
        onClick={() => {
          navigate("/create");
        }}
      >
        Create
      </button>
    </div>
  );
};

export default Products;

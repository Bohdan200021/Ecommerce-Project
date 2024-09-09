import React, { useState, useEffect } from 'react';
import Footer from '../../components/footer/Footer'; // Adjust the path as needed

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    published: false,
    createdAt: '',
  });

  const [products, setProducts] = useState([]);

  // Fetch all products on page load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.price || !formData.description) {
      alert('Please fill in all required fields.');
      return;
    }

    const productData = {
      ...formData,
      createdAt: new Date().toISOString(),
    };

    // Send data to API
    try {
      const response = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        const newProduct = await response.json();
        setProducts([...products, newProduct]);
        alert('Product added successfully!');

        setFormData({
          title: '',
          price: '',
          description: '',
          published: false,
          createdAt: '',
        });
      } else {
        alert('Something went wrong!');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this product?'
    );
    if (!confirmed) return;

    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter((product) => product.id !== id));
        alert('Product deleted successfully!');
      } else {
        alert('Error deleting product.');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ paddingTop: '45px' }}
    >
      <div className="container flex-grow-1 mt-5 mb-5">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="published"
              name="published"
              checked={formData.published}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="published">
              Published
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>

        <hr />

        <h3>Product List</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Description</th>
              <th>Published</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.price} USD</td>
                <td>{product.description}</td>
                <td>{product.published ? 'Yes' : 'No'}</td>
                <td>{new Date(product.createdAt).toLocaleString()}</td>
                <td>
                  <button className="btn btn-secondary btn-sm me-2">
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default AddProduct;

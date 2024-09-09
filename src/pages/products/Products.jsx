import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { NavLink } from 'react-router-dom';
import Footer from '../../components/footer/Footer';

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [displayCount, setDisplayCount] = useState(8);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let componentMounted = true;

    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (componentMounted) {
          const products = await response.json();
          setData(products.products);
          const filteredProducts =
            currentCategory === 'all'
              ? products.products.slice(0, displayCount)
              : products.products
                  .filter((product) => product.category === currentCategory)
                  .slice(0, displayCount);
          setFilter(filteredProducts);
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setLoading(false);
      }
    };

    getProducts();

    return () => {
      componentMounted = false;
    };
  }, [displayCount, currentCategory]);

  const Loading = () => (
    <>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div>
    </>
  );

  const filterProduct = (cat) => {
    setCurrentCategory(cat);
    const updatedList =
      cat === 'all'
        ? data.slice(0, displayCount)
        : data.filter((x) => x.category === cat).slice(0, displayCount);
    setFilter(updatedList);
  };

  const loadProducts = (count) => {
    setDisplayCount(count);
    const updatedList =
      currentCategory === 'all'
        ? data.slice(0, count)
        : data.filter((x) => x.category === currentCategory).slice(0, count);
    setFilter(updatedList);
  };

  const getButtonClass = (type, value) => {
    if (type === 'filter') {
      return currentCategory === value
        ? 'btn btn-outline-dark active me-2'
        : 'btn btn-outline-dark me-2';
    }
    if (type === 'pagination') {
      return displayCount === value
        ? 'btn btn-outline-dark active me-2'
        : 'btn btn-outline-dark me-2';
    }
    return 'btn btn-outline-dark me-2';
  };

  const ShowProducts = () => (
    <>
      {filter.map((product) => (
        <div className="col-md-3 mb-4" key={product.id}>
          <div className="card h-100 text-center p-4">
            <img
              src={product.thumbnail}
              className="card-img-top"
              alt={product.title}
              height="250px"
            />
            <div className="card-body">
              <h5 className="card-title mb-0">
                {product.title.substring(0, 12)}...
              </h5>
              <p className="card-text lead fw-bold">$ {product.price}</p>
              <NavLink
                to={`/products/${product.id}`}
                className="btn btn-outline-dark me-2"
              >
                Buy Now
              </NavLink>
            </div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="d-flex flex-column min-vh-100">
      <div
        className="section flex-grow-1"
        style={{ paddingTop: '80px', paddingBottom: '20px' }}
      >
        <div className="container mt-2">
          <div className="row">
            <div className="col-12 mb-5">
              <h1 className="display-6 fw-bolder text-center">
                Latest Products
              </h1>
              <hr />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 mb-5">
              <div className="buttons d-flex justify-content-center">
                <button
                  className={getButtonClass('filter', 'all')}
                  onClick={() => filterProduct('all')}
                >
                  All
                </button>
                <button
                  className={getButtonClass('filter', 'beauty')}
                  onClick={() => filterProduct('beauty')}
                >
                  Beauty
                </button>
                <button
                  className={getButtonClass('filter', 'fragrances')}
                  onClick={() => filterProduct('fragrances')}
                >
                  Fragrances
                </button>
                <button
                  className={getButtonClass('filter', 'groceries')}
                  onClick={() => filterProduct('groceries')}
                >
                  Groceries
                </button>
                <button
                  className={getButtonClass('filter', 'furniture')}
                  onClick={() => filterProduct('furniture')}
                >
                  Furniture
                </button>
              </div>
            </div>
            {loading ? <Loading /> : <ShowProducts />}
          </div>
          <div className="row justify-content-center mb-5">
            <div className="col-12 text-center">
              <div className="pagination-buttons">
                <button
                  className={getButtonClass('pagination', 8)}
                  onClick={() => loadProducts(8)}
                >
                  8 Products
                </button>
                <button
                  className={getButtonClass('pagination', 16)}
                  onClick={() => loadProducts(16)}
                >
                  16 Products
                </button>
                <button
                  className={getButtonClass('pagination', data.length)}
                  onClick={() => loadProducts(data.length)}
                >
                  All Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.scss';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Contact from './pages/contact/Contact';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Reset from './pages/auth/Reset';
import Products from './pages/products/Products';
import Product from './pages/Product/Product';
import AddProduct from './pages/AddProduct/AddProduct';

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/products/:id" element={<Product />} />
          <Route exact path="/add-product" element={<AddProduct />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

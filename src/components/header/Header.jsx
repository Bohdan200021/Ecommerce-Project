import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from '../../redux/slice/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/hiddenLink';
import './Header.scss'; // Import the CSS file for custom styles

const Header = () => {
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success('Logout successfully.');
        navigate('/');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName == null) {
          const u1 = user.email.substring(0, user.email.indexOf('@'));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);

          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
          dispatch(REMOVE_ACTIVE_USER());
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setDisplayName('');
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm py-3">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4" to="/">
          DREAMEXT
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/products"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/about"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/contact"
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
          <div className="buttons">
            <ShowOnLogout>
              <NavLink to="/login" className="btn btn-outline-dark">
                <i className="fa fa-sign-in me-1"></i>Login
              </NavLink>
            </ShowOnLogout>
            <ShowOnLogin>
              <NavLink
                to="#home"
                className="btn btn-outline-dark m-2 text-info bg-success"
              >
                <i className="fa-solid fa-circle-user"></i>
                Hi, Admin
              </NavLink>
            </ShowOnLogin>
            <ShowOnLogin>
              <NavLink to="/add-product" className="btn btn-outline-dark">
                Add Product
              </NavLink>
            </ShowOnLogin>
            <ShowOnLogin>
              <NavLink
                to="/"
                onClick={logoutUser}
                className="btn btn-outline-dark ms-2"
              >
                <i className="fas fa-sign-out"></i>Logout
              </NavLink>
            </ShowOnLogin>
          </div>
          <NavLink to="/cart" className="btn btn-outline-dark ms-2">
            <i className="fa fa-shopping-cart me-1"></i>Cart
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;

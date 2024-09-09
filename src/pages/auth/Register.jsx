import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import Loader from '../../components/loader/Loader';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCpassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      toast.error('Password do not match.');
    }
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        setIsLoading(false);
        toast.success('Registration Successful...');
        navigate('/login');
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      <ToastContainer />
      {isLoading && <Loader />}
      <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <div
          className="card p-4 shadow"
          style={{ maxWidth: '400px', width: '100%' }}
        >
          <h3 className="text-center mb-4">Register</h3>
          <form onSubmit={registerUser}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Enter your email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Create password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                className="form-control mt-3"
                id="password"
                placeholder="Confirm password"
                required
                value={cPassword}
                onChange={(e) => setCpassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
          <div className="text-center mt-3">
            <p className="small">
              Already an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

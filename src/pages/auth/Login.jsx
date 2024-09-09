import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import Loader from '../../components/loader/Loader';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoading(false);
        toast.success('Login Succesfull');
        navigate('/');
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        toast.success('Login Successfully');
        navigate('/');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <div
          className="card p-4 shadow"
          style={{ maxWidth: '400px', width: '100%' }}
        >
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={loginUser}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
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
                Password
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
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <p>
                <Link to="/reset">Reset Password</Link>
              </p>
            </div>
          </form>
          <button
            type="submit"
            className="btn btn-danger mt-3"
            onClick={signInWithGoogle}
          >
            <i class="fa-brands fa-google me-2"></i>
            Login With Google
          </button>
          <div className="text-center mt-3">
            <p className="small">
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

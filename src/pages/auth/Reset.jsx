import React from 'react';
import { Link } from 'react-router-dom';

const Reset = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card p-4 shadow"
        style={{ maxWidth: '400px', width: '100%' }}
      >
        <h3 className="text-center mb-4">Reset Password</h3>
        <form>
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
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reset;

import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center"
      style={{ height: '100vh' }}
    >
      <h1 className="display-1 fw-bold text-primary">404</h1>

      <h2 className="mb-3">Page Not Found</h2>

      <p className="text-muted text-center mb-3">
        The page you are looking for does not exist or has been moved.
      </p>

      <Link to="/" className="btn btn-primary px-4 py-2">
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;
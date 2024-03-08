/** @format */

// 404.js

import React from "react";
import { Link } from "react-router-dom";
import "../posts.css"; // Import the CSS file

const NotFound = () => {
  return (
    <div className="error-container">
      <h1 className="error-heading">404 - Page Not Found</h1>
      <p className="error-message">
        The page you are looking for does not exist.
      </p>
      <Link to="/" className="error-link">
        Go to Home Page
      </Link>
    </div>
  );
};

export default NotFound;

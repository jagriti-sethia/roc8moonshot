import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from "../contexts/usercontext"; // Adjust the import path as necessary
import './Login.css'; // Import the CSS file

const Login = () => {
  const { loginUser, loading, error, isAuthenticated } = useUserContext();
  const Initialvalue = {
    email: "",
    password: ""
  };

  const [formData, setformData] = useState(Initialvalue);
  const navigate = useNavigate();

  // Check if user is authenticated and redirect
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/home"); // Redirect to the homepage
    }
  }, [isAuthenticated, navigate]);
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginUser(formData);
    setformData(Initialvalue);
  };

  return (
    <div className="container">
      <h2 className="header">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label className="label">
            Email:
          </label>
          <input
            type="email"
            value={formData?.email}
            name="email"
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">
            Password:
          </label>
          <input
            type="password"
            value={formData?.password}
            name="password"
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <button type="submit" className="button">Login</button>
      </form>
      <p className="link">
        Don’t have an account? <Link to="/" className="link">Register</Link>
      </p>
    </div>
  );
};

export default Login;

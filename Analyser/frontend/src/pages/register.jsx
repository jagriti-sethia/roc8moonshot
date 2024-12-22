import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Register.css'; // Import the CSS file
import { useUserContext } from "../contexts/usercontext"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { registerUser, loading, error, isAuthenticated } = useUserContext();
  const Initialvalue = {
    name: "",
    email: "",
    password: ""
  };
  const navigate = useNavigate();
  const [formData, setformData] = useState(Initialvalue);

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const Data = {
      "username": formData?.name,
      "email": formData?.email,
      "password": formData?.password
    }
    const result = await registerUser(Data);
    if (result) {

      navigate("/login"); // Redirect to login page after successful registration
    }

    setformData(Initialvalue);
  };
  // Check if user is authenticated and redirect
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/home"); // Redirect to the homepage or dashboard
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container">
      <h2 className="header">Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label className="label">Name:</label>
          <input
            type="text"
            value={formData?.name}
            name="name"
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Email:</label>
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
          <label className="label">Password:</label>
          <input
            type="password"
            value={formData?.password}
            name="password"
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <button type="submit" className="button">Register</button>
      </form>
      <p className="link">
        Already have an account? <Link to="/login" className="link">Login</Link>
      </p>
    </div>
  );
};

export default Register;

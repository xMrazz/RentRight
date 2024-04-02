import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/design.css';

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/login', credentials);
      localStorage.setItem('name', response.data.user.name); // Save the user's name
      localStorage.setItem('role', response.data.user.role); // Save the user's role

      if (response.data.user.role === 'Manager') {
        navigate('/manager-dashboard');
      } else if (response.data.user.role === 'Tenant') {
        navigate('/tenant-dashboard');
      } else {
        setError("Login failed: Unexpected user role.");
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Login failed');
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      <header className="navbar">
        <a href="/" className="RentRightBtn">RentRight</a>
        <button onClick={handleGoBack} className="goBackBtn">Go Back</button>
      </header>
      <div className="container">
        <h2 className="header">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email:</label>
              <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Password:</label>
              <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
            </div>
            <button className="button" type="submit">Login</button>
          </form>
        </div>
      </div>
      <footer className="footer">
        <p>© 2024 RentRight by PixelPerfect</p>
      </footer>
    </div>
  );
}

export default Login;
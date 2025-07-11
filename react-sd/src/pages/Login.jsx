import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import backgroundImage from '../assets/blur.jpg';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8084/api/users/login', {
        email,
        password,
      });

      console.log('Login Success:', response.data);
      localStorage.setItem('userData', JSON.stringify(response.data));
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('❌ Invalid email or password');
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="wrapper">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>

          <div className="input-box">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button className="btn" type="submit">Login</button>

          <div className="register-link">
            <p>
              Don't have an account?{' '}
              <span
                className="login-link"
                onClick={() => navigate('/register')}
              >
                Register
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
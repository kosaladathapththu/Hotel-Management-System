import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css';
import bgImage from '../assets/background.jpg'; // ✅ Import your background image

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8083/admin-service/login', {
        email,
        password,
      });

      console.log('✅ Admin Login:', res.data);
      localStorage.setItem('adminData', JSON.stringify(res.data));

      navigate('/admin');
    } catch (err) {
      console.error(err);
      setError('❌ Invalid admin credentials');
    }
  };

  return (
    <div
      className="bg-wrapper"
      style={{
        backgroundImage: `url(${bgImage})`, // 🌄 Set background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div className="login-box">
        <h2>🛡️ Admin Login</h2>
        <form onSubmit={handleAdminLogin}>
          <label htmlFor="email">📧 Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">🔒 Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <div className="alert alert-danger mt-2">{error}</div>}

          <button type="submit">🚀 Login</button>
        </form>

        <div className="text-center mt-3">
          <button className="btn btn-outline-light" onClick={() => navigate('/')}>
            🔙 Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;

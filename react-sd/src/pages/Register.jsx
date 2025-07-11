import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Register.css'
import backgroundImage from '../assets/blur.jpg'

function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [nic, setNic] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('❌ Passwords do not match')
      return
    }

    try {
      const response = await axios.post('http://localhost:8084/api/users/register', {
        fullName: name, // ✅ Send correct key to backend
        email,
        phone,
        nic,
        password,
      })

      console.log('✅ Registered:', response.data)
      setMessage('🎉 Registration successful! Please login.')
      setError('')
      setTimeout(() => navigate('/Login'), 2000)
    } catch (err) {
      console.error(err)
      setError('❌ Registration failed: ' + (err.response?.data || 'Server error'))
    }
  }

  return (
    <div
      className="register-container"
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
        <form onSubmit={handleRegister}>
          <h1>Register</h1>

          <div className="input-box">
            <label className="form-label">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <label className="form-label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <label className="form-label">Phone</label>
            <input
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <label className="form-label">NIC</label>
            <input
              type="text"
              placeholder="Enter your NIC"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              placeholder="Re-type your Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {message && <div className="success-message">{message}</div>}

          <button type="submit" className="btn">Register</button>

          <div className="register-link">
            <p>
              Already have an account?{' '}
              <span className="login-link" onClick={() => navigate('/login')}>
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register

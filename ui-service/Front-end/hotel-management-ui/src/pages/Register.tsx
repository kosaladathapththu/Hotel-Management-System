// 📁 src/pages/Register.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('❌ Passwords do not match')
      return
    }

    try {
      const response = await axios.post('http://localhost:8084/api/users/register', {
        name,
        email,
        phone,
        nic,
        password,
      })

      console.log('✅ Registered:', response.data)
      setMessage('🎉 Registration successful! Please login.')
      setError('')
      setTimeout(() => navigate('/'), 2000)
    } catch (err: any) {
      console.error(err)
      setError('❌ Registration failed: ' + err.response?.data)
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '450px' }}>
      <h2 className="text-center mb-4">📝 Register</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Phone:</label>
          <input
            type="tel"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>NIC:</label>
          <input
            type="text"
            className="form-control"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Confirm Password:</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <button type="submit" className="btn btn-success w-100">
          Register 🚀
        </button>
      </form>
    </div>
  )
}

export default Register

// 📁 src/pages/Register.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8084/Hotel-app/api/users/register', {
        name,
        email,
        password,
      })
      console.log('✅ Registered:', response.data)
      setMessage('🎉 Registration successful! Please login.')
      setTimeout(() => navigate('/'), 2000)
    } catch (err: any) {
      console.error(err)
      setMessage('❌ Registration failed: ' + err.response?.data)
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="text-center">📝 Register</h2>
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
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Register
        </button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  )
}

export default Register
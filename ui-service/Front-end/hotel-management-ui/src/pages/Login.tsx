import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8084/api/users/login', {
        email,
        password,
      })

      console.log('Login Success:', response.data)
      localStorage.setItem('userData', JSON.stringify(response.data))
      navigate('/dashboard')
    } catch (err: any) {
      console.error(err)
      setError('Invalid email or password')
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="text-center">🔐 User Login</h2>
      <form onSubmit={handleLogin}>
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

        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>

      <p className="mt-3 text-center">
        Not registered?{' '}
        <span
          style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => navigate('/register')}
        >
          Register here
        </span>
      </p>
    </div>

  )
}

export default Login
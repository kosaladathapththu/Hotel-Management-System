// 📁 src/pages/AdminLogin.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8083/Hotel-app/api/admins/login', {
        email,
        password
      })

      console.log('✅ Admin Login:', res.data)
      localStorage.setItem('adminData', JSON.stringify(res.data))

      navigate('/admin-dashboard') // 👈 Go to Admin Dashboard
    } catch (err: any) {
      console.error(err)
      setError('❌ Invalid admin credentials')
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="text-center">🛡️ Admin Login</h2>
      <form onSubmit={handleAdminLogin}>
        <div className="mb-3">
          <label>📧 Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>🔒 Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button className="btn btn-dark w-100" type="submit">
          🛡️ Login as Admin
        </button>
      </form>

      <div className="text-center mt-3">
        <button className="btn btn-outline-secondary" onClick={() => navigate('/')}>
          🔙 Back to Home
        </button>
      </div>
    </div>
  )
}

export default AdminLogin

import { useNavigate } from 'react-router-dom'

function MainDashboard() {
  const navigate = useNavigate()

  return (
    <div className="container mt-5 text-center">
      <h1>🏨 Welcome to GrandLine Hotel</h1>
      <p className="lead">🌴 A peaceful place to stay and relax! 🛏️</p>

      <div className="row justify-content-center mt-4">
        <div className="col-md-4 mb-3">
          <button className="btn btn-primary w-100" onClick={() => navigate('/login')}>
            🔐 Login as User
          </button>
        </div>
        <div className="col-md-4 mb-3">
          <button className="btn btn-success w-100" onClick={() => navigate('/register')}>
            📝 Register as User
          </button>
        </div>
        <div className="col-md-4 mb-3">
          <button className="btn btn-dark w-100" onClick={() => navigate('/admin')}>
            🛡️ Admin Login
          </button>
        </div>
      </div>

      <hr className="my-4" />

      <h3>✨ Hotel Features</h3>
      <ul className="list-unstyled mt-3">
        <li>🛏️ Comfortable & Clean Rooms</li>
        <li>🌐 Free Wi-Fi in all areas</li>
        <li>🍽️ On-site Restaurant</li>
        <li>🧼 24/7 Room Service</li>
        <li>🚗 Free Parking for Guests</li>
      </ul>

      <footer className="mt-5 text-muted">
        <small>© 2025 GrandLine Hotel. All rights reserved.</small>
      </footer>
    </div>
  )
}

export default MainDashboard

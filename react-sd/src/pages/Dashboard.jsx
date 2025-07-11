// 📁 src/pages/Dashboard.jsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css' // ✅ your latest CSS


function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [rooms, setRooms] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const storedData = localStorage.getItem('userData')
    if (storedData) {
      const parsed = JSON.parse(storedData)
      setUser(parsed)

      fetch('http://localhost:8086/api/rooms/available')
        .then((res) => res.json())
        .then((data) => setRooms(data))
        .catch((err) => console.error('Failed to fetch available rooms', err))
    } else {
      navigate('/')
    }
  }, [navigate])

  const handleBookRedirect = (room) => {
    navigate('/booking', {
      state: {
        room,
        user,
      },
    })
  }

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="dashboard-container">
      <div className="header">
        <h2 className="username">🏠 Welcome, {user?.name}!</h2>
        <button
          className="edit-profile-btn"
          onClick={() => navigate('/editprofile')}
        >
          ✏️ Edit Profile
        </button>
      </div>

      <h3 className="section-title">🛏 Available Rooms</h3>

      <div className="search-bar-container">
        <input
          className="search-input"
          type="text"
          placeholder="🔍 Search room by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="room-list">
        {filteredRooms.length === 0 ? (
          <p className="text-muted">🚫 No rooms available or matched.</p>
        ) : (
          filteredRooms.map((room, idx) => (
            <div className="room-card" key={idx}>
              <h4>🏷 {room.name}</h4>
              <p><strong>🛏 Type:</strong> {room.type}</p>
              <p><strong>📃 Description:</strong> {room.description}</p>
              <p><strong>💰 Price:</strong> Rs. {room.pricePerDay}</p>
              <p><strong>👥 Capacity:</strong> {room.capacity}</p>
              <button
                className="book-btn"
                onClick={() => handleBookRedirect(room)}
              >
                ✅ Book Now
              </button>
            </div>
          ))
        )}
      </div>

      <div className="edit-btn-container">
        <button
          className="edit-profile-btn"
          onClick={() => {
            localStorage.clear()
            navigate('/')
          }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  )
}

export default Dashboard

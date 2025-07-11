import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)
  const [rooms, setRooms] = useState<any[]>([])

  useEffect(() => {
    const storedData = localStorage.getItem('userData')
    if (storedData) {
      const parsed = JSON.parse(storedData)
      setUser(parsed)  // <-- Changed here, directly set parsed (not parsed.user)

      fetch('http://localhost:8086/api/rooms/available')
        .then(res => res.json())
        .then(data => setRooms(data))
        .catch(err => console.error('Failed to fetch available rooms', err))
    } else {
      navigate('/') // 👈 Redirect to login if not logged in
    }
  }, [navigate])

  const handleBookRedirect = (room: any) => {
    navigate('/booking', {
      state: {
        room,
        user,  // user will be correctly passed now
      }
    })
  }

  return (
    <div className="container mt-5">
      <h2>🏠 Welcome, {user?.name}!</h2>

      <h4 className="mt-4">🛏 Available Rooms:</h4>
      <div className="row">
        {rooms.length === 0 ? (
          <p>🚫 No rooms available.</p>
        ) : (
          rooms.map((room, idx) => (
            <div className="col-md-4 mb-3" key={idx}>
              <div className="card p-3 shadow-sm">
                <h5>🏷 Room Name: {room.name}</h5>
                <p>🛏 Type: {room.type}</p>
                <p>📃 Description: {room.description}</p>
                <p>💰 Price: Rs. {room.pricePerDay}</p>
                <p>👥 Capacity: {room.capacity}</p>
                <button
                  className="btn btn-success"
                  onClick={() => handleBookRedirect(room)}
                >
                  ✅ Book Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <hr />
      <button
        className="btn btn-outline-danger mt-3"
        onClick={() => {
          localStorage.clear()
          navigate('/')
        }}
      >
        🚪 Logout
      </button>
    </div>
  )
}

export default Dashboard

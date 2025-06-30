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
      setUser(parsed.user)
      setRooms(parsed.availableRooms)
    } else {
      navigate('/') // 👈 redirect to login if not logged in
    }
  }, [navigate])

  const handleBook = async (roomId: number) => {
    const response = await fetch('http://localhost:8084/Hotel-app/api/users/book-room', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id,
        roomId: roomId,
        bookingDate: new Date().toISOString().split('T')[0], // 🗓 today's date
      }),
    })

    const text = await response.text()
    alert(text)
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
                <h5>🏷 Room Type: {room.roomType}</h5>
                <p>📍 Room No: {room.roomNumber}</p>
                <p>💰 Price: Rs. {room.price}</p>
                <p>🟢 Status: {room.status}</p>
                <button
                  className="btn btn-success"
                  disabled={room.status !== 'Available'}
                  onClick={() => handleBook(room.id)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <hr />
      <button className="btn btn-outline-danger mt-3" onClick={() => {
        localStorage.clear()
        navigate('/')
      }}>
        🚪 Logout
      </button>
    </div>
  )
}

export default Dashboard

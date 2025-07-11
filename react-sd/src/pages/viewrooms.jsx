import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './ViewRooms.css'

function ViewRooms() {
  const [rooms, setRooms] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    try {
      const res = await axios.get('http://localhost:8086/api/rooms/available')
      setRooms(res.data)
    } catch (error) {
      console.error('Failed to fetch rooms:', error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('❗Are you sure you want to delete this room?')) {
      try {
        await axios.delete(`http://localhost:8086/api/rooms/admin/delete/${id}`)
        fetchRooms()
      } catch (err) {
        console.error('Error deleting room:', err)
      }
    }
  }

  return (
    <div className="container view-rooms-page">
      <h2 className="text-center my-4">🛏️ All Rooms</h2>

      <div className="text-end mb-3">
        <button className="btn btn-success" onClick={() => navigate('/add-room')}>➕ Add New Room</button>
      </div>

      <div className="room-table">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
              <th>Price</th>
              <th>Capacity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, idx) => (
              <tr key={room.id}>
                <td>{idx + 1}</td>
                <td>{room.name}</td>
                <td>{room.type}</td>
                <td>{room.description}</td>
                <td>Rs. {room.pricePerDay}</td>
                <td>{room.capacity}</td>
                <td>{room.status}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => navigate(`/update-room/${room.id}`)}
                  >✏️</button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(room.id)}
                  >🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewRooms

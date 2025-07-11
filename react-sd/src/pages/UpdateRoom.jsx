import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function UpdateRoom() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    pricePerDay: '',
    capacity: '',
    status: 'Available'
  })

  useEffect(() => {
    fetchRoomDetails()
  }, [])

  const fetchRoomDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:8086/api/rooms/${id}`)
      setFormData(res.data)
    } catch (err) {
      console.error('Error fetching room:', err)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:8086/api/rooms/admin/update/${id}`, formData)
      navigate('/viewrooms')
    } catch (err) {
      console.error('Error updating room:', err)
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">✏️ Update Room</h2>

      <form onSubmit={handleUpdate} className="shadow p-4 rounded">
        <div className="row g-3">
          <div className="col-md-6">
            <input name="name" placeholder="Room Name" className="form-control" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <input name="type" placeholder="Room Type" className="form-control" value={formData.type} onChange={handleChange} required />
          </div>
          <div className="col-md-12">
            <textarea name="description" placeholder="Description" className="form-control" value={formData.description} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <input name="pricePerDay" type="number" placeholder="Price Per Day" className="form-control" value={formData.pricePerDay} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <input name="capacity" type="number" placeholder="Capacity" className="form-control" value={formData.capacity} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <select name="status" className="form-control" value={formData.status} onChange={handleChange}>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
          <div className="col-md-12 text-center">
            <button type="submit" className="btn btn-warning px-5 fw-bold">Update Room</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UpdateRoom

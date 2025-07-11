import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function AddRoom() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    pricePerDay: '',
    capacity: '',
    status: 'Available'
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8086/api/rooms/admin', formData)
      navigate('/viewrooms')
    } catch (err) {
      console.error('Error adding room:', err)
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">➕ Add New Room</h2>

      <form onSubmit={handleSubmit} className="shadow p-4 rounded">
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
            <button type="submit" className="btn btn-success px-5 fw-bold">Save Room</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddRoom

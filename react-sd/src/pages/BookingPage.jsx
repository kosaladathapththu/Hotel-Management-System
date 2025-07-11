// 📁 src/pages/BookingPage.jsx
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './BookingPage.css'
import bookingImage from './booking.jpg' // 🖼️ background image

function BookingPage() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { room, user } = state || {}

  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [totalAmount, setTotalAmount] = useState(null)
  const [message, setMessage] = useState('')

  // ❌ If no data passed
  if (!room || !user) {
    return <p className="text-danger">⚠️ Room or User data missing</p>
  }

  // 🧮 Calculate total cost
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const start = new Date(checkInDate)
      const end = new Date(checkOutDate)
      const diffTime = end.getTime() - start.getTime()
      const days = diffTime / (1000 * 60 * 60 * 24)

      if (days <= 0) {
        setTotalAmount(null)
        setMessage('⚠️ Check-out must be after check-in')
      } else {
        setMessage('')
        setTotalAmount(days * room.pricePerDay)
      }
    } else {
      setTotalAmount(null)
    }
  }, [checkInDate, checkOutDate, room.pricePerDay])

  // ✅ Booking Submit
  const handleBookingConfirm = async (e) => {
    e.preventDefault()

    if (!checkInDate || !checkOutDate) {
      setMessage('❗ Please select both dates')
      return
    }

    const bookingData = {
      userId: user.id,
      roomId: room.id,
      checkInDate,
      checkOutDate,
      status: 'CONFIRMED',
      totalAmount: totalAmount ?? room.pricePerDay
    }

    try {
      const res = await fetch('http://localhost:8082/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      })

      if (!res.ok) throw new Error(await res.text())

      const result = await res.json()
      alert(`✅ Booking Confirmed!\nBooking ID: ${result.id}`)
      navigate('/dashboard')
    } catch (err) {
      console.error('❌ Booking failed', err)
      setMessage('⚠️ ' + err.message)
    }
  }

  return (
    <div
      className="booking-container"
      style={{
        backgroundImage: `url(${bookingImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh'
      }}
    >
      <div className="booking-form-box">
        <h2>🛏 Book Room: {room.name}</h2>
        <p>👤 Booking for: {user.name}</p>
        <p>💰 Price Per Day: Rs. {room.pricePerDay}</p>

        <form onSubmit={handleBookingConfirm}>
          <label>📅 Check-in Date</label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />

          <label>📅 Check-out Date</label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />

          <label>💸 Total Amount</label>
          <input
            type="text"
            value={totalAmount !== null ? `Rs. ${totalAmount.toFixed(2)}` : ''}
            readOnly
          />

          {message && <div className="alert-message">{message}</div>}

          <button type="submit">✅ Confirm Booking</button>
        </form>
      </div>
    </div>
  )
}

export default BookingPage

// 📁 src/pages/BookingPage.tsx
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function BookingPage() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { room, user } = state || {}

  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [totalAmount, setTotalAmount] = useState<number | null>(null)
  const [message, setMessage] = useState('')

  if (!room || !user) {
    return <p className="text-danger">⚠️ Room or User data missing</p>
  }

  // 🧮 Calculate total amount when dates change
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const start = new Date(checkInDate)
      const end = new Date(checkOutDate)
      const timeDiff = end.getTime() - start.getTime()
      const numDays = timeDiff / (1000 * 60 * 60 * 24)

      if (numDays <= 0) {
        setTotalAmount(null)
        setMessage('⚠️ Check-out must be after check-in')
      } else {
        setMessage('')
        setTotalAmount(numDays * room.pricePerDay)
      }
    } else {
      setTotalAmount(null)
    }
  }, [checkInDate, checkOutDate, room.pricePerDay])

  const handleBookingConfirm = async () => {
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

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text)
      }

      const result = await res.json()
      alert(`✅ Booking Confirmed!\nBooking ID: ${result.id}`)
      navigate('/dashboard')
    } catch (err: any) {
      console.error('❌ Booking failed', err)
      setMessage('⚠️ ' + err.message)
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2>🛏 Booking Room: {room.name}</h2>
      <p>💰 Price Per Day: Rs. {room.pricePerDay}</p>
      <p>👤 Booking for: {user.name}</p>

      <div className="mb-3">
        <label>📅 Check-In Date:</label>
        <input
          type="date"
          className="form-control"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>📅 Check-Out Date:</label>
        <input
          type="date"
          className="form-control"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
        />
      </div>

      {totalAmount !== null && (
        <div className="alert alert-info">
          💸 Total Payment: <strong>Rs. {totalAmount.toFixed(2)}</strong>
        </div>
      )}

      {message && <div className="alert alert-warning">{message}</div>}

      <button className="btn btn-primary w-100" onClick={handleBookingConfirm}>
        ✅ Confirm Booking
      </button>
    </div>
  )
}

export default BookingPage

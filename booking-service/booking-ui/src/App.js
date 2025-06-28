import React, { useState } from 'react';
import './BookingForm.css';

function App() {
  const [booking, setBooking] = useState({
    userId: '',
    roomId: '',
    checkInDate: '',
    checkOutDate: '',
    status: '',
    totalAmount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking((prevBooking) => ({
      ...prevBooking,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8082/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking)
      });

      if (response.ok) {
        alert('Booking submitted successfully!');
        setBooking({
          userId: '',
          roomId: '',
          checkInDate: '',
          checkOutDate: '',
          status: '',
          totalAmount: ''
        });
      } else {
        const error = await response.text();
        alert('Failed to submit booking: ' + error);
      }
    } catch (error) {
      alert('Error connecting to server: ' + error.message);
    }
  };

  return (
    <div className="form-container">
      <h1>Hotel Booking Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="userId"
          type="number"
          placeholder="User ID"
          value={booking.userId}
          onChange={handleChange}
          required
        />
        <input
          name="roomId"
          type="number"
          placeholder="Room ID"
          value={booking.roomId}
          onChange={handleChange}
          required
        />
        <input
          name="checkInDate"
          type="date"
          value={booking.checkInDate}
          onChange={handleChange}
          required
        />
        <input
          name="checkOutDate"
          type="date"
          value={booking.checkOutDate}
          onChange={handleChange}
          required
        />
        <input
          name="status"
          type="text"
          placeholder="Status (e.g. CONFIRMED)"
          value={booking.status}
          onChange={handleChange}
          required
        />
        <input
          name="totalAmount"
          type="number"
          placeholder="Total Amount"
          value={booking.totalAmount}
          onChange={handleChange}
          required
        />
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt, FaSpinner } from "react-icons/fa"; // 🗑️ Spinner & Delete icon


const BookingViews = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    setLoading(true);
    axios
      .get("http://localhost:8082/api/bookings")
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading bookings:", err);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("❗Are you sure you want to cancel this booking?")) {
      axios
        .delete(`http://localhost:8082/api/bookings/${id}`)
        .then(() => {
          alert("✅ Booking cancelled successfully!");
          fetchBookings();
        })
        .catch((err) => {
          console.error("Error cancelling booking:", err);
          alert("❌ Failed to cancel booking.");
        });
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>📅 Booking Management</h1>

      {loading ? (
        <div style={styles.loader}>
          <FaSpinner className="spin" /> Loading bookings...
        </div>
      ) : bookings.length === 0 ? (
        <p style={styles.empty}>📭 No bookings found.</p>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>🆔 Booking ID</th>
                <th style={styles.th}>👤 User ID</th>
                <th style={styles.th}>🚪 Room ID</th>
                <th style={styles.th}>🟢 Check In</th>
                <th style={styles.th}>🔴 Check Out</th>
                <th style={styles.th}>📌 Status</th>
                <th style={styles.th}>💰 Amount (Rs.)</th>
                <th style={styles.th}>⚙️ Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} style={styles.row}>
                  <td>{b.id}</td>
                  <td>{b.userId}</td>
                  <td>{b.roomId}</td>
                  <td>{b.checkInDate}</td>
                  <td>{b.checkOutDate}</td>
                  <td>{b.status}</td>
                  <td>Rs. {b.totalAmount.toFixed(2)}</td>
                  <td>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => handleDelete(b.id)}
                    >
                      <FaTrashAlt /> Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingViews;

// 🌟 Styles
const styles = {
  page: {
    padding: "40px",
    backgroundColor: "#eef3f9",
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
    minHeight: "100vh",
    color: "#333",
  },
  title: {
    textAlign: "center",
    color: "#007bff",
    fontSize: "28px",
    marginBottom: "30px",
  },
  tableContainer: {
    overflowX: "auto",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    overflow: "hidden",
  },
  th: {
    padding: "14px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: "15px",
  },
  row: {
    borderBottom: "1px solid #e0e0e0",
    backgroundColor: "#fff",
    transition: "background-color 0.3s ease",
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "0.3s",
  },
  loader: {
    textAlign: "center",
    color: "#007bff",
    fontSize: "18px",
  },
  empty: {
    textAlign: "center",
    fontSize: "18px",
    color: "#999",
  },
};

import React, { useState } from "react";
import axios from "axios";

const AddAdminPage = () => {
  const [admin, setAdmin] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8083/admin-service/admins", admin);
      setMessage("✅ Admin created successfully!");
      setAdmin({ name: "", email: "", password: "" });
    } catch (err) {
      setMessage("❌ Failed to add admin: " + (err.response?.data || err.message));
    }
  };

  return (
    <>
      <style>{`
        .page-container {
          padding: 20px;
          background-color: #f3f4f6;
          border-radius: 12px;
          max-width: 500px;
          margin: auto;
          box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
        }

        .heading {
          text-align: center;
          color: #3b82f6;
          margin-bottom: 20px;
        }

        .admin-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .admin-form input {
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 16px;
        }

        .submit-btn {
          background-color: #3b82f6;
          color: white;
          padding: 10px;
          font-weight: bold;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .submit-btn:hover {
          background-color: #2563eb;
        }

        .message {
          margin-top: 10px;
          font-weight: bold;
          text-align: center;
        }

        .message:contains("✅") {
          color: green;
        }

        .message:contains("❌") {
          color: red;
        }
      `}</style>

      <div className="page-container">
        <h2 className="heading">➕ Add New Admin</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="👤 Full Name"
            value={admin.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="📧 Email"
            value={admin.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="🔒 Password"
            value={admin.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="submit-btn">➕ Add Admin</button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </>
  );
};

export default AddAdminPage;

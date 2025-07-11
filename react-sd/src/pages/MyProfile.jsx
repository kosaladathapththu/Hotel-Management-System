import React, { useState, useEffect } from "react";
import axios from "axios";

const MyProfile = () => {
  const adminId = 1; // ✅ Replace this with dynamic ID if available

  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [editMode, setEditMode] = useState(false);

  // ✅ Fetch current admin data when component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:8083/admin-service/admins/${adminId}`)
      .then((res) => setAdminData(res.data))
      .catch((err) => console.error("Failed to fetch admin data ❌", err));
  }, []);

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:8083/admin-service/admins/update/${adminId}`, adminData)
      .then((res) => {
        alert("✅ Profile updated successfully!");
        setEditMode(false);
      })
      .catch((err) => {
        console.error("Failed to update admin ❌", err);
        alert("❌ Error updating profile.");
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👤 My Profile</h2>

      <label style={styles.label}>Name:</label>
      <input
        type="text"
        name="name"
        value={adminData.name}
        onChange={handleChange}
        disabled={!editMode}
        style={styles.input}
      />

      <label style={styles.label}>Email:</label>
      <input
        type="email"
        name="email"
        value={adminData.email}
        onChange={handleChange}
        disabled={!editMode}
        style={styles.input}
      />

      <label style={styles.label}>Password:</label>
      <input
        type="password"
        name="password"
        value={adminData.password}
        onChange={handleChange}
        disabled={!editMode}
        style={styles.input}
      />

      {!editMode ? (
        <button style={styles.editBtn} onClick={() => setEditMode(true)}>
          ✏️ Edit
        </button>
      ) : (
        <button style={styles.saveBtn} onClick={handleSave}>
          💾 Save
        </button>
      )}
    </div>
  );
};

// 🎨 CSS as JS styles (inline)
const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "30px",
    border: "2px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: "25px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    color: "#333",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    border: "1px solid #aaa",
    borderRadius: "5px",
    fontSize: "16px",
  },
  editBtn: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#008CBA",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  saveBtn: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default MyProfile;

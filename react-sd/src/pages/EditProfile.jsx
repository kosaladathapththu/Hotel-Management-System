import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EditProfile() {
  const [user, setUser] = useState({
    id: "",
    fullName: "",
    email: "",
    password: "",
    phone: "",
    nic: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setUser(parsed);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8084/api/users/${user.id}`,
        user
      );
      alert("✅ Profile updated successfully!");
      localStorage.setItem("userData", JSON.stringify(response.data)); // Update localStorage too
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Failed to update profile", error);
      alert("Failed to update profile.");
    }
  };

  // 🎨 Inline styles
  const styles = {
    container: {
      maxWidth: "450px",
      margin: "50px auto",
      background: "#e7f7ff",
      padding: "30px",
      borderRadius: "16px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
      fontFamily: "'Segoe UI', sans-serif",
    },
    heading: {
      textAlign: "center",
      color: "#0077b6",
      marginBottom: "20px",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "14px",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#009688",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      fontWeight: "bold",
      fontSize: "16px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>✏️ Edit Profile</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="fullName"
          value={user.fullName}
          placeholder="Full Name"
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          value={user.email}
          placeholder="Email"
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          value={user.password}
          placeholder="Password"
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="phone"
          value={user.phone}
          placeholder="Phone"
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="nic"
          value={user.nic}
          placeholder="NIC"
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          💾 Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProfile;

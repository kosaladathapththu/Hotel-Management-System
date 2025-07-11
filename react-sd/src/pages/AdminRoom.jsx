import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [editRoomId, setEditRoomId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: "",
    type: "",
    description: "",
    pricePerDay: "",
    capacity: "",
    status: "Available",
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = () => {
    axios
      .get("http://localhost:8086/api/rooms/available")
      .then((res) => {
        const formatted = res.data.map((r) => ({
          id: r.id,
          title: r.name,
          available: r.status.toLowerCase() === "available" ? "yes" : "no",
          features: [
            `Type: ${r.type}`,
            `Capacity: ${r.capacity}`,
            `Price/Day: Rs. ${r.pricePerDay}`,
            r.description,
          ],
        }));
        setRooms(formatted);
      })
      .catch((err) => console.error("Error loading rooms ❌", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this room?")) {
      axios
        .delete(`http://localhost:8086/api/rooms/admin/${id}`)
        .then(() => fetchRooms())
        .catch((err) => console.error("Delete failed ❌", err));
    }
  };

  const handleEdit = (room) => {
    setEditRoomId(room.id);
    setEditData({
      title: room.title,
      available: room.available,
      features: room.features.join(", "),
    });
  };

  const handleCancel = () => {
    setEditRoomId(null);
    setEditData({});
  };

  const handleSave = (id) => {
    const updatedRoom = {
      name: editData.title,
      type: extractFeature("Type", editData.features),
      description: extractDescription(editData.features),
      pricePerDay: extractFeature("Price/Day", editData.features).replace("Rs. ", ""),
      capacity: extractFeature("Capacity", editData.features),
      status: editData.available === "yes" ? "Available" : "Unavailable",
    };

    axios
      .put(`http://localhost:8086/api/rooms/admin/${id}`, updatedRoom)
      .then(() => {
        fetchRooms();
        setEditRoomId(null);
        setEditData({});
      })
      .catch((err) => {
        console.error("Error updating room ❌", err);
        alert("Update failed");
      });
  };

  const extractFeature = (label, featureStr) => {
    const match = featureStr
      .split(",")
      .map((item) => item.trim())
      .find((f) => f.startsWith(`${label}:`));
    return match ? match.split(":")[1].trim() : "";
  };

  const extractDescription = (featureStr) => {
    const lines = featureStr.split(",").map((item) => item.trim());
    const knownLabels = ["Type:", "Capacity:", "Price/Day:"];
    return lines.filter((line) => !knownLabels.some((l) => line.startsWith(l))).join(", ");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewRoomChange = (e) => {
    const { name, value } = e.target;
    setNewRoom((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddRoom = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8086/api/rooms/admin", newRoom)
      .then(() => {
        setShowModal(false);
        fetchRooms();
        setNewRoom({
          name: "",
          type: "",
          description: "",
          pricePerDay: "",
          capacity: "",
          status: "Available",
        });
      })
      .catch((err) => console.error("Error adding room ❌", err));
  };

  return (
    <div style={styles.page}>
      <h1>🏨 Rooms Dashboard</h1>

      <button style={styles.addRoomBtn} onClick={() => setShowModal(true)}>
        ➕ Add Room
      </button>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2>Add New Room</h2>
            <form onSubmit={handleAddRoom}>
              <input
                name="name"
                value={newRoom.name}
                onChange={handleNewRoomChange}
                placeholder="Room Name"
                style={styles.input}
                required
              />
              <input
                name="type"
                value={newRoom.type}
                onChange={handleNewRoomChange}
                placeholder="Room Type"
                style={styles.input}
                required
              />
              <textarea
                name="description"
                value={newRoom.description}
                onChange={handleNewRoomChange}
                placeholder="Room Description"
                style={styles.textarea}
                required
              />
              <input
                type="number"
                name="pricePerDay"
                value={newRoom.pricePerDay}
                onChange={handleNewRoomChange}
                placeholder="Price per Day (Rs.)"
                style={styles.input}
                required
              />
              <input
                type="number"
                name="capacity"
                value={newRoom.capacity}
                onChange={handleNewRoomChange}
                placeholder="Capacity"
                style={styles.input}
                required
              />
              <div style={{ textAlign: "right" }}>
                <button type="submit" style={styles.saveBtn}>
                  Add Room ✅
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={styles.cancelBtn}
                >
                  Cancel ❌
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={styles.grid}>
        {rooms.map((room) => (
          <div key={room.id} style={styles.card}>
            {editRoomId === room.id ? (
              <>
                <input
                  type="text"
                  name="title"
                  value={editData.title}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Room title"
                />
                <select
                  name="available"
                  value={editData.available}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <textarea
                  name="features"
                  value={editData.features}
                  onChange={handleChange}
                  style={styles.textarea}
                  placeholder="Comma-separated features"
                />
                <button style={styles.saveBtn} onClick={() => handleSave(room.id)}>
                  Save
                </button>
                <button style={styles.cancelBtn} onClick={handleCancel}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3>{room.title}</h3>
                <p>
                  <strong>Available:</strong> {room.available}
                </p>
                <ul>
                  {room.features.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
                <button style={styles.editBtn} onClick={() => handleEdit(room)}>
                  Edit
                </button>
                <button style={styles.deleteBtn} onClick={() => handleDelete(room.id)}>
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminRoom;

const styles = {
  page: {
    padding: "20px",
    background: "#f0f4f8",
    minHeight: "100vh",
  },
  addRoomBtn: {
    background: "#28a745",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
  },
  textarea: {
    width: "100%",
    padding: "8px",
    minHeight: "60px",
    marginBottom: "10px",
  },
  editBtn: {
    background: "#007bff",
    color: "#fff",
    padding: "8px 12px",
    border: "none",
    marginRight: "8px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#dc3545",
    color: "#fff",
    padding: "8px 12px",
    border: "none",
    cursor: "pointer",
  },
  saveBtn: {
    background: "#28a745",
    color: "#fff",
    padding: "8px 12px",
    border: "none",
    marginRight: "8px",
    cursor: "pointer",
  },
  cancelBtn: {
    background: "#6c757d",
    color: "#fff",
    padding: "8px 12px",
    border: "none",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    background: "#fff",
    padding: "30px",
    borderRadius: "8px",
    width: "400px",
    maxWidth: "90%",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  },
};

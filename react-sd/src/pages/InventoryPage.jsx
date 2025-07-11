import React, { useState, useEffect } from "react";
import axios from "axios";

const InventoryPage = () => {
  const [inventoryList, setInventoryList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [newItem, setNewItem] = useState({
    itemName: "",
    quantity: "",
    purchaseDate: "",
    status: "",
    unitPrice: "",
    adminId: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);

  // Search states
  const [searchName, setSearchName] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  // Load inventory list (with search)
  useEffect(() => {
    fetchInventory();
  }, []);

  // Fetch inventory with search filters
  const fetchInventory = (name = "", status = "") => {
  let url = `http://localhost:8081/api/inventories`;
  const params = [];

  if (name) params.push(`itemName=${encodeURIComponent(name)}`);
  if (status) params.push(`status=${encodeURIComponent(status)}`);

  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  axios
    .get(url)
    .then((res) => setInventoryList(res.data))
    .catch((err) => console.error("Error loading inventory", err));
};


  // Search handler (calls backend with filters)
  const handleSearch = () => {
    fetchInventory(searchName.trim(), searchStatus.trim());
  };

  // Clear search filters
  const handleClearSearch = () => {
    setSearchName("");
    setSearchStatus("");
    fetchInventory();
  };

  // Handle input change for add/edit
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editId !== null) {
      setEditData((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewItem((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Save edited item
  const handleSave = (id) => {
    axios
      .put(`http://localhost:8081/api/inventories/${id}`, editData)
      .then(() => {
        fetchInventory(searchName, searchStatus);
        setEditId(null);
        setEditData({});
      })
      .catch((err) => console.error("Error updating inventory", err));
  };

  // Delete item
  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this item?")) {
      axios
        .delete(`http://localhost:8081/api/inventories/${id}`)
        .then(() => fetchInventory(searchName, searchStatus))
        .catch((err) => console.error("Error deleting inventory", err));
    }
  };

  // Add new inventory item
  const handleAddNew = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/api/inventories", newItem)
      .then(() => {
        fetchInventory(searchName, searchStatus);
        setNewItem({
          itemName: "",
          quantity: "",
          purchaseDate: "",
          status: "",
          unitPrice: "",
          adminId: "",
        });
        setShowAddForm(false);
      })
      .catch((err) => console.error("Error adding inventory", err));
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditId(null);
    setEditData({});
  };

  return (
    <div style={styles.page}>
      <h1>📦 Inventory Management</h1>

      {/* Search Panel */}
      <div style={styles.searchPanel}>
        <input
          type="text"
          placeholder="Search by Item Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={styles.searchInput}
        />
        <input
          type="text"
          placeholder="Search by Status"
          value={searchStatus}
          onChange={(e) => setSearchStatus(e.target.value)}
          style={styles.searchInput}
        />
        <button style={styles.searchBtn} onClick={handleSearch}>
          🔍 Search
        </button>
        <button style={styles.clearBtn} onClick={handleClearSearch}>
          ✖ Clear
        </button>
      </div>

      {/* Add New Item Toggle */}
      <button style={styles.addBtn} onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? "✖ Cancel" : "➕ Add New Item"}
      </button>

      {/* Add New Item Form */}
      {showAddForm && (
        <form style={styles.form} onSubmit={handleAddNew}>
          <input
            name="itemName"
            placeholder="Item Name"
            value={newItem.itemName}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="date"
            name="purchaseDate"
            value={newItem.purchaseDate}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            name="status"
            placeholder="Status (e.g., Available)"
            value={newItem.status}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="number"
            step="0.01"
            name="unitPrice"
            placeholder="Unit Price (Rs.)"
            value={newItem.unitPrice}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="number"
            name="adminId"
            placeholder="Admin ID"
            value={newItem.adminId}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.saveBtn}>
            Save New Item
          </button>
        </form>
      )}

      {/* Inventory Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Item Name</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Purchase Date</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Unit Price (Rs.)</th>
            <th style={styles.th}>Admin ID</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventoryList.map((item) =>
            editId === item.id ? (
              <tr key={item.id} style={styles.editRow}>
                <td>
                  <input
                    name="itemName"
                    value={editData.itemName}
                    onChange={handleChange}
                    style={styles.tableInput}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="quantity"
                    value={editData.quantity}
                    onChange={handleChange}
                    style={styles.tableInput}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    name="purchaseDate"
                    value={editData.purchaseDate?.split("T")[0] || ""}
                    onChange={handleChange}
                    style={styles.tableInput}
                  />
                </td>
                <td>
                  <input
                    name="status"
                    value={editData.status}
                    onChange={handleChange}
                    style={styles.tableInput}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    step="0.01"
                    name="unitPrice"
                    value={editData.unitPrice}
                    onChange={handleChange}
                    style={styles.tableInput}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="adminId"
                    value={editData.adminId}
                    onChange={handleChange}
                    style={styles.tableInput}
                  />
                </td>
                <td>
                  <button style={styles.saveBtn} onClick={() => handleSave(item.id)}>
                    Save
                  </button>
                  <button style={styles.cancelBtn} onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr
                key={item.id}
                style={styles.tableRow}
                className="hoverRow"
              >
                <td>{item.itemName}</td>
                <td>{item.quantity}</td>
                <td>{item.purchaseDate?.split("T")[0]}</td>
                <td>{item.status}</td>
                <td>Rs. {Number(item.unitPrice).toFixed(2)}</td>
                <td>{item.adminId}</td>
                <td style={styles.actionsCell}>
                  <button
                    style={styles.editBtn}
                    onClick={() => {
                      setEditId(item.id);
                      setEditData({ ...item });
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button style={styles.deleteBtn} onClick={() => handleDelete(item.id)}>
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      {/* Extra styles for hover animation */}
      <style>{`
        .hoverRow:hover {
          background-color: #e3f2fd;
          transition: background-color 0.3s ease;
        }
        button:hover {
          opacity: 0.85;
          transition: opacity 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default InventoryPage;

// Styles (clean & colorful)
const styles = {
  page: {
    padding: "20px 40px",
    backgroundColor: "#f7f9fc",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333",
  },
  searchPanel: {
    display: "flex",
    gap: "12px",
    marginBottom: "20px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  searchInput: {
    flex: "1 1 200px",
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1.5px solid #ccc",
    fontSize: "16px",
  },
  searchBtn: {
    backgroundColor: "#007bff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
    boxShadow: "0 3px 6px rgba(0,123,255,0.5)",
  },
  clearBtn: {
    backgroundColor: "#6c757d",
    border: "none",
    padding: "10px 18px",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
    boxShadow: "0 3px 6px rgba(108,117,125,0.5)",
  },
  addBtn: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "700",
    marginBottom: "25px",
    boxShadow: "0 3px 6px rgba(40,167,69,0.5)",
  },
  form: {
    marginBottom: "30px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    maxWidth: "700px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  input: {
    padding: "12px 15px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1.5px solid #ccc",
    transition: "border-color 0.3s ease",
  },
  inputFocus: {
    borderColor: "#007bff",
  },
  saveBtn: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "700",
    marginRight: "10px",
    boxShadow: "0 3px 8px rgba(0,123,255,0.5)",
  },
  cancelBtn: {
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "700",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
  th: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "15px 12px",
    textAlign: "left",
    fontWeight: "700",
    fontSize: "16px",
  },
  tableRow: {
    borderBottom: "1.5px solid #eee",
    fontSize: "15px",
  },
  editRow: {
    backgroundColor: "#f9f9f9",
  },
  tableInput: {
    width: "100%",
    padding: "8px 10px",
    fontSize: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  actionsCell: {
    whiteSpace: "nowrap",
    display: "flex",
    gap: "8px",
  },
  editBtn: {
    backgroundColor: "#ffc107",
    border: "none",
    padding: "7px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    color: "#212529",
    fontWeight: "600",
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    border: "none",
    padding: "7px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    color: "#fff",
    fontWeight: "600",
  },
};

import React, { useState, useEffect } from "react";
import axios from "axios";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8084/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const filteredUsers = users.filter((user) => {
    const fullName = user.fullName ?? "";
    const email = user.email ?? "";

    return (
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <style>{`
        .page-container {
          max-width: 900px;
          margin: 30px auto;
          padding: 20px;
          background-color: #f9fbfd;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
        }

        h1 {
          color: #1a73e8;
          margin-bottom: 20px;
          text-align: center;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px;
          margin-bottom: 25px;
          border-radius: 8px;
          border: 2px solid #ddd;
          font-size: 16px;
          transition: border-color 0.3s ease;
        }

        .search-input:focus {
          border-color: #1a73e8;
          outline: none;
        }

        .users-table {
          width: 100%;
          border-collapse: collapse;
          box-shadow: 0 0 15px rgba(26, 115, 232, 0.1);
          border-radius: 12px;
          overflow: hidden;
        }

        .users-table th,
        .users-table td {
          padding: 14px 18px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        .users-table th {
          background-color: #1a73e8;
          color: white;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .users-table tbody tr:hover {
          background-color: #e8f0fe;
          transition: background-color 0.3s ease;
        }

        @media (max-width: 600px) {
          .users-table,
          .users-table thead,
          .users-table tbody,
          .users-table th,
          .users-table td,
          .users-table tr {
            display: block;
          }

          .users-table thead tr {
            position: absolute;
            top: -9999px;
            left: -9999px;
          }

          .users-table tr {
            margin-bottom: 15px;
            border-bottom: 2px solid #1a73e8;
          }

          .users-table td {
            border: none;
            position: relative;
            padding-left: 50%;
          }

          .users-table td:before {
            position: absolute;
            top: 14px;
            left: 16px;
            width: 45%;
            padding-right: 10px;
            white-space: nowrap;
            font-weight: 600;
            color: #1a73e8;
          }

          .users-table td:nth-of-type(1):before {
            content: "ID";
          }
          .users-table td:nth-of-type(2):before {
            content: "Full Name";
          }
          .users-table td:nth-of-type(3):before {
            content: "Email";
          }
          .users-table td:nth-of-type(4):before {
            content: "Phone";
          }
          .users-table td:nth-of-type(5):before {
            content: "NIC";
          }
        }
      `}</style>

      <div className="page-container">
        <h1>Users Page</h1>

        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>NIC</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.nic}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersPage;

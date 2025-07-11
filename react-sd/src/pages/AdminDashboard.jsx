import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh", overflowX: "hidden" }}>
      <div style={{
        width: "220px",
        flexShrink: 0,
        backgroundColor: "#002B5B",
        color: "white",
      }}>
        <Sidebar />
      </div>
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F4F6FA"
      }}>
        <div style={{
          flex: 1,
          padding: "20px",
          minWidth: 0,
        }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

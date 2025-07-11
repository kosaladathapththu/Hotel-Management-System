import React, { useState, useEffect } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    // Get logged-in admin email from localStorage
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setAdminEmail(parsed.email || "");
    }
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Hamburger Button for Mobile */}
      <div className="mobile-header">
        <button className="hamburger" onClick={toggleMobileSidebar}>
          ☰
        </button>
        <span className="mobile-title">Dashboard</span>
      </div>

      <aside
        className={`sidebar ${isOpen ? "open" : "collapsed"} ${
          isMobileOpen ? "mobile-open" : ""
        }`}
      >
        <button className="collapse-btn" onClick={toggleSidebar}>
          {isOpen ? "«" : "»"}
        </button>
        <h2 className="sidebar-title">{isOpen && "Dashboard"}</h2>

        {/* Show admin email only if sidebar is open */}
        {isOpen && adminEmail && (
          <div className="admin-email">
            👤 {adminEmail}
          </div>
        )}

        <ul className="sidebar-links">
          <li>
            <a href="#rooms">
              <span className="icon">🛏️</span>
              {isOpen && "Rooms"}
            </a>
          </li>
          <li>
            <a href="#inventory">
              <span className="icon">📦</span>
              {isOpen && "Inventory"}
            </a>
          </li>
          <li>
            <a href="#bookings">
              <span className="icon">📅</span>
              {isOpen && "Bookings"}
            </a>
          </li>
          <li>
            <a href="#users">
              <span className="icon">👥</span>
              {isOpen && "Users"}
            </a>
          </li>
          <li>
            <a href="#add-admin">
              <span className="icon">➕</span>
              {isOpen && "Add Admin"}
            </a>
          </li>
        </ul>
      </aside>

      {/* Backdrop on mobile when sidebar open */}
      {isMobileOpen && (
        <div className="backdrop" onClick={toggleMobileSidebar}></div>
      )}
    </>
  );
};

export default Sidebar;

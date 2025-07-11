import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDoorOpen,
  faBoxesStacked,
  faCalendarCheck,
  faUsers,
  faUserPlus,
  faRightFromBracket,
  faGauge,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure?");
    if (confirmLogout) {
      console.log("User has logged out.");
      window.location.href = "/";
    }
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title"><FontAwesomeIcon icon={faGauge} /> &nbsp;Dashboard</h2>
      <div>
        <h2><FontAwesomeIcon icon={faUser} /> <br /> Admin</h2>
      </div>
      <ul className="sidebar-links">
        <li><Link className="sideBtn" to="rooms"><FontAwesomeIcon icon={faDoorOpen} /> &nbsp; Rooms</Link></li>
        <li><Link className="sideBtn" to="inventory"><FontAwesomeIcon icon={faBoxesStacked} /> Inventory</Link></li>
        <li><Link className="sideBtn" to="bookings"><FontAwesomeIcon icon={faCalendarCheck} /> &nbsp; Bookings</Link></li>
        <li><Link className="sideBtn" to="users"><FontAwesomeIcon icon={faUsers} /> &nbsp; Users</Link></li>
        <li><Link className="sideBtn" to="add-admin"><FontAwesomeIcon icon={faUserPlus} /> &nbsp; Add Admin</Link></li>
        <li><Link className="sideBtn" to="profile"><FontAwesomeIcon icon={faUser} /> &nbsp; My Profile</Link></li>
      </ul>
      <div className="logoutBtn">
        <button className="sideBtn" onClick={handleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket} /> &nbsp; Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <div className="logo-text">The Marlowe</div>
        <div className="tagline">Beyond the Stay</div>
      </div>
      
      <ul className="nav-links">
        <li><a href="#hero">Home</a></li>
        <li><a href="#rooms">Services</a></li>
        <li><a href="#about">About Us</a></li>
        <li><a href="#contact">Contact Us</a></li>
<li><a href="AdminLogin"><img id="AdminImg" src="src/manage_accounts_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="" />Admin</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;

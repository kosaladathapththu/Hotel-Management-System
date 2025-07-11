import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white text-center p-4 footer">
      &copy; {new Date().getFullYear()} My Company. All rights reserved.
    </footer>
  );
};

export default Footer;

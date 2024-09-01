import React from "react";
import { useLocation } from "react-router-dom";
//import "./footer.css";

const Footer = () => {
  const location = useLocation();
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} MyBlogApp</p>
    </footer>
  );
};

export default Footer;

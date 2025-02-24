import React from "react";
import "../Styles/global.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>📍 Project Management &copy; 2025</p>
        <div className="social-icons">
          <a href="#" className="social-icon">
            <i className="fa fa-linkedin"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fa fa-youtube"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

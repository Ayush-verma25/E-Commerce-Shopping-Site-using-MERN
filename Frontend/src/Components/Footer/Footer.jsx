import React from "react";
import "./Footer.css";
import footer_logo from "../Assets/logo_big.png";
import instagram_icon from "../Assets/instagram_icon.png";
import pintester_icon from "../Assets/pintester_icon.png";
import whatsapp_icon from "../Assets/whatsapp_icon.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={footer_logo} alt="logo" />
        <p>SHOPPERS</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contect</li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icons-container">
          <img src={instagram_icon} alt="instagram" />
        </div>
        <div className="footer-icons-container">
          <img src={pintester_icon} alt="pinterest" />
        </div>
        <div className="footer-icons-container">
          <img src={whatsapp_icon} alt="whatsapp" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright © 2024 Shoppers. All rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;

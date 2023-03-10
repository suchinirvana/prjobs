import React from "react";
import footerlogo from "../../img/logo-footer.png";
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="mobile-collapse">
              <p className="foot-logo">
                <img src={footerlogo} alt="" />
              </p>
            </div>
          </div>
          <div className="col-md-2">
            <h3>QUICK LINKS</h3>
            <div className="mobile-collapse">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About us</Link>
                </li>
                <li>
                  <Link to="/pricing">Pricing</Link>
                </li>
                <li>
                  <Link to="/">Offices</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-3">
            <h3>TERMS AND POLICIES</h3>
            <div className="mobile-collapse">
              <ul>
                <li>
                  <Link to="/">Privacy Policy </Link>
                </li>
                <li>
                  <Link to="/"> Regulations</Link>
                </li>
                <li>
                  <Link to="/">Terms of Service</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-2">
            <h3>GET IN TOUCH</h3>
            <div className="mobile-collapse">
              <p>Have questions for us? Reach us here.</p>
              <p className="has-icon">
                <i className="fa fa-phone"></i>
                <a href="tel:604-800-2739">604-800-2739</a>
              </p>
              <p className="has-icon">
                <i className="fa fa-envelope"></i>
                <a href="mailto:Admin@prjobs.ca">Admin@prjobs.ca</a>
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <h3>NEWSLETTER</h3>
            <div className="mobile-collapse">
              <p>Subscribe to our newsletter to stay updated.</p>
              <div className="newsletter-field">
                <input type="text" placeholder="Your Email" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="container">
          <p>
            2021 PR Jobs Canada. All Rights Reserved | Privacy Policy | Website
            designed and developed by Nirvana Canada
          </p>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;

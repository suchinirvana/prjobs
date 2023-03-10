import React from "react";
import headerLogo from "../../img/logo.png";
import { Link } from "react-router-dom";
import { useDispatch} from 'react-redux';
import { popupActions } from "../../redux/actions";
const Header = () => {
  const dispatch = useDispatch();
  return (
    <header>
      <div className="container">
        <div className="head-row">
          <div className="head-left">
            <div className="logo">
              <Link to="/">
                <img src={headerLogo} width="255" alt="" />
              </Link>
            </div>
          </div>
          <div className="head-right">
            <span className="nav-trigger">
              <span></span>
            </span>

            <a 
              onClick={() => dispatch(popupActions.open("joinnow"))}
              className="btn post-btn div-popup"
            >
              <i className="fas fa-pencil"></i> JOIN NOW
            </a>
            <a
              onClick={() => dispatch(popupActions.open("login"))}
              className="btn post-btn div-popup"
            >
              <i className="fas fa-pencil"></i> LOGIN
            </a>
            <div className="nav-wrap">
              <nav id="push_sidebar">
                <ul className="nav">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li className="">
                    <span className="submenu-button"></span>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>
                    <Link to="/pricing">Pricing</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact Us</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

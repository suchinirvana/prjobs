import React, { useState, useEffect } from "react";
import headerLogo from "../../img/logo.png";
import navlogo from "../../img/nav-logo.png";
import pimage from "../../img/usericon.svg";
import mapl from "../../img/map-icon.png";
import belicn from "../../img/bell-icon.png";
import chaticn from "../../img/chat-icon.png";
import usricn from "../../img/user-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { popupActions, userActions } from "../../redux/actions";
import { Link, useHistory } from "react-router-dom";
import { getfileUrl, currentUser } from "../../helpers";

const HeaderDashboard = () => {
  const user_type = currentUser().user_type;
  let history = useHistory();
  const dispatch = useDispatch();
  const isModel = useSelector((state) => state.popup);
  const user = useSelector((state) => state.users);
  const [values, setValues] = useState({
    user_image_url: "",
    company_name: "",
    province: "",
    city: "",
    first_name : '',
    last_name:''
  });

  useEffect(() => { 
    //console.log(currentUser().id)
    if(currentUser().id){
      dispatch(userActions.getById(currentUser().id))
      console.log(currentUser().id)
    }
      
  }, []);

  useEffect(() => {
    if (user.profile) {
      setValues({
        user_image_url: user.profile.user_image_url,
        company_name: user.profile.company_name,
        province: user.profile.province,
        city: user.profile.city,
        first_name : user.profile.first_name,
        last_name : user.profile.last_name,
      });
    }
  }, [user.loading]);

  let profileImage = values.user_image_url !== "" ? getfileUrl(values.user_image_url) : pimage;

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(userActions.logout());
    history.push("/");
  };

  if (user.loading) {
    //return null;
  }

  const nav = () => {
    if (user_type === "Consultants") {
      return (
        <>
          <li>
            <Link to="/dashboard">HOME</Link>
          </li>
          {/* <li>
          <Link to="/my-account">MY ACCOUNT</Link>
          </li> */}
          <li>
            <Link to="/profile">MY PROFILE</Link>
          </li>
          <li>
            <Link to="/change-password">CHANGE PASSWORD</Link>
          </li>
          <li>
            <Link to="/my-employers">MY EMPLOYERS</Link>
          </li>
          <li>
            <Link to="/jobs-posted">JOBS POSTED</Link>
          </li>
          {/* <li>
       <a href="#">SELECTED CANDIDATES</a>
      </li>
      <li>
      <a href="#">MY DOCUMENTS</a></li> */}
        </>
      );
    } else if (user_type === "Job Seekers") {
      return (
        <>
          <li>
            <Link to="/dashboard">HOME</Link>
          </li>
          {/* <li>
            <Link to="/my-account">MY ACCOUNT</Link>
          </li> */}
          <li>
            <Link to="/profile">MY PROFILE</Link>
          </li>
          <li>
            <Link to="/change-password">CHANGE PASSWORD</Link>
          </li>
          <li>
            <Link to="/jobs">JOBS</Link>
          </li>
        </>
      );
    }
  };

  return (
    <header>
      <div className="container">
        <div className="head-row">
          <div className="head-left">
            <span
              className="nav-trigger-2"
              onClick={() => dispatch(popupActions.open("navbutton"))}
            >
              <span></span>
            </span>
            <div className="logo">
              <Link to="/">
                <img src={headerLogo} width="255" alt="" />
              </Link>
            </div>
            <div
              className="dash-dropdown"
              style={{ display: isModel.model ? "block" : "none" }}
            >
              <i
                className="fa fa-times-circle dash-close"
                onClick={() => dispatch(popupActions.close())}
              ></i>
              <div className="dash-logo">
                <img src={navlogo} alt="" />
              </div>
              <div className="profile-img">
                <div className="lazy-image">
                  <img src={profileImage} alt="" />{" "}
                  <span className="status"></span>
                </div>
              </div>
              <div className="profile-caption">
                {values.company_name && <h3>{values.company_name}</h3>}

                <h4>
                  {values.city}{" "}
                  {values.province && <span>, {values.province}</span>}{" "}
                  <img src={mapl} alt="" />
                </h4>
              </div>
              <div className="dash-nav">
                <ul>
                  {nav()}
                  {/* <li>
                    <a href="#">SETTINGS</a>
                  </li>  */}
                  <li className="btn-li">
                    <a onClick={handleClick}>logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="head-right">
            <div className="top-right">
              <ul>
                <li>
                  <span className="search-triger">
                    <i className="fal fa-search"></i>
                  </span>
                  <div className="search-field">
                    <input type="text" placeholder="Search" />
                    <input type="submit" />
                  </div>
                </li>
                <li>
                  <a href="#">
                    <img src={belicn} alt="" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={chaticn} alt="" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={usricn} alt="" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderDashboard;

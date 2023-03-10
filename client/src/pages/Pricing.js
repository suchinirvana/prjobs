import React from "react";
import banner  from '../img/inner-banner.jpg'
import { Link } from "react-router-dom";
import { useDispatch} from 'react-redux';
import {popupActions} from '../redux/actions'
import { isLoggedIn , currentUser} from '../helpers';
 
const Pricing = () => {
  const dispatch = useDispatch();
  

  return (
    <>
      <section className="inner-banner">
        <div className="bg"  style={{backgroundImage:`url(${banner})`}}>
          <img src={banner} alt="" />
        </div>
        <div className="caption">
          <div className="container">
            <div className="box">
              <div className="heading">Pricing</div>
            </div>
          </div>
        </div>
      </section>

      <section className="common-content dgray">
        <div className="container">
          <h2 className="f-30">flexible pay as you go</h2>

          <p>Select from one of the below packages to register with us.</p>

          <div className="pricing-row flex-wrap">
            <div className="pricing-box">
              <h3>Basic</h3>

              <p className="price">$60.00 / monthly</p>

              <p>50 job posting</p>
              {/* <p>0 featured job</p> */}
              <p>Premium Support 24/7</p>

              <p className="btn-row">
                {isLoggedIn() ? <Link to={`checkout/1`} className="btn third-btn">Get started!</Link> : <a  className="btn third-btn" onClick={() => dispatch(popupActions.open("login"))}>Get started</a>}
                
              </p>
            </div>
            <div className="pricing-box">
              <h3>Most Popular</h3>
              <h4>Standard</h4>
              <p className="price">$90.00 / monthly</p>

              <p>100 job posting</p>
              {/* <p>10 featured job</p> */}
             
              <p>Premium Support 24/7</p>

              <p className="btn-row">
              {/* <Link to={`checkout/2`} className="btn third-btn">Get started!</Link> */}
              {isLoggedIn() ? <Link to={`checkout/2`} className="btn third-btn">Get started!</Link> : <a className="btn third-btn" onClick={() => dispatch(popupActions.open("login"))}>Get started</a>}
               
              </p>
            </div>
            <div className="pricing-box">
              <h3>Premium</h3>

              <p className="price">$120.00 / monthly</p>

              <p> 150 job posting</p>
              {/* <p>35 featured job</p>
              <p>35 featured job</p> */}
              <p>Premium Support 24/7</p>

              <p className="btn-row">
              {/* <Link to={`checkout/3`} className="btn third-btn">Get started!</Link> */}
              {isLoggedIn() ? <Link to={`checkout/3`} className="btn third-btn">Get started!</Link> : <a className="btn third-btn" onClick={() => dispatch(popupActions.open("login"))}>Get started</a>}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Pricing;

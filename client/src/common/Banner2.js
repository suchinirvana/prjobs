import React from "react";
import banner from '../img/inner-banner-big.jpg'

const Banner2 = ({title}) => {
  return (
    <>
      <section className="inner-banner">
        <div
          className="bg"
          style={{backgroundImage:`url(${banner})`}}
        >
          <img src={banner} alt="" />
        </div>
        <div className="caption">
          <div className="container">
            <div className="box">
              <div className="heading">{title}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner2;
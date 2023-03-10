import React from "react";
import banner from '../../../img/inner-banner.jpg'

export const Banner = ({title}) => {
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

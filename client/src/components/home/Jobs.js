import React from 'react'

const Jobs = () => {
    return (
        <section className="opening-wrap">
  <div className="container">
    <h2>Job Openings</h2>
    <div className="opening-row-wrap"> <a href="#" className="opening"> <i className="icon red-bg flaticon-settings"></i>
      <div className="box">
        <h3>Auto Dealership Manager</h3>
        <p>Automotive</p>
      </div>
      <div className="box">
        <p className="price">20$ - 30$ an hour</p>
        <ul className="option">
          <li><i className="flaticon-placeholder"></i> Canada </li>
          <li><i className="flaticon-clock"></i> Full Time </li>
          <li><i className="flaticon-mortarboard"></i> High School Diploma </li>
        </ul>
      </div>
      </a> <a href="#" className="opening"> <i className="icon blue-bg flaticon-reception"></i>
      <div className="box">
        <h3>Marine Engine Mechanic</h3>
        <p>Automotive</p>
      </div>
      <div className="box">
        <p className="price">20$ - 30$ an hour</p>
        <ul className="option">
          <li><i className="flaticon-placeholder"></i> Canada </li>
          <li><i className="flaticon-clock"></i> Full Time </li>
          <li><i className="flaticon-mortarboard"></i> High School Diploma </li>
        </ul>
      </div>
      </a> </div>
    <p className="btn-row"><a href="#" className="btn-link">Register Now</a></p>
  </div>
</section>
    )
}

export default Jobs

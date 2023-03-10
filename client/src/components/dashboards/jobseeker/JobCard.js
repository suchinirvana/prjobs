import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {employerActions } from "../../../redux/actions"
import { useDispatch, useSelector } from "react-redux";
export const JobCard = ({data}) => {

  const empid = parseInt(data.employer);
  const [employer, setEmployer] = useState('');
  const dispatch = useDispatch();
  const fetchEmployer = async () => {
      dispatch(employerActions.getById(empid)).then((emp) => {
          setEmployer(emp.payload.business_name);
      })
    };
  
    useEffect(() => {
      fetchEmployer();
    }, []);

  return <>

            <Link target="_blank" className="opening" to={`job/${data.id}`}>
  
                  <i className="icon red-bg flaticon-settings"></i>
                  <div className="box">
                    <h3>{data.job_title}</h3>
                    <p>{employer}</p>
                  </div>
                  <div className="box">
                    <p className="price">${data.sallery_min} - ${data.sallery_max}</p>
                    <ul className="option">
                      <li>
                        <i className="flaticon-placeholder"></i> {data.city}
                      </li>
                      <li>
                        <i className="flaticon-clock"></i> {data.job_type}
                      </li>
                      { data.education && <li>
                        <i className="flaticon-mortarboard"></i> {data.education}
                      </li>

                      }
                      
                    </ul>
                  </div>
                  </Link>
{/* 
                  <div class="job-row">
      <div class="container">
        <p class="hour">5 HOURS AGO</p>
        <div class="flex">
          <div class="img-box">
            <div class="lazy-image"> <img src="img/truck-icon-2.png" alt=""/> </div>
          </div>
          <div class="box">
            <h3>TRUCK DRIVER, CALGARY</h3>
            <p>KPM AUTOMOTIVES</p>
          </div>
          <div class="box">
            <h4>EXPIRES  18/09/2021</h4>
          </div>
          <div class="box">
            <h4><img src="img/ribban-shape.jpg" alt=""/></h4>
          </div>
        </div>
        <p class="view-more"><a href="#">VIEW MORE</a></p>
      </div>
    </div> */}
  
  </>;
};

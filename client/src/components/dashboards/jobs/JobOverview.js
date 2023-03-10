import React, { useState, useEffect } from "react";
import {employerActions } from "../../../redux/actions"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { jobService } from "../../../services";

export const JobOverview = ({data, handleDelete, deleting}) => {
  

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
     // fetchJobApplications();
    }, []);

    const applicants_label = (data.applications > 0) ? (data.applications === 1)? 'Applicant' : 'Applicants' : ''; 
    let dateStr =new Date(data.end_date);
    return (
        <div className="job-row">
        <div className="container">
          {/* <p className="hour">5 HOURS AGO</p> */}
          <div className="flex">
            <div className="img-box">
              <div className="lazy-image"> <img src="img/truck-icon-2.png" alt=""/> </div>
            </div>
            <div className="box">
              <h3>{data.job_title}, {data.city} <img src="img/map-icon.png" alt=""/></h3>
              <p>{employer}</p>
            </div>
            <div className="box">
              <h4>EXPIRES {dateStr.toLocaleDateString()}</h4>
              <p> {data.applications > 0 &&  (<Link target="_blank" to={`/job-applications/${data.id}`}>{data.applications } {applicants_label}</Link>)}</p>
              
            </div>
            <div className="box">
            <ul className="edit-user">
              <li><Link to={`edit-job/${data.id}`}><i className="fal fa-pencil-alt"></i>Edit</Link></li>
              <li><Link target="_blank" to={`job/${data.id}`}><i className="fal fa-eye"></i>View</Link></li>
              <li><a href="#" onClick={(e)=> handleDelete(e, data.id) } disabled={deleting}><i className="fal fa-trash-alt"></i> Delete</a></li>
            </ul>
            </div>
          </div>
          {/* <p className="view-more"><a href="#">VIEW MORE</a></p> */}
        </div>
      </div>
    )
}

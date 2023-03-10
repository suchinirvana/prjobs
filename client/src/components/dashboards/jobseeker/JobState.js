import React, { useState, useEffect } from "react";
import { jobService } from "../../../services";
import { currentUser } from "../../../helpers";
import { useDispatch, useSelector } from "react-redux";


export const JobState = () => {
  const [action, setAction] = useState({ loading: false, data: [] });
  const user = useSelector((state) => state.users);

  const fetchJobApplications = async (data) => {
    setAction({...action,loading: true});
    try {
      const response = await jobService.getJobApplications(data);
      if (response) {
        setAction({...action,loading: false, data : response.data});
      }
    } catch (error) {
      console.log(error);
      setAction({...action,loading: false,'msg':error.msg});
    }
  };

  useEffect(() => {
    fetchJobApplications({'type':'jobseekers','limit': 20,'uid':currentUser().id});
  }, []);
  /*
  0- Pending
  1- UnderReview
  2- Short Listed
  3- Rejected
  */
   let applied = 0, review = 0, short_listed = 0; 
   if(action.data.length){
    applied = action.data.length;
    //let status = action.data.length;
    action.data.map((value)=>{
        let status = value.status;
        if(status === 1){
            review += 1;
        } else if(status === 2){
            short_listed += 1;
        }
    })
   }   

  return (
    <>
      <div className="container">
        <div className="col-3-common flex-wrap">
          <div className="common-box type-2">
           
            <span className="count">{applied}</span>
            <i className="icon">
              <img src="img/jobseeker-icon-1.png" alt="" />
            </i>
            <h3>Applied Jobs</h3>
          </div>
          <div className="common-box type-2 blue">
            
            <span className="count">{review}</span>
            <i className="icon">
              <img src="img/jobseeker-icon-2.png" alt="" />
            </i>
            <h3>Review</h3>
          </div>
          <div className="common-box type-2">
          
            <span className="count">{short_listed}</span>
            <i className="icon">
              <img src="img/jobseeker-icon-3.png" alt="" />
            </i>
            <h3>Shortlisted</h3>
          </div>
        </div>
      </div>
    </>
  );
};

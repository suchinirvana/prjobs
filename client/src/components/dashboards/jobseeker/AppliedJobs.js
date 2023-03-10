import React, { useState, useEffect } from "react";
import { jobService } from "../../../services";
import { currentUser } from "../../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { JobCard } from "./JobCard";


export const AppliedJobs = () => {
  const [action, setAction] = useState({ loading: false, data: [] });
  const user = useSelector((state) => state.users);
  const [values, setValues] = useState([]);

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
}

  useEffect(() => {
    fetchJobApplications({'type':'jobseekers','limit': 20,'uid':currentUser().id});
  }, []);
  /*
  0- Pending
  1- UnderReview
  2- Short Listed
  3- Rejected
  */
   
  return (
    <>
      <div className="container">
        <div className="job-row-wrap type-2 jlist">
          {action.data &&
            action.data.map((job, index) => <JobCard key={index} data={job} />)}
        </div>
      </div>
    </>
  );
};


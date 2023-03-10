import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jobService } from "../../../services";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../../helpers";
import { JobCard } from "./JobCard";

export const RecemondedJobs = () => {
  const [values, setValues] = useState([]);
  const [userdata, setUserData] = useState({});
  const user = useSelector((state) => state.users);

  const fetchJob = async (data) => {
    try {
      const response = await jobService.getRecommendedJob(data);
      if (response) {
        setValues([...response.data[0]]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.profile) {
      fetchJob({ skills: user.profile.skills });
    }
  }, [user.loading]);

  
  return (
    <>
      <div className="container">
        <div className="job-row-wrap type-2 jlist">
          {values &&
            values.map((job, index) => <JobCard key={index} data={job} />)}
        </div>
      </div>
    </>
  );
};

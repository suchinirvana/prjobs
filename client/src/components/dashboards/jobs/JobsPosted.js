import React, { useState, useEffect } from "react";
import BannerDashboard from "../banner/BannerDashboard";
import ProfileHeader from "../profile/ProfileHeader";
import { Link } from "react-router-dom";
import { jobActions } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../../helpers";
import { JobOverview } from "./JobOverview";
import { jobService } from "../../../services";
export const JobsPosted = () => {
  const [frmstate, setFrmstate] = useState({ message: "", loading: true, deleting: false });
  const [action, setAction] = useState({'msg' : '','deleting':false,'isDeleted':false,'hide':false});
  const [values, setValues] = useState([]);
  const dispatch = useDispatch();
  const fetchJob = async () => {
    dispatch(jobActions.getAllByUser(currentUser().id)).then((data) => {
      setValues([...data.payload]);
      //console.log(data);
    });
  };

  useEffect(() => {
    fetchJob();
  }, []);
  const handleDelete = async(e, id) => {
    e.preventDefault();
    setAction({...action,'deleting':true});
    try { 
      const response = await jobService.deleteJob(id);
      if(response){
        setAction({...action,'deleting':false,'msg':response.msg,'isDeleted':response.success});
        fetchJob();
      }
     
    } catch (error) {
      console.log(error);
      setAction({...action,'deleting':false,'msg':error.msg, 'isDeleted':error.success});

    }
  }

  return (
    <>
      <BannerDashboard />
      <ProfileHeader bc="true" title="Job posted" />
      <section className="common-row lgray p-0">
        <div className="tab-wrap-nav type-2">
          <div className="container">
            <div className="flex">
              <ul className="tab-type">
                <li className="active">
                  <a href="#">ALL JOBS</a>
                </li>
              </ul>
              <div className="add-box">
                <Link className="btn xs-btn ws-w" to="/add-job">Add New <i className="fa fa-plus"></i></Link>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="tab-wrap-nav">
    <div className="container">
      <div className="flex">
        <ul className="tab-type">
          <li className="active"><a href="#">JOBS POSTED</a></li>
          <li><a href="#">MOST RECENT</a></li>
          <li><a href="#">MANAGE POSTINGS</a></li>
        </ul>
        <div className="page-nav">
          <p>Page 1/20</p>
          <a href="#"> <img src="img/right-arrow.png" alt=""></a> </div>
      </div>
    </div>
  </div> */}

        <div className="job-row-wrap">
          {values ?
            (values.map((job, index) => <JobOverview key={index} handleDelete = {handleDelete} deleting={action.deleting} data={job} />) ) : ''}
        </div>
      </section>
    </>
  );
};

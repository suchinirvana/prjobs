import React, { useState, useEffect } from "react";
import { jobService } from "../../../services";
import { currentUser } from "../../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link} from "react-router-dom";
import BannerDashboard from '../banner/BannerDashboard';
import ProfileHeader from '../profile/ProfileHeader';


export const JobApplications = () => {
  const [action, setAction] = useState({ loading: false, data: [] });
  const user = useSelector((state) => state.users);
  const { id } = useParams();

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
    fetchJobApplications({'type':'consultants','uid':currentUser().id, 'job_id': id});
    
  }, []);
  /*
  0- Pending
  1- UnderReview
  2- Short Listed
  3- Rejected
  */
 

  return (
    <>
    <BannerDashboard />
    <ProfileHeader bc="false" title="" />
    <section className="common-row lgray p-t0">
        <div className="tab-wrap-nav type-2">
            <div className="container">
              <div className="flex">
                  <ul className="tab-type">
                      <li className="active"><a href="#">APPLICATIONS</a></li>
                  </ul>
              </div>
            </div>
        </div>
      <div className="container lg">
        <div className="candidate-row">
         {action.data &&
            action.data.map((value, index) => (
                <div className="candidate-box" key={index}>
                <div className="flex">
                  <div className="img-box"> <img src="/img/avtar.png" alt="" /> </div>
                  <div className="caption">
                    <h3>{value.first_name} {value.last_name}</h3>
                    {/* <h4>HEAD CHEF</h4>
                    <p>INDIAN CURRY HOUSE, CALGARY</p> */}
                  </div>
                </div>
                <p className="btn-row flex"><Link to={`/user-profile/${value.jobseeker_id}?job=${id}`}>VIEW PROFILE</Link></p>
              </div>

            ))} 
        </div>
      </div>
    </section>
    </>
  );
};

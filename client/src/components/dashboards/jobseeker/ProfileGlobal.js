import React, { useState, useEffect } from "react";
import BannerDashboard from "../banner/BannerDashboard";
import ProfileHeader from "../profile/ProfileHeader";
import { ProfileImage } from "../profile/ProfileImage";
import { useSelector } from "react-redux";
//import { EditProfile } from "./EditProfile";
import Moment from 'react-moment';
import ReactHtmlParser from 'react-html-parser';
import { useHistory, useParams} from "react-router-dom";
import { userService } from "../../../services";
import { jobService } from "../../../services";




export const ProfileGlobal = () => {
 
  const [isEdit, setIsEdit] = useState(false);
  let url_string = window.location.href;
   let url = new URL(url_string);
   let job = url.searchParams.get("job");

  let dataObj = {
    nationality: "",
    country: "",
    province: "",
    city: "",
    post_code: "",
    first_name: "",
    last_name:"",
    email: "",
    phone: "",
    date_of_birth: "",
    marital_status: "",
    ielts_certificate: "",
    canadian_education: "",
    skills: "",
    total_experience: "",
    education: "",
    course:'',
    job_category:'',
    profile_detail:'',

  };
  //const [values, setValues] = useState({ ...dataObj });
  const [action, setAction] = useState({ loading: false, data: {...dataObj} });
  const { id } = useParams();

  const updateObj = () => {
    //setValues({ ...dataObj });
  };

  const fetchUserData = async () => {
    setAction({...action,loading: true});
    try {
      const response = await userService.getById(id);
      if (response) {
        setAction({...action,loading: false, data : response.user});
        //console.log(response)
      }
    } catch (error) {
      console.log(error);
      setAction({...action,loading: false,'msg':error.msg});
    }
    
  };
 

  const updateApplicationsStatus = async (data) => {
    try {
      const response = await jobService.updateApplicationsStatus(data);
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
   fetchUserData();
  updateApplicationsStatus({'type':'jobopen','job_id': job,'jobseeker_id':id});
    
  }, []);


  const {
    nationality,
    country,
    city,
    province,
    post_code,
    first_name,
    last_name,
    email,
    phone,
    date_of_birth,
    marital_status,
    ielts_certificate,
    canadian_education,
    skills,
    total_experience,
    education,
    job_category,
    course,
    profile_detail,
  } = action.data;

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEdit(!isEdit);
  };

  return (
    <>
      <BannerDashboard />
     

      <section className="common-row lgray p-t0">
        <div className="tab-wrap-nav type-2">
          <div className="container">
            <div className="flex">
              <ul className="tab-type">
                <li className="active">
                  <a href="#">PROFILE DETAILS</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="profile-wrap">
            <div className="profile-form dash-field">
              <div className="flex-field edit-ifno">
                <div className="box">
                  <a  className="btn xs-btn t-n"> 
                    {/* Edit Info <i className="fa fa-pencil"></i> */}
                    Send Message
                  </a> 
                </div>
              </div>
              
                  <ul className="data-view">
                  <li>
                      <span className="bold"> Name: </span>
                      <span>{first_name} {last_name}</span>
                    </li>
                    <li>
                      <span className="bold">Nationality: </span>
                      <span>{nationality}</span>
                    </li>
                    <li>
                      <span className="bold">
                        Country of residence at present:
                      </span>
                      <span>{country}</span>
                    </li>
                    <li>
                      <span className="bold">State/Province: </span>
                      <span>{province}</span>
                    </li>
                    <li>
                      <span className="bold">City: </span> <span>{city}</span>
                    </li>
                    <li>
                      <span className="bold">Zip Code: </span>
                      <span>{post_code}</span>
                    </li>

                    
                    <li>
                      <span className="bold">Your Email: </span>
                      <span>{email}</span>
                    </li>
                    <li>
                      <span className="bold">Your Number: </span>
                      <span>{phone}</span>
                    </li>

                    <li>
                      <span className="bold">Marital Status: </span>
                      <span>{marital_status}</span>
                    </li>
                    <li>
                      <span className="bold">Date of birth: </span>
                      <span>
                        {date_of_birth!=='' ? (<Moment format="MM/DD/YYYY">
                      {date_of_birth}
            </Moment>):''}
                      </span>
                    </li>
                    <li>
                      <span className="bold">Job Category: </span>
                      <span>{job_category}</span>
                    </li>
                    <li>
                      <span className="bold">Education: </span>
                      <span>{education}</span>
                    </li>
                    <li>
                      <span className="bold">Course: </span>
                      <span>{course}</span>
                    </li>
                    <li>
                      <span className="bold">IELTS certificate: </span>
                      <span>{ielts_certificate == 1 ? "Yes" : "No"}</span>
                    </li>
                    <li>
                      <span className="bold">Any Canadian education: </span>
                      <span> {canadian_education == 1 ? "Yes" : "No"}</span>
                    </li>
                    <li>
                      <span className="bold">Skills: </span>
                      <span> {skills}</span>
                    </li>
                    <li>
                      <span className="bold">Total experience: </span>
                      <span> {total_experience} {total_experience > 1 ? 'Years' : 'Year' }</span>
                    </li>

                    <li>
                      <span className="bold">About: </span>
                      <span> {ReactHtmlParser(profile_detail)}</span>
                    </li>
                  </ul>
                
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

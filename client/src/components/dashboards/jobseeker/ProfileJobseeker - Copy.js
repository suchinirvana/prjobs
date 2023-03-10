import React, { useState, useEffect } from "react";
import BannerDashboard from "../banner/BannerDashboard";
import ProfileHeader from "../profile/ProfileHeader";
import { ProfileImage } from "../profile/ProfileImage";
import { useSelector } from "react-redux";
import { EditProfile } from "./EditProfile";
import Moment from 'react-moment';
import ReactHtmlParser from 'react-html-parser';

export const ProfileJobseeker = () => {
 
  const [isEdit, setIsEdit] = useState(false);
  const user = useSelector((state) => state.users);
  let dataObj = {
    nationality: "",
    country: "",
    province: "",
    city: "",
    post_code: "",
    name: "",
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
  const [values, seValues] = useState({ ...dataObj });

  const updateObj = () => {
    dataObj.name = user.profile.first_name + " " + user.profile.last_name;
    dataObj.email = user.profile.email;
    dataObj.phone = user.profile.phone;
    dataObj.date_of_birth =
      user.profile.date_of_birth !== null ? user.profile.date_of_birth : "";
    dataObj.nationality = user.profile.nationality;
    dataObj.city = user.profile.city;
    dataObj.province = user.profile.province;
    dataObj.post_code = user.profile.post_code;
    dataObj.country = user.profile.country;
    dataObj.marital_status = user.profile.marital_status;
    dataObj.ielts_certificate =
      user.profile.ielts_certificate !== false ? 1 : 0;
    dataObj.canadian_education =
      user.profile.canadian_education !== false ? 1 : 0;
    dataObj.skills = user.profile.skills;
    dataObj.total_experience = user.profile.total_experience;
    dataObj.education = user.profile.education;
    dataObj.course = user.profile.course;
    dataObj.job_category = user.profile.job_category;
    dataObj.profile_detail = user.profile.profile_detail;
    

    seValues({ ...dataObj });
  };

 

  useEffect(() => {
    if (user.profile) {
      updateObj();
    }
  }, [user]);

  const {
    nationality,
    country,
    city,
    province,
    post_code,
    name,
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
  } = values;

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEdit(!isEdit);
  };

  let styleEdit = {};
  if (!isEdit) {
    styleEdit.width = "100%";
  }

  if (user.loading) {
    //return null;
  }
  return (
    <>
      <BannerDashboard />
      <ProfileHeader bc="true" title="My Profile" />

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
            {isEdit && <ProfileImage isEdit={isEdit} />}

            <div className="profile-form dash-field" style={styleEdit}>
              <div className="flex-field edit-ifno">
                <div className="box">
                  <a onClick={handleEdit} className="btn xs-btn t-n">
                    Edit Info <i className="fa fa-pencil"></i>
                  </a>
                </div>
              </div>
              {isEdit ? (
                <EditProfile setIsEdit={setIsEdit} />
              ) : (
                <>
                  <ul className="data-view">
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
                      <span className="bold">Your Name: </span>
                      <span>{name}</span>
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
                      <span> {total_experience}</span>
                    </li>
                    <li>
                      <span className="bold">About: </span>
                      <span> {ReactHtmlParser(profile_detail)}</span>
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

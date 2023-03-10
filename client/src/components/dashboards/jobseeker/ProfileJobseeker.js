import React, { useState, useEffect } from "react";
import BannerDashboard from "../banner/BannerDashboard";
import ProfileHeader from "../profile/ProfileHeader";
import { ProfileImage } from "../profile/ProfileImage";
import { useSelector } from "react-redux";
//import { EditProfile } from "./EditProfileJobseeker";
import Moment from 'react-moment';
import ReactHtmlParser from 'react-html-parser';
import { Link } from "react-router-dom";

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


      <section className="common-row lgray" style={{'display':'none'}}>
  <div className="container lg">
    <div className="profile-2col-wrap">
      <div className="profile-data-wrap action  m-b2">
        <h3>Panding Action</h3>
        <div className="data">
          <ul>
            <li>Verify Mobile Number</li>
            <li>Add Preferred Location</li>
            <li>Add Resume</li>
          </ul>
        </div>
      </div>
      <div className="profile-data-wrap  m-b2">
        <h3>BASIC INFORMATION</h3>
        <a href="#" className="btn xs-btn t-n">Edit Info <i className="fa fa-pencil"></i></a>
        <div className="data">
          <ul className="auto-flex">
            <li>
              <h5>Languages</h5>
              <p>English</p>
            </li>
            <li>
              <h5>Age</h5>
              <p>29</p>
            </li>
            <li>
              <h5>Work experience</h5>
              <p>10+ Years</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="profile-data-wrap">
      <h3>CONTACT INFORMATION</h3>
      <a href="#" className="btn xs-btn t-n">Edit Info <i className="fa fa-pencil"></i></a>
      <div className="data">
        <ul className="auto-flex">
          <li>
            <h5> Phone</h5>
            <p>xx-xxxx-xxxx</p>
          </li>
          <li>
            <h5>Email Address</h5>
            <p>xxxxxxxxx@prjobs.ca</p>
          </li>
          <li>
            <h5>Country</h5>
            <p>Canada</p>
          </li>
          <li>
            <h5>Postcode</h5>
            <p>V7Y 1C6</p>
          </li>
          <li>
            <h5>City</h5>
            <p>Vancouver BC</p>
          </li>
          <li>
            <h5>Full Address</h5>
            <p>Georgia Street,
              Vancouver BC, V7Y 1C6</p>
          </li>
        </ul>
      </div>
    </div>
    <div className="profile-data-wrap">
      <h3>Education</h3>
      <a href="#" className="btn xs-btn t-n">Edit Info <i className="fa fa-pencil"></i></a>
      <div className="data">
        <ul className="auto-flex">
          <li>
            <h5>Education</h5>
            <p>High School Diploma</p>
          </li>
          <li>
            <h5>IELTS certificate</h5>
            <p>Do you have IELTS certificate?</p>
          </li>
        </ul>
      </div>
    </div>
    <div className="profile-data-wrap">
      <h3>SKILLS</h3>
      <a href="#" className="btn xs-btn t-n">Edit Info <i className="fa fa-pencil"></i></a>
      <div className="data">
        <p>Mention your employment details including your current and previous company work experience</p>
        <table>
          <thead>
            <tr>
              <th>Skills</th>
              <th>Experience</th>
              <th width="50"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bootstrap</td>
              <td>1 Year 5 Months</td>
              <td><a href="#"><i className="fas fa-pencil-alt"></i></a></td>
            </tr>
            <tr>
              <td>Bootstrap</td>
              <td>5 Year 5 Months</td>
              <td><a href="#"><i className="fas fa-pencil-alt"></i></a></td>
            </tr>
            <tr>
              <td>html</td>
              <td>2 Year 7 Months</td>
              <td><a href="#"><i className="fas fa-pencil-alt"></i></a></td>
            </tr>
            <tr>
              <td>css</td>
              <td>0 Year 5 Months</td>
              <td><a href="#"><i className="fas fa-pencil-alt"></i></a></td>
            </tr>
            <tr>
              <td>photoshop</td>
              <td>1 Year 0 Months</td>
              <td><a href="#"><i className="fas fa-pencil-alt"></i></a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div className="profile-data-wrap">
      <h3>Desired Career Profile</h3>
      <a href="#" className="btn xs-btn t-n">Edit Info <i className="fa fa-pencil"></i></a>
      <div className="data">
        <ul className="auto-flex col-3">
          <li>
            <h5> Industry</h5>
            <p>Accounting / Finance</p>
          </li>
          <li>
            <h5>Functional Area / Department</h5>
            <p>Agent</p>
          </li>
          <li>
            <h5>Job Type</h5>
            <p> Permanent</p>
          </li>
          <li>
            <h5>Employement Type</h5>
            <p> Futll Time</p>
          </li>
          <li>
            <h5>Preferred Shift</h5>
            <p>Day</p>
          </li>
          <li>
            <h5>Availability to Join</h5>
            <p>Immediately</p>
          </li>
          <li>
            <h5>Expected Salary</h5>
            <p>20 k</p>
          </li>
          <li>
            <h5>Desired City</h5>
            <p>BC</p>
          </li>
        </ul>
      </div>
    </div>
    <div className="profile-data-wrap">
      <h3>Attach Resume</h3>
      <div className="data">
        <p>Resume is the most important document recruiters look for. Recruiters generally do not look at profiles without resumes.</p>
        <div className="custom-choose lg-choose">
          <input type="file" id="lg-file"/>
          <label for="lg-file" className="btn"><i className="fa fa-upload"></i> Upload Resume file size is 2MB</label>
        </div>
        <p>If you do not have a resume document, you may write your brief professional profile here.</p>
      </div>
    </div>
  </div>
</section>

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
                  <Link to={`/edit-profile/1`} className="btn xs-btn t-n">Edit Info <i className="fa fa-pencil"></i></Link>
                  
                </div>
              </div>
              {isEdit ? (
               <span className="bold">Nationality: </span>
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
